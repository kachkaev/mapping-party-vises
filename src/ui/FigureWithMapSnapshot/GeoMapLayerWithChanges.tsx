import * as turf from "@turf/turf";
import * as React from "react";

import { FeatureCollectionWithBuildings } from "../../shared/types";
import { FitExtent, GeoMapLayer } from "../shared/geoMaps";

export interface GeoMapLayerWithChangesProps {
  width: number;
  height: number;
  data: FeatureCollectionWithBuildings;
  prevData: FeatureCollectionWithBuildings;
  fitExtent: FitExtent;
  sample?: number;
  bufferInMeters?: number;
}

export const GeoMapLayerWithChanges: React.VoidFunctionComponent<GeoMapLayerWithChangesProps> = ({
  width,
  height,
  fitExtent,
  data,
  prevData,
  bufferInMeters = 0,
  sample,
}) => {
  const featureProps = React.useCallback<
    (feature: turf.Feature) => React.SVGProps<SVGPathElement>
  >(() => {
    return {
      fill: "#000",
      stroke: "#000",
      strokeWidth: 1,
    };
  }, []);

  const prevFeatureById = React.useMemo(() => {
    const result: Record<string, turf.Feature> = {};
    prevData.features.forEach((feature) => {
      result[feature.properties?.id] = feature;
    });

    return result;
  }, [prevData]);

  const features = React.useMemo(
    () =>
      data.features
        .filter((feature) => {
          const prevFeature = prevFeatureById[feature.properties?.id];
          if (!prevFeature) {
            return true;
          }

          return JSON.stringify(prevFeature) !== JSON.stringify(feature);
        })
        .map((feature) => {
          if (!bufferInMeters) {
            return feature;
          }

          try {
            return turf.buffer(feature, 2, { units: "meters", steps: 1 });
          } catch {
            // noop (unclosed geometry)
          }

          return feature;
        }),
    [data.features, prevFeatureById, bufferInMeters],
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
