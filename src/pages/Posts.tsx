import React, { useMemo, useState } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Skeleten from "@material-ui/lab/Skeleton";
import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import AddIcon from "@material-ui/icons/Add";
import { useSnackbar } from "notistack";
import { DropzoneArea } from "material-ui-dropzone";
import nanoid from "nanoid";
import { s3 } from "../common/aws";
import Title from "../components/Title";
import {
  Roles,
  usePostsQuery,
  Geolocation,
  useAddPostMutation
} from "../gen/graphql-client-api";

interface UploadFile {
  objectUrl: string;
  fileType: string;
}

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
  },
  fileInput: {
    opacity: 0,
    appearance: "none",
    position: "absolute"
  },
  avatar: {
    width: "100px",
    height: "100px"
  },
  ornerImage: {
    width: "200px",
    height: "160px",
    objectFit: "cover"
  }
}));

const GET_LOGIN_STATE = gql`
  {
    isLoggedIn @client
    loggedInId @client
    loggedInRole @client
  }
`;

const Posts: React.FC = () => {
  const classes = useStyle();
  const loginState = useQuery(GET_LOGIN_STATE);
  const [addPostMutation] = useAddPostMutation();
  const [isSkipFetch, setIsSkipFetch] = useState<boolean>(true);
  const postsQuery = usePostsQuery({
    skip: isSkipFetch
  });
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [newPostName, setNewPostName] = useState<string>("");
  const [newPostStart, setNewPostStart] = useState<Date>(new Date());
  const [newPostFinish, setNewPostFinish] = useState<Date>(new Date());
  const [newPostDiscription, setNewPostDiscription] = useState<string>("");
  const [newPostAddress, setNewPostAddress] = useState<string>("");
  const [newPostLocation, setNewPostLocation] = useState<Geolocation>({
    xIndex: 0,
    yIndex: 0
  });
  const [newPostSumbnail, setNewPostSumbnail] = useState<UploadFile>({
    objectUrl: "",
    fileType: ""
  });
  const [newPostImages, setNewPostImages] = useState<UploadFile[]>([]);
  const [newPostTargetAgeGroup, setNewPostTargetAgeGroup] = useState<number>(
    20
  );
  const [newPostTargetGender, setNewPostTargetGender] = useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();

  useMemo(() => {
    if (loginState.error) {
      enqueueSnackbar(JSON.stringify(loginState.error), {
        variant: "error"
      });
    }
    // eslint-disable-next-line
  }, [loginState.error]);

  useMemo(() => {
    if (loginState.data.loggedInId) {
      setIsSkipFetch(false);
      postsQuery.refetch({
        ornerId: loginState.data.loggedInId
      });
    }
    // eslint-disable-next-line
  }, [loginState.data.loggedInId]);

  const onRequestAddPost = async () => {
    const uploadImage = async (file: File) => {
      const url = `${nanoid()}${file.type}`;

      await s3
        .putObject({
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          Bucket: process.env.REACT_APP_S3_BUCKET_NAME!,
          Key: url,
          Body: file,
          ACL: "public-read"
        })
        .promise()
        .catch(err => {
          enqueueSnackbar(JSON.stringify(err), {
            variant: "error"
          });
        });

      return url;
    };

    const sumbnailFile = await fetch(newPostSumbnail.objectUrl)
      .then(response => response.blob())
      .then(blob => new File([blob], `${nanoid()}${newPostSumbnail.fileType}`));
    const sumbnailUrl = await uploadImage(sumbnailFile);

    const postImages: string[] = [];

    await Promise.all(
      newPostImages.map(async image => {
        try {
          const imageFile = await fetch(image.objectUrl)
            .then(response => response.blob())
            .then(blob => new File([blob], `${nanoid()}${image.fileType}`));
          const imageUrl = await uploadImage(imageFile).catch(err => {
            enqueueSnackbar(JSON.stringify(err), {
              variant: "error"
            });
          });

          postImages.push(imageUrl as string);
        } catch (err) {
          enqueueSnackbar(JSON.stringify(err), {
            variant: "error"
          });
        }
      })
    );

    await addPostMutation({
      variables: {
        name: newPostName,
        start: newPostStart,
        finish: newPostFinish,
        discription: newPostDiscription,
        sumbnail: sumbnailUrl,
        images: postImages,
        ornerId: loginState.data.loggedInId,
        address: newPostAddress,
        location: newPostLocation,
        target: {
          ageGroup: newPostTargetAgeGroup,
          gender: newPostTargetGender
        }
      }
    }).catch(err => {
      enqueueSnackbar(JSON.stringify(err), {
        variant: "error"
      });
    });

    setIsOpenDialog(false);
    enqueueSnackbar("投稿を作成しました。", {
      variant: "success"
    });
  };

  return (
    <>
      <div className={classes.wrap}>
        {postsQuery.loading &&
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
        {loginState.data.isLoggedIn &&
          loginState.data.loggedInRole === Roles.Orner && (
            <>
              <Title>
                {loginState.data.loggedInId}
                の投稿一覧
              </Title>
              {postsQuery.data?.posts.map(post => (
                <Card key={post?.id}>
                  <CardContent>
                    <div>
                      <Typography>Post ID</Typography>
                      <Typography>{post?.id}</Typography>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          )}
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
        <DialogTitle>新規投稿作成</DialogTitle>
        <DialogContent>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              イベント名
              <TextField
                className={classes.textField}
                value={newPostName}
                onChange={e => setNewPostName(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              開始時間
              <TextField
                className={classes.textField}
                value={newPostStart.toUTCString()}
                type="datetime-local"
                onChange={e => setNewPostStart(new Date(e.target.value))}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              終了時間
              <TextField
                className={classes.textField}
                value={newPostFinish.toUTCString()}
                type="datetime-local"
                defaultValue={newPostFinish.toUTCString()}
                onChange={e => setNewPostFinish(new Date(e.target.value))}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              説明
              <TextField
                className={classes.textField}
                value={newPostDiscription}
                onChange={e => setNewPostDiscription(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              イベント名
              <TextField
                className={classes.textField}
                value={newPostName}
                onChange={e => setNewPostName(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              ターゲット（年代）
              <TextField
                className={classes.textField}
                value={newPostTargetAgeGroup}
                onChange={e => setNewPostTargetAgeGroup(Number(e.target.value))}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              ターゲット（性別）
              <TextField
                className={classes.textField}
                value={newPostTargetGender}
                onChange={e => setNewPostTargetGender(Number(e.target.value))}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              サムネイル画像
              <div className={classes.textFieldWrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.textField}
                >
                  画像を選択
                  <input
                    type="file"
                    className={classes.fileInput}
                    onChange={e =>
                      e.target.files &&
                      setNewPostSumbnail({
                        objectUrl: URL.createObjectURL(e.target.files[0]),
                        fileType: e.target.files[0].type
                      })
                    }
                  />
                </Button>
              </div>
            </InputLabel>
          </div>
          {newPostSumbnail.objectUrl && (
            <div className={classes.textFieldWrapper}>
              <InputLabel>
                サムネイルプレビュー
                <div className={classes.textFieldWrapper}>
                  <img
                    src={newPostSumbnail.objectUrl}
                    className={classes.ornerImage}
                    alt="サムネイルプレビュー"
                  />
                </div>
              </InputLabel>
              <Button
                onClick={() =>
                  setNewPostSumbnail({
                    objectUrl: "",
                    fileType: ""
                  })
                }
              >
                サムネイル削除
              </Button>
            </div>
          )}
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              イメージ一覧
              <div className={classes.textFieldWrapper}>
                <DropzoneArea
                  showFileNamesInPreview={true}
                  showPreviewsInDropzone={true}
                  onChange={files =>
                    files &&
                    setNewPostImages(
                      files.map(
                        (file: any) =>
                          ({
                            objectUrl: URL.createObjectURL(file),
                            fileType: file.type
                          } as UploadFile)
                      )
                    )
                  }
                />
              </div>
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              住所
              <TextField
                className={classes.textField}
                value={newPostAddress}
                onChange={e => setNewPostAddress(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              緯度
              <TextField
                className={classes.textField}
                value={newPostLocation.xIndex}
                onChange={e =>
                  setNewPostLocation({
                    ...newPostLocation,
                    xIndex: Number(e.target.value)
                  })
                }
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              経度
              <TextField
                className={classes.textField}
                value={newPostLocation.yIndex}
                onChange={e =>
                  setNewPostLocation({
                    ...newPostLocation,
                    yIndex: Number(e.target.value)
                  })
                }
              />
            </InputLabel>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            color="primary"
            onClick={() => onRequestAddPost()}
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

export default Posts;
