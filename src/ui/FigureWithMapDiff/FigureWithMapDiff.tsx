import * as turf from "@turf/turf";
import { useRouter } from "next/dist/client/router";
import * as React from "react";
import styled from "styled-components";

import { getAddressStatus } from "../../shared/helpersForAddresses";
import {
  FeatureCollectionWithBuildings,
  FeatureCollectionWithMappingCake,
  TerritoryExtent,
} from "../../shared/types";
import { Figure } from "../shared/Figure";
import {
  GeoMap,
  GeoMapLayer,
  GeoMapLayerWithMappingCake,
  GeoMapLayerWithTerritoryExtent,
} from "../shared/geoMaps";
import {
  LegendRowEl,
  LegendRowForMappingCake,
  LegendRowGapEl,
  SymbolWrapperEl,
} from "../shared/legend";

const size = 750;
const verticalSizeReduction = 16 + 6;

const StyledGeoMap = styled(GeoMap)`
  margin: 25px auto 0;
  left: -7px;
  width: ${size - 30}px;
  height: ${(size - 30) / 1.2}px;
  /* aspect-ratio: 1.2; */
  /* ↑ not supported by ff */
`;

const Legend = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
`;

export interface FigureWithMapDiffProps {
  buildingCollectionStart: FeatureCollectionWithBuildings;
  buildingCollectionFinish: FeatureCollectionWithBuildings;
  mappingCake: FeatureCollectionWithMappingCake;
  territoryExtent: TerritoryExtent;
}

const sample = <T,>(x: T[]) => x; // .slice(0, 5000);

export const FigureWithMapDiff: React.VoidFunctionComponent<FigureWithMapDiffProps> = ({
  territoryExtent,
  mappingCake,
  buildingCollectionStart,
  buildingCollectionFinish,
}) => {
  const { locale } = useRouter();

  const buildingFeatureProps = React.useCallback((feature: turf.Feature) => {
    return {
      fill: getAddressStatus(feature) === "addressPresent" ? "#000" : "#fff",
      stroke: "#0001",
      strokeWidth: 0.05,
    };
  }, []);

  const buildingFeaturePropsInverse = React.useCallback(
    (feature: turf.Feature) => {
      return {
        fill: getAddressStatus(feature) === "addressPresent" ? "#fff" : "#000",
        stroke: "#0001",
        strokeWidth: 0.05,
      };
    },
    [],
  );

  return (
    <Figure width={size} height={size - verticalSizeReduction}>
      <StyledGeoMap padding={12} extentToFit={territoryExtent}>
        {(layerProps) => {
          return (
            <>
              <g>
                <rect x={0} y={0} width={10000} height={10000} fill="#fff" />
                <g style={{ mixBlendMode: "difference" }}>
                  <GeoMapLayer
                    {...layerProps}
                    featureProps={buildingFeaturePropsInverse}
                    features={sample(buildingCollectionFinish.features)}
                  />
                </g>
                <g style={{ mixBlendMode: "normal" }}>
                  <GeoMapLayer
                    {...layerProps}
                    featureProps={buildingFeaturePropsInverse}
                    features={sample(buildingCollectionStart.features)}
                  />
                </g>
                <g style={{ mixBlendMode: "difference" }}>
                  <GeoMapLayer
                    {...layerProps}
                    featureProps={buildingFeatureProps}
                    features={sample(buildingCollectionFinish.features)}
                  />
                </g>
              </g>
              <GeoMapLayerWithTerritoryExtent
                {...layerProps}
                data={territoryExtent}
              />
              <GeoMapLayerWithMappingCake {...layerProps} data={mappingCake} />
            </>
          );
        }}
      </StyledGeoMap>
      <Legend>
        <LegendRowEl>
          <SymbolWrapperEl />
          {locale === "ru" ? (
            <>
              чёрная заливка обозначает изменение
              <br />
              формы здания или добавление адреса
            </>
          ) : (
            "TODO"
          )}
        </LegendRowEl>
        <LegendRowGapEl />
        <LegendRowForMappingCake />
      </Legend>
    </Figure>
  );
};
