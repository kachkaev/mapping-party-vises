import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import * as React from "react";

import {
  obtainFeatureCollectionWithBuildings,
  obtainFeatureCollectionWithMappingCake,
  obtainFeatureWithTerritoryExtent,
} from "../shared/data";
import {
  getFinishDate,
  getStartDate,
  shiftDate,
} from "../shared/helpersForDates";
import { FigureWithMapDiffProps } from "../ui/FigureWithMapDiff";
import { PageMetadata } from "../ui/PageMetadata";

const PageContentsForMapDiff = dynamic<FigureWithMapDiffProps>(
  import("../ui/FigureWithMapDiff").then((m) => m.FigureWithMapDiff),
  { ssr: false },
);

type MapDiffPageProps = FigureWithMapDiffProps;

const MapDiffPage: NextPage<MapDiffPageProps> = (props) => {
  return (
    <>
      <PageMetadata />
      <PageContentsForMapDiff {...props} />
    </>
  );
};

export const getStaticProps: GetStaticProps<MapDiffPageProps> = async () => {
  return {
    props: {
      buildingCollectionStart: await obtainFeatureCollectionWithBuildings(
        shiftDate(getStartDate(), -1),
      ),
      buildingCollectionFinish: await obtainFeatureCollectionWithBuildings(
        getFinishDate(),
      ),
      territoryExtent: await obtainFeatureWithTerritoryExtent(),
      mappingCake: await obtainFeatureCollectionWithMappingCake(),
    },
  };
};

export default MapDiffPage;
