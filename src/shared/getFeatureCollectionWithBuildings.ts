import execa from "execa";

import { FeatureCollectionWithBuildings } from "./types";

export const getFeatureCollectionWithBuildings = async (
  type: "start" | "finish",
): Promise<FeatureCollectionWithBuildings> => {
  const commit =
    type === "start"
      ? process.env.BUILDINGS_COMMIT_START
      : process.env.BUILDINGS_COMMIT_FINISH;

  const { stdout } = await execa(
    "git",
    [
      "show",
      `${commit}:${process.env.BUILDINGS_RELATIVE_FILE_PATH}` ?? `unknown`,
    ],
    { cwd: process.env.BUILDINGS_GIT_REPO_PATH ?? "/unknown" },
  );

  return JSON.parse(stdout);
};
