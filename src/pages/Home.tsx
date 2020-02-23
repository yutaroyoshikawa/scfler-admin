import React, { useMemo, useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Skeleten from "@material-ui/lab/Skeleton";
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";
import { Theme } from "@material-ui/core";
import { useSnackbar } from "notistack";
import Title from "../components/Title";
import {
  useMyInfoQuery,
  useOrnerQuery,
  Roles
} from "../gen/graphql-client-api";

const useStyle = makeStyles((theme: Theme) => ({
  loginnedUserInfoWrap: {
    maxWidth: "900px",
    margin: `${theme.spacing(6)}px auto`
  },
  userCard: {
    minWidth: "400px"
  },
  title: {
    fontSize: 14
  },
  dividerSpacing: {
    margin: `${theme.spacing(2)}px 0`
  },
  ornerImage: {
    width: "200px",
    height: "160px",
    objectFit: "cover"
  },
  avatar: {
    width: "100px",
    height: "100px"
  }
}));

const GET_USERS = gql`
  query {
    myInfo {
      id
      creationDate
      lastModifiedDate
      role
    }
  }
`;

const GET_LOGIN_STATE = gql`
  {
    isLoggedIn @client
    loggedInId @client
    loggedInRole @client
  }
`;

interface OrnerInfoProps {
  ornerId: string;
}

const OrnerInfo: React.FC<OrnerInfoProps> = props => {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const [isSkipFetch, setIsSkipFetch] = useState<boolean>(true);
  const { loading, data, error, refetch } = useOrnerQuery({
    skip: isSkipFetch
  });

  useMemo(() => {
    if (error) {
      enqueueSnackbar(JSON.stringify(error), {
        variant: "error"
      });
    }
    // eslint-disable-next-line
  }, [error]);

  useMemo(() => {
    if (props.ornerId) {
      setIsSkipFetch(false);
      refetch({
        id: props.ornerId
      });
    }
    // eslint-disable-next-line
  }, [props.ornerId]);

  return (
    <>
      <Title>オーナー情報</Title>
      <Card className={classes.userCard}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            オーナーID
          </Typography>
          {loading && <Skeleten animation="wave" width={300} height={40} />}
          {!loading && !error && (
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="textPrimary"
            >
              {data?.orner.id}
            </Typography>
          )}
          <Divider className={classes.dividerSpacing} />
          <Typography className={classes.title} color="textSecondary">
            連絡用email
          </Typography>
          {loading && <Skeleten animation="wave" width={300} height={40} />}
          {!loading && !error && (
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="textPrimary"
            >
              {data?.orner.email}
            </Typography>
          )}
          <Divider className={classes.dividerSpacing} />
          <Typography className={classes.title} color="textSecondary">
            オーナー名
          </Typography>
          {loading && <Skeleten animation="wave" width={300} height={40} />}
          {!loading && !error && (
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="textPrimary"
            >
              {data?.orner.name}
            </Typography>
          )}
          <Divider className={classes.dividerSpacing} />
          <Typography className={classes.title} color="textSecondary">
            拠点住所
          </Typography>
          {loading && <Skeleten animation="wave" width={300} height={40} />}
          {!loading && !error && (
            <Typography
              gutterBottom
              variant="h5"
              component="h2"
              color="textPrimary"
            >
              {data?.orner.address}
            </Typography>
          )}
          <Divider className={classes.dividerSpacing} />
          <Typography className={classes.title} color="textSecondary">
            拠点住所座標
          </Typography>
          {loading && <Skeleten animation="wave" width={300} height={40} />}
          {!loading && !error && (
            <>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="textPrimary"
              >
                緯度：
                {data?.orner.location?.lat}
              </Typography>
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="textPrimary"
              >
                経度：
                {data?.orner.location?.lng}
              </Typography>
            </>
          )}
          <Divider className={classes.dividerSpacing} />
          <Typography className={classes.title} color="textSecondary">
            アイコン
          </Typography>
          {loading && <Skeleten animation="wave" width={300} height={40} />}
          {!loading && !error && (
            <Avatar
              src={`https://sicfler-bucket.s3-ap-northeast-1.amazonaws.com/${data?.orner.icon}`}
              alt="オーナーアイコン"
              className={classes.avatar}
            />
          )}
          <Divider className={classes.dividerSpacing} />
          <Typography className={classes.title} color="textSecondary">
            オーナーイメージ一覧
          </Typography>
          {loading && <Skeleten animation="wave" width={300} height={40} />}
          {!loading && !error && data?.orner.images! && (
            <>
              {(data?.orner.images! as string[]).map(image => (
                <img
                  src={`https://sicfler-bucket.s3-ap-northeast-1.amazonaws.com/${image}`}
                  alt="オーナーイメージ"
                  key={image}
                  className={classes.ornerImage}
                />
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

const Home: React.FC = () => {
  const localState = useQuery(GET_LOGIN_STATE);
  const { enqueueSnackbar } = useSnackbar();
  const { error, data, loading } = useMyInfoQuery({
    query: GET_USERS
  });
  const classes = useStyle();

  useMemo(() => {
    if (error) {
      enqueueSnackbar(JSON.stringify(error), {
        variant: "error"
      });
    }
    // eslint-disable-next-line
  }, [error]);

  return (
    <>
      <div className={classes.loginnedUserInfoWrap}>
        <Title>ユーザー情報</Title>
        <Card className={classes.userCard}>
          <CardContent>
            <Typography className={classes.title} color="textSecondary">
              id
            </Typography>
            {loading && <Skeleten animation="wave" width={300} height={40} />}
            {!loading && !error && (
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="textPrimary"
              >
                {data?.myInfo.id}
              </Typography>
            )}
            <Divider className={classes.dividerSpacing} />
            <Typography className={classes.title} color="textSecondary">
              email
            </Typography>
            {loading && <Skeleten animation="wave" width={300} height={40} />}
            {!loading && !error && (
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="textPrimary"
              >
                {data?.myInfo.email}
              </Typography>
            )}
            <Divider className={classes.dividerSpacing} />
            <Typography className={classes.title} color="textSecondary">
              アカウント種
            </Typography>
            {loading && <Skeleten animation="wave" width={300} height={40} />}
            {!loading && !error && (
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="textPrimary"
              >
                {data?.myInfo.role}
              </Typography>
            )}
            <Divider className={classes.dividerSpacing} />
            <Typography className={classes.title} color="textSecondary">
              アカウント作成日
            </Typography>
            {loading && <Skeleten animation="wave" width={300} height={40} />}
            {!loading && !error && (
              <Typography
                gutterBottom
                variant="h5"
                component="h2"
                color="textPrimary"
              >
                {new Date(data?.myInfo.creationDate).toUTCString()}
              </Typography>
            )}
            {data?.myInfo.lastModifiedDate && (
              <>
                <Divider className={classes.dividerSpacing} />
                <Typography className={classes.title} color="textSecondary">
                  最終アカウント情報変更日
                </Typography>
                {loading && (
                  <Skeleten animation="wave" width={300} height={40} />
                )}
                {!loading && !error && (
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    color="textPrimary"
                  >
                    {new Date(data?.myInfo.lastModifiedDate).toUTCString()}
                  </Typography>
                )}
              </>
            )}
          </CardContent>
        </Card>
        {localState.data.loggedInRole === Roles.Orner && (
          <OrnerInfo ornerId={data?.myInfo.id!} />
        )}
      </div>
    </>
  );
};

export default Home;
