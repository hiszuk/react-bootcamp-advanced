import { atom } from "recoil";
import { Videos } from "../../utils/graphql/generated";

export type SearchWordsType =
  Pick<
    Videos,
    | "description"
  >
  | undefined;

export const SearchWords = atom<SearchWordsType>({
  key: "SearchWords",
  default: undefined,
});
