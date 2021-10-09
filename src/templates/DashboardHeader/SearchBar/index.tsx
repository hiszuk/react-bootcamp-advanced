import { IconButton, InputBase, Paper } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useRef } from "react";
import { useRecoilState } from "recoil";
import { SearchWords } from "../../../stores/SearchWords";

// カスタムスタイルをimport
import useStyles from "./style";

export const SearchBar = () => {
  // カスタムスタイルを生成
  const styles = useStyles();

  const inputRef = useRef<HTMLInputElement>(null);
  const [searchWords, setSearchWords] = useRecoilState(SearchWords);

  // 検索ボタンクリックで検索条件の入力欄をrecoilに反映
  const handleClickSearch = () => {
    const keyword = inputRef.current?.value;
    if (keyword) {
      setSearchWords({ description: keyword });
    } else {
      setSearchWords(undefined);
    }
  }

  return (
    // elevation={0} : 影を削除
    // variant="outlined" : 枠線を表示
    <Paper className={styles.root} elevation={0} variant="outlined">
      {/* 
        最初に表示していく文字。
        何も入力されていない検索バーに"検索"と表示されます。
      */}
      <InputBase className={styles.input} placeholder="検索" inputRef={inputRef} defaultValue={searchWords?.description} />
      {/* 検索窓の横にある、検索アイコンを表示 */}
      <div className={styles.searchIcon}>
        <IconButton onClick={handleClickSearch}>
          <SearchIcon />
        </IconButton>
      </div>
    </Paper>
  );
};
