import { GetStaticProps, NextPage } from "next";
import * as React from "react";

import { getFeatureCollectionWithBuildings } from "../shared/getFeatureCollectionWithBuildings";
import { getFeatureCollectionWithMappingCake } from "../shared/getFeatureCollectionWithMappingCake";
import { getFeatureWithTerritoryExtent } from "../shared/getFeatureWithTerritoryExtent";
import {
  FeatureCollectionWithBuildings,
  FeatureCollectionWithMappingCake,
  TerritoryExtent,
} from "../shared/types";
import { PageContentsForBeforeAfter } from "../ui/PageContentsForBeforeAfter";
import { PageMetadata } from "../ui/PageMetadata";

interface BeforeAfterPageProps {
  buildingCollectionBefore: FeatureCollectionWithBuildings;
  buildingCollectionAfter: FeatureCollectionWithBuildings;
  mappingCake: FeatureCollectionWithMappingCake;
  territoryExtent: TerritoryExtent;
}

const BeforeAfterPage: NextPage<BeforeAfterPageProps> = ({
  buildingCollectionBefore,
  buildingCollectionAfter,
}) => {
  return (
    <>
      <PageMetadata />
      <PageContentsForBeforeAfter />
      {buildingCollectionBefore.features.length}
      <br />
      {buildingCollectionAfter.features.length}
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
