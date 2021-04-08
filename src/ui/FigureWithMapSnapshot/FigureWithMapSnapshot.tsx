import { format, parse } from "date-fns";
import { ru } from "date-fns/locale";
import * as React from "react";
import styled from "styled-components";

import {
  FeatureCollectionWithBuildings,
  FeatureCollectionWithMappingCake,
  TerritoryExtent,
  TimelineSummary,
} from "../../shared/types";
import { Figure } from "../shared/Figure";
import { GeoMap } from "../shared/GeoMap";
import { LegendForMapSnapshot } from "./LegendForMapSnapshot";
import { MiniTimeline } from "./MiniTimeline";

const size = 750;

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
  margin: 25px auto 0;
  left: -7px;
  width: ${size - 30}px;
  height: ${(size - 30) / 1.2}px;
  /* aspect-ratio: 1.2; */
  /* ↑ not supported by ff */
`;

const StyledLegend = styled(LegendForMapSnapshot)`
  position: absolute;
  left: 0;
  bottom: 0;
`;

const StyledMiniTimeline = styled(MiniTimeline)`
  position: absolute;
  right: 0;
  bottom: 0;
`;

export interface FigureWithMapSnapshotProps {
  buildingCollection: FeatureCollectionWithBuildings;
  buildingCollectionTheDayBefore?: FeatureCollectionWithBuildings;
  mappingCake: FeatureCollectionWithMappingCake;
  territoryExtent: TerritoryExtent;
  timelineSummaries?: TimelineSummary[];
  date: string;
}

export const FigureWithMapSnapshot: React.VoidFunctionComponent<FigureWithMapSnapshotProps> = ({
  territoryExtent,
  mappingCake,
  buildingCollection,
  buildingCollectionTheDayBefore,
  timelineSummaries,
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
      <StyledGeoMap
        padding={12}
        buildingCollection={buildingCollection}
        territoryExtent={territoryExtent}
        mappingCake={mappingCake}
      />
      <StyledLegend
        buildingCollectionDayBefore={buildingCollectionTheDayBefore}
        buildingCollection={buildingCollection}
      />
      {timelineSummaries ? (
        <StyledMiniTimeline timelineSummaries={timelineSummaries} />
      ) : null}
    </Figure>
  );
};
