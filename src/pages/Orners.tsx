import React, { useMemo, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Skeleten from "@material-ui/lab/Skeleton";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
import { useSnackbar } from "notistack";
import { useOrnersQuery } from "../gen/graphql-client-api";

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

const Orners: React.FC = () => {
  const classes = useStyle();
  const ornersQuery = useOrnersQuery();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  useMemo(() => {
    if (ornersQuery.error) {
      enqueueSnackbar(JSON.stringify(ornersQuery.error), {
        variant: "error"
      });
    }
    // eslint-disable-next-line
  }, [ornersQuery.error]);

  const onRequestAddOrner = () => {
    enqueueSnackbar("オーナーを追加しました。", {
      variant: "success"
    });
  };

  return (
    <>
      <div className={classes.wrap}>
        {ornersQuery.loading &&
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
        {!ornersQuery.loading &&
          !ornersQuery.error &&
          ornersQuery.data?.orners.map(orner => (
            <Card key={orner?.id}>
              <CardContent>
                <Typography>{orner?.id}</Typography>
              </CardContent>
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
        <DialogTitle>新規オーナー追加</DialogTitle>
        <DialogContent>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              ユーザーIDを指定
              <TextField
                className={classes.textField}
                // value={newUserEmail}
                // onChange={e => setNewUserEmail(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              連絡用Email
              <TextField
                className={classes.textField}
                type="password"
                // value={newUserPwd}
                // onChange={e => setNewUserPwd(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              オーナー名
              <TextField
                className={classes.textField}
                type="password"
                // value={newUserPwd}
                // onChange={e => setNewUserPwd(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              自己紹介文
              <TextField
                className={classes.textField}
                type="password"
                // value={newUserPwd}
                // onChange={e => setNewUserPwd(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              アイコン
              <TextField
                className={classes.textField}
                type="password"
                // value={newUserPwd}
                // onChange={e => setNewUserPwd(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              イメージ一覧
              <TextField
                className={classes.textField}
                type="password"
                // value={newUserPwd}
                // onChange={e => setNewUserPwd(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              住所
              <TextField
                className={classes.textField}
                type="password"
                // value={newUserPwd}
                // onChange={e => setNewUserPwd(e.target.value)}
              />
            </InputLabel>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            color="primary"
            onClick={() => onRequestAddOrner()}
          >
            追加
          </Button>
          <Button type="button" onClick={() => setIsOpenDialog(false)}>
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Orners;
