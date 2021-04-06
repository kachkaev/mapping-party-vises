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
import { LegendForMapSnapshot } from "./LegendForMapSnapshot";

const size = 720;

const GeoMaps = styled.div`
  white-space: nowrap;
  padding-top: 20px;
`;

const GeoMapTitle = styled.div`
  font-size: 3.3em;
  font-variant-numeric: tabular-nums;
  line-height: 1.3em;
  position: absolute;
  text-align: left;
  bottom: 105px;
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

const StyledLegend = styled(LegendForMapSnapshot)`
  position: absolute;
  left: 0;
  bottom: 0;
`;

export interface FigureWithMapSnapshotProps {
  buildingCollection: FeatureCollectionWithBuildings;
  buildingCollectionTheDayBefore?: FeatureCollectionWithBuildings;
  mappingCake: FeatureCollectionWithMappingCake;
  territoryExtent: TerritoryExtent;
  date: string;
}

export const FigureWithMapSnapshot: React.VoidFunctionComponent<FigureWithMapSnapshotProps> = ({
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
    <Figure width={size} height={size - 20}>
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
      <StyledLegend
        buildingCollectionDayBefore={buildingCollectionTheDayBefore}
        buildingCollection={buildingCollection}
      />
    </Figure>
  );
};
