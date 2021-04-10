import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import * as React from "react";

import {
  obtainFeatureCollectionWithBuildings,
  obtainFeatureCollectionWithMappingCake,
  obtainFeatureWithTerritoryExtent,
  obtainTimelineSummaries,
} from "../../shared/data";
import {
  getFinishDate,
  isOnMappingParty,
  shiftDate,
} from "../../shared/helpersForDates";
import { FigureWithMapSnapshotProps } from "../../ui/FigureWithMapSnapshot";
import { PageMetadata } from "../../ui/PageMetadata";

const PageContentsForMapSnapshot = dynamic<FigureWithMapSnapshotProps>(
  import("../../ui/FigureWithMapSnapshot").then((m) => m.FigureWithMapSnapshot),
  { ssr: false },
);

type MapSnapshotPageProps = FigureWithMapSnapshotProps;

const MapSnapshotPage: NextPage<MapSnapshotPageProps> = (props) => {
  return (
    <>
      <PageMetadata />
      <PageContentsForMapSnapshot {...props} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps<
  MapSnapshotPageProps,
  {
    date?: string;
  }
> = async ({ params: { date = "unknown" } = {} }) => {
  const tweakedDate =
    shiftDate(date, -1) === getFinishDate() ? shiftDate(date, -1) : date;

  const props: MapSnapshotPageProps = {
    date,
    buildingCollection: await obtainFeatureCollectionWithBuildings(tweakedDate),
    mappingCake: await obtainFeatureCollectionWithMappingCake(),
    territoryExtent: await obtainFeatureWithTerritoryExtent(),
  };

  if (isOnMappingParty(date)) {
    props.buildingCollectionTheDayBefore = await obtainFeatureCollectionWithBuildings(
      shiftDate(date, -1),
    );
  }

  if (isOnMappingParty(date) || isOnMappingParty(shiftDate(date, -1))) {
    props.timelineSummaries = await obtainTimelineSummaries();
  }

  return {
    props,
  };
};

export default MapSnapshotPage;
