import { format, parse, subDays } from "date-fns";
import { GetServerSideProps, NextPage } from "next";
import dynamic from "next/dynamic";
import * as React from "react";

import { getFeatureCollectionWithBuildings } from "../../shared/getFeatureCollectionWithBuildings";
import { getFeatureCollectionWithMappingCake } from "../../shared/getFeatureCollectionWithMappingCake";
import { getFeatureWithTerritoryExtent } from "../../shared/getFeatureWithTerritoryExtent";
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

const isBeforeMappingParty = (date: string) => date < "2021-02-20";

const getDayBefore = (date: string): string => {
  const parsedDate = parse(date, "yyyy-MM-dd", new Date());

  return format(subDays(parsedDate, 1), "yyyy-MM-dd");
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

  if (!isBeforeMappingParty(date)) {
    props.buildingCollectionTheDayBefore = await getFeatureCollectionWithBuildings(
      getDayBefore(date),
    );
  }

  return {
    props,
  };
};

export default MapSnapshotPage;
