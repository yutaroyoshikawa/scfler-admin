import React, { useState } from "react";
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
import { signIn } from "../common/auth";

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
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, cognitoUser } = await signIn(userName, password);
      localStorage.setItem("token", token);
      client.writeData({
        data: {
          isLoggedIn: true,
          cognitoUser
        }
      });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error, {
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
                  <InputLabel>Email</InputLabel>
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
