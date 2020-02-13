/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";

export const signIn = (userName: string, password: string) => {
  return new Promise<{
    cognitoUser: CognitoUser;
    newPasswordRequired: boolean;
  }>((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID!,
      ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID!
    });

    const cognitoUser = new CognitoUser({
      Username: userName,
      Pool: userPool
    });

    cognitoUser.setAuthenticationFlowType("USER_PASSWORD_AUTH");

    const authenticationDetails = new AuthenticationDetails({
      Username: userName,
      Password: password
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        resolve({
          cognitoUser,
          newPasswordRequired: false
        });
      },
      onFailure: err => {
        reject(err);
      },
      newPasswordRequired: () => {
        resolve({
          cognitoUser,
          newPasswordRequired: true
        });
      }
    });
  });
};

export const newPasswordChallenge = (
  password: string,
  cognitoUser: CognitoUser
) => {
  return new Promise<{
    cognitoUser: CognitoUser;
  }>((resolve, reject) => {
    cognitoUser.completeNewPasswordChallenge(
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
    );
  });
};

export const signOut = (cognitoUser: CognitoUser) => {
  cognitoUser.signOut();
};
