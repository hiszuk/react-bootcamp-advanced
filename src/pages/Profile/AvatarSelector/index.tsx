import { Button, CardMedia } from "@material-ui/core";
import {
  useState,
  useRef,
  ChangeEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import useStyles from "./style";

// AvatarSelectコンポーネントのプロップスとして、引数を型定義する
export type AvatarSelectProps = {
  currentAvatarUrl: string | undefined;
  avatarFile: File | undefined;
  setAvatarFile: Dispatch<SetStateAction<File | undefined>>;
};

// 親コンポーネントから、AvatarSelectに渡される引数
export const AvatarSelect = ({
  currentAvatarUrl,
  avatarFile,
  setAvatarFile,
}: AvatarSelectProps) => {
  const styles = useStyles();

  // これは、画像表示用のURLを格納します。
  // URLは文字列なので、string型を指定しています。
  const [avatarURL, setavatarURL] = useState<string>(currentAvatarUrl || "");

  // ファイルを選択した後に、`setFile`を使用して`file`に選択されたファイルを格納。
  // `selectedFile`を`<input />`から呼び出すことで処理を実行します。
  const selectedFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.currentTarget.files?.length) {
      setAvatarFile(event.currentTarget.files[0]);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  // useEffectは、第2引数に指定した変数が変更されたら、第1引数の関数を実行します。
  useEffect(() => {
    // ファイルが空の場合は、実行しない
    if (avatarFile) {
      const avatarURL = URL.createObjectURL(avatarFile);
      setavatarURL(avatarURL);
    }
  }, [avatarFile]);

  return (
    <div className={styles.root}>
      {avatarURL && (
        <div className={styles.full}>
          <CardMedia component="img" src={avatarURL || ""} className={styles.avatarFigure} />
        </div>
      )}
      <div className={styles.button}>
        <input type="file" hidden ref={inputRef} onChange={selectedFile} />
        <Button variant="contained" color="primary" onClick={handleClick}>
          画像を変更
        </Button>
      </div>
    </div>
  );
};
