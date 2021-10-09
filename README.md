# ReactBootcamp Advanced

ReactBootCampを終了した方が、さらに機能追加をする際に参考として頂けるよう作成しました。

[元となるブランチはこちら](https://github.com/Hiro-mackay/react-bootcamp/tree/bootcamp-4/source)

[元ドキュメントはこちらから](https://github.com/Hiro-mackay/react-bootcamp/tree/bootcamp-4/document)


----
# React BootCamp Advanced 追加・修正内容

## 1. ワーニング除去

### 1.1　. Warning: Each child in a list should have a unique "key" prop.

対象ソース

- src/pages/Home/index.tsx
- src/pages/Upload/VideoSelector/index.tsx
- src/pages/Watch/index.tsx

```javascript
videos.map((video) => {
  <Grid item xs={3}>
    <Link to={`/watch/${video.id}`}　...>
      <VidoCard ... />
    </Link>
  </Grid>
})
```
上記のような場合、ユニークなkeyを指定すれば警告は抑えられる

```javascript
videos.map((video) => {
  <Grid item xs={3}　key=${video.id}>
    <Link to={`/watch/${video.id}`} ...>
      <VidoCard ... />
    </Link>
  </Grid>
})
```

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/ed8cf2d8110abc58bf7098410c9b0f112580e38f

### 1.2. Warning: Failed prop type: Material-UI: Either `children`, `image`, `src` or `component` prop must be specified.

対象ソース

- src/components/VideoHorizontalCard/index.tsx

Material-UIのCardMediaイメージソースのURLがundefinedの場合警告が出る。

対策としてはsrcがundefinedの場合はno-image.jpgを表示するようにする。

修正前：
```javascript
<CardMedia className={styles.media} image={src} title="Thumbnail" />
```

修正後：
```javascript
<CardMedia className={styles.media} image={src ? src : '/static/no-image.jpg'} title="Thumbnail" />
```

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/3a96a1fe7bb646b2deebc2b918a85cfa030e0230

### 1.3. ESLintワーニング対策

Mackayさん記事参照　[useEffect has amissing dependencyのwarningを解消する](https://zenn.dev/mackay/articles/1e8fcce329336d)

紹介されている中の「コード全体でESLintのルールを無効にする」方法を採用します。

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/01a79278867ecec84929a044130be9ad0e188ab7

### 1.4. firebaseのワーニング対策と多重起動対策

firebaseで以下の警告の対策を行います。また、多重起動時にエラーとなるのを防止する対策も行います。

警告内容
```
It looks like you're using the development build of the Firebase JS SDK.
When deploying Firebase apps to production, it is advisable to only import
the individual SDK components you intend to use.

For the module builds, these are available in the following manner
(replace <PACKAGE> with the name of a component - i.e. auth, database, etc):

CommonJS Modules:
const firebase = require('firebase/app');
require('firebase/<PACKAGE>');

ES Modules:
import firebase from 'firebase/app';
import 'firebase/<PACKAGE>';

Typescript:
import firebase from 'firebase/app';
import 'firebase/<PACKAGE>';
```

import部分を以下のように変更します。

```javascript
import firebase from "firebase/app";
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"
```

また、`initializeApp` 部分を以下のように変更します。

```javascript
// 既にインスタンスが存在するときは初期化しない
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}
```

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/3c882a3c3b482629563fe2e8d21c209e24c01910

### 1.5. Warning: Can't perform a React state update on an unmounted component.

ログインしていない状態から、ログイン画面経由でホーム画面に遷移した場合、下記ワーニングが表示される対策

```
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function.
    at Login (http://localhost:3000/static/js/main.chunk.js:4029:72)
    at Outlet (http://localhost:3000/static/js/vendors~main.chunk.js:158764:10)
    at div
    at SimpleLayout (http://localhost:3000/static/js/main.chunk.js:3287:72)
```

　**原因**

`src/hooks/Authentication/useAuthHelper/index.ts` 内で認証関連のロジックに成功したらリダイレクトしコンポーネントはアンマウントされる。

しかし、アンマウントされた後で`setXxx`でコンポーネント内の状態を変更しようとしているため、上記ワーニングが発生している。

```javascript
try {
  // 認証ロジックを実行
  // 成功すれば、リダイレクト処理（この処理はここでは書いてありません。）
  await executeProcess();
} catch (error: any) {
  // エラーがあれば、エラーをセットして処理を中断
  setErrorHandler("main", error.message);
} finally {
  // 処理が終了したら、ローディングはfalse
  setLoading(false);
}
};
```

`executeProcess` 内でリダイレクトされるため、その後の処理で警告が発生している。

**対象**

`useAuthHelper`と、それを使用し、自身の処理内でリダイレクトしているものが対象

- src/hooks/Authentication/useAuthHelper/index.ts
- src/hooks/Authentication/useLogin/index.ts
- src/hooks/Authentication/useSignup/index.ts

**対策の方針**

リダイレクトする場所を引数として`useAuthHelper`に与えて、`useAuthHelper`内で必要に応じてリダイレクトするように変更する。

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/1b1f209cce5210bd018d5ff68110b58c2def0d3f


## 2. アップロードダイアログをキャンセル可能に

アップロードダイアログにクローズボタンを追加してダイアログをキャンセル可能にする。

ただし、キャンセル後は元の画面に戻るのではなく、ホーム画面に戻るものとする。

### 2.1. クローズ機能とアイコンを実装

対象ファイル：
- src/pages/Upload/index.tsx

修正内容：

アイコンを追加
```javascript
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Divider,
  CircularProgress,
  IconButton,   // アイコン追加
} from "@material-ui/core";
import { UploadForm } from "./UploadForm";
import { VideoSelect } from "./VideoSelector";
import useStyles from "./style";
import { useRecoilValue } from "recoil";
import { AccountLoaded } from "../../stores/AccountLoaded";
import { useEffect, useState } from "react";
import { GlobalUser } from "../../stores/User";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@material-ui/icons/Close';   // アイコン追加
```

クローズ処理追加
```javascript
  // Dialogクローズ用
  const [open, setOpen] = useState<boolean>(true);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  }
```

クローズボタン追加と処理起動追加
```javascript
    <Dialog fullWidth={true} maxWidth="md" open={open} onClose={handleClose}>
      {/* タイトル用コンポーネント */}
      <DialogTitle>
        動画のアップロード
        <IconButton className={styles.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
```

### 2.2. クローズボタンのスタイル設定追加

対象ファイル：
- src/pages/Upload/style.ts

修正内容：

```javascript
import { makeStyles } from "@material-ui/core";

export default makeStyles({
  body: {
    marginTop: 40,
    marginBottom: 40,
  },
  closeButton: {
    position: 'absolute',
    right: '1rem',
    top: '0.5rem',
    color: 'gray',
  }
});
```

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/02a6a09a73cec0a55bebdb60b0f07abb2322c60b


## 3. ユーザーメニューを追加してログアウト可能に

ダッシュボードのアイコン画像をクリックすると、下記の機能を持ったポップアップメニューを作る。

機能：
- ログイン中の名前表示
- プロファイル変更機能へのリンク
- ログアウトへのリンク

### 3.1. ユーザーメニュー作成

`src/templates/DashboardHeader`以下に`UserMenu`ディレクトリを作成し、ポップアップメニューのコンポーネントを作成します。

`src/templates/DashboardHeader/UserMenu/index.tsx`
```javascript
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Divider, ListItemIcon, Typography } from "@material-ui/core";
import ExitToAppRounded from "@material-ui/icons/ExitToAppRounded"
import { useNavigate } from "react-router-dom";

export type UserMenuProps = {
  name?: string
  buttonRef: HTMLElement | null
  onClose: () => void
  onLogout: () => void
}

export const UserMenu = ({
  name = "NO NAME",
  buttonRef,
  onClose,
  onLogout
}: UserMenuProps) => {
  const navigate = useNavigate();
  const gotoPage = (url: string) => {
    onClose();
    navigate(url);
  };

  return (
    <div>
      <Menu
        id="user-menu"
        anchorEl={buttonRef}
        keepMounted
        open={Boolean(buttonRef)}
        onClose={onClose}
      >
        <MenuItem>{name}</MenuItem>
        <Divider />
        <MenuItem onClick={() => gotoPage("/")}>プロファイル</MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <ExitToAppRounded fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            ログアウト
          </Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
```

### 3.2. ダッシュボードからポップアップメニューをコールする

ダッシュボードのアバター画像をクリックするとユーザーメニュがポップアップするように機能を追加する。

`src/templates/DashboardHeader/index.tsx`
```javascript
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBar, Avatar, Button, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Logo } from "../../components/Logo";
import { SearchBar } from "./SearchBar";
import useStyles from "./style";
import { UserMenu } from "./UserMenu";

// 追加
import { useRecoilValue } from "recoil";
import { GlobalUser } from "../../stores/User";

export const DashboardHeader = () => {
  const styles = useStyles();

  // ユーザーメニューポップアップ追加
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleUsermenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUsermenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    navigate("/signout");
  };

  // ユーザー情報Atom
  const globalUser = useRecoilValue(GlobalUser);

  return (
    <AppBar elevation={0} color="inherit">
      <Toolbar className={styles.between}>
        <div className={styles.flex}>
          <IconButton>
            <MenuIcon />
          </IconButton>
          <Link to="/" className={styles.logo}>
            <Logo />
          </Link>
        </div>

        <SearchBar />

        <div className={styles.flex}>
          {/*
            ユーザーがログインしていれば、ユーザー用のデザインを表示
            未ログインであれば「ログインボタン」を表示
          */}
          {globalUser ? (
            <>
              <Link to="/upload">
                <IconButton>
                  <VideoCallIcon />
                </IconButton>
              </Link>
              <IconButton className={styles.profileIcon} onClick={handleUsermenuClick}>
                <Avatar />
              </IconButton>
              <UserMenu name={globalUser.name} buttonRef={anchorEl} onClose={handleUsermenuClose} onLogout={handleLogout} />
            </>
          ) : (
            <Button variant="outlined" color="primary" href="/login">
              ログイン
            </Button>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};
```


**修正ポイント**

**インポートを追加**
```javascript
import React from "react";    // 追加
import { Link, useNavigate } from "react-router-dom";    // 追加
import { AppBar, Avatar, Button, IconButton, Toolbar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import { Logo } from "../../components/Logo";
import { SearchBar } from "./SearchBar";
import useStyles from "./style";
import { UserMenu } from "./UserMenu";    // 追加
```

**ポップアップコントロールを追加**
```javascript
  // ユーザーメニューポップアップ追加
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleUsermenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleUsermenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    setAnchorEl(null);
    navigate("/signout");
  };
```

`handleUsermenuClick`イベントが発生した要素を`anchorEl`にセットして`<UserMenu />`の引数として渡すことで、その要素の上にポップアップメニューを表示する。

`<UserMenu />`に渡す関数として、ポップアップを閉じる関数`handleUsermenuClose`とログアウトを実行する関数`handleLogout`を定義する。

**ボタンクリック時の振る舞いを追加**
```jsx
              <IconButton className={styles.profileIcon} onClick={handleUsermenuClick}>
```

**ユーザーメニューコンポーネント**
```jsx
              <UserMenu name={globalUser.name} buttonRef={anchorEl} onClose={handleUsermenuClose} onLogout={handleLogout} />
```

### 発生する警告について
```
Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference. 
```
上記の警告が発生しているが、原因はMaterialUIのバージョンによるもの。

バージョン5にすれば解決するとのことだが、今のところバージョンアップできていない。


ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/e09385c3499ce46ea47f7968cc37b55df411bc80


## 4. ビデオ一覧表示の並び順を設定する

ホーム画面とウォッチ画面のビデオリストについて、表示順を設定する。

### 4.1. 並び順の変更

- ホーム画面：表示順　登録日時の降順(新しいもの→古いもの)
- ウォッチ画面：表示順　視聴回数の降順(多い→少ない)

GraphQLのクエリを次のように修正し、`yarn codegen` を実行する。

`graphql/query/Videos.graphql`
```graphql
query Videos {
  videos(order_by: {created_at: desc}) {
    id
    title
    description
    thumbnail_url
    video_url
    owner {
      id
      email
      name
      profile_photo_url
      updated_at
      created_at
    }
    duration
    views
    updated_at
    created_at
  }
}
```

`graphql/query/RecommendVideos.graphql`
```graphql
query RecommendVideos($currentVideoId: String!) {
  videos(where: {id: {_neq: $currentVideoId}}, order_by: {views: desc}) {
    id
    title
    description
    thumbnail_url
    video_url
    views
    duration
    owner {
      id
      name
      profile_photo_url
      updated_at
      email
      created_at
    }
    created_at
    updated_at
  }
}
```

### 4.2. 並び順指定したことによるエラーの解消

並び順を指定することで、ビデオリスト取得でタイミングにより属性が取得できない場合があり、その場合の処置を追加する。

例）`src/pages/Home/index.tsx`

```jsx
<VideoCard
  title={video.title || "NO TITLE"}
  // ownerは投稿者の名前を入れたいが、現段階では、名前を取得することができない
  owner={video.owner?.name || ""}
  views={video.views}
  created={video.created_at}
  // <VideoCard> で非同期的に画像を取得するための関数
  fetcher={() =>
    storage.ref(video.thumbnail_url || "").getDownloadURL()
  }
/>
```
video.title, video.thumbnail_url が undefined　の場合の対処を追加


ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/7edab6357878b2d4f6309698fcdd58817a8e1773


## 5. ホーム画面にページネーションを追加し大量データの表示を軽く

DBからは全件取得するが、一覧表示はそのデータの中の一部のみを表示し、ページングできるようにする。

ページ切り替えの度にクエリを発行するのではなく、一旦データとしては全て取得し、sliceで切り出して表示するため、ブラウザのオンメモリで耐えれないくらいの件数になった場合は対処が必要。

ページネーションは`material-ui/lab`のライブラリを利用する。

### 5.1. `material-ui/lab`のライブラリをインストールする

```cmd
yarn add @material-ui/lab
```

### 5.2. Pagenationのラッパーを作る

Material-UIのPagenationコンポーネントは、そのままではページの中央に配置されないので、ラッパーを作ります。

`src/components/Pagenation/index.tsx`
```javascript
import Pagination from '@material-ui/lab/Pagination';
import useStyles from "./style";

export type PagenationProps = {
  totalPage: number;
  currentPage: number;
  handleChange: (page: number) => void;
}
export const PaginationControlled = ({totalPage, currentPage, handleChange}: PagenationProps) => {
  const styles = useStyles();

  return (
    <div className={styles.stack}>
      <Pagination count={totalPage} page={currentPage} onChange={(e, page) => handleChange(page)} className={styles.pagenation} />
    </div>
  );
}
```

`src/components/Pagenation/style.ts`
```javascript
import { makeStyles } from "@material-ui/core";

export default makeStyles({
  stack: {
    backgroundColor: "transparent",
    width: "100%",
    paddingTop: "1rem",
    textAlign: "center",
  },
  pagenation: {
    display: "inline-block",
  },
});
```

### 5.3. Homeにページネーションを追加する

`src/pages/Home/index.tsx`
```javascript
import { Container, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PaginationControlled as Pagenation} from "../../components/Pagenation";
import { VideoCard } from "../../components/VideoCard";
import { storage } from "../../utils/Firebase/config";
import { useVideosQuery } from "../../utils/graphql/generated";

export const Home = () => {
  // videoを取得する`query`
  const { data, error } = useVideosQuery();

  // エラーがあればコンソールの表示
  useEffect(() => {
    console.error(error);
  }, [error]);

  // 検索条件がある場合は data.videos を絞り込み videos に結果を入れる(後で実装する)
  const videos = data?.videos;

  // ページ制御
  const COUNT_PER_PAGE = 12;
  const [page, setPage] = useState(1);
  const [startItem, setStartItem] = useState(0);
  const handleChange = (value: number) => {
    setPage(value);
    setStartItem((value - 1) * COUNT_PER_PAGE);
  };
  // データ件数と1ページあたりの件数から全ページ数を計算する
  const totalPage = Math.floor(((videos?.length || 0) - 1) / COUNT_PER_PAGE) + 1;

  // currentPageの開始アイテムからCOUNTE_PER_PAGE分のアイテムを表示する
  const pageItem = videos?.slice(startItem, startItem + COUNT_PER_PAGE);

  return (
    // 全ての要素をContainerで囲むことで、デザインが「整う」
    <Container>
      <Grid container spacing={2}>
        {/*
          `query`で取得した後、条件で絞り込んだ／全ての動画データを１ページ毎に表示する
        */}
        {pageItem?.map((video) => (
          <Grid item xs={3} key={video.id}>
            {/*
              カードをクリックしたら、プレイヤー画面を表示します。
            */}
            <Link to={`/watch/${video.id}`} style={{ textDecoration: "none" }}>
              {/*
                `<VideoCard>`には、先ほど指定されていたpropsを流し込みます
              */}
              <VideoCard
                title={video.title || "NO TITLE"}
                // ownerは投稿者の名前を入れたいが、現段階では、名前を取得することができない
                owner={video.owner?.name || ""}
                views={video.views}
                created={video.created_at}
                // <VideoCard> で非同期的に画像を取得するための関数
                fetcher={() =>
                  storage.ref(video.thumbnail_url || "").getDownloadURL()
                }
              />
            </Link>
          </Grid>
        ))}
      </Grid>
      <Pagenation totalPage={totalPage} currentPage={page} handleChange={(value: number) => handleChange(value)} />
    </Container>
  );
};
```

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/a3afbcc9d5ea17df41857476edd6e3ca86cc417d


## 6. オンメモリ検索機能を追加

一覧取得されているビデオデータの「説明」について部分一致で検索を行い、合致するビデオに絞り込む機能を追加する。

### 6.1. 検索キーワードをページ間で保持できるようrecoilを作成する

`src/stores/SearchWords/index.tsx`
```javascript
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
```

### 6.2. ダッシュボードの検索条件蘭とボタンの機能を実装する

`src/templates/DashboardHeader/SearchBar/index.tsx`
```javascript
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
```

### 6.3. Home一覧表示画面で条件に合致するビデオに絞り込む

queryで取得したdataに対して、recoilに保存された検索キーワードがビデオの説明文の一部に合致するものに絞り込む。

`src/pages/Home/index.tsx`
```javascript
import { Container, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";      //　追加
import { PaginationControlled as Pagenation} from "../../components/Pagenation";
import { VideoCard } from "../../components/VideoCard";
import { SearchWords } from "../../stores/SearchWords";      //　追加
import { storage } from "../../utils/Firebase/config";
import { useVideosQuery } from "../../utils/graphql/generated";

export const Home = () => {
  // videoを取得する`query`
  const { data, error } = useVideosQuery();

  // エラーがあればコンソールの表示
  useEffect(() => {
    console.error(error);
  }, [error]);

  // 検索条件がある場合は data.videos を絞り込み videos に結果を入れる
  // キーワードによる絞り込み実装部分
  const searchWords = useRecoilValue(SearchWords);
  const videos = (searchWords && data) ?
    data.videos.filter(
      (video) => video.description?.match(searchWords.description || '')
    ) : data?.videos;

  //　以下同じのため省略
```

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/dae7aefe550efac0f902bbac7c7dae97ae867ab2


## 7. 視聴回数カウントアップする機能を追加

**現状課題**

ログイン済みユーザーは他のユーザーの視聴回数(views)フィールドを更新できない。

アノニマスロールは全てのユーザーのビデオレコードの視聴回数を更新できる。

これにより、ログイン済みの場合、自分の登録したビデオしか視聴回数をカウントアップできない課題がある。

[質問：HASURAのuserロールでの更新権限について@discord](https://discord.com/channels/869866040128053288/870144955555909683/886508502598701086)

**対応方針**

[HASURA公式](https://hasura.io/docs/latest/graphql/core/auth/authorization/role-multiple-rules.html)

上記公式ページの内容を元に対策を考えます。

具体的には、videosテーブルのidとviewsだけを持つvideo_viewsというVIEWを作成し、ユーザーロール・アノニマスロールに同じ権限を与えます。

|  Role |  insert  |  select  |  update  |  delete  |
| :---: |  :----:  |  :----:  |  :----:  |  :----:  |
| admin | ✅       | ✅        | ✅       | ✅        |
| user  | ❌       | ✅        | ⭐️       | ❌        |
| anonymous | ❌   | ✅        | ⭐️       | ❌        |

⭐️: Partial access
- Row update permissions: -without any check
- Column update permissions: 
  - [　] id
  - [✅] views

こうすることにより、ユーザーロールでも他のユーザーのvideosのviewsを更新可能となる。

### 7.1. HASURAでVIEWを作成

1. HASURAのデータマネージャを開く
2. サイドメニューから「SQL」を選択
3. コード入力エリアに以下のSQL文を入力
4. Track thisのチェックボックスにチェックを入れる
5. 「Runn!」ボタンをクリックする

```SQL
CREATE VIEW "public"."video_views" AS
SELECT
  videos.id,
  videos.views
FROM
  videos;
```

### 7.2. video_views のパーミションを設定する

対応方針に記載した方針で、`video_views`のVIEWに対してパーミションを設定する。

### 7.3. viewsをカウントアップするGraphQLを作成しcodegenする

`video_views`に対して`id`をキーに視聴回数(views)をカウントアップする`mutation`を作成する。

`graphql/mutation/updateVideoViews.graphql`
```graphql
mutation updateVideoViews(
    $videoId: String!
) {
  update_video_views(where: {id: {_eq: $videoId}}, _inc: {views: 1}) {
    returning {
      id
      views
    }
  }
}
```

codegenする
```
yarn codegen
```

### 7.4. ビデオが再生されたイベントを取得する

ビデオが再生されたというイベントを取得し、上位の処理に伝えるために`VideoPlayerCard`のインターフェースを追加する。

カウントアップは上位の処理で行うものとする。

`src/pages/Watch/VideoPlayerCard/index.tsx`
```javascript
// 親コンポーネントから渡されるpropsの型
export type VideoPlayerCardProps = {
  title: string | undefined;
  description: string | undefined;
  views: number | undefined;
  ownerName: string | undefined;
  date: Date | undefined;
  fetcher: () => Promise<string | undefined>;
  onPlay: () => any;      // インターフェース追加
};

export const VideoPlayerCard = ({
  title,
  description,
  views,
  ownerName,
  date,
  fetcher,
  onPlay,      // インターフェース追加
}: VideoPlayerCardProps) => {
```

```javascript
<Card className={styles.transparent} elevation={0} square>
  {/* 
    ビデオプレイヤー

    CardMediaは、画像の他に動画,音声などのメディア系コンポーネントの作成もできます。
    メディアの指定は、`component`というプロパティに指定のメディアコンポーネント`img`,`video`,`audio`などのHTMLタグを指定するだけです。
    そして、`src`にメディアのパスを指定すると画面に表示されます。
    そして、今回はビデオプレイヤーに操作用のコントローラーを表示させたいので、`controls`というプロパティを指定しています。
    (`controls`はMaterial-UI特有のプロパティではなく、<video>HTMLタグのプロパティです。)
    ビデオを再生するというイベントは「onPlay」で取得可能
  */}
  <CardMedia component="video" controls src={src} onPlay={onPlay} />
```

### 7.5. 視聴回数をカウントアップする仕掛けをwatch内に作る

`src/pages/Watch/index.tsx`

**import部分**
```javascript
import {
  useRecommendVideosQuery,
  useUpdateVideoViewsMutation,    // 追加
  useVideoByPkQuery,
  VideosDocument,                 // 追加
} from "../../utils/graphql/generated";
```

**処理部分**
```javascript
  // 再生回数をカウントアップmutation
  const [updateMutation, { error: apolloError }] = useUpdateVideoViewsMutation({
    refetchQueries: [{ query: VideosDocument }],
  });
  // onPlayで再生回数をカウントアップする処理を実行する
  const onPlayVideo = async (id: string | undefined) => {
    await updateMutation({
      variables: {
        videoId: id as string
      }
    });

    if (apolloError) {
      console.log(apolloError.message);
    }
  }
```

**呼び出し部分**
```javascript
  <VideoPlayerCard
    title={currentVideo?.videos_by_pk?.title || "NO TITLE"}
    description={currentVideo?.videos_by_pk?.description || ""}
    views={currentVideo?.videos_by_pk?.views}
    ownerName={currentVideo?.videos_by_pk?.owner?.name}
    date={currentVideo?.videos_by_pk?.created_at}
    fetcher={async () => {
      if (currentVideo?.videos_by_pk?.video_url) {
        return storage
          .ref(currentVideo.videos_by_pk.video_url)
          .getDownloadURL();
      }
      return undefined;
    }}
    onPlay={() => { onPlayVideo(currentVideo?.videos_by_pk?.id) }}
  />
```

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/5ecf58c0491df5a4a58c0bf06024941ba88e6298


## 8. チャンネル登録・解除機能を作る

### 8.1. チャンネル登録・解除の要件

- ログイン済みユーザーのみ登録・解除可能
- 再生画面で表示中のビデオのオーナーを登録・解除することが出来る
- 自分自身はチャンネル登録できない(自分のビデオでは登録・解除ボタンが表示されない)
- 既に登録済みのビデオオーナーについては登録ボタンは表示されない
- 未登録の場合は登録ボタンが、登録済みの場合は解除ボタンが表示される
- ビデオオーナーの情報で被登録数(subscribers)を表示する

### 8.2. チャンネル登録管理テーブル

チャンネル登録したビデオオーナーを管理するテーブル　`subscribers` を作成する。

| columsn name | field type | primary key | default | comment |
| :----------: | :--------: | :---------: | :-----: | :------ |
| userid       | text       | x           | -       | ユーザーID |
| subscribe_id | text       | x           | -       | ビデオオーナID |
| created_at   | time stamp | -           | now()   | 登録日時 |
| updated_at   | time stamp | -           | now()   | 更新日時 |

**外部キー**

1. subscribe_id -> users.id / on update violation: restrict / on delete violation: cascade
2. userid -> users.id / on update violation: restrict / on delete violation: cascade

**インデックス**

1. idx_subscribe_subscriber / BTREE / on subscribe_id
2. idx_subscribe_uid / BTREE / on userid

**パーミション**

|  Role |  insert  |  select  |  update  |  delete  |
| :---: |  :----:  |  :----:  |  :----:  |  :----:  |
| admin | ✅       | ✅        | ✅       | ✅        |
| user  | ⭐️       | ✅        | ❌       | ⭐️        |
| anonymous | ❌   | ✅        | ❌       | ❌        |

⭐️: Partial access

- Row insert permissions
  - {"userid":{"_eq":"X-Hasura-User-Id"}}
- Column insert permissions
  - [x] userid 
  - [x] subscribe_id
  - [ ] created_at
  - [ ] deleted_at
- Row delete permissions
  - {"userid":{"_eq":"X-Hasura-User-Id"}}


### 8.3. GraphQL作成

1. チャンネル登録のmutation
2. チャンネル削除のmutation
3. 被登録者数をカウントするquery
4. ユーザー情報を拡張し、登録済みオーナーID情報を持たせるquery

1.`graphql/mutation/insertSubscription.graphql`
```
mutation InsertSubscribe($userid: String!, $subscribe_id: String!) {
  insert_subscribes_one(object: {userid: $userid, subscribe_id: $subscribe_id}) {
    userid
    subscribe_id
  }
}
```

2.`graphql/mutation/deleteSubscription.graphql`
```
mutation deleteSubscribe($subscribe_id: String!, $userid: String!) {
  delete_subscribes_by_pk(subscribe_id: $subscribe_id, userid: $userid) {
    userid
    subscribe_id
  }
}
```

3.`graphql/query/subscribers.graphql`
```
query Subsribers($ownerid: String!) {
  subscribes(where: {subscribe_id: {_eq: $ownerid}}) {
    userid
  }
}
```

4.`graphql/query/users.graphql`
```
query UserById($id: String!) {
  users_by_pk(id: $id) {
    id
    name
    email
    profile_photo_url
    updated_at
    created_at
    subscribesByUserid {
      subscribe_id
    }
  }
}
```

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/adc5485c152662d328dde8655360f5080a7bc0e9


### 8.4. User情報に登録済みのチャンネル(subscribe_id)配列を追加

`src/stores/User/index.tsx`
```javascript
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
```
`subscribesByUserid` を追加する。

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/4a53168712a23631df9eef87f7d3cc9d139e77bf


### 8.5. チャンネル関連ロジック追加

**チャンネル登録のロジック**

`src/hooks/Channel/useSubscribe/index.ts`
```javascript
import {
  useInsertSubscribeMutation,
  SubsribersDocument,
  UserByIdDocument
} from "../../../utils/graphql/generated";

type SubscribeProps = {
  userid: string;
  subscribeId: string;
};

export const useSubscribe = () => {
  const [insertSubscription, { data, error }] = useInsertSubscribeMutation({
    refetchQueries: [UserByIdDocument, SubsribersDocument],
  });

  const subscribe = async ({ userid, subscribeId }: SubscribeProps) => {
    if (userid && subscribeId) {
      try {
        await insertSubscription({
          variables: {
            userid: userid,
            subscribe_id: subscribeId
          }
        });

        if (error) {
          console.log(error.message);
        }
      } catch (e) {
        new Error("チャネル登録に失敗");
      }
    }
  };

  return {
    subscribe,
    data,
    error,
  };
};
```

**チャンネル登録解除のロジック**

`src/hooks/Channel/useUnSubscribe/index.ts`
```javascript
import {
  useDeleteSubscribeMutation,
  SubsribersDocument,
  UserByIdDocument
} from "../../../utils/graphql/generated";

type UnSubscribeProps = {
  userid: string;
  subscribeId: string;
};

export const useUnSubscribe = () => {
  const [deleteSubscription, { data, error }] = useDeleteSubscribeMutation({
    refetchQueries: [UserByIdDocument, SubsribersDocument],
  });

  const unsubscribe = async ({ userid, subscribeId }: UnSubscribeProps) => {
    if (userid && subscribeId) {
      try {
        await deleteSubscription({
          variables: {
            userid: userid,
            subscribe_id: subscribeId
          }
        });

        if (error) {
          console.log(error.message);
        }
      } catch (e) {
        new Error("チャネル登録解除に失敗");
      }
    }
  };

  return {
    unsubscribe,
    data,
    error,
  };
};
```

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/2167d219f266cfba04d38e772fe549b40862929b


### 8.6. Watchにロジック追加

**import部分**

`src/pages/Watch/index.tsx`

```javascript
import {
  useRecommendVideosQuery,
  useUpdateVideoViewsMutation,
  useSubsribersQuery,           // 追加
  useVideoByPkQuery,
  VideosDocument,
} from "../../utils/graphql/generated";
import { storage } from "../../utils/Firebase/config";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";           // 追加
import { GlobalUser } from "../../stores/User";    // 追加
import { useSubscribe } from "../../hooks/Channel/useSubscribe";           // 追加
import { useUnSubscribe } from "../../hooks/Channel/useUnSubscribe";       // 追加
```

**被登録者数取得**
```javascript
  // 動画オーナーの登録者数を取得する
  const { data: subscribers } = useSubsribersQuery({
    variables: {
      ownerid: currentVideo?.videos_by_pk?.owner.id || '',
    },
  });
```

**チャンネル登録と解除**
```javascript
  //　チャンネル登録する
  const { subscribe, error: insError } = useSubscribe();
  const onSubscribe = async (userid: string, subscribeId: string) => {
    await subscribe({
      userid: userid,
      subscribeId: subscribeId
    });
    if (insError) {
      console.log(insError.message);
    }
  } 

  //　チャンネル登録解除する
  const { unsubscribe, error: delError } = useUnSubscribe();
  const onUnSubscribe = async (userid: string, subscribeId: string) => {
    await unsubscribe({
      userid: userid,
      subscribeId: subscribeId
    });
    if (delError) {
      console.log(delError.message);
    }
  } 
```

**チャンネル登録済みユーザーを取得し表示中ビデオのオーナーが含まれるか調べる**
```javascript
  // ユーザー情報から登録済みチャンネルのID配列取得
  const globalUser = useRecoilValue(GlobalUser);

  // 表示中のビデオオーナーをログインユーザーが登録しているか？
  const isSubscribed = 
    globalUser?.subscribesByUserid?.filter(
      (sub) => sub.subscribe_id === currentVideo?.videos_by_pk?.owner.id
    ).length === 1
```

**ログイン済みで表示中ビデオは自分自身のものではない?**
```javascript
  // ログインしており、表示中のビデオオーナーとログインユーザーが違う場合
  const showSubscribeButton = (globalUser?.id && currentVideo?.videos_by_pk?.owner.id !== globalUser?.id)
```

**VideoPlayerCardの引数を追加してコンポーネント内でチャンネル登録・解除できるようにする**
```jsx
  <VideoPlayerCard
    title={currentVideo?.videos_by_pk?.title || "NO TITLE"}
    description={currentVideo?.videos_by_pk?.description || ""}
    views={currentVideo?.videos_by_pk?.views}
    ownerName={currentVideo?.videos_by_pk?.owner?.name}
    subscribers={subscribers?.subscribes.length || 0}
    date={currentVideo?.videos_by_pk?.created_at}
    showSubscribeButton={showSubscribeButton || false}
    isSubscribed={isSubscribed}
    fetcher={async () => {
      if (currentVideo?.videos_by_pk?.video_url) {
        return storage
          .ref(currentVideo.videos_by_pk.video_url)
          .getDownloadURL();
      }
      return undefined;
    }}
    onPlay={() => { onPlayVideo(currentVideo?.videos_by_pk?.id) }}
    onSubscribe={() => { onSubscribe(globalUser?.id || '', currentVideo?.videos_by_pk?.owner.id || '') }}
    onUnSubscribe={() => { onUnSubscribe(globalUser?.id || '', currentVideo?.videos_by_pk?.owner.id || '') }}
  />
```

**リコメンドの表示数を制限する**

本筋とは関係ないですが、リコメンドの表示数を６件に制限します。

本来ならばページネーションやインフィニティスクロールとすべきですが、実装できていません。

```javascript
  // リコメンドの動画を絞り込む
  const VIDEOS_DISP_MAX = 6;
  const videos = recommendVides?.videos.slice(0, VIDEOS_DISP_MAX);
```

```jsx
  <Grid item xs={4}>
    {/* videosに変更 */}
    {videos?.map((video) => (
      <div className={styles.cardPadding} key={video.id}>
        {/*
          動画プレイヤーを表示するためのリンク
        */}
        <Link
          to={`/watch/${video.id}`}
          style={{ textDecoration: "none" }}
        >
          {/*
            カードの表示に必要なデータをpropsに渡す
          */}
          <VideoHorizontalCard
            title={video.title || "NO TITLE"}
            views={video.views}
            owner={video.owner?.name || ""}
            created={video.created_at}
            fetcher={() =>
              storage.ref(video.thumbnail_url || "").getDownloadURL()
            }
          />
        </Link>
      </div>
    ))}
  </Grid>
```

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/5cbd3b2656372e67a911cecd047395a216b2ded7


### 8.7. VideoPlayerCardの機能拡張

`src/pages/Watch/VideoPlayerCard/index.tsx`

**import追加**
```javascript
import {
  Avatar,
  Button,         // 追加
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';   // 追加
import CancelIcon from '@material-ui/icons/Cancel';         // 追加
import { useEffect, useState } from "react";
import useStyles from "./style";
```

**引数追加**
```javascript
// 親コンポーネントから渡されるpropsの型
export type VideoPlayerCardProps = {
  title: string | undefined;
  description: string | undefined;
  views: number | undefined;
  ownerName: string | undefined;
  subscribers: number | undefined;    // 被登録者数
  date: Date | undefined;
  showSubscribeButton: boolean;       // 登録・解除表示するか？
  isSubscribed: boolean;              // チャンネル登録済みか？
  fetcher: () => Promise<string | undefined>;
  onPlay: () => any;
  onSubscribe: () => any;             // 登録処理
  onUnSubscribe: () => any;           // 解除処理
};

export const VideoPlayerCard = ({
  title,
  description,
  views,
  ownerName,
  subscribers,
  date,
  showSubscribeButton,
  isSubscribed,
  fetcher,
  onPlay,
  onSubscribe,
  onUnSubscribe,
}: VideoPlayerCardProps) => {
```

**カード部分の修正**
```jsx
  <div className={styles.cardHeader}>
    <CardHeader
      className={styles.paddingHorizontalLess}
      avatar={<Avatar />}
      title={ownerName}
      subheader={`${subscribers || 0} subscribers`}
    />
    {/* チャンネル登録ボタン */}
    {showSubscribeButton &&
      <div className={styles.chanelButton}>
        {isSubscribed ? (
          <Button
            variant="contained"
            color="default"
            onClick={onUnSubscribe}
            startIcon={<CancelIcon />}
          >
            チャンネル解除
          </Button>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={onSubscribe}
            startIcon={<AddCircleIcon />}
          >
            チャンネル登録
          </Button>
        )}
      </div>
    }
  </div>
```

**CSS追加**

`src/pages/Watch/VideoPlayerCard/style.ts`
```javascript
import { makeStyles } from "@material-ui/core";

export default makeStyles({
  paddingHorizontalLess: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  transparent: {
    backgroundColor: "transparent",
  },
  descPadding: {
    paddingLeft: 56,
  },
  // 追加
  chanelButton: {
    display: "flex",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
```

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/7dc249c8894c11ca00b88c07a5a6b285b6f3fbd6


