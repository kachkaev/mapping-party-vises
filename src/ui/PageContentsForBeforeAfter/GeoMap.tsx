import * as turf from "@turf/turf";
import * as React from "react";

import {
  FeatureCollectionWithBuildings,
  FeatureCollectionWithMappingCake,
  TerritoryExtent,
} from "../../shared/types";
import { FitExtent } from "../types";
import { GeoMapLayer } from "./GeoMapLayer";

export interface GeoMapProps extends React.HTMLAttributes<SVGSVGElement> {
  buildingCollection: FeatureCollectionWithBuildings;
  mappingCake: FeatureCollectionWithMappingCake;
  territoryExtent: TerritoryExtent;
}

const scaleFactor = 0.5;
const width = 1000 * scaleFactor;
const height = 800 * scaleFactor;
const mapPaddingX = 10;
const mapPaddingY = 10;

const hasAddress = ({ properties }: turf.Feature): boolean => {
  return Boolean(
    (properties?.["addr:street"] || properties?.["addr:place"]) &&
      properties?.["addr:housenumber"],
  );
};

const isAbandoned = ({ properties }: turf.Feature): boolean => {
  return Boolean(properties?.["abandoned"]);
};

export const buildingTypesWithOptionalAddress = [
  "barn",
  "construction",
  "container",
  "garage",
  "garages",
  "gazebo",
  "grandstand",
  "greenhouse",
  "industrial",
  "kiosk",
  "roof",
  "ruins",
  "service",
  "shed",
  "transformer_tower",
  "warehouse",
];

const buildingTypesWithOptionalAddressSet = new Set(
  buildingTypesWithOptionalAddress,
);
const isOfAuxiliaryType = ({ properties }: turf.Feature): boolean => {
  return Boolean(
    buildingTypesWithOptionalAddressSet.has(properties?.["building"] ?? ""),
  );
};

const getAddressStatus = (feature: turf.Feature) => {
  if (hasAddress(feature)) {
    return "#6be0a6";
  }

  if (isAbandoned(feature) || isOfAuxiliaryType(feature)) {
    return "#a4a4a4";
  }

  return "#c82677";
};

export const GeoMap: React.VoidFunctionComponent<GeoMapProps> = ({
  buildingCollection,
  mappingCake,
  territoryExtent,
  ...rest
}) => {
  const fitExtent: FitExtent = [
    [
      [mapPaddingX, mapPaddingY],
      [width - mapPaddingX, height - mapPaddingY],
    ],
    // territoryExtent,ge
    turf.bboxPolygon(turf.bbox(territoryExtent)).geometry,
  ];

  // TODO: figure out why visx / turf are incompatible orientation-wise
  fitExtent[1].coordinates[0].reverse();

  return (
    <svg width={width} height={height} {...rest}>
      <GeoMapLayer
        width={width}
        height={height}
        fitExtent={fitExtent}
        featureProps={() => ({
          fill: "none",
          stroke: "#232323",
          strokeWidth: 3 * scaleFactor,
        })}
        opacity={0.3}
        features={[territoryExtent]}
      />
      <GeoMapLayer
        width={width}
        height={height}
        fitExtent={fitExtent}
        featureProps={() => ({
          fill: "none",
          stroke: "#4d75c4",
          strokeWidth: 1 * scaleFactor,
        })}
        opacity={0.33}
        features={mappingCake.features}
      />
      <GeoMapLayer
        width={width}
        height={height}
        fitExtent={fitExtent}
        featureProps={(feature) => ({
          fill: getAddressStatus(feature),
          stroke: "#232323",
          strokeOpacity: 0.5,
          strokeWidth: 0.1 * scaleFactor,
        })}
        features={buildingCollection.features}
      />
    </svg>
  );
};
