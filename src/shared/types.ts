import * as turf from "@turf/turf";

export type FeatureCollectionWithBuildings = turf.FeatureCollection<
  turf.Polygon | turf.MultiPolygon
>;

export type FeatureCollectionWithMappingCake = turf.FeatureCollection<turf.Polygon>;

export type TerritoryExtent = turf.Feature<turf.Polygon>;
