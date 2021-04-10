import _ from "lodash";
import { useRouter } from "next/dist/client/router";
import * as React from "react";
import styled from "styled-components";

import {
  getAddressStatus,
  mapAddressStatusToColor,
} from "../../shared/helpersForAddresses";
import {
  AddressStatus,
  FeatureCollectionWithBuildings,
} from "../../shared/types";
import { ExternalLink } from "./ExternalLink";

export type AddressStatusOrAll = AddressStatus | "all";

export type AddressSummary = Record<AddressStatusOrAll, number>;

const fRu = Intl.NumberFormat("ru");
const fEn = Intl.NumberFormat("en");
const formatNumber = (n: number, locale: string | undefined) => {
  return (locale === "ru" ? fRu : fEn).format(n).replace(/\u00A0/g, "\u202F");
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
  position: relative;
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

export const getAddressStatusName = (
  addressStatus: AddressStatusOrAll,
  locale: string | undefined,
) => {
  switch (addressStatus) {
    case "addressPresent":
      return locale === "ru" ? "адрес есть" : "address is present";
    case "addressMissing":
      return locale === "ru" ? "адреса не хватает" : "address is missing";
    case "addressNotRequired":
      return locale === "ru" ? "адрес необязателен" : "address is optional";
  }

  return locale === "ru" ? "все здания" : "all buildings";
};

const ColorEl = styled.div`
  display: inline-block;
  width: 0.6em;
  height: 0.6em;
  border-radius: 2px;
  vertical-align: baseline;
`;

export const AddressSymbol: React.VoidFunctionComponent<
  {
    addressStatus: AddressStatusOrAll;
  } & React.HTMLAttributes<HTMLDivElement>
> = ({ addressStatus, ...rest }) => {
  return (
    <SymbolWrapperEl {...rest}>
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
  const { locale } = useRouter();

  return <CountEl {...rest}>{formatNumber(Math.abs(value), locale)}</CountEl>;
};

export const DeltaEl = styled(CountEl)`
  padding-left: 0.55em;
  opacity: 0.5;
`;

export const Delta: React.VoidFunctionComponent<
  { value: number } & React.HTMLAttributes<HTMLDivElement>
> = ({ value, ...rest }) => {
  const { locale } = useRouter();

  return (
    <DeltaEl {...rest}>
      {value > 0 ? "+" : value < 0 ? "−" : ""}
      {formatNumber(Math.abs(value), locale)}
    </DeltaEl>
  );
};

const StyledExternalLink = styled(ExternalLink)`
  color: inherit;
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

export const LegendRowForMappingCake: React.VoidFunctionComponent = () => {
  const { locale } = useRouter();

  return (
    <LegendRowEl>
      <SymbolWrapperEl>
        <MapCakeSymbol />
      </SymbolWrapperEl>
      <StatusNameEl>
        <MappingCake>
          {locale === "ru" ? <>куски картопирога: </> : <>mapping cake: </>}
          <StyledExternalLink href="https://mapcraft.nanodesu.ru/pie/947" />
        </MappingCake>
      </StatusNameEl>
    </LegendRowEl>
  );
};
