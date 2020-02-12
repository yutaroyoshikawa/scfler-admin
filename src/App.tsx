import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Posts from "./pages/Posts";
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
import ViewDayIcon from "@material-ui/icons/ViewDay";
import HomeIcon from "@material-ui/icons/Home";
import LoginProvider from "./components/LoginProvider";

interface PageItem {
  url: string;
  name: string;
  icon: JSX.Element;
  component: React.FC<any>;
}

export const pages: PageItem[] = [
  {
    url: "/",
    name: "ホーム",
    icon: <HomeIcon />,
    component: Home
  },
  {
    url: "/posts",
    name: "投稿一覧",
    icon: <ViewDayIcon />,
    component: Posts
  }
];

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: createHttpLink({
    uri:
      "https://gmdnhc2yf3.execute-api.ap-northeast-1.amazonaws.com/dev/graphql"
  }),
  cache
});

cache.writeData({
  data: {
    isLoggedIn: false
  }
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
              <LoginProvider>
                <Template>
                  <Switch>
                    {pages.map((page, index) => (
                      <Route key={index} exact={true} path={page.url}>
                        <page.component />
                      </Route>
                    ))}
                  </Switch>
                </Template>
              </LoginProvider>
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
