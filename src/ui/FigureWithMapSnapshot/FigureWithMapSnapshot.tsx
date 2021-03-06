import { format, parse } from "date-fns";
import { enGB, ru } from "date-fns/locale";
import { useRouter } from "next/dist/client/router";
import * as React from "react";
import styled from "styled-components";

import {
  getFinishDate,
  isOnMappingParty,
  shiftDate,
} from "../../shared/helpersForDates";
import {
  FeatureCollectionWithBuildings,
  FeatureCollectionWithMappingCake,
  TerritoryExtent,
  TimelineSummary,
} from "../../shared/types";
import { Figure } from "../shared/Figure";
import {
  GeoMap,
  GeoMapLayerWithAddressStatuses,
  GeoMapLayerWithMappingCake,
  GeoMapLayerWithTerritoryExtent,
} from "../shared/geoMaps";
import { GeoMapLayerWithChanges } from "./GeoMapLayerWithChanges";
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
  const unrelatedToMappingParty = date > shiftDate(getFinishDate(), 1);
  const { locale } = useRouter();
  const dayOfWeek = React.useMemo(() => {
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());

    // Short format helps reduce cognitive distraction while gif is playing
    const dayOfWeekFormat = !isOnMappingParty(date)
      ? "eeee" // Friday / пятница
      : locale === "ru"
      ? "eeeeee" // пт
      : "eee"; // Fri

    return format(parsedDate, dayOfWeekFormat, {
      locale: locale === "ru" ? ru : enGB,
    });
  }, [date, locale]);

  return (
    <Figure
      width={size}
      height={size}
      unrelatedToMappingParty={unrelatedToMappingParty}
    >
      <GeoMapTitle>
        <GeoMapTitleDayOfWeek>{dayOfWeek}</GeoMapTitleDayOfWeek>{" "}
        <GeoMapTitleDate>{date}</GeoMapTitleDate>
      </GeoMapTitle>
      <StyledGeoMap padding={15} extentToFit={territoryExtent}>
        {(layerProps) => (
          <>
            <GeoMapLayerWithTerritoryExtent
              {...layerProps}
              data={territoryExtent}
            />
            {unrelatedToMappingParty ? null : (
              <GeoMapLayerWithMappingCake {...layerProps} data={mappingCake} />
            )}
            {unrelatedToMappingParty ||
            !buildingCollectionTheDayBefore ? null : (
              <GeoMapLayerWithChanges
                {...layerProps}
                data={buildingCollection}
                prevData={buildingCollectionTheDayBefore}
              />
            )}
            <GeoMapLayerWithAddressStatuses
              {...layerProps}
              data={buildingCollection}
              // sample={5000}
              bufferInMeters={5}
            />
          </>
        )}
      </StyledGeoMap>
      <StyledLegend
        buildingCollectionDayBefore={buildingCollectionTheDayBefore}
        buildingCollection={buildingCollection}
        unrelatedToMappingParty={unrelatedToMappingParty}
      />
      {timelineSummaries ? (
        <StyledMiniTimeline
          timelineSummaries={timelineSummaries}
          dateToHighlight={date}
        />
      ) : null}
    </Figure>
  );
};
