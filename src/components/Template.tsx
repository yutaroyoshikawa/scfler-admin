import React from "react";
import styled from "styled-components";
import Header from "./Header";

const Template: React.FC = props => {
  return (
    <Wrapper>
      <Header />
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
`;
