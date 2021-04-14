import * as turf from "@turf/turf";

export type FeatureCollectionWithBuildings = turf.FeatureCollection<
  turf.Polygon | turf.MultiPolygon
> & {
  properties: {
    fetchedAt: string;
  };
};

export type FeatureCollectionWithMappingCake = turf.FeatureCollection<turf.Polygon>;

export type TerritoryExtent = turf.Feature<turf.Polygon>;

export type AddressStatus =
  | "addressPresent"
  | "addressMissing"
  | "addressNotRequired";

export interface TimelineSummary {
  fetchedAt: string;
  buildingCountByAddressStatus: Record<AddressStatus, number>;
}
