import { useRouter } from "next/dist/client/router";
import * as React from "react";
import styled from "styled-components";

import { FeatureCollectionWithBuildings } from "../../shared/types";
import { ExternalLink } from "../shared/ExternalLink";
import {
  AddressStatusOrAll,
  AddressSummary,
  AddressSymbol,
  Count,
  Delta,
  generateAddressSummary,
  getAddressStatusName,
  LegendRowEl,
  LegendRowGapEl,
  orderedAddressStatuses,
  StatusNameEl,
  SymbolWrapperEl,
} from "../shared/legend";

const StyledExternalLink = styled(ExternalLink)`
  color: inherit;
`;

const StyledStatusName = styled(StatusNameEl)`
  width: 10.8em;
  position: relative;
`;

const MappingCake = styled.span`
  position: absolute;
  white-space: nowrap;
  overflow: visible;
  top: 0;
`;

const MapCakeSymbol = styled.span`
  display: inline-block;
  vertical-align: middle;
  width: 0.6em;
  height: 2px;
  background: #4d75c4;
  opacity: 0.3;
`;

const LegendRow: React.VoidFunctionComponent<{
  summaryDayBefore?: AddressSummary;
  summary: AddressSummary;
  addressStatus: AddressStatusOrAll;
}> = ({ summaryDayBefore, summary, addressStatus }) => {
  const { locale } = useRouter();
  const value = summary[addressStatus];
  const delta = summaryDayBefore
    ? value - summaryDayBefore[addressStatus]
    : undefined;

  return (
    <LegendRowEl>
      <AddressSymbol addressStatus={addressStatus} />
      <StyledStatusName>
        {getAddressStatusName(addressStatus, locale)}{" "}
      </StyledStatusName>
      <Count value={value} />
      {typeof delta === "number" ? <Delta value={delta} /> : null}
    </LegendRowEl>
  );
};

const Wrapper = styled.div`
  display: table;
`;

export interface LegendForMapSnapshotProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  buildingCollectionDayBefore?: FeatureCollectionWithBuildings;
  buildingCollection: FeatureCollectionWithBuildings;
}

export const LegendForMapSnapshot: React.VoidFunctionComponent<LegendForMapSnapshotProps> = ({
  buildingCollectionDayBefore,
  buildingCollection,
  ...rest
}) => {
  const { locale } = useRouter();

  const summaryDayBefore = React.useMemo(
    () =>
      buildingCollectionDayBefore
        ? generateAddressSummary(buildingCollectionDayBefore)
        : undefined,
    [buildingCollectionDayBefore],
  );
  const summary = React.useMemo(
    () => generateAddressSummary(buildingCollection),
    [buildingCollection],
  );

  return (
    <Wrapper {...rest}>
      {orderedAddressStatuses.map((addressStatus) => (
        <LegendRow
          key={addressStatus}
          summaryDayBefore={summaryDayBefore}
          summary={summary}
          addressStatus={addressStatus}
        />
      ))}
      <LegendRowGapEl />
      <LegendRowEl>
        <SymbolWrapperEl>
          <MapCakeSymbol />
        </SymbolWrapperEl>
        <StyledStatusName>
          <MappingCake>
            {locale === "ru" ? <>куски картопирога: </> : <>mapping cake: </>}
            <StyledExternalLink href="https://mapcraft.nanodesu.ru/pie/947" />
          </MappingCake>
        </StyledStatusName>
      </LegendRowEl>
    </Wrapper>
  );
};
