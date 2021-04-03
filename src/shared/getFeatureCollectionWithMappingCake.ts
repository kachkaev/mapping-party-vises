import fs from "fs-extra";
import osmToGeojson from "osmtogeojson";
import { DOMParser } from "xmldom";

import { FeatureCollectionWithMappingCake } from "./types";

export const getFeatureCollectionWithMappingCake = async (): Promise<FeatureCollectionWithMappingCake> => {
  const rawXml = await fs.readFile(
    process.env.MAPPING_CAKE_FILE_PATH!,
    "utf-8",
  );
  const xml = new DOMParser().parseFromString(rawXml);
  const geojsonData = osmToGeojson(xml) as FeatureCollectionWithMappingCake;

  return geojsonData;
};
