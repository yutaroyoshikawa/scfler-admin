import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

interface PageItem {
  url: string;
  component: React.FC<any>;
}

const pages: PageItem[] = [
  {
    url: "",
    component: Home
  }
];

const App = () => {
  return (
    <Router>
      <GlobalStyle />
      <Switch>
        {pages.map((page, index) => (
          <Route key={index}>
            <page.component />
          </Route>
        ))}
      </Switch>
    </Router>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap');
  @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
  ${reset}
`;
