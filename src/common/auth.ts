import {
  CognitoUserPool,
  AuthenticationDetails,
  CognitoUser
} from "amazon-cognito-identity-js";

export const signIn = (userName: string, password: string) => {
  return new Promise<{
    token: string;
    cognitoUser: CognitoUser;
  }>((resolve, reject) => {
    const userPool = new CognitoUserPool({
      UserPoolId: "",
      ClientId: ""
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
      onSuccess: result => {
        resolve({
          token: result.getIdToken().getJwtToken(),
          cognitoUser
        });
      },
      onFailure: err => {
        reject(err);
      }
    });
  });
};

export const signOut = (cognitoUser: CognitoUser) => {
  cognitoUser.signOut();
};
