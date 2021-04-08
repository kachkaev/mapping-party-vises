import * as React from "react";
import styled from "styled-components";

import { FeatureCollectionWithBuildings } from "../../shared/types";
import {
  AddressStatusOrAll,
  AddressSummary,
  AddressSymbol,
  Count,
  CountEl,
  Delta,
  generateAddressSummary,
  getAddressStatusName,
  LegendRowEl,
  LegendRowGapEl,
  orderedAddressStatuses,
  StatusNameEl,
  SymbolWrapperEl,
} from "../shared/legend";

const DeltaPercent = styled(Delta)`
  width: 4.2em;

  :after {
    content: "%";
  }
`;

const Row: React.VoidFunctionComponent<{
  startSummary: AddressSummary;
  finishSummary: AddressSummary;
  addressStatus: AddressStatusOrAll;
}> = ({ startSummary, finishSummary, addressStatus }) => {
  const start = startSummary[addressStatus];
  const finish = finishSummary[addressStatus];
  const diff = finish - start;

  return (
    <LegendRowEl>
      <AddressSymbol addressStatus={addressStatus} />
      <StatusNameEl>{getAddressStatusName(addressStatus)}</StatusNameEl>
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
  const startSummary = React.useMemo(
    () => generateAddressSummary(buildingCollectionStart),
    [buildingCollectionStart],
  );
  const finishSummary = React.useMemo(
    () => generateAddressSummary(buildingCollectionFinish),
    [buildingCollectionFinish],
  );

  return (
    <Wrapper {...rest}>
      <LegendRowEl>
        <SymbolWrapperEl />
        <StatusNameEl />
        <CountEl>старт</CountEl>
        <CountEl>финиш</CountEl>
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
