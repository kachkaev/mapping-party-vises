import fs from "fs-extra";

import { TerritoryExtent } from "./types";

export const getFeatureWithTerritoryExtent = async (): Promise<TerritoryExtent> => {
  const result: TerritoryExtent = await fs.readJson(
    process.env.TERRITORY_EXTENT_FILE_PATH!,
  );
  // TODO: figure out why original coordinates are treated as inner ones
  // result.geometry.coordinates[0].reverse();

  return result;
};
