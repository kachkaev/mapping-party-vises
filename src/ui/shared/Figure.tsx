import { useRouter } from "next/dist/client/router";
import * as React from "react";
import styled from "styled-components";

import { ExternalLink } from "./ExternalLink";

const Wrapper = styled.div`
  box-sizing: border-box;
  padding: 10px 20px 15px;
  box-shadow: 2px 2px 10px #ddd;
  display: inline-block;
  overflow: hidden;
  display: flex;
`;

const Content = styled.div`
  position: relative;
  display: block;
  width: 100%;
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

const Subtitle = styled.div`
  padding-top: 0.2em;
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
  const gap = "   ";

  const { locale } = useRouter();

  return (
    <Wrapper style={{ width, height }}>
      <Content>
        {locale === "ru" ? (
          <>
            <Title>
              Онлайн-картовечеринка ОСМ в Пензе, Заречном и Спутнике
            </Title>
            <Subtitle>
              <span style={{ opacity: 0.5 }}>
                <StyledExternalLink href="https://wiki.osm.org/wiki/RU:Пенза/встречи" />
                {gap}
                данные: © участники{" "}
                <StyledExternalLink href="https://osm.org" />,{" "}
                <StyledExternalLink href="https://www.openstreetmap.org/copyright">
                  ODbL
                </StyledExternalLink>
                {gap} визуализация: Александр Качкаев,{" "}
                <StyledExternalLink href="https://kachkaev.ru" />
              </span>
            </Subtitle>
          </>
        ) : (
          <>
            <Title>
              Online OSM mapping party in Penza (Russia) on building coverage
            </Title>
            <Subtitle>
              <span style={{ opacity: 0.5 }}>
                <StyledExternalLink href="https://osmcal.org/event/583" />
                {gap}
                data: © <StyledExternalLink href="https://osm.org" />{" "}
                contributors,{" "}
                <StyledExternalLink href="https://www.openstreetmap.org/copyright">
                  ODbL
                </StyledExternalLink>
                {gap} viz: Alexander Kachkaev,{" "}
                <StyledExternalLink href="https://en.kachkaev.ru" />
              </span>
            </Subtitle>
          </>
        )}
        {children}
      </Content>
    </Wrapper>
  );
};
