import { Button, TextField, Typography } from "@material-ui/core";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { useAvatarUpload } from "../../../hooks/AvatarUpload";
import { GlobalUser } from "../../../stores/User";
import useStyles from "./style";

// UploadFormコンポーネントのプロップスとして、引数を型定義する
export type UploadFormProps = {
  avatarFile: File | undefined;
};

export const UploadForm = ({ avatarFile }: UploadFormProps) => {
  const styles = useStyles();
  const user = useRecoilValue(GlobalUser);

  // ユーザー入力を受け取る`ref`変数
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  // エラーを表示する用のステート
  const [errorMessage, setErrorMessage] = useState<Error>();

  // AvatarをアップロードするためのHooks
  const { upload, loading, error: uploadError } = useAvatarUpload();

  // 「Avatarをアップロード」ボタンをクリックしたら実行する関数
  const submit = () => {
    setErrorMessage(undefined);

    if (!user?.id) {
      return setErrorMessage(new Error("ログインされていません。"));
    }

    if (!nameRef.current?.value) {
      return setErrorMessage(new Error("名前をしてください。"));
    }

    upload({
      file: {
        avatar: avatarFile,
      },
      name: nameRef.current.value,
      description: descRef.current?.value,
      userId: user.id,
    });
  };

  // Hooksからのエラーを受け取り、画面表示用のエラーステートに渡す。
  useEffect(() => {
    setErrorMessage(uploadError);
  }, [uploadError]);

  return (
    <>
      <label className={styles.label}>
        <Typography variant="body2">名前</Typography>
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          inputRef={nameRef}
          defaultValue={user?.name}
        />
      </label>

      <label className={styles.label}>
        <Typography variant="body2">近況</Typography>
        <TextField
          size="small"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          inputRef={descRef}
        />
      </label>

      {
        // エラーがあれば表示
        errorMessage?.message && (
          <label className={styles.label}>
            <Typography color="error">{errorMessage.message}</Typography>
          </label>
        )
      }

      <div className={styles.butotn}>
        <Button
          variant="contained"
          color="primary"
          disabled={loading}
          onClick={submit}
        >
          {loading ? "更新中" : "プロファイル更新"}
        </Button>
      </div>
    </>
  );
};
