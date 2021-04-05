import * as React from "react";
import styled from "styled-components";

import {
  FeatureCollectionWithBuildings,
  FeatureCollectionWithMappingCake,
  TerritoryExtent,
} from "../../shared/types";
import { Figure } from "../shared/Figure";
import { GeoMap } from "../shared/GeoMap";
import { DiffLegend } from "./DiffLegend";

const size = 720;

const GeoMaps = styled.div`
  white-space: nowrap;
  padding-top: 20px;
`;

const GeoMapTitle = styled.div`
  font-size: 3.5em;
  opacity: 30%;
  position: absolute;
  text-align: left;
  bottom: 100px;
`;

const StyledGeoMap = styled(GeoMap)`
  margin: 0 auto;
  left: -7px;
  width: ${size}px;
  height: ${size / 1.2}px;
  /* aspect-ratio: 1.2; */
  /* ↑ not supported by ff */
`;

const DiffLegendContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const StyledDiffLegend = styled(DiffLegend)`
  position: relative;
`;

export interface PageContentsForMapSnapshotProps {
  buildingCollection: FeatureCollectionWithBuildings;
  buildingCollectionTheDayBefore: FeatureCollectionWithBuildings;
  mappingCake: FeatureCollectionWithMappingCake;
  territoryExtent: TerritoryExtent;
  date: string;
}

export const PageContentsForMapSnapshot: React.VoidFunctionComponent<PageContentsForMapSnapshotProps> = ({
  territoryExtent,
  mappingCake,
  buildingCollection,
  buildingCollectionTheDayBefore,
  date,
}) => {
  return (
    <Figure width={size} height={size}>
      <GeoMapTitle>{date}</GeoMapTitle>
      <GeoMaps>
        <StyledGeoMap
          padding={12}
          buildingCollection={buildingCollection}
          territoryExtent={territoryExtent}
          mappingCake={mappingCake}
        />
      </GeoMaps>
      <DiffLegendContainer>
        <StyledDiffLegend
          buildingCollectionStart={buildingCollectionTheDayBefore}
          buildingCollectionFinish={buildingCollection}
        />
      </DiffLegendContainer>
    </Figure>
  );
};
