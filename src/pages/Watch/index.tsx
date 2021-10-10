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
