import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import * as React from "react";

import { getFeatureCollectionWithBuildings } from "../../shared/getFeatureCollectionWithBuildings";
import { getFeatureCollectionWithMappingCake } from "../../shared/getFeatureCollectionWithMappingCake";
import { getFeatureWithTerritoryExtent } from "../../shared/getFeatureWithTerritoryExtent";
import { isOnMappingParty, shiftDate } from "../../shared/helpersForDates";
import { PageContentsForMapSnapshotProps } from "../../ui/PageContentsForMapSnapshot";
import { PageMetadata } from "../../ui/PageMetadata";

const PageContentsForMapSnapshot = dynamic<PageContentsForMapSnapshotProps>(
  import("../../ui/PageContentsForMapSnapshot").then(
    (m) => m.PageContentsForMapSnapshot,
  ),
  { ssr: false },
);

type MapSnapshotPageProps = PageContentsForMapSnapshotProps;

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
  const props: MapSnapshotPageProps = {
    date,
    buildingCollection: await getFeatureCollectionWithBuildings(date),
    mappingCake: await getFeatureCollectionWithMappingCake(),
    territoryExtent: await getFeatureWithTerritoryExtent(),
  };

  if (isOnMappingParty(date)) {
    props.buildingCollectionTheDayBefore = await getFeatureCollectionWithBuildings(
      shiftDate(date, -1),
    );
  }

  return {
    props,
  };
};

export default MapSnapshotPage;
