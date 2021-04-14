import execa from "execa";
import fs from "fs-extra";
import globby from "globby";
import _ from "lodash";
import osmToGeoJson from "osmtogeojson";
import { DOMParser } from "xmldom";

import { shiftDate } from "./helpersForDates";
import { getTimelineSummariesDirPath } from "./helpersForPaths";
import {
  FeatureCollectionWithBuildings,
  FeatureCollectionWithMappingCake,
  TerritoryExtent,
  TimelineSummary,
} from "./types";

export const obtainFeatureCollectionWithBuildings = async (
  date: string,
): Promise<FeatureCollectionWithBuildings> => {
  const relativeFilePath =
    process.env.BUILDINGS_RELATIVE_FILE_PATH ?? "/unknownFilePath";

  const { stdout: rawCommitLog } = await execa(
    "git",
    [
      "log",
      `--until="${shiftDate(date, 1)} 03:15 +0300"`,
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

export const obtainFeatureCollectionWithMappingCake = async (): Promise<FeatureCollectionWithMappingCake> => {
  const rawXml = await fs.readFile(
    process.env.MAPPING_CAKE_FILE_PATH!,
    "utf-8",
  );
  const xml = new DOMParser().parseFromString(rawXml);
  const geojsonData = osmToGeoJson(xml) as FeatureCollectionWithMappingCake;

  return geojsonData;
};

export const obtainFeatureWithTerritoryExtent = async (): Promise<TerritoryExtent> => {
  const result: TerritoryExtent = await fs.readJson(
    process.env.TERRITORY_EXTENT_FILE_PATH!,
  );
  // TODO: figure out why original coordinates are treated as inner ones
  // result.geometry.coordinates[0].reverse();

  return result;
};

export const obtainTimelineSummaries = async (): Promise<TimelineSummary[]> => {
  const filePaths = await globby("**/summary.json", {
    cwd: getTimelineSummariesDirPath(),
    absolute: true,
    onlyFiles: true,
  });

  const records: TimelineSummary[] = [];
  for (const filePath of filePaths) {
    const json = (await fs.readJson(filePath)) as TimelineSummary;
    records.push(json);
  }

  return _.sortBy(records, (record) => record.fetchedAt);
};
