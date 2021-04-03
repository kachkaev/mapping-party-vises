import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import * as React from "react";

import { getFeatureCollectionWithBuildings } from "../shared/getFeatureCollectionWithBuildings";
import { getFeatureCollectionWithMappingCake } from "../shared/getFeatureCollectionWithMappingCake";
import { getFeatureWithTerritoryExtent } from "../shared/getFeatureWithTerritoryExtent";
import {
  // PageContentsForBeforeAfter,
  PageContentsForBeforeAfterProps,
} from "../ui/PageContentsForBeforeAfter";
import { PageMetadata } from "../ui/PageMetadata";

const PageContentsForBeforeAfter = dynamic<PageContentsForBeforeAfterProps>(
  import("../ui/PageContentsForBeforeAfter").then(
    (m) => m.PageContentsForBeforeAfter,
  ),
  { ssr: false },
);

type BeforeAfterPageProps = PageContentsForBeforeAfterProps;

const BeforeAfterPage: NextPage<BeforeAfterPageProps> = (props) => {
  return (
    <>
      <PageMetadata />
      <PageContentsForBeforeAfter {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<BeforeAfterPageProps> = async () => {
  return {
    props: {
      buildingCollectionBefore: await getFeatureCollectionWithBuildings(
        "before",
      ),
      buildingCollectionAfter: await getFeatureCollectionWithBuildings("after"),
      mappingCake: await getFeatureCollectionWithMappingCake(),
      territoryExtent: await getFeatureWithTerritoryExtent(),
    },
  };
};

export default BeforeAfterPage;
