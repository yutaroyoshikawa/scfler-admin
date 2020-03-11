import React, { useState, useMemo } from "react";
import Button from "@material-ui/core/Button";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";
import { useSnackbar } from "notistack";
import Title from "./Title";
import { signIn, newPasswordChallenge } from "../common/auth";
import { useMyInfoQuery, Roles } from "../gen/graphql-client-api";

const useStyle = makeStyles((theme: Theme) => ({
  wrap: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  formWrap: {
    maxWidth: "500px",
    width: "100%"
  },
  textFieldWrap: {
    margin: `${theme.spacing(2)}px 0`
  },
  textField: {
    width: "100%"
  }
}));

const GET_LOGIN_STATE = gql`
  {
    isLoggedIn @client
  }
`;

const LoginProvider: React.FC = props => {
  const { data, client } = useQuery(GET_LOGIN_STATE);
  const myInfoQuery = useMyInfoQuery();
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyle();

  useMemo(() => {
    if (data.isLoggedIn && myInfoQuery.data) {
      client.writeData({
        data: {
          ...data,
          loggedInId: myInfoQuery.data.myInfo.id,
          loggedInRole: myInfoQuery.data.myInfo.role
        }
      });
    }
    // eslint-disable-next-line
  }, [data.isLoggedIn, myInfoQuery.data]);

  useMemo(() => {
    if (myInfoQuery.error) {
      client.writeData({
        data: {
          ...data,
          isLoggedIn: false,
          loggedInId: "",
          loggedInRole: Roles.User
        }
      });
    }
  }, [myInfoQuery.error]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signIn(userName, password);
      if (result.newPasswordRequired) {
        await newPasswordChallenge(password).catch(err => {
          enqueueSnackbar(JSON.stringify(err), {
            variant: "error"
          });
        });
        client.writeData({
          data: {
            isLoggedIn: true
          }
        });
      }
      if (!result.newPasswordRequired) {
        client.writeData({
          data: {
            isLoggedIn: true
          }
        });
      }
    } catch (err) {
      enqueueSnackbar(JSON.stringify(err), {
        variant: "error"
      });
    }
  };

  return (
    <>
      {!data.isLoggedIn ? (
        <div className={classes.wrap}>
          <form className={classes.formWrap} onSubmit={e => onSubmit(e)}>
            <Card className={classes.formWrap}>
              <CardContent>
                <Title>管理画面にログイン</Title>
                <div className={classes.textFieldWrap}>
                  <InputLabel>ユーザー名</InputLabel>
                  <TextField
                    value={userName}
                    required={true}
                    onChange={e => setUserName(e.target.value)}
                    className={classes.textField}
                  />
                </div>
                <div className={classes.textFieldWrap}>
                  <InputLabel>パスワード</InputLabel>
                  <TextField
                    type="password"
                    required={true}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className={classes.textField}
                  />
                </div>
              </CardContent>
              <CardActions>
                <Button type="submit" size="large">
                  ログイン
                </Button>
              </CardActions>
            </Card>
          </form>
        </div>
      ) : (
        <>{props.children}</>
      )}
    </>
  );
};

export default LoginProvider;
