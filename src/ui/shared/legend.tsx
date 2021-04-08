import _ from "lodash";
import * as React from "react";
import styled from "styled-components";

import {
  AddressStatus,
  getAddressStatus,
  mapAddressStatusToColor,
} from "../../shared/helpersForAddresses";
import { FeatureCollectionWithBuildings } from "../../shared/types";

export type AddressStatusOrAll = AddressStatus | "all";

export type AddressSummary = Record<AddressStatusOrAll, number>;

const f = Intl.NumberFormat("ru");
const formatNumber = (n: number) => {
  return f.format(n).replace(/\u00A0/g, "\u202F");
};

export const generateAddressSummary = (
  featureCollection: FeatureCollectionWithBuildings,
): AddressSummary => {
  const result = _.countBy(featureCollection.features, (feature) =>
    getAddressStatus(feature),
  ) as AddressSummary;

  result["all"] = _.sum(_.values(result));

  return result;
};

export const orderedAddressStatuses: AddressStatusOrAll[] = [
  "all",
  "addressPresent",
  "addressMissing",
  "addressNotRequired",
];

export const LegendRowEl = styled.div`
  display: table-row;
`;

export const LegendRowGapEl = styled.div`
  display: table-row;
  height: 0.5em;
`;

export const StatusNameEl = styled.div`
  display: table-cell;
`;

export const CountEl = styled.div`
  width: 4.5em;
  display: table-cell;
  text-align: right;
  position: relative;
  overflow: visible;
`;

export const SymbolWrapperEl = styled.div`
  display: table-cell;
  padding-left: 2px;
  width: 1.3em;
`;

export const getAddressStatusName = (addressStatus?: AddressStatusOrAll) => {
  switch (addressStatus) {
    case "addressPresent":
      return "адрес есть";
    case "addressMissing":
      return "адреса не хватает";
    case "addressNotRequired":
      return "адрес необязателен";
  }

  return "все здания";
};

const ColorEl = styled.div`
  display: inline-block;
  width: 0.6em;
  height: 0.6em;
  border-radius: 2px;
  vertical-align: baseline;
`;

export const AddressSymbol: React.VoidFunctionComponent<{
  addressStatus: AddressStatusOrAll;
}> = ({ addressStatus }) => {
  return (
    <SymbolWrapperEl>
      {addressStatus !== "all" ? (
        <ColorEl
          style={{
            backgroundColor: mapAddressStatusToColor(addressStatus),
          }}
        />
      ) : null}
    </SymbolWrapperEl>
  );
};

export const Count: React.VoidFunctionComponent<
  { value: number } & React.HTMLAttributes<HTMLDivElement>
> = ({ value, ...rest }) => {
  return <CountEl {...rest}>{formatNumber(Math.abs(value))}</CountEl>;
};

export const DeltaEl = styled(CountEl)`
  padding-left: 0.4em;
  opacity: 0.5;
`;

export const Delta: React.VoidFunctionComponent<
  { value: number } & React.HTMLAttributes<HTMLDivElement>
> = ({ value, ...rest }) => {
  return (
    <DeltaEl {...rest}>
      {value > 0 ? "+" : value < 0 ? "−" : ""}
      {formatNumber(Math.abs(value))}
    </DeltaEl>
  );
};
