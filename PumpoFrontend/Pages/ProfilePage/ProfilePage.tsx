import { ThemedText } from "@/components/ThemedText";
import {
  ThemedFadedView,
  ThemedIcon,
  ThemedView,
} from "@/components/ThemedView";
import { GetUserAchievements } from "@/Services/achievementServices";
import { GetLikedPostsByUser } from "@/Services/postInteractionServices";
import {
  CountPostsByUser,
  GetPostsWithTaggedUsers,
  LazyLoadPosts,
} from "@/Services/postServices";
import {
  GetFollowCounts,
  GetUserFitnessProfile,
  GetUserProfile,
} from "@/Services/userServices";
import { GetWorkoutPlansByUser } from "@/Services/workoutServices";
import { router, useGlobalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  NativeScrollEvent,
  NativeSyntheticEvent,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import ProfileExtraInfo from "./ProfileExtraInfo";
import ProfileHeader from "./ProfileHeader";
import ProfileInteraction from "./ProfileInteraction";
import { PostsTab, WorkoutsTab } from "./ProfileTabViews";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
const ProfilePage = ({
  user_id,
  other_user,
}: {
  user_id: string;
  other_user: boolean;
}) => {
  const [activeTab, setActiveTab] = useState("Posts"); // Preserve activeTab state
  const queryClient = useQueryClient(); // Use queryClient for invalidation

  const {
    data: profileData,
    isLoading: loadingProfile,
    isError: profileError,
  } = useQuery({
    queryKey: ["profile", user_id],
    queryFn: () => GetUserProfile(user_id),
  });

  const {
    data: fitnessProfileData,
    isLoading: loadingFitnessProfile,
    isError: fitnessProfileError,
  } = useQuery({
    queryKey: ["fitnessProfile", user_id],
    queryFn: () => GetUserFitnessProfile(user_id),
  });

  const {
    data: userStats,
    isLoading: loadingStats,
    isError: userStatsError,
  } = useQuery({
    queryKey: ["followCounts", user_id],
    queryFn: async () => {
      const followStat = await GetFollowCounts(user_id);
      const count = await CountPostsByUser(user_id);
      return { ...followStat, posts: count.post_count };
    },
  });

  const {
    data: userAchievements,
    isLoading: loadingAchievements,
    isError: achievementsError,
  } = useQuery({
    queryKey: ["achievements", user_id],
    queryFn: () => GetUserAchievements(user_id),
  });

  const {
    data: postsContent,
    fetchNextPage: fetchNextPosts,
    hasNextPage: hasMorePosts,
    isFetchingNextPage: loadingPosts,
  } = useInfiniteQuery({
    queryKey: ["posts", user_id],
    queryFn: async ({ pageParam = 1 }) => {
      const fetchedPosts = await LazyLoadPosts({
        page: pageParam,
        limit: 10,
        userId: user_id,
      });
      return {
        posts: fetchedPosts,
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.posts.length === 10 ? lastPage.currentPage + 1 : undefined,
    initialPageParam: 1,
  });

  const {
    data: wokroutsContent,
    fetchNextPage: fetchNextWorkouts,
    hasNextPage: hasMoreWorkout,
    isFetchingNextPage: loadingWorkouts,
  } = useInfiniteQuery({
    queryKey: ["workouts", user_id],
    queryFn: async ({ pageParam = 1 }) => {
      const fetchedWorkouts = await GetWorkoutPlansByUser({
        page: pageParam,
        limit: 10,
        userId: user_id,
      });
      return {
        workouts: fetchedWorkouts,
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.workouts.length === 10 ? lastPage.currentPage + 1 : undefined,
    initialPageParam: 1,
  });

  const {
    data: taggedPosts,
    fetchNextPage: fetchNextTaggedPosts,
    hasNextPage: hasMoreTagged,
    isFetchingNextPage: loadingTagged,
  } = useInfiniteQuery({
    queryKey: ["taggedPosts", user_id],
    queryFn: async ({ pageParam = 1 }) => {
      const fetchedTaggedPosts = await LazyLoadPosts({
        page: pageParam,
        limit: 10,
        tagged_users: user_id,
      });
      return {
        posts: fetchedTaggedPosts,
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.posts.length === 10 ? lastPage.currentPage + 1 : undefined,
    initialPageParam: 1,
  });

  const {
    data: likedPosts,
    fetchNextPage: fetchNextLikedPosts,
    hasNextPage: hasMoreLiked,
    isFetchingNextPage: loadingLiked,
  } = useInfiniteQuery({
    queryKey: ["likedPosts", user_id],
    queryFn: async ({ pageParam = 1 }) => {
      const fetchedLikedPosts = await GetLikedPostsByUser({
        user_id,
        limit: 6,
        page: pageParam,
      });
      return {
        posts: fetchedLikedPosts,
        currentPage: pageParam,
      };
    },
    getNextPageParam: (lastPage) =>
      lastPage.posts.length === 6 ? lastPage.currentPage + 1 : undefined,
    initialPageParam: 1,
  });

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["profile", user_id] });
    queryClient.invalidateQueries({ queryKey: ["fitnessProfile", user_id] });
    queryClient.invalidateQueries({ queryKey: ["followCounts", user_id] });
    queryClient.invalidateQueries({ queryKey: ["achievements", user_id] });
    queryClient.invalidateQueries({ queryKey: ["posts", user_id] });
    queryClient.invalidateQueries({ queryKey: ["workouts", user_id] });
    queryClient.invalidateQueries({ queryKey: ["taggedPosts", user_id] });
    queryClient.invalidateQueries({ queryKey: ["likedPosts", user_id] });
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;

    if (isNearBottom) {
      switch (activeTab) {
        case "Posts":
          if (hasMorePosts) fetchNextPosts();
          break;
        case "Tagged":
          if (hasMoreTagged) fetchNextTaggedPosts();
          break;
        case "Liked":
          if (hasMoreLiked) fetchNextLikedPosts();
          break;
        case "Workouts":
          if (hasMoreWorkout) fetchNextWorkouts();
          break;
      }
    }
  };

  const handlePostClick = (post: any) => {
    let tabs: {
      tagged: number;
      liked: number;
      workout: number;
      allPosts: number;
    } = {
      allPosts: activeTab === "Posts" ? 1 : 0,
      tagged: activeTab === "Tagged" ? 1 : 0,
      liked: activeTab === "Liked" ? 1 : 0,
      workout: activeTab === "Workouts" ? 1 : 0,
    };
    if (activeTab === "Workouts")
      router.push({
        pathname: "/(app)/(workout)/workout",
        params: { workoutId: post.workout_id },
      });
    else if (activeTab === "Posts")
      router.push({
        pathname: "/(feed)",
        params: {
          user_id: user_id,
          post_id: post.post_id,
          ...tabs,
        },
      });
    else if (activeTab === "Liked")
      router.push({
        pathname: "/(feed)",
        params: {
          user_id: user_id,
          post_id: post.post_id,
          ...tabs,
        },
      });
    else if (activeTab === "Tagged")
      router.push({
        pathname: "/(feed)",
        params: {
          user_id: user_id,
          post_id: post.post_id,

          ...tabs,
        },
      });
  };

  const RenderTabContent = ({
    postsData,
    workoutsData,
    taggedData,
    likedData,
  }: any) => {
    switch (activeTab) {
      case "Posts":
        return <PostsTab posts={postsData} handlePostClick={handlePostClick} />;
      case "Workouts":
        return (
          <WorkoutsTab posts={workoutsData} handlePostClick={handlePostClick} />
        );
      case "Tagged":
        return (
          <PostsTab posts={taggedData} handlePostClick={handlePostClick} />
        );
      case "Liked":
        return <PostsTab posts={likedData} handlePostClick={handlePostClick} />;
      default:
        return null;
    }
  };

  if (
    loadingProfile ||
    loadingFitnessProfile ||
    loadingStats ||
    loadingAchievements
  ) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          Loading profile data...
        </ThemedText>
      </ThemedView>
    );
  }

  if (
    profileError ||
    fitnessProfileError ||
    userStatsError ||
    achievementsError
  ) {
    return (
      <ThemedView style={styles.errorContainer}>
        <ThemedText style={styles.errorText}>
          Failed to load profile data
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedFadedView style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={handleRefresh} />
        }
        stickyHeaderIndices={[3]}
      >
        <ProfileHeader
          data={{
            user_profile: profileData,
            fitness_profile: fitnessProfileData,
            achievements: userAchievements,
            user_stats: userStats,
          }}
          other_user={other_user}
        />
        <ProfileExtraInfo
          data={{
            user_profile: profileData,
            fitness_profile: fitnessProfileData,
            achievements: userAchievements,
            user_stats: userStats,
          }}
          other_user={other_user}
        />
        <ProfileInteraction
          data={{
            user_profile: profileData,
            fitness_profile: fitnessProfileData,
            achievements: userAchievements,
            user_stats: userStats,
          }}
          other_user={other_user}
        />
        <>
          <ThemedView style={styles.tabBar}>
            {[
              { tab: "Posts", icon: "grid-outline" },
              { tab: "Workouts", icon: "barbell-outline" },
              { tab: "Tagged", icon: "pricetag-outline" },
              { tab: "Liked", icon: "heart-outline" },
            ].map(({ tab, icon }: any) => (
              <TouchableOpacity
                key={tab}
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <ThemedIcon
                  name={icon}
                  size={20}
                  color={activeTab === tab ? "#007BFF" : "#888"}
                />
              </TouchableOpacity>
            ))}
          </ThemedView>
        </>

        <ThemedView style={styles.tabsContainer}>
          <RenderTabContent
            postsData={postsContent?.pages.flatMap((page) => page.posts) || []}
            workoutsData={
              wokroutsContent?.pages.flatMap((page) => page.workouts) || []
            }
            taggedData={taggedPosts?.pages.flatMap((page) => page.posts) || []}
            likedData={likedPosts?.pages.flatMap((page) => page.posts) || []}
          />
        </ThemedView>
        {(loadingPosts || loadingLiked || loadingTagged || loadingWorkouts) && (
          <ActivityIndicator
            size="small"
            color="#007BFF"
            style={styles.loader}
          />
        )}
      </ScrollView>
    </ThemedFadedView>
  );
};

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "#fff",
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  loader: {
    marginVertical: 10,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    //borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    //backgroundColor: "#fff",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF",
  },
  tabsContainer: {
    backgroundColor: "#fff",
  },
});

export default ProfilePage;
