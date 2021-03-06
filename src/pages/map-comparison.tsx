import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import * as React from "react";

import {
  obtainFeatureCollectionWithBuildings,
  obtainFeatureWithTerritoryExtent,
} from "../shared/data";
import {
  getFinishDate,
  getStartDate,
  shiftDate,
} from "../shared/helpersForDates";
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
      buildingCollectionStart: await obtainFeatureCollectionWithBuildings(
        shiftDate(getStartDate(), -1),
      ),
      buildingCollectionFinish: await obtainFeatureCollectionWithBuildings(
        getFinishDate(),
      ),
      territoryExtent: await obtainFeatureWithTerritoryExtent(),
    },
  };
};

export default MapComparisonPage;
