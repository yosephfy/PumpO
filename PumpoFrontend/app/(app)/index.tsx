import FeedPage from "@/Pages/FeedPage/FeedPage";
import { LazyLoadPosts } from "@/Services/postServices";
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";

const MainFeedPage: React.FC = () => {
  const [posts, setPosts] = useState<DT_Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const fetchFeed = async (pageToFetch = 1, refresh = false) => {
    try {
      if (!refresh) setLoading(true);
      else setRefreshing(true);

      const postData: DT_Post[] = await LazyLoadPosts({
        page: pageToFetch,
        limit: 10,
      });

      if (refresh) {
        setPosts(postData);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...postData]);
      }
    } catch (error) {
      console.error("Error fetching feed data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  const handleLoadMore = () => {
    if (!loading) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchFeed(nextPage);
        return nextPage;
      });
    }
  };

  const handleRefresh = () => {
    setPage(1);
    fetchFeed(1, true);
  };

  return (
    <FeedPage
      refreshControlComponent={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      posts={posts}
      handleLoadMore={handleLoadMore}
      loading={loading}
    />
  );
};

export default MainFeedPage;
