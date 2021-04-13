import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import * as React from "react";

import { obtainTimelineSummaries } from "../shared/data";
import { FigureWithTimelineExtensionProps } from "../ui/FigureWithTimelineExtension";
import { PageMetadata } from "../ui/PageMetadata";

const PageContentsForMapComparison = dynamic<FigureWithTimelineExtensionProps>(
  import("../ui/FigureWithTimelineExtension").then(
    (m) => m.FigureWithTimelineExtension,
  ),
  { ssr: false },
);

type TimelineExtensionProps = FigureWithTimelineExtensionProps;

const TimelineExtensionPage: NextPage<TimelineExtensionProps> = (props) => {
  return (
    <>
      <PageMetadata />
      <PageContentsForMapComparison {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<TimelineExtensionProps> = async () => {
  return {
    props: {
      timelineSummaries: await obtainTimelineSummaries(),
    },
  };
};

export default TimelineExtensionPage;
