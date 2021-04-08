import * as React from "react";
import styled from "styled-components";

import { TimelineSummary } from "../../shared/types";

const Wrapper = styled.div`
  border: 1px solid #00000020;
  border-top: none;
  width: 180px;
  height: 100px;
`;

export interface MiniTimelineProps
  extends React.HTMLAttributes<HTMLDivElement> {
  timelineSummaries: TimelineSummary[];
  activeDate?: string;
}

export const MiniTimeline: React.VoidFunctionComponent<MiniTimelineProps> = ({
  timelineSummaries,
  ...rest
}) => {
  return <Wrapper {...rest}>{timelineSummaries.length}</Wrapper>;
};
