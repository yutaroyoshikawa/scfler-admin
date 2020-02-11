import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import { createGlobalStyle } from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import reset from "styled-reset";
import Template from "./components/Template";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";

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

const client = new ApolloClient({
  link: createHttpLink({
    uri:
      "https://gmdnhc2yf3.execute-api.ap-northeast-1.amazonaws.com/dev/graphql"
  }),
  cache: new InMemoryCache()
});

const theme = createMuiTheme();

const App = () => {
  return (
    <Router>
      <StylesProvider injectFirst={true}>
        <MuiThemeProvider theme={theme}>
          <ApolloProvider client={client}>
            <ApolloHooksProvider client={client}>
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
            </ApolloHooksProvider>
          </ApolloProvider>
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
