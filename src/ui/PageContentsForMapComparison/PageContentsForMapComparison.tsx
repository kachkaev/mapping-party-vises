import * as React from "react";
import styled from "styled-components";

import {
  FeatureCollectionWithBuildings,
  FeatureCollectionWithMappingCake,
  TerritoryExtent,
} from "../../shared/types";
import { ExternalLink } from "../shared/ExternalLink";
import { DiffLegend } from "./DiffLegend";
import { GeoMap } from "./GeoMap";

const Figure = styled.div`
  padding: 10px 20px;
  box-shadow: 2px 2px 10px #ddd;
  display: inline-block;
`;

const FigureContent = styled.div`
  position: relative;
`;

const StyledExternalLink = styled(ExternalLink)`
  color: inherit;
`;

const Title = styled.h1`
  font-weight: normal;
  font-size: 2em;
  text-align: left;
  line-height: 1.2em;
  margin: 0;
`;

const Subtitle = styled.div``;

const GeoMaps = styled.div`
  white-space: nowrap;
  padding-top: 20px;
  padding-bottom: 40px;
`;

const GeoMapWrapper = styled.div`
  width: 475px;
  display: inline-block;
  white-space: nowrap;

  & + & {
    padding-left: 50px;
  }
`;

const GeoMapTitle = styled.div`
  font-weight: 500;
  text-align: center;
  padding-left: 10%;
  padding-top: 1em;
  margin-bottom: -0.5em;
`;

const StyledGeoMap = styled(GeoMap)`
  width: 100%;
  aspect-ratio: 1.2;
`;

const DiffLegendContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 52%;
`;

const StyledDiffLegend = styled(DiffLegend)`
  position: relative;
  left: -50%;
`;

const Copyright = styled.div`
  opacity: 0.5;
  position: absolute;
  bottom: 0;
`;

export interface PageContentsForMapComparisonProps {
  buildingCollectionStart: FeatureCollectionWithBuildings;
  buildingCollectionFinish: FeatureCollectionWithBuildings;
  mappingCake: FeatureCollectionWithMappingCake;
  territoryExtent: TerritoryExtent;
}

export const PageContentsForMapComparison: React.VoidFunctionComponent<PageContentsForMapComparisonProps> = ({
  territoryExtent,
  mappingCake,
  buildingCollectionStart,
  buildingCollectionFinish,
}) => {
  return (
    <Figure>
      <FigureContent>
        <Title>Домашняя картовечеринка в Пензе, Заречном и Спутнике</Title>
        <Subtitle>
          <StyledExternalLink href="https://wiki.osm.org/wiki/RU:Пенза/встречи" />{" "}
          {/* &nbsp; <StyledExternalLink href="https://t.me/osm_pnz" /> */}
        </Subtitle>
        <GeoMaps>
          <GeoMapWrapper>
            <GeoMapTitle>старт: 2021-02-20</GeoMapTitle>
            <StyledGeoMap
              buildingCollection={buildingCollectionStart}
              territoryExtent={territoryExtent}
              mappingCake={mappingCake}
            />
          </GeoMapWrapper>
          <GeoMapWrapper>
            <GeoMapTitle>финиш: 2021-03-31</GeoMapTitle>
            <StyledGeoMap
              buildingCollection={buildingCollectionFinish}
              territoryExtent={territoryExtent}
              mappingCake={mappingCake}
            />
          </GeoMapWrapper>
        </GeoMaps>
        <DiffLegendContainer>
          <StyledDiffLegend
            buildingCollectionStart={buildingCollectionStart}
            buildingCollectionFinish={buildingCollectionFinish}
          />
        </DiffLegendContainer>
        <Copyright>
          данные карты
          <br />© участники <StyledExternalLink href="https://osm.org" /> (ODbL)
          <br />
          визуализация
          <br />
          Александр Качкаев —
          <StyledExternalLink href="https://kachkaev.ru" />
        </Copyright>
      </FigureContent>
    </Figure>
  );
};
