/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Skeleten from "@material-ui/lab/Skeleton";
import { useUsersQuery } from "../gen/graphql-client-api";

const useStyle = makeStyles((theme: Theme) => ({
  wrap: {
    margin: "0 auto"
  },
  card: {
    margin: theme.spacing(4),
    maxWidth: "900px",
    boxSizing: "border-box"
  },
  attributeWrap: {
    margin: theme.spacing(2)
  },
  title: {
    fontSize: 14
  }
}));

const Users: React.FC = () => {
  const { data, loading, error } = useUsersQuery();
  const classes = useStyle();

  return (
    <div className={classes.wrap}>
      {loading &&
        [...Array(3)].map((value, index) => (
          <Card className={classes.card} key={index}>
            <CardContent>
              <div className={classes.attributeWrap}>
                <Typography className={classes.title} color="textSecondary">
                  id
                </Typography>
                <Skeleten animation="wave" width={300} height={40} />
              </div>
              <div className={classes.attributeWrap}>
                <Typography className={classes.title} color="textSecondary">
                  email
                </Typography>
                <Skeleten animation="wave" width={300} height={40} />
              </div>
              <div className={classes.attributeWrap}>
                <Typography className={classes.title} color="textSecondary">
                  ユーザー種
                </Typography>
                <Skeleten animation="wave" width={300} height={40} />
              </div>
              <div className={classes.attributeWrap}>
                <Typography className={classes.title} color="textSecondary">
                  アカウント作成日
                </Typography>
                <Skeleten animation="wave" width={300} height={40} />
              </div>
              <div className={classes.attributeWrap}>
                <Typography className={classes.title} color="textSecondary">
                  最終情報変更日
                </Typography>
                <Skeleten animation="wave" width={300} height={40} />
              </div>
            </CardContent>
            <CardActions>
              <Skeleten animation="wave" width={90} height={70} />
            </CardActions>
          </Card>
        ))}
      {!loading &&
        !error &&
        data?.users.map(user => (
          <Card className={classes.card}>
            <CardContent>
              <div className={classes.attributeWrap}>
                <Typography className={classes.title} color="textSecondary">
                  id
                </Typography>
                <Typography>{user!.id}</Typography>
              </div>
              <div className={classes.attributeWrap}>
                <Typography className={classes.title} color="textSecondary">
                  email
                </Typography>
                <Typography>{user!.email}</Typography>
              </div>
              <div className={classes.attributeWrap}>
                <Typography className={classes.title} color="textSecondary">
                  ユーザー種
                </Typography>
                <Typography>{user!.role}</Typography>
              </div>
              <div className={classes.attributeWrap}>
                <Typography className={classes.title} color="textSecondary">
                  アカウント作成日
                </Typography>
                <Typography>
                  {new Date(user!.creationDate).toUTCString()}
                </Typography>
              </div>
              {user!.lastModifiedDate && (
                <div className={classes.attributeWrap}>
                  <Typography className={classes.title} color="textSecondary">
                    最終情報変更日
                  </Typography>
                  <Typography>
                    {new Date(user!.lastModifiedDate).toUTCString()}
                  </Typography>
                </div>
              )}
            </CardContent>
            <CardActions>
              <Button>編集</Button>
            </CardActions>
          </Card>
        ))}
    </div>
  );
};

export default Users;
