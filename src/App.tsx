import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { StylesProvider } from "@material-ui/styles";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import reset from "styled-reset";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import ViewDayIcon from "@material-ui/icons/ViewDay";
import HomeIcon from "@material-ui/icons/Home";
import People from "@material-ui/icons/People";
import ContactMail from "@material-ui/icons/ContactMail";
import { SnackbarProvider } from "notistack";
import { setContext } from "apollo-link-context";
import LoginProvider from "./components/LoginProvider";
import Template from "./components/Template";
import Users from "./pages/Users";
import Orners from "./pages/Orners";
import Posts from "./pages/Posts";
import Home from "./pages/Home";
import { Roles } from "./gen/graphql-client-api";

interface PageItem {
  url: string;
  name: string;
  icon: JSX.Element;
  component: React.FC;
  isAdmin: boolean;
}

export const pages: PageItem[] = [
  {
    url: "/",
    name: "ホーム",
    icon: <HomeIcon />,
    component: Home,
    isAdmin: false
  },
  {
    url: "/posts",
    name: "投稿一覧",
    icon: <ViewDayIcon />,
    component: Posts,
    isAdmin: false
  },
  {
    url: "/orners",
    name: "オーナー一覧",
    icon: <ContactMail />,
    component: Orners,
    isAdmin: true
  },
  {
    url: "/users",
    name: "ユーザー一覧",
    icon: <People />,
    component: Users,
    isAdmin: true
  }
];

export const global = {
  token: ""
};

const lastLogin = localStorage.getItem(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  `CognitoIdentityServiceProvider.${process.env
    .REACT_APP_COGNITO_CLIENT_ID!}.LastAuthUser`
);

const cache = new InMemoryCache();

const httpLink = createHttpLink({
  uri: "https://api.sicfler.com/v1/graphql"
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token =
    localStorage.getItem(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      `CognitoIdentityServiceProvider.${process.env
        .REACT_APP_COGNITO_CLIENT_ID!}.${lastLogin}.accessToken`
    ) || global.token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token || ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});

cache.writeData({
  data: {
    isLoggedIn: !!localStorage.getItem(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      `CognitoIdentityServiceProvider.${process.env
        .REACT_APP_COGNITO_CLIENT_ID!}.${lastLogin}.accessToken`
    ),
    loggedInId: "",
    loggedInRole: "user" as Roles
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
              <SnackbarProvider>
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
              </SnackbarProvider>
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
