# ReactBootcamp Advanced

ReactBootCampを終了した方が、さらに機能追加をする際に参考として頂けるよう作成しました。

[元となるブランチはこちら](https://github.com/Hiro-mackay/react-bootcamp/tree/bootcamp-4/source)

[元ドキュメントはこちらから](https://github.com/Hiro-mackay/react-bootcamp/tree/bootcamp-4/document)

ReactBootCampをまだ終了していない方は、まず、そちらを終了させてから、Advancedに挑戦してください。

## 追加した機能について

ReactBootcampで作成したアプリに追加した機能は以下の通りです。

- ワーニングをできるだけ除去する
- ユーザーインターフェース改善
  - アップロード画面でキャンセル可能に
  - ダッシュボードのユーザー画像にポップアップメニューを追加し、そこからログアウト可能に
  - ビデオ一覧の並び順を変更
  - ホーム画面にページネーションを追加
- 機能追加
  - オンメモリ検索機能
  - 視聴回数のカウントアップ
  - チャンネル登録・解除・一覧表示機能
  - プロファイル編集機能とアバターの画像ファイル対応

----
# git clone後

git clone後はあなた自身の環境に合わせて、下記部分を変更してください。

`src/utils/Firebase/config.ts`
```typescript
const firebaseConfig = {
  apiKey: "あなたのfireabseの値",
  authDomain: "あなたのfireabseの値",
  projectId: "あなたのfireabseの値",
  storageBucket: "あなたのfireabseの値",
  messagingSenderId: "あなたのfireabseの値",
  appId: "あなたのfireabseの値"
};
```

----
# React BootCamp Advanced 追加・修正内容 目次

- [ReactBootcamp Advanced](#reactbootcamp-advanced)
  - [追加した機能について](#追加した機能について)
- [git clone後](#git-clone後)
- [React BootCamp Advanced 追加・修正内容 目次](#react-bootcamp-advanced-追加修正内容-目次)
  - [1. ワーニング除去](#1-ワーニング除去)
    - [1.1. Warning: Each child in a list should have a unique "key" prop.](#11-warning-each-child-in-a-list-should-have-a-unique-key-prop)
    - [1.2. Warning: Failed prop type: Material-UI: Either `children`, `image`, `src` or `component` prop must be specified.](#12-warning-failed-prop-type-material-ui-either-children-image-src-or-component-prop-must-be-specified)
    - [1.3. ESLintワーニング対策](#13-eslintワーニング対策)
    - [1.4. firebaseのワーニング対策と多重起動対策](#14-firebaseのワーニング対策と多重起動対策)
    - [1.5. Warning: Can't perform a React state update on an unmounted component.](#15-warning-cant-perform-a-react-state-update-on-an-unmounted-component)
  - [2. アップロードダイアログをキャンセル可能に](#2-アップロードダイアログをキャンセル可能に)
    - [2.1. クローズ機能とアイコンを実装](#21-クローズ機能とアイコンを実装)
    - [2.2. クローズボタンのスタイル設定追加](#22-クローズボタンのスタイル設定追加)
  - [3. ユーザーメニューを追加してログアウト可能に](#3-ユーザーメニューを追加してログアウト可能に)
    - [3.1. ユーザーメニュー作成](#31-ユーザーメニュー作成)
    - [3.2. ダッシュボードからポップアップメニューをコールする](#32-ダッシュボードからポップアップメニューをコールする)
    - [発生する警告について](#発生する警告について)
  - [4. ビデオ一覧表示の並び順を設定する](#4-ビデオ一覧表示の並び順を設定する)
    - [4.1. 並び順の変更](#41-並び順の変更)
    - [4.2. 並び順指定したことによるエラーの解消](#42-並び順指定したことによるエラーの解消)
  - [5. ホーム画面にページネーションを追加し大量データの表示を軽く](#5-ホーム画面にページネーションを追加し大量データの表示を軽く)
    - [5.1. `material-ui/lab`のライブラリをインストールする](#51-material-uilabのライブラリをインストールする)
    - [5.2. Pagenationのラッパーを作る](#52-pagenationのラッパーを作る)
    - [5.3. Homeにページネーションを追加する](#53-homeにページネーションを追加する)
  - [6. オンメモリ検索機能を追加](#6-オンメモリ検索機能を追加)
    - [6.1. 検索キーワードをページ間で保持できるようrecoilを作成する](#61-検索キーワードをページ間で保持できるようrecoilを作成する)
    - [6.2. ダッシュボードの検索条件蘭とボタンの機能を実装する](#62-ダッシュボードの検索条件蘭とボタンの機能を実装する)
    - [6.3. Home一覧表示画面で条件に合致するビデオに絞り込む](#63-home一覧表示画面で条件に合致するビデオに絞り込む)
  - [7. 視聴回数カウントアップする機能を追加](#7-視聴回数カウントアップする機能を追加)
    - [7.1. HASURAでVIEWを作成](#71-hasuraでviewを作成)
    - [7.2. video_views のパーミションを設定する](#72-video_views-のパーミションを設定する)
    - [7.3. viewsをカウントアップするGraphQLを作成しcodegenする](#73-viewsをカウントアップするgraphqlを作成しcodegenする)
    - [7.4. ビデオが再生されたイベントを取得する](#74-ビデオが再生されたイベントを取得する)
    - [7.5. 視聴回数をカウントアップする仕掛けをwatch内に作る](#75-視聴回数をカウントアップする仕掛けをwatch内に作る)
  - [8. チャンネル登録・解除機能を作る](#8-チャンネル登録解除機能を作る)
    - [8.1. チャンネル登録・解除の要件](#81-チャンネル登録解除の要件)
    - [8.2. チャンネル登録管理テーブル](#82-チャンネル登録管理テーブル)
    - [8.3. GraphQL作成](#83-graphql作成)
    - [8.4. User情報に登録済みのチャンネル(subscribe_id)配列を追加](#84-user情報に登録済みのチャンネルsubscribe_id配列を追加)
    - [8.5. チャンネル関連ロジック追加](#85-チャンネル関連ロジック追加)
    - [8.6. Watchにロジック追加](#86-watchにロジック追加)
    - [8.7. VideoPlayerCardの機能拡張](#87-videoplayercardの機能拡張)
  - [9. 登録チャンネル一覧機能追加](#9-登録チャンネル一覧機能追加)
    - [9.1. 登録チャンネル一覧機能要件](#91-登録チャンネル一覧機能要件)
    - [9.2. 登録チャンネル一覧取得のGraphQL](#92-登録チャンネル一覧取得のgraphql)
    - [9.3. 登録チャンネル一覧画面作成](#93-登録チャンネル一覧画面作成)
    - [9.4. Channelsをメニューから呼べるようにする](#94-channelsをメニューから呼べるようにする)
  - [10. プロファイルページを作りアバター画像を登録できるようにする](#10-プロファイルページを作りアバター画像を登録できるようにする)
    - [10.1. Firebase Storegeにアバター保管フォルダを作成する](#101-firebase-storegeにアバター保管フォルダを作成する)
    - [10.2. アバター登録機能要件](#102-アバター登録機能要件)
    - [10.3. ユーザー情報更新GraphQL](#103-ユーザー情報更新graphql)
    - [10.4. アバター画像アップロード・メタ情報保存処理](#104-アバター画像アップロードメタ情報保存処理)
    - [10.5. プロファイル変更画面の作成](#105-プロファイル変更画面の作成)
    - [10.6. プロファイル編集画面にアクセスできるようにする](#106-プロファイル編集画面にアクセスできるようにする)
  - [11. 各画面のアバターをユーザープロファイルから取得した画像に変える](#11-各画面のアバターをユーザープロファイルから取得した画像に変える)
    - [11.1. ダッシュボード](#111-ダッシュボード)
    - [11.2. VideoCardの引数にavatarを追加し上位から渡せるようにする](#112-videocardの引数にavatarを追加し上位から渡せるようにする)
    - [11.3. VideoPlayerCardのアバター対応](#113-videoplayercardのアバター対応)

----

## 1. ワーニング除去

### 1.1. Warning: Each child in a list should have a unique "key" prop.

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
  - [ ] id
  - [x] views

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

1. 名前:subscribed リレーション:subscribe_id -> users.id<br /> / on update violation: restrict / on delete violation: cascade
2. 名前:subscription　リレーション:userid -> users.id＜br/> / on update violation: restrict / on delete violation: cascade

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


## 9. 登録チャンネル一覧機能追加

### 9.1. 登録チャンネル一覧機能要件

- ログイン済みのユーザーのみ使用できる(menuでの制御)
- ログインユーザーがチャンネル登録したビデオオーナーと、その最新ビデオ３つを一覧表示する
- ビデオオーナーのアバターも表示可能とする
- 登録チャンネル表示順は、チャンネル登録日時降順とする(新しい→古い)

### 9.2. 登録チャンネル一覧取得のGraphQL

`graphql/query/ChannelList.graphql`
```graphql
query ChannelList($id: String!) {
  users_by_pk(id: $id) {
    name
    subscribesByUserid(order_by: {created_at: desc_nulls_last}) {
      subscribed {
        id
        name
        profile_photo_url
        videos(order_by: {created_at: desc_nulls_last}, limit: 3) {
          id
          title
          description
          thumbnail_url
          video_url
          views
          duration
          created_at
          updated_at
        }
      }
    }
  }
}
```

### 9.3. 登録チャンネル一覧画面作成

**登録チャンネル一覧画面**

登録チャンネルの最新ビデオ表示には、VideoCardsのコンポーネントを利用しますが、オーナーの名前が必須となっています。登録チャンネル一覧では、オーナー毎にビデオ一覧を表示する時に、オーナーの名前は冗長ですので、`owner,views,created`はオプションにします。

`src/pages/Channels/index.tsx`
```javascript
import { Avatar, Button, Card, CardHeader, Container, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { VideoCard } from "../../components/VideoCard";
import { GlobalUser } from "../../stores/User";
import { storage } from "../../utils/Firebase/config";
import { useChannelListQuery } from "../../utils/graphql/generated";
import { useUnSubscribe } from "../../hooks/Channel/useUnSubscribe";
import CancelIcon from '@material-ui/icons/Cancel';
import useStyles from "./style";

export const Channels = () => {
  const styles = useStyles();

  // ユーザー情報Atom
  const globalUser = useRecoilValue(GlobalUser);

  // ChannelListを取得する`query`
  const { data, error } = useChannelListQuery({
    variables: {
      id: globalUser?.id || ""
    }
  });

  //　チャンネル登録解除する
  const { unsubscribe, error: delError } = useUnSubscribe();
  const onUnSubscribe = async (userid: string, subscribeId: string) => {
    await unsubscribe({
      userid: userid,
      subscribeId: subscribeId
    });
    if (delError) {
      console.log(delError.message)
    }
  }

  // エラーがあればコンソールの表示
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <>
        {data?.users_by_pk?.subscribesByUserid.map((subscribe) => (
          <div key={subscribe.subscribed.id}>
            <Card className={styles.card}>
              <div>
                <CardHeader
                  className={styles.cardHeader}
                  avatar={<Avatar />}
                  title={subscribe.subscribed.name}
                />
                <Button
                  variant="contained"
                  color="default"
                  startIcon={<CancelIcon />}
                  onClick={() => onUnSubscribe(globalUser?.id || "", subscribe.subscribed.id)}
                  className={styles.unsubButton}
                >
                  登録解除
                </Button>
              </div>
              <Grid container spacing={2}>
                {subscribe.subscribed.videos.map((video) => (
                  <Grid item xs={3} key={video.id}>
                    <Link to={`/watch/${video.id}`} style={{ textDecoration: "none" }}>
                      <VideoCard
                        title={video.title as string}
                        views={video.views}
                        created={video.created_at}
                        fetcher={() =>
                          storage.ref(video.thumbnail_url as string).getDownloadURL()
                        }
                      />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </div>
        ))}
      </>
    </Container >
  );
};
```

**CSS**

`src/pages/Channels/style.ts`
```javascript
import { makeStyles } from "@material-ui/core";

export default makeStyles({
  // 要素の横幅の最大値を調整
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
  },
  cardHeader: {
    width: 240,
  },
  unsubButton: {
    marginTop: 10,
    marginLeft: 10,
  },
});
```

**VideoCards引数をオプションに変更**

`SubHeaderContent`の引数をオプション化します。また、視聴回数部分の見た目を少し変更します。

`src/components/VideoCard/SubHeaderContent/index.tsx`
```javascript
import { Typography } from "@material-ui/core";

export type SubHeaderContentProps = {
  owner?: string;
  views?: number;
  created?: Date;
};

// 親コンポーネントから、投稿者情報、再生回数、アップロード日時を受け取ります。
export const SubHeaderContent = ({
  owner,
  views,
  created,
}: SubHeaderContentProps) => {
  return (
    <>
      <Typography variant="body2">
        {
          // 追加
          // 投稿者情報
          owner
        }
      </Typography>
      <Typography variant="body2">
        {
          // 追加
          // 再生回数
          views
        }
        {" 回視聴 "}
        {
          // 追加
          // 投稿時間を表示
          created && new Date(created).toLocaleDateString()
        }
      </Typography>{" "}
    </>
  );
};
```


### 9.4. Channelsをメニューから呼べるようにする

**Routeにchannelsを追加**

`src/Route.tsx`
```javascript
import { Navigate, useRoutes } from "react-router-dom";
import { HomeLayout } from "./layouts/Home";
import { SideLessHomeLayout } from "./layouts/SideLessHome";
import { SimpleLayout } from "./layouts/Simple";
import { Home } from "./pages/Home";
import { Upload } from "./pages/Upload";
import { Watch } from "./pages/Watch";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgetPassForm } from "./pages/ForgetPassForm";
import { Signout } from "./pages/Signout";
import { Channels } from "./pages/Channels";        // 追加

export const RootRouter = () => {
  return useRoutes([
    {
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "upload", element: <Upload /> },
        { path: "channels", element: <Channels /> },        // 追加
      ],
    },

    {
      element: <SideLessHomeLayout />,
      children: [
        { path: "watch", element: <Navigate to="/" /> },
        { path: "watch/:videoId", element: <Watch /> },
      ],
    },

    {
      element: <SimpleLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "signout", element: <Signout /> },
        { path: "forget", element: <ForgetPassForm /> },
        { path: "404", element: <div>Not Found</div> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" /> },
  ]);
};
```

**メニューにchannelsのリンクを追加**

メニューにchannelsへのリンクを追加し、ログイン済みユーザーのみ「登録チャネル」メニューが表示されるように変更します。

`src/templates/Sidebar/index.tsx`
```javascript
import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import SubscriptionsIcon from "@material-ui/icons/Subscriptions";
import useStyles from "./style";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { GlobalUser } from "../../stores/User";

export const Sidebar = () => {
  const styles = useStyles();
  // ユーザー情報Atom
  const globalUser = useRecoilValue(GlobalUser);

  return (
    <List className={styles.root} component="nav">
      <ListItem button component={Link} to="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="ホーム" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <WhatshotIcon />
        </ListItemIcon>
        <ListItemText primary="トレンド" />
      </ListItem>
      {globalUser?.id && (
        <ListItem button component={Link} to="/channels">
          <ListItemIcon>
            <SubscriptionsIcon />
          </ListItemIcon>
          <ListItemText primary="登録チャンネル" />
        </ListItem>
      )}
    </List>
  );
};
```


ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/0257eeaae9240165cfd59980f72010d55a5fd052


## 10. プロファイルページを作りアバター画像を登録できるようにする

### 10.1. Firebase Storegeにアバター保管フォルダを作成する

1. FierbaseコンソールからStorageメニューを開き`avatars`フォルダを作成する
2. Rulesを以下のように変更し`avatars`以下の権限を`videos`と同様に設定する

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /videos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
    }

    match /thumbnails/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
    }

    match /avatars/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
    }
	}
}
```

### 10.2. アバター登録機能要件

- プロファイルページよりログイン済みのユーザーIDの画像・名前を更新できる
- アバター画像は`Firebase`の`Storage`にアップロードする
- アップロード時のファイル名はユーザーIDと同じとする
- アップロードされたアバター画像のURLは`users`テーブルの`profile_photo_url`で管理する
- プロファイルページに「ユーザー近況」の入力欄はあるが入力内容は`users`テーブルへは反映しない<br />
`users`テーブルに`description`という項目を追加してそこに保管しようとしましたが、今のところ上手くいかないので。。


### 10.3. ユーザー情報更新GraphQL

ログインユーザーのprofile_photo_urlを更新するgraphql作成

`graphql/mutation/updateUser.graphql`
```graphql
mutation updateUser($id: String!, $name: String!, $profile_photo_url: String) {
  update_users_by_pk(pk_columns: {id: $id}, _set: {name: $name, profile_photo_url: $profile_photo_url}) {
    id
    name
    email
    profile_photo_url
    created_at
    updated_at
    subscribesByUserid {
      subscribe_id
    }
  }
}
```

### 10.4. アバター画像アップロード・メタ情報保存処理

videoのアップロード処理を元に、アバター画像アップロードのフックを作成します。

`src/hooks/AvatarUpload/index.ts`
```javascript
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
```

### 10.5. プロファイル変更画面の作成

ビデオアップロード画面を参考に、プロファイル画面を作成します。

構成は以下の通りです。

- プロファイル画面本体(Profile)
  - アバター画像選択部分(AvatarSelector)
  - 名前・近況入力フォーム(UploadForm)

**Profile**

`src/pages/Profile/index.tsx`
```javascript
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
```

**Styles**

`src/pages/Profile/style.ts`
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

**Avatar選択部分**

`src/pages/Profile/AvatarSelector/index.tsx`
```javascript
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
```

**Style**

`src/pages/Profile/AvatarSelector/style.ts`
```javascript
import { makeStyles } from "@material-ui/core";

export default makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: 300,
    justifyContent: "center",
    alignItems: "center",
  },
  textPadding: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  avatarFigure: {
    width: 300,
    height: 300,
    borderRadius: "100%",
    margin: "auto",
  },
  full: {
    width: "100%",
  },
  button: {
    marginTop: "2rem",
  }
});
```

**名前・近況入力のアップロードフォーム**

`src/pages/Profile/UploadForm/index.tsx`
```javascript
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
```

**Style**

`src/pages/Profile/UploadForm/style.ts`
```javascript
import { makeStyles } from "@material-ui/core";

export default makeStyles({
  label: {
    display: "block",
    paddingBottom: 40,
  },
  butotn: {
    display: "flex",
    justifyContent: "center",
  },
});
```

### 10.6. プロファイル編集画面にアクセスできるようにする

**Route.tsxに追加**

`src/Route.tsx`
```javascript
import { Navigate, useRoutes } from "react-router-dom";
import { HomeLayout } from "./layouts/Home";
import { SideLessHomeLayout } from "./layouts/SideLessHome";
import { SimpleLayout } from "./layouts/Simple";
import { Home } from "./pages/Home";
import { Upload } from "./pages/Upload";
import { Watch } from "./pages/Watch";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { ForgetPassForm } from "./pages/ForgetPassForm";
import { Signout } from "./pages/Signout";
import { Channels } from "./pages/Channels";
import { Profile } from "./pages/Profile";          // 追加

export const RootRouter = () => {
  return useRoutes([
    {
      element: <HomeLayout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "upload", element: <Upload /> },
        { path: "profile", element: <Profile /> },          // 追加
        { path: "channels", element: <Channels /> },
      ],
    },

    {
      element: <SideLessHomeLayout />,
      children: [
        { path: "watch", element: <Navigate to="/" /> },
        { path: "watch/:videoId", element: <Watch /> },
      ],
    },

    {
      element: <SimpleLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "signout", element: <Signout /> },
        { path: "forget", element: <ForgetPassForm /> },
        { path: "404", element: <div>Not Found</div> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" /> },
  ]);
};
```

**ユーザーメニュー(ポップアップ)にリンクを作成**

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
        <MenuItem onClick={() => gotoPage("/profile")}>プロファイル</MenuItem>
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


ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/a0330391771038480a5fac5f8e62ec79470009ce


## 11. 各画面のアバターをユーザープロファイルから取得した画像に変える

### 11.1. ダッシュボード

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
              <Avatar src={globalUser.profile_photo_url||""} />  {/* ユーザー情報から取得 */}
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

### 11.2. VideoCardの引数にavatarを追加し上位から渡せるようにする

VideoCard内では上位から渡されたavatarコンポーネントを表示するのみとし、上位側でデフォルトアイコンかプロファイル画像か、あるいは何も表示しないかを判断する。

**VideoCard利用するコンポーネント**

- Home(`src/pages/Home/index.tsx`)
- Channels(`src/pages/Channels/index.tsx`)


**VideoCard上位からのアバター対応**

`src/components/VideoCard/index.tsx`
```javascript
import { Card, CardHeader, CardMedia } from "@material-ui/core";
import { HeaderTitle, HeaderTitleProps } from "./HeaderTitle";
import { SubHeaderContent, SubHeaderContentProps } from "./SubHeaderContent";
import useStyles from "./style";
import { useEffect, useState } from "react";

// 子コンポーネントの型定義を使用して、冗長な書き方を防ぐことができる
export type VideoCardProps = {
  avatar?: React.ReactNode                      // 追加
  fetcher: () => Promise<string | undefined>;
} & HeaderTitleProps &
  SubHeaderContentProps;

export const VideoCard = ({
  fetcher,
  title,
  owner,
  created,
  views,
  avatar,                      // 追加
}: VideoCardProps) => {
  const styles = useStyles();

  // 動画のサムネイルのURLを格納する
  const [imageSrc, setImageSrc] = useState<string>();

  useEffect(() => {
    // 関数の実態は、`Firebase Storage`からサムネイル用のダウンロードリンクを取得する
    // ここでは、関数の内部構成を知ることなく、実行すると`Promise<string | undefined>`が返される関数であることでしか知らない
    // コンポーネントから画像取得の詳細を隠しつつも、非同期な画像の取得を実現する
    fetcher().then(setImageSrc);
  });

  return (
    // elevation={0} : Cardの影を削除する
    // square: border-radiusを削除する
    <Card className={styles.root} elevation={0} square>
      {/* 
        サムネイルの表示
        今回はno-image.jpgという画像を作成し、デフォルトのサムネイルとした。
        このno-image.jpgを使いたい方は、/public/staticから自由にダウンローそしてください。
      */}
      <CardMedia
        className={styles.media}
        // 画像があればサムネイルを表示
        image={imageSrc || "/static/no-image.jpg"}
        title="Thumbnail"
      />

      {/* 
        タイトルやユーザーサムネイルを表示する
      */}
      <CardHeader
        className={styles.header}
        avatar={avatar}
        // `Card`の`HeaderTitle`には`title`を渡す
        title={<HeaderTitle title={title} />}
        // `Card`の`SubHeaderContent`には、`owner`、`views`、`created`を渡す
        subheader={
          <SubHeaderContent owner={owner} views={views} created={created} />
        }
      />
    </Card>
  );
};
```

**ホーム画面のアバター対応**

`src/pages/Home/index.tsx`
```javascript
import { Avatar, Container, Grid } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { PaginationControlled as Pagenation} from "../../components/Pagenation";
import { VideoCard } from "../../components/VideoCard";
import { SearchWords } from "../../stores/SearchWords";
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
  const searchWords = useRecoilValue(SearchWords);
  const videos = (searchWords && data) ?
    data.videos.filter(
      (video) => video.description?.match(searchWords.description || '')
    ) : data?.videos;

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
                // 引数追加　avatarを上位から渡す
                avatar={<Avatar src={video.owner.profile_photo_url || ""} />}
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

**Channelsのアバター対応**

Avatarにsrc指定する　`src={subscribe.subscribed.profile_photo_url || ""}`

`src/pages/Channels/index.tsx`
```javascript
import { Avatar, Button, Card, CardHeader, Container, Grid } from "@material-ui/core";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { VideoCard } from "../../components/VideoCard";
import { GlobalUser } from "../../stores/User";
import { storage } from "../../utils/Firebase/config";
import { useChannelListQuery } from "../../utils/graphql/generated";
import { useUnSubscribe } from "../../hooks/Channel/useUnSubscribe";
import CancelIcon from '@material-ui/icons/Cancel';
import useStyles from "./style";

export const Channels = () => {
  const styles = useStyles();

  // ユーザー情報Atom
  const globalUser = useRecoilValue(GlobalUser);

  // ChannelListを取得する`query`
  const { data, error } = useChannelListQuery({
    variables: {
      id: globalUser?.id || ""
    }
  });

  //　チャンネル登録解除する
  const { unsubscribe, error: delError } = useUnSubscribe();
  const onUnSubscribe = async (userid: string, subscribeId: string) => {
    await unsubscribe({
      userid: userid,
      subscribeId: subscribeId
    });
    if (delError) {
      console.log(delError.message)
    }
  }

  // エラーがあればコンソールの表示
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <>
        {data?.users_by_pk?.subscribesByUserid.map((subscribe) => (
          <div key={subscribe.subscribed.id}>
            <Card className={styles.card}>
              <div>
                <CardHeader
                  className={styles.cardHeader}
                  avatar={<Avatar src={subscribe.subscribed.profile_photo_url || ""} />}
                  title={subscribe.subscribed.name}
                />
                <Button
                  variant="contained"
                  color="default"
                  startIcon={<CancelIcon />}
                  onClick={() => onUnSubscribe(globalUser?.id || "", subscribe.subscribed.id)}
                  className={styles.unsubButton}
                >
                  登録解除
                </Button>
              </div>
              <Grid container spacing={2}>
                {subscribe.subscribed.videos.map((video) => (
                  <Grid item xs={3} key={video.id}>
                    <Link to={`/watch/${video.id}`} style={{ textDecoration: "none" }}>
                      <VideoCard
                        title={video.title as string}
                        views={video.views}
                        created={video.created_at}
                        fetcher={() =>
                          storage.ref(video.thumbnail_url as string).getDownloadURL()
                        }
                      />
                    </Link>
                  </Grid>
                ))}
              </Grid>
            </Card>
          </div>
        ))}
      </>
    </Container >
  );
};
```

### 11.3. VideoPlayerCardのアバター対応

**VideoPlayerCardに上位からアバターを渡す**

`src/pages/Watch/VideoPlayerCard/index.tsx`
```javascript
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Typography,
} from "@material-ui/core";
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import { useEffect, useState } from "react";
import useStyles from "./style";

// 親コンポーネントから渡されるpropsの型
export type VideoPlayerCardProps = {
  title: string | undefined;
  description: string | undefined;
  views: number | undefined;
  ownerName: string | undefined;
  ownerAvatar: React.ReactNode | undefined;     // ビデオオーナーのアバターを引数に追加
  subscribers: number | undefined;
  date: Date | undefined;
  showSubscribeButton: boolean;
  isSubscribed: boolean;
  fetcher: () => Promise<string | undefined>;
  onPlay: () => any;
  onSubscribe: () => any;
  onUnSubscribe: () => any;
};

export const VideoPlayerCard = ({
  title,
  description,
  views,
  ownerName,
  ownerAvatar,     // ビデオオーナーのアバターを引数に追加
  subscribers,
  date,
  showSubscribeButton,
  isSubscribed,
  fetcher,
  onPlay,
  onSubscribe,
  onUnSubscribe,
}: VideoPlayerCardProps) => {
  const styles = useStyles();

  // 動画のダウンロードリンクURLを格納するためのステート
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    // Firebas Storageから動画のダウンロードリンクを取得する
    fetcher().then(setSrc);
  });

  return (
    // `box-shadow`と`border-radius`を除去
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

      {/* タイトル表示エリア */}
      <CardContent className={styles.paddingHorizontalLess}>
        {/* 
          `Typography`コンポーネントは、テキストコンポーネントを簡単に作ることができます。
          今回、componentには`h2`を、`variant`には`h6`を指定しています。
          これは、HTMLタグは`<h2>`を使いスタリングは、Material-UIで用意されているh6用のスタリングを使うよう指示しています。
          <h2>タグ使いたいけど、フォントサイズなどはh6でのサイズを使いたい場合などに便利です。
        */}
        <Typography component="h2" variant="h6">
          {title}
        </Typography>

        {/* 
          color="textSecondary"はMaterial-UIでデフォルトで設定されているtextSecondaryという名前のカラーを指定しています。
          独自のカラーを使いたい場合は、下記を参考にカスタマイズが必要です。
          https://material-ui.com/customization/color/#color-tool
        */}
        <Typography variant="body2" color="textSecondary">
          {views} 回視聴 • {date ? new Date(date).toLocaleDateString() : ""}
        </Typography>
      </CardContent>

      {/* タイトル下の横線 */}
      <Divider />

      {/* 
        stylesの適用
      */}
      <div className={styles.cardHeader}>
        <CardHeader
          className={styles.paddingHorizontalLess}
          // ビデオオーナーのアバターを渡す
          avatar={ownerAvatar}
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

      {/* 説明文エリア */}
      <CardContent className={styles.descPadding}>{description}</CardContent>
    </Card>
  );
};
```

**Watchのアバター対応**

`src/pages/Watch/index.tsx`
```javascript
import { Avatar, Container, Grid } from "@material-ui/core";
import { VideoPlayerCard } from "./VideoPlayerCard";
import useStyles from "./style";
import { VideoHorizontalCard } from "../../components/VideoHorizontalCard";
import { useParams } from "react-router";
import {
  useRecommendVideosQuery,
  useUpdateVideoViewsMutation,
  useSubsribersQuery,
  useVideoByPkQuery,
  VideosDocument,
} from "../../utils/graphql/generated";
import { storage } from "../../utils/Firebase/config";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { GlobalUser } from "../../stores/User";
import { useSubscribe } from "../../hooks/Channel/useSubscribe";
import { useUnSubscribe } from "../../hooks/Channel/useUnSubscribe";

export const Watch = () => {
  const styles = useStyles();

  // 追加
  // URLから再生する動画のIDを取得する
  const { videoId } = useParams();

  // 追加
  // 再生する動画を取得する
  const { data: currentVideo } = useVideoByPkQuery({
    variables: {
      id: videoId,
    },
  });

  // 動画オーナーの登録者数を取得する
  const { data: subscribers } = useSubsribersQuery({
    variables: {
      ownerid: currentVideo?.videos_by_pk?.owner.id || '',
    },
  });

  // 追加
  // リコメンドの動画を取得する
  const { data: recommendVides } = useRecommendVideosQuery({
    variables: {
      currentVideoId: videoId,
    },
  });

  // リコメンドの動画を絞り込む
  const VIDEOS_DISP_MAX = 6;
  const videos = recommendVides?.videos.slice(0, VIDEOS_DISP_MAX);

  // 再生回数をカウントアップするmutation
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

  // ユーザー情報から登録済みチャンネルのID配列取得
  const globalUser = useRecoilValue(GlobalUser);

  // 表示中のビデオオーナーをログインユーザーが登録しているか？
  const isSubscribed = globalUser?.subscribesByUserid?.filter((sub) => sub.subscribe_id === currentVideo?.videos_by_pk?.owner.id).length === 1

  // ログインしており、表示中のビデオオーナーとログインユーザーが違う場合
  const showSubscribeButton = (globalUser?.id && currentVideo?.videos_by_pk?.owner.id !== globalUser?.id)

  return (
    // 全体のデザインを整えるためのコンテナー
    // 詳細：https://material-ui.com/ja/components/container/
    <Container className={styles.root}>
      {/* 
        カラムデザインを実現させるためのコンポーネント
        これがないとカラムにならない
      */}
      <Grid container spacing={2}>
        {/* 
          カラムの実態
          全体が"12"とした場合のカラム配置を設定できる
          例えば、下記は全体を"12"とした場合の、比率が"9:3"となるようにカラムの幅を指定している。
        */}
        <Grid item xs={8}>
          {/*
          再生する動画の情報を渡す
        */}
          <VideoPlayerCard
            title={currentVideo?.videos_by_pk?.title || "NO TITLE"}
            description={currentVideo?.videos_by_pk?.description || ""}
            views={currentVideo?.videos_by_pk?.views}
            ownerName={currentVideo?.videos_by_pk?.owner?.name}
            // ビデオオーナーのアバターを追加
            ownerAvatar={<Avatar src={currentVideo?.videos_by_pk?.owner?.profile_photo_url || ""} />}
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
        </Grid>
        {/*
          追加
          リコメンドの動画を一覧表示
        */}
        <Grid item xs={4}>
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
      </Grid>
    </Container>
  );
};
```

ソースの差分はこちら→　https://github.com/hiszuk/react-bootcamp-advanced/commit/566918a027402ff6849ac509f1c795a6450075c6

