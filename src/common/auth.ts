/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";

let cognitoUser: CognitoUser | null = null;

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
      onSuccess: result => {
        localStorage.setItem("sicflerToken", result.getIdToken().getJwtToken());
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
            onSuccess: () => {
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
    localStorage.removeItem("sicflerToken");
    cognitoUser.signOut();
  }
};
