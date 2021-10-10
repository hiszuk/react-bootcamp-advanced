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
