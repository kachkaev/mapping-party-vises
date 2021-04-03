import * as React from "react";
import styled from "styled-components";

import { ExternalLink } from "../shared/ExternalLink";

const H2 = styled.h2`
  margin-top: 3em;
  font-size: 1em;
`;

const Description = styled.p`
  font-weight: bold;
`;

export const PageContentsForIndex: React.VoidFunctionComponent = () => {
  return (
    <>
      <H2>hello world</H2>
      <Description>testing</Description>
      <div>
        <ExternalLink href="https://github.com/kachkaev/mapping-party-vizes" />
      </div>
    </>
  );
};
