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
import { AvatarSelect } from "./AvatarSelector";
import useStyles from "./style";
import { useRecoilValue } from "recoil";
import { AccountLoaded } from "../../stores/AccountLoaded";
import { useEffect, useState } from "react";
import { GlobalUser } from "../../stores/User";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';

export const Profile = () => {
  const styles = useStyles();

  // recoilの値を使用
  const accountLoaded = useRecoilValue(AccountLoaded);
  const user = useRecoilValue(GlobalUser);

  // 追加
  // ファイル管理用ローカルステート
  const [avatarFile, setAvatarFile] = useState<File>();

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
  const [open, setOpen] = useState<boolean>(true)
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  }

  return (
    <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
      {/* タイトル用コンポーネント */}
      <DialogTitle>
        プロファイル
        <IconButton className={styles.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent className={styles.body}>
        {/* アカウントが存在すれば、アップロードコンポーネントを表示 */}
        {user?.id ? (
          <Grid container spacing={4}>
            <Grid xs item>
              {/*
                ステートをpropsとして渡す
              */}
              <AvatarSelect
                currentAvatarUrl={user.profile_photo_url||undefined}
                avatarFile={avatarFile}
                setAvatarFile={setAvatarFile}
              />
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid xs item>
              {/*
                ステートとセッターをpropsとして渡す。
              */}
              <UploadForm avatarFile={avatarFile} />
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
