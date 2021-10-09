import firebase from "firebase/app";
import "firebase/auth"
import "firebase/storage"
import "firebase/firestore"


// Firebase コンソールの「プロジェクトの設定」>「SDK の設定と構成」から「構成」を選択し、そのままコピペ
const firebaseConfig = {
  apiKey: "AIzaSyBVyB0wZgepbPG_j2D0vj5yPSzgKdsWiAQ",
  authDomain: "react-bootcamp-351bc.firebaseapp.com",
  projectId: "react-bootcamp-351bc",
  storageBucket: "react-bootcamp-351bc.appspot.com",
  messagingSenderId: "740212487180",
  appId: "1:740212487180:web:06cd48ce76275cfbaaaa29"
};

// firebaseパッケージをAPI Keyで初期化
// Firebaseコンソールでさksウエイ他アプリとReactを紐づける処理
// 既にインスタンスが存在するときは初期化しない
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

// 認証用のfirebaseモジュール
export const fireAuth = firebase.auth();

// ストレージ用のfirebaseモジュール
export const storage = firebase.storage();

// firestoreのfirebaseモジュール
export const firestore = firebase.firestore();

// 初期化済みのfirebaseパッケージを確実に使用するためのexport defaultでfirebaseパッケージをexport
export default firebase;
