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
  padding-top: 15px;
`;

const GeoMapWrapper = styled.div`
  width: 455px;
  position: relative;
  display: inline-block;
  white-space: nowrap;
  padding-top: 40px;

  & + & {
    margin-left: 40px;
  }
`;

const StyledGeoMap = styled(GeoMap)`
  width: 455px;
  height: ${455 / 1.2}px;
  /* aspect-ratio: 1.2; */
  /* ↑ not supported by ff */
`;

const GeoMapTitle = styled.div`
  font-size: 2em;
  /* outline: 1px solid red; */

  line-height: 1em;
  opacity: 40%;
  top: 15px;
  position: absolute;
  right: 0;
  left: 0;
  padding-left: 70px;
  text-align: center;
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
          <GeoMapTitle>
            {process.env.NEXT_PUBLIC_MAPPING_PARTY_DATE_START}
          </GeoMapTitle>
          <StyledGeoMap
            buildingCollection={sampleBuildings(buildingCollectionStart)}
            territoryExtent={territoryExtent}
          />
        </GeoMapWrapper>
        <GeoMapWrapper>
          <GeoMapTitle>
            {process.env.NEXT_PUBLIC_MAPPING_PARTY_DATE_FINISH}
          </GeoMapTitle>
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
