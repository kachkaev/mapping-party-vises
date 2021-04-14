import _ from "lodash";
import { useRouter } from "next/dist/client/router";
import * as React from "react";
import styled from "styled-components";

import { FeatureCollectionWithBuildings } from "../../shared/types";
import {
  AddressStatusOrAll,
  AddressSummaryWithAll,
  AddressSymbol,
  Count,
  Delta,
  DeltaEl,
  generateAddressSummaryWithAll,
  getAddressStatusName,
  LegendRowEl,
  LegendRowForMappingCake,
  LegendRowGapEl,
  orderedAddressStatuses,
  StatusNameEl,
  SymbolWrapperEl,
} from "../shared/legend";

const StyledStatusName = styled(StatusNameEl)`
  width: 10.8em;
  position: relative;
`;

const LegendRow: React.VoidFunctionComponent<{
  summaryDayBefore?: AddressSummaryWithAll;
  summary: AddressSummaryWithAll;
  addressStatus: AddressStatusOrAll;
}> = ({ summaryDayBefore, summary, addressStatus }) => {
  const { locale } = useRouter();
  const value = summary[addressStatus];
  const delta = summaryDayBefore
    ? value - summaryDayBefore[addressStatus]
    : undefined;

  const total = _.sum(Object.values(summary)) - summary.all;

  return (
    <LegendRowEl>
      <AddressSymbol addressStatus={addressStatus} />
      <StyledStatusName>
        {getAddressStatusName(addressStatus, locale)}{" "}
      </StyledStatusName>
      <Count value={value} />
      {typeof delta === "number" ? (
        <Delta value={delta} />
      ) : addressStatus !== "all" ? (
        <DeltaEl>{Math.round((value / total) * 100)}%</DeltaEl>
      ) : null}
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
  unrelatedToMappingParty?: boolean;
}

export const LegendForMapSnapshot: React.VoidFunctionComponent<LegendForMapSnapshotProps> = ({
  buildingCollectionDayBefore,
  buildingCollection,
  unrelatedToMappingParty,
  ...rest
}) => {
  const summaryDayBefore = React.useMemo(
    () =>
      buildingCollectionDayBefore
        ? generateAddressSummaryWithAll(buildingCollectionDayBefore)
        : undefined,
    [buildingCollectionDayBefore],
  );
  const summary = React.useMemo(
    () => generateAddressSummaryWithAll(buildingCollection),
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
      {unrelatedToMappingParty ? (
        <LegendRowEl>
          <SymbolWrapperEl>&nbsp;</SymbolWrapperEl>
        </LegendRowEl>
      ) : (
        <LegendRowForMappingCake />
      )}
    </Wrapper>
  );
};
