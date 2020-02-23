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
import Avatar from "@material-ui/core/Avatar";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
import { DropzoneArea } from "material-ui-dropzone";
import { useSnackbar } from "notistack";
import nanoid from "nanoid";
import { s3 } from "../common/aws";
import {
  useOrnersQuery,
  useAddOrnerMutation,
  AddOrnerMutationVariables,
  useDeleteOrnerMutation,
  Orner,
  useUpdateOrnerMutation,
  GeolocationInput
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

interface Location {
  lat: number;
  lng: number;
}

interface UploadFile {
  objectUrl: string;
  fileType: string;
}

interface OrnerInfoProps extends Orner {
  handleSuccessUpdateUser: () => void;
  handleFailureUpdateUser: (error: any) => void;
  handleSuccessDeleteUser: () => void;
  handleFailureDeleteUser: (error: any) => void;
}

const OrnerInfo: React.FC<OrnerInfoProps> = props => {
  const classes = useStyle();
  const ornersQuery = useOrnersQuery();
  const [deleteOrnerMutation] = useDeleteOrnerMutation();
  const [updateOrnerMutation] = useUpdateOrnerMutation();
  const [isEditting, setIsEditting] = useState<boolean>(false);
  const [newOrnerName, setNewOrnerName] = useState<string>(props.name);
  const [newOrnerEmail, setNewOrnerEmail] = useState<string>(props.email);
  const [newOrnerIcon, setNewOrnerIcon] = useState<UploadFile>({
    objectUrl: "",
    fileType: ""
  });
  const [newOrnerImages, setNewOrnerImages] = useState<UploadFile[]>([]);
  const [newOrnerDiscription, setNewOrnerDiscription] = useState<string>(
    props.discription!
  );
  const [newOrnerAddress, setNewOrnerAddress] = useState<string>(
    props.address!
  );
  const [newOrnerLocation, setNewOrnerLocation] = useState<GeolocationInput>(
    props.location!
  );

  const onRequestDeleteOrner = async (id: string) => {
    await deleteOrnerMutation({
      variables: {
        id: props.id
      }
    }).catch(err => {
      props.handleFailureDeleteUser(err);
    });

    await ornersQuery.refetch();
    setIsEditting(false);
  };

  const onRequestUpdateOrner = async () => {
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
          props.handleFailureUpdateUser(err);
        });

      return url;
    };

    const iconFile = await fetch(newOrnerIcon.objectUrl)
      .then(response => response.blob())
      .then(blob => new File([blob], `${nanoid()}${newOrnerIcon.fileType}`));
    const iconUrl = await uploadImage(iconFile);

    const ornerImages: string[] = [];

    await Promise.all(
      newOrnerImages.map(async image => {
        try {
          const imageFile = await fetch(image.objectUrl)
            .then(response => response.blob())
            .then(blob => new File([blob], `${nanoid()}${image.fileType}`));
          const imageUrl = await uploadImage(imageFile).catch(err => {
            props.handleFailureUpdateUser(err);
          });

          ornerImages.push(imageUrl as string);
        } catch (err) {
          props.handleFailureUpdateUser(err);
        }
      })
    );

    await updateOrnerMutation({
      variables: {
        id: props.id,
        email: newOrnerEmail,
        name: newOrnerName,
        discription: newOrnerDiscription,
        icon: iconUrl,
        images: ornerImages,
        address: newOrnerAddress,
        location: newOrnerLocation
      }
    }).catch(err => {
      return props.handleFailureUpdateUser(err);
    });

    await ornersQuery.refetch();
    setIsEditting(false);
  };

  return (
    <Card key={props.id} className={classes.card}>
      <CardContent>
        <div className={classes.attributeWrap}>
          <Typography className={classes.title} color="textSecondary">
            オーナーID
          </Typography>
          <Typography>{props.id}</Typography>
        </div>
        <div className={classes.attributeWrap}>
          <Typography className={classes.title} color="textSecondary">
            オーナー名
          </Typography>
          {isEditting ? (
            <TextField
              value={newOrnerName}
              onChange={e => setNewOrnerName(e.target.value)}
            />
          ) : (
            <Typography>{props.name}</Typography>
          )}
        </div>
        <div className={classes.attributeWrap}>
          <Typography className={classes.title} color="textSecondary">
            連絡先Email
          </Typography>
          {isEditting ? (
            <TextField
              value={newOrnerEmail}
              onChange={e => setNewOrnerEmail(e.target.value)}
            />
          ) : (
            <Typography>{props.email}</Typography>
          )}
        </div>
        <div className={classes.attributeWrap}>
          <Typography className={classes.title} color="textSecondary">
            アイコン画像
          </Typography>
          {isEditting && (
            <div className={classes.attributeWrap}>
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
                    setNewOrnerIcon({
                      objectUrl: URL.createObjectURL(e.target.files[0]),
                      fileType: e.target.files[0].type
                    })
                  }
                />
              </Button>
            </div>
          )}
          <Avatar
            src={`https://sicfler-bucket.s3-ap-northeast-1.amazonaws.com/${props.icon!}`}
            className={classes.avatar}
          />
        </div>
        <div className={classes.attributeWrap}>
          <Typography className={classes.title} color="textSecondary">
            オーナーサムネイル画像
          </Typography>
          {isEditting ? (
            <div className={classes.textFieldWrapper}>
              <DropzoneArea
                showFileNamesInPreview={true}
                showPreviewsInDropzone={true}
                onChange={files =>
                  files &&
                  setNewOrnerImages(
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
          ) : (
            <>
              {props.images.map(
                image =>
                  image && (
                    <img
                      src={`https://sicfler-bucket.s3-ap-northeast-1.amazonaws.com/${image}`}
                      alt="orner images"
                      className={classes.ornerImage}
                      key={image}
                    />
                  )
              )}
            </>
          )}
        </div>
        <div className={classes.attributeWrap}>
          <Typography className={classes.title} color="textSecondary">
            自己紹介文
          </Typography>
          {isEditting ? (
            <TextField
              value={newOrnerDiscription}
              onChange={e => setNewOrnerDiscription(e.target.value)}
            />
          ) : (
            <Typography>{props.discription}</Typography>
          )}
        </div>
        <div className={classes.attributeWrap}>
          <Typography className={classes.title} color="textSecondary">
            オーナー拠点住所
          </Typography>
          {isEditting ? (
            <TextField
              value={newOrnerAddress}
              onChange={e => setNewOrnerAddress(e.target.value)}
            />
          ) : (
            <Typography>{props.address}</Typography>
          )}
        </div>
        <div className={classes.attributeWrap}>
          <Typography className={classes.title} color="textSecondary">
            オーナー拠点住所座標
          </Typography>
          {isEditting ? (
            <TextField
              value={newOrnerLocation.lat}
              onChange={e =>
                setNewOrnerLocation({
                  ...newOrnerLocation,
                  lat: Number(e.target.value)
                })
              }
            />
          ) : (
            <Typography>
              緯度：
              {props.location?.lat!}
            </Typography>
          )}
          {isEditting ? (
            <TextField
              value={newOrnerLocation.lng}
              onChange={e =>
                setNewOrnerLocation({
                  ...newOrnerLocation,
                  lng: Number(e.target.value)
                })
              }
            />
          ) : (
            <Typography>
              経度：
              {props.location?.lng!}
            </Typography>
          )}
        </div>
      </CardContent>
      <CardActions>
        {isEditting ? (
          <>
            <Button
              onClick={() => {
                setIsEditting(false);
              }}
            >
              キャンセル
            </Button>
            <Button onClick={() => onRequestUpdateOrner()}>送信</Button>
            <Button
              onClick={() => onRequestDeleteOrner(props.id)}
              color="secondary"
            >
              ユーザーを削除
            </Button>
          </>
        ) : (
          <Button
            onClick={() => {
              setIsEditting(true);
            }}
          >
            編集
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

const Orners: React.FC = () => {
  const classes = useStyle();
  const ornersQuery = useOrnersQuery();
  const [addOrnerMutation] = useAddOrnerMutation();
  const { enqueueSnackbar } = useSnackbar();
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [newOrnerUserId, setNewOrnerUserId] = useState<string>("");
  const [newOrnerEmail, setNewOrnerEmail] = useState<string>("");
  const [newOrnerName, setNewOrnerName] = useState<string>("");
  const [newOrnerDetail, setNewOrnerDetail] = useState<string>("");
  const [newOrnerIcon, setNewOrnerIcon] = useState<UploadFile>({
    objectUrl: "",
    fileType: ""
  });
  const [newOrnerImages, setNewOrnerImages] = useState<UploadFile[]>([]);
  const [newOrnerAdress, setNewOrnerAdress] = useState<string>("");
  const [newOrnerLocation, setNewOrnerLocation] = useState<Location>({
    lat: 0,
    lng: 0
  });

  useMemo(() => {
    if (ornersQuery.error) {
      enqueueSnackbar(JSON.stringify(ornersQuery.error), {
        variant: "error"
      });
    }
    // eslint-disable-next-line
  }, [ornersQuery.error]);

  const onRequestAddOrner = async () => {
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
          enqueueSnackbar(JSON.stringify(err));
        });

      return url;
    };

    const iconFile = await fetch(newOrnerIcon.objectUrl)
      .then(response => response.blob())
      .then(blob => new File([blob], `${nanoid()}${newOrnerIcon.fileType}`));
    const iconUrl = await uploadImage(iconFile);

    const ornerImages: string[] = [];

    await Promise.all(
      newOrnerImages.map(async image => {
        try {
          const imageFile = await fetch(image.objectUrl)
            .then(response => response.blob())
            .then(blob => new File([blob], `${nanoid()}${image.fileType}`));
          const imageUrl = await uploadImage(imageFile).catch(err => {
            enqueueSnackbar(JSON.stringify(err), {
              variant: "error"
            });
          });

          ornerImages.push(imageUrl as string);
        } catch (err) {
          enqueueSnackbar(JSON.stringify(err), {
            variant: "error"
          });
        }
      })
    );

    await addOrnerMutation({
      variables: {
        id: newOrnerUserId,
        email: newOrnerEmail,
        name: newOrnerName,
        discription: newOrnerDetail,
        icon: iconUrl,
        images: ornerImages,
        address: newOrnerAdress,
        location: newOrnerLocation
      } as AddOrnerMutationVariables
    }).catch(err => {
      enqueueSnackbar(JSON.stringify(err), {
        variant: "error"
      });
    });

    await ornersQuery.refetch();
    setIsOpenDialog(false);
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
            <OrnerInfo
              id={orner?.id!}
              name={orner?.name!}
              email={orner?.email!}
              icon={orner?.icon!}
              discription={orner?.discription!}
              images={orner?.images!}
              address={orner?.address!}
              location={orner?.location!}
              handleFailureDeleteUser={err => {
                enqueueSnackbar(JSON.stringify(err), {
                  variant: "error"
                });
              }}
              handleFailureUpdateUser={err => {
                enqueueSnackbar(JSON.stringify(err), {
                  variant: "error"
                });
              }}
              handleSuccessDeleteUser={() => {
                enqueueSnackbar("オーナーを削除しました。", {
                  variant: "default"
                });
              }}
              handleSuccessUpdateUser={() => {
                enqueueSnackbar("オーナー情報を変更しました。", {
                  variant: "success"
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
        <DialogTitle>新規オーナー追加</DialogTitle>
        <DialogContent>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              ユーザーIDを指定
              <TextField
                className={classes.textField}
                value={newOrnerUserId}
                onChange={e => setNewOrnerUserId(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              連絡用Email
              <TextField
                className={classes.textField}
                value={newOrnerEmail}
                onChange={e => setNewOrnerEmail(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              オーナー名
              <TextField
                className={classes.textField}
                value={newOrnerName}
                onChange={e => setNewOrnerName(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              自己紹介文
              <TextField
                className={classes.textField}
                rows={4}
                rowsMax={8}
                multiline={true}
                value={newOrnerDetail}
                onChange={e => setNewOrnerDetail(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              アイコン
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
                      setNewOrnerIcon({
                        objectUrl: URL.createObjectURL(e.target.files[0]),
                        fileType: e.target.files[0].type
                      })
                    }
                  />
                </Button>
              </div>
            </InputLabel>
          </div>
          {newOrnerIcon && (
            <div className={classes.textFieldWrapper}>
              <InputLabel>
                アイコンプレビュー
                <div className={classes.textFieldWrapper}>
                  <Avatar
                    src={newOrnerIcon.objectUrl}
                    className={classes.avatar}
                  />
                </div>
              </InputLabel>
              <Button
                onClick={() =>
                  setNewOrnerIcon({
                    objectUrl: "",
                    fileType: ""
                  })
                }
              >
                アイコン削除
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
                    setNewOrnerImages(
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
                value={newOrnerAdress}
                onChange={e => setNewOrnerAdress(e.target.value)}
              />
            </InputLabel>
          </div>
          <div className={classes.textFieldWrapper}>
            <InputLabel>
              緯度
              <TextField
                className={classes.textField}
                value={newOrnerLocation.lat}
                onChange={e =>
                  setNewOrnerLocation({
                    ...newOrnerLocation,
                    lat: Number(e.target.value)
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
                value={newOrnerLocation.lng}
                onChange={e =>
                  setNewOrnerLocation({
                    ...newOrnerLocation,
                    lng: Number(e.target.value)
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
