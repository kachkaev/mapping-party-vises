import { Grid } from "@visx/grid";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { curveLinear } from "d3-shape";
import { parseISO } from "date-fns";
import * as React from "react";
import styled from "styled-components";

import {
  addressStatuses,
  mapAddressStatusToColor,
} from "../../shared/helpersForAddresses";
import {
  getFinishDate,
  getStartDate,
  parseDateTime,
  shiftDate,
} from "../../shared/helpersForDates";
import { TimelineSummary } from "../../shared/types";
import { Figure } from "../shared/Figure";

const AnnotationColumn = styled.div`
  font-size: 3.3em;
  font-variant-numeric: tabular-nums;
  line-height: 1.3em;
  position: absolute;
  text-align: left;
  bottom: 105px;
`;

const Chart = styled.svg`
  font-size: 3.3em;
  font-variant-numeric: tabular-nums;
  line-height: 1.3em;
  position: absolute;
  text-align: left;
  bottom: 105px;
`;

export interface FigureWithTimelineProps {
  timelineSummaries: TimelineSummary[];
}

export const FigureWithTimeline: React.VoidFunctionComponent<FigureWithTimelineProps> = ({
  timelineSummaries,
}) => {
  const chartWidth = 500;
  const chartHeight = 400;
  const chartMargin = {
    left: 40,
    right: 0,
    top: 0,
    bottom: 40,
  };
  const chartOuterWidth = chartWidth + chartMargin.left + chartMargin.right;
  const chartOuterHeight = chartHeight + chartMargin.top + chartMargin.bottom;

  const xScale = scaleTime<number>({
    domain: [
      parseDateTime(getStartDate()),
      parseDateTime(shiftDate(getFinishDate(), 1)),
    ],
    range: [0, chartWidth],
  });

  const yScale = scaleLinear<number>({
    domain: [0, 30000],
    range: [chartHeight, 0],
  });

  return (
    <Figure width={800} height={600}>
      <AnnotationColumn>hello {timelineSummaries.length}</AnnotationColumn>
      <Chart width={chartOuterWidth} height={chartOuterHeight}>
        <defs>
          <clipPath id="grid">
            <rect x={0} y={0} width={chartWidth} height={chartWidth} />
          </clipPath>
        </defs>
        <g transform={`translate(${chartMargin.left},${chartMargin.top})`}>
          <Grid
            xScale={xScale}
            yScale={yScale}
            width={chartWidth}
            height={chartHeight}
            numTicksRows={10}
            numTicksColumns={20}
            rowLineStyle={{
              stroke: "#ccc",
              strokeDasharray: "1 3",
            }}
            columnLineStyle={{
              stroke: "#ccc",
              strokeDasharray: "1 3",
            }}
          />
          {[...addressStatuses].reverse().map((addressStatus) => (
            <LinePath<TimelineSummary>
              clipPath="url(#grid)"
              key={addressStatus}
              curve={curveLinear}
              data={timelineSummaries}
              x={(d) => xScale(parseISO(d.knownAt))}
              y={(d) => yScale(d.buildingCountByAddressStatus[addressStatus])}
              stroke={mapAddressStatusToColor(addressStatus)}
              strokeWidth={2}
              strokeOpacity={1}
              shapeRendering="geometricPrecision"
            />
          ))}
        </g>
      </Chart>
    </Figure>
  );
};
