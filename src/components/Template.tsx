import React from "react";
import Header from "./Header";

const Template: React.FC = props => {
  return (
    <>
      <Header />
      {props.children}
    </>
  );
};

export default Template;
