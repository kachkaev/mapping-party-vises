import * as React from "react";
import styled from "styled-components";

import { GlobalStyle } from "./GlobalStyle";

const Container = styled.div`
  margin: 0 auto;
  padding: 0 20px 50px;
  position: relative;
  max-width: 35em;
  min-width: 270px;
`;

const TopSection = styled.div`
  padding: 80px 0 40px;

  @media (max-width: 700px) {
    padding: 40px 0 20px;
  }

  @media (max-width: 550px) {
    padding: 10px 0 0px;
  }
`;

export const PageLayout: React.VoidFunctionComponent<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <Container>
      <GlobalStyle />
      <TopSection>{children}</TopSection>
    </Container>
  );
};
