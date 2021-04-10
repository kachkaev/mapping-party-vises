import * as turf from "@turf/turf";
import * as React from "react";
import { useMeasure } from "react-use";
import styled from "styled-components";

import {
  getAddressStatus,
  mapAddressStatusToColor,
} from "../../../shared/helpersForAddresses";
import {
  FeatureCollectionWithBuildings,
  FeatureCollectionWithMappingCake,
  TerritoryExtent,
} from "../../../shared/types";
import { FitExtent } from "../../types";
import { GeoMapLayer } from "./GeoMapLayer";

const Wrapper = styled.div`
  position: relative;
`;

const StyledSvg = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
`;

export interface GeoMapProps extends React.HTMLAttributes<HTMLDivElement> {
  buildingCollection: FeatureCollectionWithBuildings;
  mappingCake?: FeatureCollectionWithMappingCake;
  territoryExtent: TerritoryExtent;
  scaleFactor?: number;
  padding?: number;
}

export const GeoMap: React.VoidFunctionComponent<GeoMapProps> = ({
  buildingCollection,
  mappingCake,
  territoryExtent,
  scaleFactor = 0.5,
  padding = 0,
  ...rest
}) => {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();

  const territoryExtentStrokeWidth = 4 * scaleFactor;
  const mapPaddingX = padding + territoryExtentStrokeWidth / 2;
  const mapPaddingY = padding + territoryExtentStrokeWidth / 2;

  const fitExtent: FitExtent = [
    [
      [mapPaddingX, mapPaddingY],
      [width - mapPaddingX, height - mapPaddingY],
    ],
    // territoryExtent,ge
    turf.bboxPolygon(turf.bbox(territoryExtent)).geometry,
  ];

  const buildingFeatureProps = React.useCallback(
    (feature) => {
      const fill = mapAddressStatusToColor(getAddressStatus(feature));

      return {
        fill,
        stroke: fill,
        strokeWidth: 0.5 * scaleFactor,
      };
    },
    [scaleFactor],
  );

  // TODO: figure out why visx / turf are incompatible orientation-wise
  fitExtent[1].coordinates[0].reverse();

  return (
    <Wrapper {...rest} ref={ref}>
      {width && height ? (
        <StyledSvg width={width} height={height}>
          <GeoMapLayer
            width={width}
            height={height}
            fitExtent={fitExtent}
            featureProps={() => ({
              fill: "none",
              stroke: "#000",
              strokeWidth: territoryExtentStrokeWidth,
            })}
            opacity={0.25}
            features={[territoryExtent]}
          />
          {mappingCake ? (
            <GeoMapLayer
              width={width}
              height={height}
              fitExtent={fitExtent}
              featureProps={() => ({
                fill: "none",
                stroke: "#4d75c4",
                strokeWidth: 2 * scaleFactor,
              })}
              opacity={0.2}
              features={mappingCake.features}
            />
          ) : null}
          <GeoMapLayer
            width={width}
            height={height}
            fitExtent={fitExtent}
            featureProps={buildingFeatureProps}
            features={buildingCollection.features}
          />
        </StyledSvg>
      ) : null}
    </Wrapper>
  );
};
