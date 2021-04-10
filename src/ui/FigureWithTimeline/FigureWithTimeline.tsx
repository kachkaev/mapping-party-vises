import { AxisBottom, AxisLeft } from "@visx/axis";
import { Grid } from "@visx/grid";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath } from "@visx/shape";
import { curveLinear } from "d3-shape";
import { differenceInCalendarDays, getDay, parseISO } from "date-fns";
import { DateTime } from "luxon";
import { useRouter } from "next/dist/client/router";
import * as React from "react";
import styled from "styled-components";

import {
  addressStatuses,
  buildingTypesWithOptionalAddress,
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
import { Figure } from "../shared/Figure";
import { AddressSymbol, getAddressStatusName } from "../shared/legend";

const AnnotationColumn = styled.div`
  width: 15em;
  position: absolute;
  top: 70px;
  left: 0;
`;

const AnnotationSection = styled.div`
  & + & {
    padding-top: 1.15em;
  }
`;

const BuildingType = styled.span`
  display: block;
  margin-left: 1em;
`;

const StyledAddressSymbol = styled(AddressSymbol)`
  display: inline-block !important;
`;

const ChartSvg = styled.svg`
  position: absolute;
  right: 0;
  top: 70px;
`;

const gridColor = "#e5e5e5";
const axisStrokeColor = "#aaa";

const buildingTypesToDisplay = buildingTypesWithOptionalAddress;
// .map((type) => {
//   if (type === "garage") {
//     return "garage(s)";
//   }
//   if (type === "garages") {
//     return null;
//   }

//   return type;
// })
// .filter((type) => type);

export interface FigureWithTimelineProps {
  timelineSummaries: TimelineSummary[];
}

export const FigureWithTimeline: React.VoidFunctionComponent<FigureWithTimelineProps> = ({
  timelineSummaries,
}) => {
  const { locale } = useRouter();
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
  const chartGridWidth = xRangeInDays * 15;
  const chartGridHeight = yRangeInThousands * 15;
  const chartMargin = {
    left: 40,
    right: 1,
    top: 7,
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
    <Figure width={850} height={600}>
      <AnnotationColumn>
        <AnnotationSection>
          <div>
            {locale === "ru" ? "Количество зданий" : "Number of buildings"}
          </div>
          {addressStatuses.map((addressStatus) => (
            <div key={addressStatus}>
              <StyledAddressSymbol addressStatus={addressStatus} />
              {getAddressStatusName(addressStatus, locale)}{" "}
            </div>
          ))}
        </AnnotationSection>
        <AnnotationSection>
          {locale === "ru" ? (
            <>
              В первую категорию попали здания, у&nbsp;которых указаны
              и&nbsp;улица, и&nbsp;номер дома.
            </>
          ) : (
            <>
              First category includes buildings&nbsp;with both street
              name&nbsp;and house number.
            </>
          )}
        </AnnotationSection>
        <AnnotationSection>
          {locale === "ru" ? (
            <>
              Адрес считается условно необязательным у зданий с&nbsp;тегом
              abandoned или
              <br />
              с&nbsp;тегом building =
            </>
          ) : (
            <>
              The address is considered to&nbsp;be&nbsp;optional for abandoned
              buildings and those tagged as building =
            </>
          )}
          {buildingTypesToDisplay.map((type) => (
            <BuildingType key={type}>{type}</BuildingType>
          ))}
        </AnnotationSection>
      </AnnotationColumn>
      <ChartSvg width={chartSvgWidth} height={chartSvgHeight}>
        <defs>
          <clipPath id="grid">
            <rect x={0} y={0} width={chartGridWidth} height={chartGridWidth} />
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
              clipPath="url(#grid)"
              key={addressStatus}
              curve={curveLinear}
              data={timelineSummaries}
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
            label={
              locale === "ru"
                ? "февраль – март 2021 года, часовой пояс MSK (UTC+3)"
                : "February – March 2021, Moscow time (UTC+3)"
            }
            labelProps={{
              textAnchor: "middle",
              y: 42,
            }}
          />
        </g>
      </ChartSvg>
    </Figure>
  );
};
