import { useAuth } from "@/context/AuthContext";
import FeedPage from "@/Pages/FeedPage/FeedPage";
import { GetLikedPostsByUser } from "@/Services/postInteractionServices";
import {
  GetPostsWithTaggedUsers,
  LazyLoadPosts,
} from "@/Services/postServices";
import { GetWorkoutPlansByUser } from "@/Services/workoutServices";
import { useGlobalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { RefreshControl } from "react-native";

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<DT_Post[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { currentUser } = useAuth();
  const {
    user_id,
    post_id,
    tagged = 0,
    liked = 0,
    workout = 0,
    allPosts = 0,
  }: {
    user_id?: string;
    post_id?: string;
    tagged?: number;
    liked?: number;
    workout?: number;
    allPosts?: number;
  } = useGlobalSearchParams();
  const fetchPosts = async (pageToFetch: number, refresh = false) => {
    if (loading) return;
    setLoading(true);

    try {
      const fetchedPosts = await LazyLoadPosts({
        page: pageToFetch,
        limit: 10,
        userId: user_id,
      });

      setHasMore(fetchedPosts.length === 10);

      setPosts((prevPosts) =>
        refresh ? fetchedPosts : [...prevPosts, ...fetchedPosts]
      );
    } catch (error: any) {
      console.error("Error fetching posts:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchWorkouts = async (pageToFetch: number, refresh = false) => {
    if (loading) return;
    setLoading(true);
    if (user_id)
      try {
        const fetchedWorkouts = await GetWorkoutPlansByUser({
          page: pageToFetch,
          limit: 10,
          userId: user_id,
        });

        setHasMore(fetchedWorkouts.length === 10);

        setPosts((prevWorkout) =>
          refresh ? fetchedWorkouts : [...prevWorkout, ...fetchedWorkouts]
        );
      } catch (error: any) {
        console.error("Error fetching workouts:", error.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
  };

  const fetchTaggedPosts = async (pageToFetch: number, refresh = false) => {
    if (loading) return;
    setLoading(true);
    if (user_id)
      try {
        const fetchedTaggedPosts = await GetPostsWithTaggedUsers({
          user_id,
          limit: 10,
          page: pageToFetch,
        });

        setHasMore(fetchedTaggedPosts.length === 10);

        setPosts((prevPosts) =>
          refresh ? fetchedTaggedPosts : [...prevPosts, ...fetchedTaggedPosts]
        );
      } catch (error: any) {
        console.error("Error fetching tagged posts:", error.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
  };

  const fetchLikedPosts = async (pageToFetch: number, refresh = false) => {
    if (loading) return;
    setLoading(true);
    if (user_id)
      try {
        const fetchedLikedPosts = await GetLikedPostsByUser({
          user_id,
          limit: 10,
          page: pageToFetch,
        });

        setHasMore(fetchedLikedPosts.length === 10);

        setPosts((prevPosts) =>
          refresh ? fetchedLikedPosts : [...prevPosts, ...fetchedLikedPosts]
        );
      } catch (error: any) {
        console.error("Error fetching liked posts:", error.message);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
  };

  useEffect(() => {
    let temp = 1;
    if (allPosts == 1) fetchPosts(temp);
    else if (tagged == 1) fetchTaggedPosts(temp);
    else if (liked == 1) fetchLikedPosts(temp);
    else if (workout == 1) fetchWorkouts(temp);
  }, [user_id, post_id, tagged, liked, workout, allPosts]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        if (tagged == 1) fetchTaggedPosts(nextPage);
        else if (liked == 1) fetchLikedPosts(nextPage);
        else if (workout == 1) fetchWorkouts(nextPage);
        else if (allPosts == 1) fetchPosts(nextPage);
        return nextPage;
      });
    }
  };

  const handleRefresh = () => {
    setPage(1);
    setHasMore(true);
    if (tagged == 1) fetchTaggedPosts(1, true);
    else if (liked == 1) fetchLikedPosts(1, true);
    else if (workout == 1) fetchWorkouts(1, true);
    else if (allPosts == 1) fetchPosts(1, true);
  };

  return (
    <FeedPage
      refreshControlComponent={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      posts={posts}
      handleLoadMore={handleLoadMore}
      loading={loading}
      landingPost={post_id}
    />
  );
};

export default Feed;
