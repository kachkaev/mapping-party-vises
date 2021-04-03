import fs from "fs-extra";

import { TerritoryExtent } from "./types";

export const getFeatureWithTerritoryExtent = async (): Promise<TerritoryExtent> => {
  return await fs.readJson(process.env.TERRITORY_EXTENT_FILE_PATH!);
};
