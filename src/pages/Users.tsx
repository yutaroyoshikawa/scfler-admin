/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Skeleten from "@material-ui/lab/Skeleton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { useUsersQuery, Roles } from "../gen/graphql-client-api";

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
  },
  fab: {
    position: "fixed",
    right: "100px",
    bottom: "80px"
  },
  textFieldWrapper: {
    margin: `${theme.spacing(2)}px 0`
  },
  textField: {
    width: "100%",
    minWidth: "300px"
  }
}));

const Users: React.FC = () => {
  const { data, loading, error } = useUsersQuery();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserPwd, setNewUserPwd] = useState<string>("");
  const classes = useStyle();

  const onRequestCreateUser = () => {
    setIsOpenDialog(false);
  };

  return (
    <>
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
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => setIsOpenDialog(true)}
      >
        <AddIcon />
      </Fab>
      <Dialog open={isOpenDialog} onClose={() => setIsOpenDialog(false)}>
        <DialogTitle>新規ユーザー作成</DialogTitle>
        <DialogContent>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              email(ID)
              <TextField
                className={classes.textField}
                value={newUserEmail}
                onChange={e => setNewUserEmail(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              パスワード
              <TextField
                className={classes.textField}
                type="password"
                value={newUserPwd}
                onChange={e => setNewUserPwd(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              ユーザー種
              <Select className={classes.textField} value={Roles.User}>
                <MenuItem value={Roles.User} selected={true}>
                  {Roles.User}
                </MenuItem>
              </Select>
            </InputLabel>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            color="primary"
            onClick={onRequestCreateUser}
            disabled={
              newUserEmail.match(/.+@.+\..+/) === null ||
              newUserPwd.length < 8 ||
              data?.users.findIndex(user => user?.email === newUserEmail) !== -1
            }
          >
            作成
          </Button>
          <Button type="button" onClick={() => setIsOpenDialog(false)}>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Users;
