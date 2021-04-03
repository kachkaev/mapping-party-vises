import execa from "execa";

import { FeatureCollectionWithBuildings } from "./types";

export const getFeatureCollectionWithBuildings = async (
  type: "before" | "after",
): Promise<FeatureCollectionWithBuildings> => {
  const commit =
    type === "before"
      ? process.env.BUILDINGS_COMMIT_BEFORE
      : process.env.BUILDINGS_COMMIT_AFTER;

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
