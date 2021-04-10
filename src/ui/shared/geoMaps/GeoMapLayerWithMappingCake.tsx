import * as React from "react";

import { FeatureCollectionWithMappingCake } from "../../../shared/types";
import { GeoMapLayer } from "./GeoMapLayer";
import { FitExtent } from "./types";

export interface GeoMapLayerWithMappingCakeProps {
  width: number;
  height: number;
  data: FeatureCollectionWithMappingCake;
  fitExtent: FitExtent;
}

export const GeoMapLayerWithMappingCake: React.VoidFunctionComponent<GeoMapLayerWithMappingCakeProps> = ({
  width,
  height,
  fitExtent,
  data,
}) => {
  const featureProps = React.useCallback<() => React.SVGProps<SVGPathElement>>(
    () => ({
      fill: "none",
      stroke: "#4d75c4",
      strokeWidth: 1,
      strokeLinejoin: "round",
      strokeLinecap: "round",
    }),
    [],
  );

  return (
    <GeoMapLayer
      width={width}
      height={height}
      fitExtent={fitExtent}
      featureProps={featureProps}
      opacity={0.2}
      features={data.features}
    />
  );
};
