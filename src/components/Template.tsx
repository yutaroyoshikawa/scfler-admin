import React from "react";
import styled from "styled-components";
import Header from "./Header";
import { useLocation } from "react-router";
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
  padding-top: 64px;
  width: 100%;
`;
