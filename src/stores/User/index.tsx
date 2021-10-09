// src/stores/User/index.tsxを作成

import { atom } from "recoil";
import { Users, Subscribes } from "../../utils/graphql/generated";

// Pickはある型から特定のプロパティのみを抜き出し、新しい型を生成するTypescriptの機能
export type GlobalUserType =
  | Pick<
      Users,
      | "id"
      | "name"
      | "email"
      | "profile_photo_url"
      | "created_at"
      | "updated_at"
    >
    & { subscribesByUserid?: Pick<Subscribes, "subscribe_id">[] }
    | undefined;

// keyはユニークとなるように命名する
export const GlobalUser = atom<GlobalUserType>({
  key: "GlobalUser",
  default: undefined,
});
