import { AxisBottom, AxisLeft } from "@visx/axis";
import { Grid } from "@visx/grid";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { curveLinear } from "d3-shape";
import { differenceInCalendarDays, getDay, parseISO } from "date-fns";
import { DateTime } from "luxon";
import * as React from "react";
import styled from "styled-components";

import {
  addressStatuses,
  mapAddressStatusToColor,
} from "../../shared/helpersForAddresses";
import {
  getFinishDate,
  getStartDate,
  getTimeZone,
  parseDateTime,
  shiftDate,
} from "../../shared/helpersForDates";
import { TimelineSummary } from "../../shared/types";
import { ExternalLink } from "../shared/ExternalLink";
import { Figure } from "../shared/Figure";

const extraMarginLeft = 5;
const extraMarginTop = 30;

const ChartSvg = styled.svg`
  position: absolute;
  left: ${extraMarginLeft}px;
  top: ${extraMarginTop}px;
`;

const StyledExternalLink = styled(ExternalLink)`
  color: inherit;
`;

const Context = styled.div`
  position: absolute;
  left: ${33 + extraMarginLeft}px;
  bottom: ${67 - extraMarginTop}px;
  background: white;

  & > * {
    opacity: 0.3;
  }
`;

const gridColor = "#e5e5e5";
const axisStrokeColor = "#aaa";

export interface FigureWithTimelineExtensionProps {
  timelineSummaries: TimelineSummary[];
}

export const FigureWithTimelineExtension: React.VoidFunctionComponent<FigureWithTimelineExtensionProps> = ({
  timelineSummaries,
}) => {
  // I refetched the data too often on 10 April, so the chart got a bit zigzagy. Skipping two data points helps healing this.
  const filteredTimelineSummaries = timelineSummaries.filter(
    ({ knownAt }) =>
      knownAt !== "2021-04-10T13:45:19Z" && knownAt !== "2021-04-10T18:32:35Z",
  );

  const timeStart = parseDateTime(getStartDate());
  const timeEnd = parseDateTime(shiftDate(getFinishDate(), 1));

  const startsOfDay: Date[] = [];
  const startsOfWeek: Date[] = [];

  // Can’t use addDays() because Date does not support timezones
  let time = timeStart;
  let i = 0;
  while (time <= timeEnd) {
    startsOfDay.push(time);
    if (getDay(time) === 0) {
      startsOfWeek.push(time);
    }
    time = parseDateTime(shiftDate(getStartDate(), i));
    i += 1;
  }

  const yRangeInThousands = 30;
  const xRangeInDays = differenceInCalendarDays(timeEnd, timeStart);
  const chartGridWidth = xRangeInDays * 12;
  const chartGridHeight = yRangeInThousands * 12;
  const chartMargin = {
    left: 30,
    right: 130,
    top: 50,
    bottom: 50,
  };
  const chartSvgWidth = chartGridWidth + chartMargin.left + chartMargin.right;
  const chartSvgHeight = chartGridHeight + chartMargin.top + chartMargin.bottom;

  const xScale = scaleTime<number>({
    domain: [timeStart, timeEnd],
    range: [0, chartGridWidth],
  });

  const yScale = scaleLinear<number>({
    domain: [0, 30000],
    range: [chartGridHeight, 0],
  });

  return (
    <Figure width={700} height={500} header={null}>
      <ChartSvg width={chartSvgWidth} height={chartSvgHeight}>
        <defs>
          <clipPath id="lineClip">
            <rect
              x={0}
              y={-chartMargin.top}
              width={chartGridWidth + chartMargin.right}
              height={chartGridWidth + chartMargin.top}
            />
          </clipPath>
        </defs>
        <g transform={`translate(${chartMargin.left},${chartMargin.top})`}>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={chartGridWidth}
            height={chartGridHeight}
            numTicksRows={yRangeInThousands}
            columnTickValues={startsOfDay}
            rowLineStyle={{
              stroke: gridColor,
              strokeDasharray: "1 2",
              strokeDashoffset: 0.5,
            }}
            columnLineStyle={{
              stroke: gridColor,
              strokeDasharray: "1 2",
              strokeDashoffset: 0.5,
            }}
          />
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={chartGridWidth}
            height={chartGridHeight}
            numTicksRows={yRangeInThousands / 5}
            columnTickValues={[...startsOfWeek, timeEnd]}
            rowLineStyle={{
              stroke: gridColor,
              strokeDashoffset: 0.5,
            }}
            columnLineStyle={{
              stroke: gridColor,
              strokeDashoffset: 0.5,
            }}
          />
          {[...addressStatuses].reverse().map((addressStatus) => (
            <LinePath<TimelineSummary>
              clipPath="url(#lineClip)"
              key={addressStatus}
              curve={curveLinear}
              data={filteredTimelineSummaries}
              x={(d) => xScale(parseISO(d.knownAt))}
              y={(d) => yScale(d.buildingCountByAddressStatus[addressStatus])}
              stroke={mapAddressStatusToColor(addressStatus)}
              strokeWidth={2}
              strokeOpacity={1}
              strokeLinejoin="round"
              shapeRendering="geometricPrecision"
            />
          ))}
          <AxisLeft
            stroke={axisStrokeColor}
            tickStroke={axisStrokeColor}
            scale={yScale}
            numTicks={yRangeInThousands / 5}
            tickLength={3}
            tickFormat={(value) =>
              value.valueOf() === 0
                ? "0"
                : `${Math.floor(value.valueOf() / 1000)}K`
            }
            tickLabelProps={() => ({
              transform: "translate(-4 0)",
              textAnchor: "end",
              verticalAnchor: "middle",
            })}
          />
          <AxisBottom
            stroke={axisStrokeColor}
            tickStroke={axisStrokeColor}
            top={chartGridHeight}
            scale={xScale}
            tickValues={startsOfWeek}
            tickLength={3}
            tickFormat={(value) =>
              DateTime.fromMillis(value.valueOf())
                .setZone(getTimeZone())
                .toFormat("dd.MM")
            }
            tickLabelProps={() => ({
              transform: "translate(2 2)",
              textAnchor: "start",
            })}
          />
        </g>
      </ChartSvg>
      <Context>
        <span>
          context: <StyledExternalLink href="https://osmcal.org/event/583" />
        </span>
      </Context>
    </Figure>
  );
};
