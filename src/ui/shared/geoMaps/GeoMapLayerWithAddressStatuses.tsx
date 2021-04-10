import * as turf from "@turf/turf";
import * as React from "react";

import {
  getAddressStatus,
  mapAddressStatusToColor,
} from "../../../shared/helpersForAddresses";
import { FeatureCollectionWithBuildings } from "../../../shared/types";
import { GeoMapLayer } from "./GeoMapLayer";
import { FitExtent } from "./types";

export interface GeoMapLayerWithAddressStatusesProps {
  width: number;
  height: number;
  data: FeatureCollectionWithBuildings;
  fitExtent: FitExtent;
  sample?: number;
  bufferInMeters?: number;
}

export const GeoMapLayerWithAddressStatuses: React.VoidFunctionComponent<GeoMapLayerWithAddressStatusesProps> = ({
  width,
  height,
  fitExtent,
  data,
  bufferInMeters = 0,
  sample,
}) => {
  const featureProps = React.useCallback<
    (feature: turf.Feature) => React.SVGProps<SVGPathElement>
  >((feature) => {
    const color = mapAddressStatusToColor(getAddressStatus(feature));

    return {
      fill: color,
      // stroke: color,
      // strokeWidth: 0.2,
      stroke: "#0003",
      strokeWidth: 0.1,
    };
  }, []);

  const features = React.useMemo(
    () =>
      data.features.map(
        // (feature) => feature,
        (feature) =>
          bufferInMeters > 0
            ? turf.buffer(feature, 2, { units: "meters", steps: 1 })
            : feature,
      ),
    [data, bufferInMeters],
  );

  const sampledFeatures = React.useMemo(
    () => (sample ? features.slice(0, sample) : features),
    [sample, features],
  );

  return (
    <GeoMapLayer
      width={width}
      height={height}
      fitExtent={fitExtent}
      featureProps={featureProps}
      features={sampledFeatures}
    />
  );
};
