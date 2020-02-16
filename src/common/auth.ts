/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";
import { global } from "../App";

const lastLogin = localStorage.getItem(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  `CognitoIdentityServiceProvider.${process.env
    .REACT_APP_COGNITO_CLIENT_ID!}.LastAuthUser`
);

let cognitoUser: CognitoUser | null = lastLogin
  ? new CognitoUser({
      Username: lastLogin,
      Pool: new CognitoUserPool({
        UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID!,
        ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID!
      })
    })
  : null;

export const signIn = (userName: string, password: string) => {
  return new Promise<{
    newPasswordRequired: boolean;
  }>((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID!,
      ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID!
    });

    cognitoUser = new CognitoUser({
      Username: userName,
      Pool: userPool
    });

    cognitoUser.setAuthenticationFlowType("USER_PASSWORD_AUTH");

    const authenticationDetails = new AuthenticationDetails({
      Username: userName,
      Password: password
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: res => {
        global.token = res.getAccessToken().getJwtToken();
        resolve({
          newPasswordRequired: false
        });
      },
      onFailure: err => {
        reject(err);
      },
      newPasswordRequired: () => {
        resolve({
          newPasswordRequired: true
        });
      }
    });
  });
};

export const newPasswordChallenge = (password: string) => {
  return new Promise((resolve, reject) =>
    cognitoUser
      ? cognitoUser.completeNewPasswordChallenge(
          password,
          {},
          {
            onSuccess: res => {
              global.token = res.getAccessToken().getJwtToken();
              resolve({
                cognitoUser
              });
            },
            onFailure: err => {
              reject(err);
            }
          }
        )
      : reject()
  );
};

export const signOut = () => {
  if (cognitoUser !== null) {
    global.token = "";
    cognitoUser.signOut();
  }
};
