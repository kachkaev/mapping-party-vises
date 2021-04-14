import { useRouter } from "next/dist/client/router";
import * as React from "react";
import styled from "styled-components";

import { FeatureCollectionWithBuildings } from "../../shared/types";
import {
  AddressStatusOrAll,
  AddressSummaryWithAll,
  AddressSymbol,
  Count,
  CountEl,
  Delta,
  generateAddressSummaryWithAll,
  getAddressStatusName,
  LegendRowEl,
  LegendRowGapEl,
  orderedAddressStatuses,
  StatusNameEl,
  SymbolWrapperEl,
} from "../shared/legend";

export const DeltaPercent = styled(Delta)`
  width: 4em;

  :after {
    content: "%";
  }
`;

const Row: React.VoidFunctionComponent<{
  startSummary: AddressSummaryWithAll;
  finishSummary: AddressSummaryWithAll;
  addressStatus: AddressStatusOrAll;
}> = ({ startSummary, finishSummary, addressStatus }) => {
  const { locale } = useRouter();
  const start = startSummary[addressStatus];
  const finish = finishSummary[addressStatus];
  const diff = finish - start;

  return (
    <LegendRowEl>
      <AddressSymbol addressStatus={addressStatus} />
      <StatusNameEl>{getAddressStatusName(addressStatus, locale)}</StatusNameEl>
      <Count value={start} />
      <Count value={finish} />
      <Delta value={diff} />
      <DeltaPercent value={Math.round((diff / start) * 100)} />
    </LegendRowEl>
  );
};

const Wrapper = styled.div`
  display: table;
`;

export interface LegendForMapComparisonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  buildingCollectionStart: FeatureCollectionWithBuildings;
  buildingCollectionFinish: FeatureCollectionWithBuildings;
}

export const LegendForMapComparison: React.VoidFunctionComponent<LegendForMapComparisonProps> = ({
  buildingCollectionStart,
  buildingCollectionFinish,
  ...rest
}) => {
  const { locale } = useRouter();
  const startSummary = React.useMemo(
    () => generateAddressSummaryWithAll(buildingCollectionStart),
    [buildingCollectionStart],
  );
  const finishSummary = React.useMemo(
    () => generateAddressSummaryWithAll(buildingCollectionFinish),
    [buildingCollectionFinish],
  );

  return (
    <Wrapper {...rest}>
      <LegendRowEl>
        <SymbolWrapperEl />
        <StatusNameEl />
        <CountEl>{locale === "ru" ? "старт" : "start"}</CountEl>
        <CountEl>{locale === "ru" ? "финиш" : "finish"}</CountEl>
      </LegendRowEl>
      <LegendRowGapEl />
      {orderedAddressStatuses.map((addressStatus) => (
        <Row
          key={addressStatus}
          startSummary={startSummary}
          finishSummary={finishSummary}
          addressStatus={addressStatus}
        />
      ))}
    </Wrapper>
  );
};
