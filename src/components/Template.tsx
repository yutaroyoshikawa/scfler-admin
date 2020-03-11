import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import Header from "./Header";
import { pages } from "../App";

const Template: React.FC = props => {
  const location = useLocation();

  return (
    <Wrapper>
      <Header
        title={
          pages[pages.findIndex(page => page.url === location.pathname)].name
        }
      />
      <MainContent>{props.children}</MainContent>
    </Wrapper>
  );
};

export default Template;

const Wrapper = styled.div`
  display: flex;
`;

const MainContent = styled.main`
  padding: 64px 0 0 240px;
  width: 100%;
`;
