import { curveLinear } from "@visx/curve";
import { scaleLinear, scaleTime } from "@visx/scale";
import { LinePath } from "@visx/shape";
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

const Wrapper = styled.div``;

const Svg = styled.svg`
  border: 1px solid #ccc;
  border-top: none;
`;

const AxisLabels = styled.div`
  opacity: 0.5;
  margin-top: -2px;
  display: flex;
  margin-right: -1.5px;
  justify-content: space-between;
`;

export interface MiniTimelineProps
  extends React.HTMLAttributes<HTMLDivElement> {
  timelineSummaries: TimelineSummary[];
  activeDate?: string;
  dateToHighlight?: string;
}

export const MiniTimeline: React.VoidFunctionComponent<MiniTimelineProps> = ({
  timelineSummaries,
  dateToHighlight,
  ...rest
}) => {
  const width = 180;
  const height = (180 / 4) * 3 - 10;

  const xScale = scaleTime<number>({
    domain: [
      parseDateTime(getStartDate()),
      parseDateTime(shiftDate(getFinishDate(), 1)),
    ],
    range: [0, width],
  });

  const yScale = scaleLinear<number>({
    domain: [0, 30000],
    range: [height, 0],
  });

  let modes = [
    {
      maskId: "all",
      maskX: 0,
      maskY: 0,
      maskWidth: width,
      maskHeight: height,
      opacity: 1,
      strokeWidth: 1.5,
    },
  ];

  if (dateToHighlight) {
    modes = [
      {
        maskId: "head",
        maskX: xScale(parseDateTime(dateToHighlight)),
        maskY: 0,
        maskWidth: width - xScale(parseDateTime(dateToHighlight)),
        maskHeight: height,
        opacity: 0.2,
        strokeWidth: 1,
      },
      {
        maskId: "tail",
        maskX: 0,
        maskY: 0,
        maskWidth: xScale(parseDateTime(shiftDate(dateToHighlight, 1))),
        maskHeight: height,
        opacity: 1,
        strokeWidth: 1.5,
      },
      {
        maskId: "currentDate",
        maskX: xScale(parseDateTime(dateToHighlight)),
        maskY: 0,
        maskWidth:
          xScale(parseDateTime(shiftDate(dateToHighlight, 1))) -
          xScale(parseDateTime(dateToHighlight)),
        maskHeight: height,
        opacity: 1,
        strokeWidth: 1.5,
      },
    ];
  }

  return (
    <Wrapper {...rest}>
      <Svg width={width} height={height}>
        <defs>
          {modes.map((mode) => (
            <clipPath key={mode.maskId} id={mode.maskId}>
              <rect
                x={mode.maskX}
                y={mode.maskY}
                width={mode.maskWidth}
                height={mode.maskHeight}
              />
            </clipPath>
          ))}
        </defs>
        {modes.map((mode) => (
          <g
            clipPath={`url(#${mode.maskId})`}
            key={mode.maskId}
            opacity={mode.opacity}
          >
            {[...addressStatuses].reverse().map((addressStatus) => (
              <LinePath<TimelineSummary>
                key={addressStatus}
                curve={curveLinear}
                data={timelineSummaries}
                x={(d) => xScale(parseISO(d.knownAt))}
                y={(d) => yScale(d.buildingCountByAddressStatus[addressStatus])}
                stroke={mapAddressStatusToColor(addressStatus)}
                strokeWidth={mode.strokeWidth}
                strokeOpacity={1}
                shapeRendering="geometricPrecision"
              />
            ))}
          </g>
        ))}
      </Svg>
      <AxisLabels>
        <span>{process.env.NEXT_PUBLIC_MAPPING_PARTY_DATE_START}</span>
        <span>{process.env.NEXT_PUBLIC_MAPPING_PARTY_DATE_FINISH}</span>
      </AxisLabels>
    </Wrapper>
  );
};
