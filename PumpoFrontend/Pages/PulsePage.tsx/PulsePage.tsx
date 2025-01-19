import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Dimensions,
  StyleSheet,
  RefreshControl,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Text,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { FilterPostsByType } from "@/Services/postServices";
import {
  CheckUserFollow,
  FollowUser,
  GetUserProfile,
} from "@/Services/userServices";
import {
  AddBookmark,
  AddLike,
  CheckIfUserBookmarkedPost,
  CheckIfUserLikedPost,
  GetInteractionSummaryByPost,
  RemoveLike,
} from "@/Services/postInteractionServices";
import SinglePulse from "./SinglePulse";
import { MainTabBarHeight } from "@/constants/DimensionsConstants";
import { useAuth } from "@/context/AuthContext";
import SlidingModal from "@/components/SlidingModal";
import { SafeAreaView } from "react-native-safe-area-context";

const { height } = Dimensions.get("window");

const Pulse: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [videosData, setVideosData] = useState<DT_Pulse[]>([]);
  const [page, setPage] = useState(1); // Current page for pagination
  const [loading, setLoading] = useState(false); // Loading state for pagination
  const [refreshing, setRefreshing] = useState(false); // Refreshing state
  const [hasMore, setHasMore] = useState(true); // Whether more data can be loaded
  const isFocused = useIsFocused();
  const { currentUser } = useAuth();

  const fetchVideos = async (
    pageToFetch: number,
    isRefreshing = false,
    isUpdating: string | undefined = undefined
  ) => {
    if (loading || (!isRefreshing && !hasMore)) return; // Prevent duplicate fetches
    setLoading(true);
    if (currentUser)
      try {
        const response: DT_Post[] = await FilterPostsByType({
          post_type: "Video",
          limit: 10,
          page: pageToFetch,
        });

        const fetchSinglePulse = async (post: DT_Post) => {
          const user: DT_UserProfile = await GetUserProfile(post.user_id);
          const interaction: DT_PostInteraction =
            await GetInteractionSummaryByPost(
              post.post_id,
              currentUser?.user_id
            );
          const checkUserFollow: boolean = await CheckUserFollow({
            follower_id: currentUser.user_id,
            followee_id: post.user_id,
          });
          let relationship: DT_relationship = { followed: checkUserFollow };
          return {
            ...post,
            user_profile: user,
            interactions: interaction,
            relationship: relationship,
          };
        };
        const pulseData: DT_Pulse[] = await Promise.all(
          response.map(async (post: DT_Post) => fetchSinglePulse(post))
        );

        if (isUpdating) {
          const updated = await fetchSinglePulse(
            videosData.filter((x) => x.post_id == isUpdating)[0]
          );
          setVideosData((prev) =>
            prev.map((x) => (x.post_id === isUpdating ? updated : x))
          );
        } else if (isRefreshing) {
          setVideosData(pulseData); // Replace data on refresh
        } else {
          setVideosData((prevData) => [...prevData, ...pulseData]); // Append new data
        }

        if (pulseData.length < 10) setHasMore(false); // No more data to load
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
  };

  useEffect(() => {
    fetchVideos(1, true); // Initial fetch on mount
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    fetchVideos(1, true); // Refresh from the first page
  };

  const handleLoadMore = () => {
    if (hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchVideos(nextPage);
    }
  };

  const handleClickLike = (post_id: string) => async (liked: boolean) => {
    if (currentUser) {
      if (liked) {
        const response = await AddLike({
          post_id,
          user_id: currentUser.user_id,
        });
      } else {
        const { like_id } = await CheckIfUserLikedPost(
          currentUser.user_id,
          post_id
        );
        const response = RemoveLike(like_id);
      }
    }
    fetchVideos(page, false, post_id);
  };

  const handleClickBookmark =
    (post_id: string) => async (bookmarked: boolean) => {
      if (currentUser) {
        if (bookmarked) {
          const response = await AddBookmark({
            post_id,
            user_id: currentUser.user_id,
          });
        } else {
          const { bookmark_id } = await CheckIfUserBookmarkedPost(
            currentUser.user_id,
            post_id
          );
          const response = RemoveLike(bookmark_id);
        }
      }
      fetchVideos(page, false, post_id);
    };

  const handleClickFollow = (user_id: string) => async (followed: boolean) => {
    if (currentUser) {
      if (followed) {
        const response = await FollowUser(currentUser.user_id, user_id);
      }
    }
    const post_id = videosData.filter((x) => x.user_id == user_id)[0].post_id;
    fetchVideos(page, false, post_id);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={videosData}
        renderItem={({ item, index }) => (
          <SinglePulse
            pulse={item}
            isViewable={isFocused && activeIndex === index}
            handleClickLike={handleClickLike}
            handleClickBookmark={handleClickBookmark}
            handleClickFollow={handleClickFollow}
          />
        )}
        keyExtractor={(item) => item.post_id}
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
        onEndReachedThreshold={0.5} // Trigger when the user scrolls near the bottom
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={
          refreshing ? <ActivityIndicator size="small" color="#007BFF" /> : null
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
