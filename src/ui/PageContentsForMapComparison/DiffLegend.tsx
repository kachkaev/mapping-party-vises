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
  LegendRow,
  orderedAddressStatuses,
  StatusName,
  SymbolWrapper,
} from "../shared/legend";

const Pointer = styled.span`
  display: inline-block;
  opacity: 0.3;
`;

Pointer.defaultProps = {
  children: "↑",
};

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
    <LegendRow>
      <AddressSymbol addressStatus={addressStatus} />
      <StatusName>{getAddressStatusName(addressStatus)}</StatusName>
      <Count value={start} />
      <Count value={finish} />
      <Delta value={diff} />
      <DeltaPercent value={Math.round((diff / start) * 100)} />
    </LegendRow>
  );
};

const Wrapper = styled.div`
  display: table;
`;

export interface DiffLegendProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  buildingCollectionStart: FeatureCollectionWithBuildings;
  buildingCollectionFinish: FeatureCollectionWithBuildings;
}

export const DiffLegend: React.VoidFunctionComponent<DiffLegendProps> = ({
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
      <LegendRow>
        <SymbolWrapper />
        <StatusName />
        <CountEl>
          <Pointer
            style={{ transform: "rotate(-45deg)", marginRight: "0.4em" }}
          />
        </CountEl>
        <CountEl>
          <Pointer style={{ transform: "rotate(45deg)" }} />
        </CountEl>
      </LegendRow>
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
