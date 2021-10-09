import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Divider,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import { UploadForm } from "./UploadForm";
import { VideoSelect } from "./VideoSelector";
import useStyles from "./style";
import { useRecoilValue } from "recoil";
import { AccountLoaded } from "../../stores/AccountLoaded";
import { useEffect, useState } from "react";
import { GlobalUser } from "../../stores/User";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';

export const Upload = () => {
  const styles = useStyles();

  // recoilの値を使用
  const accountLoaded = useRecoilValue(AccountLoaded);
  const user = useRecoilValue(GlobalUser);

  // 追加
  // ファイル管理用ローカルステート
  const [videoFile, setVideoFile] = useState<File>();
  const [thumbFile, setThumbFile] = useState<File>();

  // react routerを使用する
  const navigate = useNavigate();

  // アカウントが読み込まれていない、未ログインであれば`/login`へリダレクト
  useEffect(() => {
    if (accountLoaded) {
      if (!user?.id) {
        navigate("/login");
      }
    }
  }, [accountLoaded, user?.id]);

  // Dialogクローズ用
  const [open, setOpen] = useState<boolean>(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  }

  return (
    // ダイアログコンポーネント
    // fullWidth: trueの場合、画面いっぱいにダイアログを表示
    // maxWidth: ダイアログの横幅の最大値を指定。指定できるプロパティはこちら(https://material-ui.com/api/dialog/)
    // open: ダイアログを表示するか。今回はURLを開いている際は、表示し続けるのでtrueを指定
    <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
      {/* タイトル用コンポーネント */}
      <DialogTitle>
        動画のアップロード
        <IconButton className={styles.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      {/* 
        コンテント用
        2カラムのレイアウトを実装する  
      */}
      <DialogContent className={styles.body}>
        {/* アカウントが存在すれば、アップロードコンポーネントを表示 */}
        {user?.id ? (
          <Grid container spacing={4}>
            <Grid xs item>
              {/*
                ステートをpropsとして渡す
              */}
              <VideoSelect
                videoFile={videoFile}
                setVideoFile={setVideoFile}
                setThumbFile={setThumbFile}
              />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid xs item>
              {/*
                ステートとセッターをpropsとして渡す。
              */}
              <UploadForm videoFile={videoFile} thumbFile={thumbFile} />
            </Grid>
          </Grid>
        ) : (
          // ローディングコンポーネント表示
          <Grid container justifyContent="center">
            <CircularProgress size={50} />
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
};
