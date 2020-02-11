import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { createGlobalStyle } from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import reset from "styled-reset";
import Template from "./components/Template";

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

const theme = createMuiTheme();

const App = () => {
  return (
    <Router>
      <StylesProvider injectFirst={true}>
        <MuiThemeProvider theme={theme}>
          <GlobalStyle />
          <Template>
            <Switch>
              {pages.map((page, index) => (
                <Route key={index}>
                  <page.component />
                </Route>
              ))}
            </Switch>
          </Template>
        </MuiThemeProvider>
      </StylesProvider>
    </Router>
  );
};

export default App;

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background-color: #fff;
  }
`;
