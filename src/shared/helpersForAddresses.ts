import * as turf from "@turf/turf";

import { AddressStatus } from "./types";

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
  "storage_tank",
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

export const getAddressStatus = (feature: turf.Feature): AddressStatus => {
  if (hasAddress(feature)) {
    return "addressPresent";
  }

  if (isAbandoned(feature) || isOfAuxiliaryType(feature)) {
    return "addressNotRequired";
  }

  return "addressMissing";
};

export const mapAddressStatusToColor = (
  addressStatus: AddressStatus,
): string => {
  switch (addressStatus) {
    // Colorbrewer PiYG
    case "addressPresent":
      // return "#7fbc41";
      return "#4dac26";
    // return "#4d9221";
    // return "#276419";
    case "addressMissing":
      // return "#de77ae";
      return "#d01c8b";
    // return "#c51b7d";
    // return "#8e0152";
  }

  return "#a4a4a4";
};
