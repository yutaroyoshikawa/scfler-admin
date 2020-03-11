import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import Header from "./Header";
import { pages } from "../App";

const Template: React.FC = props => {
  const location = useLocation();

  return (
    <Wrapper>
      <HeaderWrapper>
        <Header
          title={
            pages[pages.findIndex(page => page.url === location.pathname)].name
          }
        />
      </HeaderWrapper>
      <MainContent>{props.children}</MainContent>
    </Wrapper>
  );
};

export default Template;

const Wrapper = styled.div`
  display: flex;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
`;

const MainContent = styled.main`
  padding: 64px 0 0 240px;
  width: 100%;
`;
