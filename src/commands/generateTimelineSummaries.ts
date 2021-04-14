import { autoStartCommandIfNeeded, Command } from "@kachkaev/commands";
import chalk from "chalk";
import { config } from "dotenv-flow";
import execa from "execa";
import fs from "fs-extra";
import { DateTime } from "luxon";
import path from "path";

import { generateAddressSummary } from "../shared/helpersForAddresses";
import { getTimelineSummariesDirPath } from "../shared/helpersForPaths";
import {
  FeatureCollectionWithBuildings,
  TimelineSummary,
} from "../shared/types";

const writeFormattedJson = async (filePath: string, object: unknown) => {
  await fs.writeJson(filePath, object, { spaces: "\t" });
};

export const serializeTime = (time?: string): string => {
  let t: DateTime | undefined = undefined;
  if (time) {
    t = DateTime.fromRFC2822(time).setZone("utc");
    if (!t.isValid) {
      t = DateTime.fromISO(time).setZone("utc");
    }
  }

  return (t ?? DateTime.utc())
    .set({ millisecond: 0 })
    .toISO({ suppressMilliseconds: true });
};

export const generateTimelineSummaries: Command = async ({ logger }) => {
  config();

  const gitRepoDirPath = process.env.BUILDINGS_GIT_REPO_PATH ?? "unset";
  const fetchedOsmBuildingsRelativeFilePath =
    process.env.BUILDINGS_RELATIVE_FILE_PATH ?? "unset";

  const timelineSummariesDirPath = getTimelineSummariesDirPath();

  const gitLogResult = await execa(
    "git",
    ["log", "--pretty=oneline", "--", fetchedOsmBuildingsRelativeFilePath],
    { cwd: gitRepoDirPath },
  );
  const commits = gitLogResult.stdout
    .split("\n")
    .map((row) => row.split(" ", 1)[0])
    .filter((row): row is string => !!row);

  const timelineSummaries: TimelineSummary[] = [];

  for (const commit of commits) {
    const commitDirPath = path.resolve(
      timelineSummariesDirPath,
      "commits",
      commit,
    );

    await fs.ensureDir(commitDirPath);

    const summaryFilePath = path.resolve(commitDirPath, "summary.json");
    let summary: TimelineSummary;

    if (await fs.pathExists(summaryFilePath)) {
      logger.log(chalk.gray(summaryFilePath));
      summary = await fs.readJson(summaryFilePath);
    } else {
      logger.log(chalk.magenta(summaryFilePath));

      const { stdout: rawFetchedOsmBuildings } = await execa(
        "git",
        ["show", `${commit}:${fetchedOsmBuildingsRelativeFilePath}`],
        { cwd: gitRepoDirPath },
      );

      const featureCollectionWithBuildings = JSON.parse(
        rawFetchedOsmBuildings,
      ) as FeatureCollectionWithBuildings;

      const fetchedAt = featureCollectionWithBuildings?.properties?.fetchedAt;
      if (!fetchedAt) {
        throw new Error("Unexpected empty fetchedAt");
      }

      summary = {
        fetchedAt: serializeTime(fetchedAt), // Accounts for old time format used before ≈2021-03-10
        buildingCountByAddressStatus: generateAddressSummary(
          featureCollectionWithBuildings,
        ),
      };

      await writeFormattedJson(summaryFilePath, summary);
    }

    timelineSummaries.push(summary);
  }
};

autoStartCommandIfNeeded(generateTimelineSummaries, __filename);
