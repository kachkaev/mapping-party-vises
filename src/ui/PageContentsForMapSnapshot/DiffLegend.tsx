import _ from "lodash";
import * as React from "react";
import styled from "styled-components";

import {
  AddressStatus,
  getAddressStatus,
  mapAddressStatusToColor,
} from "../../shared/helpersForAddresses";
import { FeatureCollectionWithBuildings } from "../../shared/types";

const f = Intl.NumberFormat("ru");
const formatNumber = (n: number) => {
  return f.format(n).replace(/\u00A0/g, "\u202F");
};
type AddressStatusOrAll = AddressStatus | "all";

type Summary = Record<AddressStatusOrAll, number>;

const generateSummary = (
  featureCollection: FeatureCollectionWithBuildings,
): Summary => {
  const result = _.countBy(featureCollection.features, (feature) =>
    getAddressStatus(feature),
  ) as Summary;

  result["all"] = _.sum(_.values(result));

  return result;
};

const orderedAddressStatuses: AddressStatusOrAll[] = [
  "addressPresent",
  "addressMissing",
  "addressNotRequired",
  "all",
];

const RowWrapper = styled.div`
  display: table-row;
`;
const RowGap = styled.div`
  display: table-row;
  height: 0.7em;
`;

const StatusName = styled.div`
  display: table-cell;
  width: 10.8em;
`;

const Color = styled.div`
  display: inline-block;
  margin: 0 0 0.1em 0.6em;
  width: 0.6em;
  height: 0.6em;
  border-radius: 2px;
  vertical-align: baseline;
`;

const Count = styled.div`
  width: 4.5em;
  display: table-cell;
  text-align: right;
  position: relative;
  overflow: visible;
`;

const Remark = styled(Count)`
  opacity: 0.5;
  width: 4.3em;
`;

const MapCakeSymbol = styled.span`
  display: block;
  position: absolute;
  /* right: 0.1em; */
  right: -4.25em;
  left: 1.7em;
  bottom: 0.5em;
  height: 1px;
  background: #4d75c4;
  opacity: 0.33;
  /* width: 4em; */
`;

const getAddressStatusName = (addressStatus?: AddressStatusOrAll) => {
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

const Row: React.VoidFunctionComponent<{
  startSummary: Summary;
  finishSummary: Summary;
  addressStatus: AddressStatusOrAll;
}> = ({ startSummary, finishSummary, addressStatus }) => {
  const start = startSummary[addressStatus];
  const finish = finishSummary[addressStatus];
  const diff = finish - start;

  return (
    <RowWrapper>
      <StatusName>{getAddressStatusName(addressStatus)}</StatusName>
      <Count>{formatNumber(finish)}</Count>
      <Remark>
        {diff > 0 ? "+" : "−"}
        {formatNumber(Math.abs(diff))}
      </Remark>
      <Color
        style={{
          backgroundColor:
            addressStatus !== "all"
              ? mapAddressStatusToColor(addressStatus)
              : "transparent",
        }}
      />
    </RowWrapper>
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
    () => generateSummary(buildingCollectionStart),
    [buildingCollectionStart],
  );
  const finishSummary = React.useMemo(
    () => generateSummary(buildingCollectionFinish),
    [buildingCollectionFinish],
  );

  return (
    <Wrapper {...rest}>
      {orderedAddressStatuses.map((addressStatus) => (
        <Row
          key={addressStatus}
          startSummary={startSummary}
          finishSummary={finishSummary}
          addressStatus={addressStatus}
        />
      ))}
      <RowGap />
      <RowWrapper>
        <StatusName>куски картопирога</StatusName>
        <Count>
          <MapCakeSymbol />
        </Count>
      </RowWrapper>
    </Wrapper>
  );
};
