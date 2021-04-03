import * as React from "react";
import styled from "styled-components";

import {
  FeatureCollectionWithBuildings,
  FeatureCollectionWithMappingCake,
  TerritoryExtent,
} from "../../shared/types";
import { ExternalLink } from "../shared/ExternalLink";
import { GeoMap } from "./GeoMap";

const GeoMaps = styled.div`
  white-space: nowrap;
`;

const StyledGeoMap = styled(GeoMap)`
  display: inline-block;
`;

export interface PageContentsForBeforeAfterProps {
  buildingCollectionBefore: FeatureCollectionWithBuildings;
  buildingCollectionAfter: FeatureCollectionWithBuildings;
  mappingCake: FeatureCollectionWithMappingCake;
  territoryExtent: TerritoryExtent;
}

export const PageContentsForBeforeAfter: React.VoidFunctionComponent<PageContentsForBeforeAfterProps> = ({
  territoryExtent,
  mappingCake,
  buildingCollectionBefore,
  buildingCollectionAfter,
}) => {
  return (
    <>
      <GeoMaps>
        <StyledGeoMap
          buildingCollection={buildingCollectionBefore}
          territoryExtent={territoryExtent}
          mappingCake={mappingCake}
        />
        <StyledGeoMap
          buildingCollection={buildingCollectionAfter}
          territoryExtent={territoryExtent}
          mappingCake={mappingCake}
        />
        <div>
          <ExternalLink href="https://github.com/kachkaev/mapping-party-vizes" />
        </div>
      </GeoMaps>
    </>
  );
};
