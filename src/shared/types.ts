import * as turf from "@turf/turf";

export type FeatureCollectionWithBuildings = turf.FeatureCollection<
  turf.Polygon | turf.MultiPolygon
>;

export type FeatureCollectionWithMappingCake = turf.FeatureCollection<turf.Polygon>;

export type TerritoryExtent = turf.Feature<turf.Polygon>;

export type AddressStatus =
  | "addressPresent"
  | "addressMissing"
  | "addressNotRequired";

export interface TimelineSummary {
  knownAt: string;
  buildingCountByAddressStatus: Record<AddressStatus, number>;
}
