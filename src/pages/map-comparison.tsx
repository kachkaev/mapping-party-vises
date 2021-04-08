import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import * as React from "react";

import { getFeatureCollectionWithBuildings } from "../shared/getFeatureCollectionWithBuildings";
import { getFeatureWithTerritoryExtent } from "../shared/getFeatureWithTerritoryExtent";
import { FigureWithMapComparisonProps } from "../ui/FigureWithMapComparison";
import { PageMetadata } from "../ui/PageMetadata";

const PageContentsForMapComparison = dynamic<FigureWithMapComparisonProps>(
  import("../ui/FigureWithMapComparison").then(
    (m) => m.FigureWithMapComparison,
  ),
  { ssr: false },
);

type MapComparisonPageProps = FigureWithMapComparisonProps;

const MapComparisonPage: NextPage<MapComparisonPageProps> = (props) => {
  return (
    <>
      <PageMetadata />
      <PageContentsForMapComparison {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<MapComparisonPageProps> = async () => {
  return {
    props: {
      buildingCollectionStart: await getFeatureCollectionWithBuildings(
        process.env.NEXT_PUBLIC_MAPPING_PARTY_DATE_START ?? "unset",
      ),
      buildingCollectionFinish: await getFeatureCollectionWithBuildings(
        process.env.NEXT_PUBLIC_MAPPING_PARTY_DATE_FINISH ?? "unset",
      ),
      territoryExtent: await getFeatureWithTerritoryExtent(),
    },
  };
};

export default MapComparisonPage;
