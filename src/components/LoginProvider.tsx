import React from "react";
import Button from "@material-ui/core/Button";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(theme => ({
  wrap: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

const GET_LOGIN_STATE = gql`
  {
    isLoggedIn @client
  }
`;

const LoginProvider: React.FC = props => {
  const { data, client } = useQuery(GET_LOGIN_STATE);
  const classes = useStyle();

  const onLogin = () => {
    client.writeData({
      data: {
        isLoggedIn: true
      }
    });
  };

  return (
    <>
      {!data.isLoggedIn ? (
        <div className={classes.wrap}>
          <h1>ログインしてください。</h1>
          <Button variant="contained" color="primary" onClick={() => onLogin()}>
            ログイン
          </Button>
        </div>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
};

export default LoginProvider;
