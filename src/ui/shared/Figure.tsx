import * as React from "react";
import styled from "styled-components";

import { ExternalLink } from "./ExternalLink";

const Wrapper = styled.div`
  padding: 10px 20px 15px;
  box-shadow: 2px 2px 10px #ddd;
  display: inline-block;
  overflow: hidden;
  display: flex;
`;

const Content = styled.div`
  position: relative;
`;

const StyledExternalLink = styled(ExternalLink)`
  color: inherit;
`;

const Title = styled.h1`
  font-weight: normal;
  font-size: 2em;
  text-align: left;
  line-height: 1.2em;
  margin: 0;
`;

const Subtitle = styled.div``;

const Copyright = styled.div`
  opacity: 0.5;
  position: absolute;
  bottom: 0;
`;

export interface FigureProps {
  children?: React.ReactNode;
  height: number;
  width: number;
}

export const Figure: React.VoidFunctionComponent<FigureProps> = ({
  children,
  width,
  height,
}) => {
  return (
    <Wrapper style={{ width, height }}>
      <Content>
        <Title>Домашняя картовечеринка в Пензе, Заречном и Спутнике</Title>
        <Subtitle>
          <StyledExternalLink href="https://wiki.osm.org/wiki/RU:Пенза/встречи" />{" "}
          {/* &nbsp; <StyledExternalLink href="https://t.me/osm_pnz" /> */}
        </Subtitle>
        {children}
        <Copyright>
          данные карты
          <br />© участники <StyledExternalLink href="https://osm.org" />{" "}
          (лицензия{" "}
          <StyledExternalLink href="https://www.openstreetmap.org/copyright">
            ODbL
          </StyledExternalLink>
          )
          <br />
          визуализация
          <br />
          Александр Качкаев — <StyledExternalLink href="https://kachkaev.ru" />
        </Copyright>
      </Content>
    </Wrapper>
  );
};
