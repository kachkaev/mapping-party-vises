import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";
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
  font-size: 4em;
  line-height: 1.3em;
  position: absolute;
  text-align: left;
  bottom: 90px;
`;

const GeoMapTitleDayOfWeek = styled.span`
  display: block;
  opacity: 34%;
  font-size: 2rem;
  line-height: 1rem;
`;

const GeoMapTitleDate = styled.span`
  opacity: 30%;
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
  left: 0;
  bottom: 0;
`;

const StyledDiffLegend = styled(DiffLegend)`
  position: relative;
`;

export interface PageContentsForMapSnapshotProps {
  buildingCollection: FeatureCollectionWithBuildings;
  buildingCollectionTheDayBefore?: FeatureCollectionWithBuildings;
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
  const dayOfWeek = React.useMemo(() => {
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());

    return format(parsedDate, "eeeeee", { locale: ru });
  }, [date]);

  return (
    <Figure width={size} height={size}>
      <GeoMapTitle>
        <GeoMapTitleDayOfWeek>{dayOfWeek}</GeoMapTitleDayOfWeek>{" "}
        <GeoMapTitleDate>{date}</GeoMapTitleDate>
      </GeoMapTitle>
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
          buildingCollectionStart={
            buildingCollectionTheDayBefore ?? buildingCollection
          }
          buildingCollectionFinish={buildingCollection}
        />
      </DiffLegendContainer>
    </Figure>
  );
};
