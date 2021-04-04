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
  /* line-height: 1em;

  & > * {
    padding: 0.2em 0;
  } */
  /* 
  &:last-child > * {
    border-top: 1px solid #ddd;
  } */
`;

const StatusName = styled.div`
  display: table-cell;
`;

const Arrow = styled.div`
  padding: 0 0.3em 0 0.4em;
`;
Arrow.defaultProps = {
  children: "➜",
};

const Count = styled.div`
  padding-left: 0.5em;
  display: table-cell;
  text-align: right;

  ${Arrow} + & {
    padding-left: 0;
  }
`;

const Remark = styled(Count)`
  opacity: 0.5;
  padding-left: 0.5em;
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
      <Count>{formatNumber(start)}</Count>
      <Arrow
        style={{
          color:
            addressStatus !== "all"
              ? mapAddressStatusToColor(addressStatus)
              : "transparent",
        }}
      />
      <Count>{formatNumber(finish)}</Count>
      <Remark>
        {diff > 0 ? "+" : "−"}
        {formatNumber(Math.abs(diff))}
      </Remark>

      <Remark>
        {diff > 0 ? "+" : "−"}
        {Math.round(Math.abs(diff / start) * 100)}%
      </Remark>
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
    </Wrapper>
  );
};
