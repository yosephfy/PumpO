import { MainTabBarHeight } from "@/constants/DimensionsConstants";
import { useAuth } from "@/context/AuthContext";
import {
  AddBookmark,
  AddLike,
  CheckIfUserBookmarkedPost,
  CheckIfUserLikedPost,
  GetInteractionSummaryByPost,
  RemoveLike,
} from "@/Services/postInteractionServices";
import { GetPulseFeed } from "@/Services/postServices";
import {
  CheckUserFollow,
  FollowUser,
  GetUserProfile,
} from "@/Services/userServices";
import { useIsFocused } from "@react-navigation/native";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import SinglePulse from "./SinglePulse";

const { height } = Dimensions.get("window");
const Pulse: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isFocused = useIsFocused();
  const { currentUser } = useAuth();

  const {
    data: videosData,
    fetchNextPage,
    hasNextPage: hasMore,
    isFetchingNextPage: loading,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    queryKey: ["pulseVideos"],
    queryFn: async ({ pageParam = 1 }) => {
      const response: DT_Pulse[] = await GetPulseFeed({
        limit: 10,
        page: pageParam,
      });

      const fetchSinglePulse = async (pulse: DT_Pulse) => {
        if (currentUser) {
          const user: DT_UserProfile = await GetUserProfile(pulse.user_id);
          const interaction: DT_PostInteraction =
            await GetInteractionSummaryByPost(
              pulse.post_id,
              currentUser?.user_id
            );
          const checkUserFollow: boolean = await CheckUserFollow({
            follower_id: currentUser.user_id,
            followee_id: pulse.user_id,
          });
          let relationship: DT_relationship = { followed: checkUserFollow };
          return {
            ...pulse,
            user_profile: user,
            interactions: interaction,
            relationship: relationship,
          };
        }
      };

      const pulseData: DT_Pulse[] | any = await Promise.all(
        response.map(async (post: DT_Pulse) => fetchSinglePulse(post))
      );

      return {
        posts: pulseData,
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.posts.length === 10 ? lastPage.currentPage + 1 : undefined,
    initialPageParam: 1,
  });

  const handleRefresh = () => {
    refetch(); // Trigger refetch to refresh data
  };

  const handleLoadMore = () => {
    if (hasMore) fetchNextPage(); // Fetch next page if more data is available
  };

  const handleClickLike = (post_id: string) => async (liked: boolean) => {
    if (currentUser) {
      if (liked) {
        await AddLike({
          post_id,
          user_id: currentUser.user_id,
        });
      } else {
        const { like_id } = await CheckIfUserLikedPost(
          currentUser.user_id,
          post_id
        );
        await RemoveLike(like_id);
      }
    }
    refetch();
  };

  const handleClickBookmark =
    (post_id: string) => async (bookmarked: boolean) => {
      if (currentUser) {
        if (bookmarked) {
          await AddBookmark({
            post_id,
            user_id: currentUser.user_id,
          });
        } else {
          const { bookmark_id } = await CheckIfUserBookmarkedPost(
            currentUser.user_id,
            post_id
          );
          await RemoveLike(bookmark_id);
        }
      }
      refetch();
    };

  const handleClickFollow = (user_id: string) => async (followed: boolean) => {
    if (currentUser) {
      if (followed) {
        await FollowUser(currentUser.user_id, user_id);
      }
    }
    refetch();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={videosData?.pages.flatMap((page) => page.posts) || []}
        renderItem={({ item, index }) => (
          <SinglePulse
            pulse={item}
            isViewable={isFocused && activeIndex === index}
            handleClickLike={handleClickLike}
            handleClickBookmark={handleClickBookmark}
            handleClickFollow={handleClickFollow}
          />
        )}
        keyExtractor={(item) => item.video_id}
        pagingEnabled
        snapToStart
        decelerationRate="fast"
        snapToInterval={height - MainTabBarHeight}
        showsVerticalScrollIndicator={false}
        onViewableItemsChanged={(e) => {
          setActiveIndex(e.viewableItems[0]?.index ?? null);
        }}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={handleRefresh} />
        }
        ListFooterComponent={
          loading && hasMore ? (
            <ActivityIndicator size="small" color="#007BFF" />
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Pulse;
