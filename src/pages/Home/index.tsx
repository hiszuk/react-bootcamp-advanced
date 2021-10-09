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
