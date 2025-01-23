import { useAuth } from "@/context/AuthContext";
import FeedPage from "@/Pages/FeedPage/FeedPage";
import { GetLikedPostsByUser } from "@/Services/postInteractionServices";
import { LazyLoadPosts } from "@/Services/postServices";
import { GetWorkoutPlansByUser } from "@/Services/workoutServices";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useGlobalSearchParams } from "expo-router";
import React, { useEffect } from "react";
import { RefreshControl } from "react-native";

const Feed: React.FC = () => {
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
  const fetchPosts = async ({ pageParam = 1 }) => {
    if (allPosts == 1) {
      return await LazyLoadPosts({
        page: pageParam,
        limit: 10,
        userId: user_id,
      });
    } else if (tagged == 1) {
      return await LazyLoadPosts({
        tagged_users: user_id,
        limit: 10,
        page: pageParam,
      });
    } else if (liked == 1 && user_id) {
      return await GetLikedPostsByUser({
        user_id,
        limit: 10,
        page: pageParam,
      });
    } else if (workout == 1 && user_id) {
      return await GetWorkoutPlansByUser({
        page: pageParam,
        limit: 10,
        userId: user_id,
      });
    }
    return [];
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["feed", user_id, tagged, liked, workout, allPosts],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
    enabled: !!currentUser,
    initialPageParam: 1,
  });

  const posts = data?.pages.flat() || [];

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleRefresh = () => {
    refetch();
  };

  return (
    <FeedPage
      refreshControlComponent={
        <RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />
      }
      posts={posts}
      handleLoadMore={handleLoadMore}
      loading={isLoading || isFetchingNextPage}
      landingPost={post_id}
    />
  );
};

export default Feed;
