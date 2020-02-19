/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useMemo } from "react";
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
import { useSnackbar } from "notistack";
import {
  useUsersQuery,
  Roles,
  useUpdateUserMutation,
  useAddUserMutation,
  useDeleteUserMutation
} from "../gen/graphql-client-api";

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

interface UserInfoProps {
  id: string;
  email: string;
  role: Roles;
  creationDate: Date;
  lastModifiedDate: Date | null;
  handleSuccessUpdateUser: () => void;
  handleFailureUpdateUser: (error: any) => void;
  handleSuccessDeleteUser: () => void;
  handleFailureDeleteUser: (error: any) => void;
}

const UserInfo: React.FC<UserInfoProps> = props => {
  const usersQuery = useUsersQuery();
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [newEmail, setNewEmail] = useState<string>(props.email);
  const [selectedRole, setSelectedRole] = useState<Roles>(props.role);
  const [updateUserMutation] = useUpdateUserMutation();
  const [deleteUserMutation] = useDeleteUserMutation();
  const classes = useStyle();

  const onRequestChange = async () => {
    await updateUserMutation({
      variables: {
        id: props.id,
        email: newEmail,
        role: selectedRole
      }
    }).catch(err => {
      props.handleFailureUpdateUser(err);
    });
    await usersQuery.refetch();
    props.handleSuccessUpdateUser();
    setIsEditting(false);
  };

  const onRequestDelete = async () => {
    await deleteUserMutation({
      variables: {
        id: props.id
      }
    }).catch(err => {
      props.handleFailureDeleteUser(err);
    });
    await usersQuery.refetch();
    props.handleSuccessDeleteUser();
    setIsEditting(false);
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <div className={classes.attributeWrap}>
          <Typography className={classes.title} color="textSecondary">
            id
          </Typography>
          <Typography>{props.id}</Typography>
        </div>
        <div className={classes.attributeWrap}>
          <Typography className={classes.title} color="textSecondary">
            email
          </Typography>
          {!isEditting ? (
            <Typography>{props.email}</Typography>
          ) : (
            <TextField
              value={newEmail}
              onChange={e => setNewEmail(e.target.value)}
            />
          )}
        </div>
        <div className={classes.attributeWrap}>
          <Typography className={classes.title} color="textSecondary">
            ユーザー種
          </Typography>
          {!isEditting ? (
            <Typography>{props.role}</Typography>
          ) : (
            <Select
              value={selectedRole}
              onChange={e => setSelectedRole(e.target.value as Roles)}
            >
              <MenuItem value={Roles.User}>{Roles.User}</MenuItem>
              <MenuItem value={Roles.Admin}>{Roles.Admin}</MenuItem>
            </Select>
          )}
        </div>
        <div className={classes.attributeWrap}>
          <Typography className={classes.title} color="textSecondary">
            アカウント作成日
          </Typography>
          <Typography>{props.creationDate.toUTCString()}</Typography>
        </div>
        {props.lastModifiedDate && (
          <div className={classes.attributeWrap}>
            <Typography className={classes.title} color="textSecondary">
              最終情報変更日
            </Typography>
            <Typography>{props.lastModifiedDate.toUTCString()}</Typography>
          </div>
        )}
      </CardContent>
      <CardActions>
        {!isEditting ? (
          <Button onClick={() => setIsEditting(true)}>編集</Button>
        ) : (
          <>
            <Button onClick={() => setIsEditting(false)}>キャンセル</Button>
            <Button
              onClick={() => onRequestChange()}
              disabled={newEmail.match(/.+@.+\..+/) === null}
            >
              送信
            </Button>
            <Button onClick={() => onRequestDelete()} color="secondary">
              ユーザーを削除
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

const Users: React.FC = () => {
  const usersQuery = useUsersQuery();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [newUserEmail, setNewUserEmail] = useState<string>("");
  const [newUserPwd, setNewUserPwd] = useState<string>("");
  const [addUserMutation] = useAddUserMutation();
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyle();

  const onRequestCreateUser = async (user: {
    email: string;
    password: string;
  }) => {
    await addUserMutation({
      variables: {
        email: user.email,
        password: user.password
      }
    }).catch(err => {
      enqueueSnackbar(JSON.stringify(err), {
        variant: "error"
      });
    });
    setIsOpenDialog(false);
    usersQuery.refetch();
    enqueueSnackbar("ユーザーを作成しました。", {
      variant: "success"
    });
  };

  useMemo(() => {
    if (usersQuery.error) {
      enqueueSnackbar(JSON.stringify(usersQuery.error), {
        variant: "error"
      });
    }
    // eslint-disable-next-line
  }, [usersQuery.error]);

  return (
    <>
      <div className={classes.wrap}>
        {usersQuery.loading &&
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
        {!usersQuery.loading &&
          !usersQuery.error &&
          usersQuery.data?.users.map(user => (
            <UserInfo
              id={user?.id!}
              email={user?.email!}
              role={user?.role!}
              creationDate={new Date(user?.creationDate)}
              lastModifiedDate={new Date(user?.lastModifiedDate)}
              handleSuccessUpdateUser={() => {
                enqueueSnackbar("ユーザー情報を変更しました。", {
                  variant: "success"
                });
              }}
              handleFailureUpdateUser={err => {
                enqueueSnackbar(JSON.stringify(err), {
                  variant: "error"
                });
              }}
              handleSuccessDeleteUser={() => {
                enqueueSnackbar("ユーザーを削除しました。", {
                  variant: "default"
                });
              }}
              handleFailureDeleteUser={err => {
                enqueueSnackbar(JSON.stringify(err), {
                  variant: "error"
                });
              }}
            />
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
            type="button"
            color="primary"
            onClick={() =>
              onRequestCreateUser({
                email: newUserEmail,
                password: newUserPwd
              })}
            disabled={
              newUserEmail.match(/.+@.+\..+/) === null ||
              newUserPwd.length < 8 ||
              usersQuery.data?.users.findIndex(
                user => user?.email === newUserEmail
              ) !== -1
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
