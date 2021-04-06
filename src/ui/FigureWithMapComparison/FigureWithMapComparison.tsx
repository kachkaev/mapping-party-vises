import * as React from "react";
import styled from "styled-components";

import {
  FeatureCollectionWithBuildings,
  TerritoryExtent,
} from "../../shared/types";
import { Figure } from "../shared/Figure";
import { GeoMap } from "../shared/GeoMap";
import { LegendForMapComparison } from "./LegendForMapComparison";

const sampleBuildings = (
  buildingCollection: FeatureCollectionWithBuildings,
): FeatureCollectionWithBuildings => {
  const features = buildingCollection.features.filter(
    // (feature, index) => index % 3 === 0,
    () => true,
  );

  return {
    ...buildingCollection,
    features,
  };
};

const GeoMaps = styled.div`
  white-space: nowrap;
  padding-top: 20px;
  padding-bottom: 50px;
`;

const GeoMapWrapper = styled.div`
  width: 475px;
  position: relative;
  display: inline-block;
  white-space: nowrap;
  padding-top: 45px;

  & + & {
    margin-left: 40px;
  }
`;

const StyledGeoMap = styled(GeoMap)`
  width: 475px;
  height: ${475 / 1.2}px;
  /* aspect-ratio: 1.2; */
  /* ↑ not supported by ff */
`;

const GeoMapTitle = styled.div`
  font-size: 2em;
  left: 30%;

  line-height: 1em;
  opacity: 40%;
  top: 10px;
  position: absolute;
  text-align: left;
  margin-bottom: -0.5em;
`;

const DiffLegendContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  left: 52%;
`;

const StyledDiffLegend = styled(LegendForMapComparison)`
  position: relative;
  left: -50%;
`;

export interface FigureWithMapComparisonProps {
  buildingCollectionStart: FeatureCollectionWithBuildings;
  buildingCollectionFinish: FeatureCollectionWithBuildings;
  territoryExtent: TerritoryExtent;
}

export const FigureWithMapComparison: React.VoidFunctionComponent<FigureWithMapComparisonProps> = ({
  territoryExtent,
  buildingCollectionStart,
  buildingCollectionFinish,
}) => {
  return (
    <Figure width={1000} height={550}>
      <GeoMaps>
        <GeoMapWrapper>
          <GeoMapTitle>старт: 2021-02-20</GeoMapTitle>
          <StyledGeoMap
            buildingCollection={sampleBuildings(buildingCollectionStart)}
            territoryExtent={territoryExtent}
          />
        </GeoMapWrapper>
        <GeoMapWrapper>
          <GeoMapTitle>финиш: 2021-03-31</GeoMapTitle>
          <StyledGeoMap
            buildingCollection={sampleBuildings(buildingCollectionFinish)}
            territoryExtent={territoryExtent}
          />
        </GeoMapWrapper>
      </GeoMaps>
      <DiffLegendContainer>
        <StyledDiffLegend
          buildingCollectionStart={buildingCollectionStart}
          buildingCollectionFinish={buildingCollectionFinish}
        />
      </DiffLegendContainer>
    </Figure>
  );
};
