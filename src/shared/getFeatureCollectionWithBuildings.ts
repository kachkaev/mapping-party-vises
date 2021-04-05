import execa from "execa";

import { FeatureCollectionWithBuildings } from "./types";

export const getFeatureCollectionWithBuildings = async (
  date: string,
): Promise<FeatureCollectionWithBuildings> => {
  const relativeFilePath =
    process.env.BUILDINGS_RELATIVE_FILE_PATH ?? "/unknownFilePath";

  const { stdout: rawCommitLog } = await execa(
    "git",
    [
      "log",
      `--until="${date} 23:59 +0300"`,
      "--format=%H",
      "--",
      relativeFilePath,
    ],
    { cwd: process.env.BUILDINGS_GIT_REPO_PATH ?? "/unknown" },
  );

  const commit = rawCommitLog.split("\n")[0];

  const { stdout: fileContents } = await execa(
    "git",
    ["show", `${commit}:${relativeFilePath}` ?? `unknown`],
    { cwd: process.env.BUILDINGS_GIT_REPO_PATH ?? "/unknown" },
  );

  return JSON.parse(fileContents);
};
