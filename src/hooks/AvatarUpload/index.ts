import { useEffect, useState } from "react";
import { storage } from "../../utils/Firebase/config";
import {
  UserByIdDocument,
  useUpdateUserMutation,
} from "../../utils/graphql/generated";
import { useRecoilValue } from "recoil";
import { GlobalUser } from "../../stores/User";

type UploadProps = {
  file: {
    avatar: File | undefined;
  };
  name: string;
  description?: string;
  userId: string;
};

export const useAvatarUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();

  const [mutation, { error: apolloError }] = useUpdateUserMutation({
    refetchQueries: [{ query: UserByIdDocument }],
  });

  // `video`の`ownerId`のために、userのidを取得する
  const user = useRecoilValue(GlobalUser);

  // Firebase Storageにファイルをアップロードする処理
  const uploadStorage = (id: string, file: File | undefined, path: string) => {
    // ファイルから拡張子を抜き出す
    if (file) {
      const exe = file.name.split(".").pop();
      return storage.ref(`${path}/${id}.${exe}`).put(file);
    } else {
      return null;
    }
  };

  const upload = async ({ file, name, description, userId }: UploadProps) => {
    // ユーザーが読み込まれていない、未ログインであれば処理を中断する
    if (!user?.id) {
      return;
    }

    // 処理が始まったら、ローディング中にする
    setLoading(true);

    // avatarのファイル名はユーザーIDとする
    const avatarName = user.id;

    // try-catch構文でPromise(アップロード処理)のエラーをキャッチする
    try {
      // Avatarのアップロード処理
      const avatarUploadTask = await uploadStorage(
        avatarName,
        file.avatar,
        "avatars"
      );

      // Avatar URL取得
      let avatarURL: string = "";
      if (avatarUploadTask) {
        avatarURL = await avatarUploadTask.ref.getDownloadURL();
      } else {
        avatarURL = user.profile_photo_url || "";
      }

      // Avatarのメタデータを保存する
      const res = await mutation({
        variables: {
          id: userId,
          name: name,
          profile_photo_url: avatarURL,
        },
      });

      // 全ての処理が終わったら、Avatarのメタデータを返す
      return res.data?.update_users_by_pk;
    } catch (error) {
      // アップロードの途中でエラーが発生したら、処理を中断して、ここに記述される処理が行われる
      console.error(error);
      setError(new Error("エラーが発生しました。最初からやり直してください。"));
    } finally {
      // 全ての処理が完了したら、ローディングをfalseにする
      setLoading(false);
    }
  };

  // Apollo Clientのエラーをキャッチする
  useEffect(() => {
    if (apolloError) {
      console.error(apolloError);
      setError(new Error("エラーが発生しました。最初からやり直してください。"));
    }
  }, [apolloError]);

  return {
    upload,
    loading,
    error,
  };
};
