import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import * as React from "react";

import { obtainTimelineSummaries } from "../shared/data";
import { FigureWithTimelineProps } from "../ui/FigureWithTimeline";
import { PageMetadata } from "../ui/PageMetadata";

const PageContentsForMapComparison = dynamic<FigureWithTimelineProps>(
  import("../ui/FigureWithTimeline").then((m) => m.FigureWithTimeline),
  { ssr: false },
);

type TimelineProps = FigureWithTimelineProps;

const TimelinePage: NextPage<TimelineProps> = (props) => {
  return (
    <>
      <PageMetadata />
      <PageContentsForMapComparison {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<TimelineProps> = async () => {
  return {
    props: {
      timelineSummaries: await obtainTimelineSummaries(),
    },
  };
};

export default TimelinePage;
