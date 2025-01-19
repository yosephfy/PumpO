import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
  NativeSyntheticEvent,
  NativeScrollEvent,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ProfileExtraInfo from "./ProfileExtraInfo";
import ProfileHeader from "./ProfileHeader";
import ProfileInteraction from "./ProfileInteraction";
import {
  GetUserProfile,
  GetUserFitnessProfile,
  GetFollowCounts,
} from "@/Services/userServices";
import { GetUserAchievements } from "@/Services/achievementServices";
import {
  CountPostsByUser,
  LazyLoadPosts,
  GetPostsWithTaggedUsers,
} from "@/Services/postServices";
import { LikedTab, PostsTab, TaggedTab, WorkoutsTab } from "./ProfileTabViews";
import { GetLikedPostsByUser } from "@/Services/postInteractionServices";
import {
  ThemedFadedView,
  ThemedIcon,
  ThemedView,
} from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { GetWorkoutPlansByUser } from "@/Services/workoutServices";
import { router } from "expo-router";

const ProfilePage = ({
  user_id,
  other_user,
}: {
  user_id: string;
  other_user: boolean;
}) => {
  const [profileData, setProfileData] = useState<DT_UserProfile | null>(null);
  const [fitnessProfileData, setFitnessProfileData] =
    useState<DT_FitnessProfile | null>(null);
  const [userAchievements, setUserAchievements] = useState<DT_Achievement[]>(
    []
  );
  const [followCounts, setFollowCounts] = useState({
    followers: 0,
    following: 0,
  });
  const [postsCount, setPostsCount] = useState(0);
  const [activeTab, setActiveTab] = useState("Posts");
  const [refreshing, setRefreshing] = useState(false);

  const [postsContent, setPostsContent] = useState<DT_Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);
  const [postPage, setPostPage] = useState(1);

  const [taggedPosts, setTaggedPosts] = useState<DT_Post[]>([]);
  const [loadingTagged, setLoadingTagged] = useState(false);
  const [hasMoreTagged, setHasMoreTagged] = useState(true);
  const [taggedPostPage, setTaggedPostPage] = useState(1);

  const [likedPosts, setLikedPosts] = useState<DT_Post[]>([]);
  const [loadingLiked, setLoadingLiked] = useState(false);
  const [hasMoreLiked, setHasMoreLiked] = useState(true);
  const [likedPostPage, setLikedPostPage] = useState(1);

  const [wokroutsContent, setWorkoutsContent] = useState<any[]>([]);
  const [loadingWorkouts, setLoadingWorkout] = useState(false);
  const [hasMoreWorkout, setHasMoreWorkouts] = useState(true);
  const [wokroutPage, setWorkoutPage] = useState(1);

  useEffect(() => {
    if (user_id) {
      fetchUserData();
      fetchPosts(1, true);
      fetchTaggedPosts(1, true);
      fetchLikedPosts(1, true);
      fetchWorkouts(1, true);
    }
  }, [user_id]);
  const fetchUserData = async () => {
    try {
      if (user_id) {
        const [profile, fitnessProfile, followCounts, achievements, postCount] =
          await Promise.all([
            GetUserProfile(user_id),
            GetUserFitnessProfile(user_id),
            GetFollowCounts(user_id),
            GetUserAchievements(user_id),
            CountPostsByUser(user_id),
          ]);

        setProfileData(profile);
        setFitnessProfileData(fitnessProfile);
        setFollowCounts(followCounts);
        setUserAchievements(achievements);
        setPostsCount(postCount.post_count);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };
  const fetchPosts = async (pageToFetch: number, refresh = false) => {
    if (loadingPosts) return;
    setLoadingPosts(true);

    try {
      const fetchedPosts = await LazyLoadPosts({
        page: pageToFetch,
        limit: 10,
        userId: user_id,
      });

      setHasMorePosts(fetchedPosts.length === 10);

      setPostsContent((prevPosts) =>
        refresh ? fetchedPosts : [...prevPosts, ...fetchedPosts]
      );
    } catch (error: any) {
      console.error("Error fetching posts:", error.message);
    } finally {
      setLoadingPosts(false);
      setRefreshing(false);
    }
  };

  const fetchWorkouts = async (pageToFetch: number, refresh = false) => {
    if (loadingWorkouts) return;
    setLoadingWorkout(true);

    try {
      const fetchedWorkouts = await GetWorkoutPlansByUser({
        page: pageToFetch,
        limit: 10,
        userId: user_id,
      });

      setHasMoreWorkouts(fetchedWorkouts.length === 10);

      setWorkoutsContent((prevWorkout) =>
        refresh ? fetchedWorkouts : [...prevWorkout, ...fetchedWorkouts]
      );
    } catch (error: any) {
      console.error("Error fetching workouts:", error.message);
    } finally {
      setLoadingWorkout(false);
      setRefreshing(false);
    }
  };

  const fetchTaggedPosts = async (pageToFetch: number, refresh = false) => {
    if (loadingTagged) return;
    setLoadingTagged(true);

    try {
      const fetchedTaggedPosts = await GetPostsWithTaggedUsers({
        user_id,
        limit: 10,
        page: pageToFetch,
      });

      setHasMoreTagged(fetchedTaggedPosts.length === 10);

      setTaggedPosts((prevPosts) =>
        refresh ? fetchedTaggedPosts : [...prevPosts, ...fetchedTaggedPosts]
      );
    } catch (error: any) {
      console.error("Error fetching tagged posts:", error.message);
    } finally {
      setLoadingTagged(false);
      setRefreshing(false);
    }
  };

  const fetchLikedPosts = async (pageToFetch: number, refresh = false) => {
    if (loadingLiked) return;
    setLoadingLiked(true);

    try {
      const fetchedLikedPosts = await GetLikedPostsByUser({
        user_id,
        limit: 6,
        page: pageToFetch,
      });

      setHasMoreLiked(fetchedLikedPosts.length === 6);

      setLikedPosts((prevPosts) =>
        refresh ? fetchedLikedPosts : [...prevPosts, ...fetchedLikedPosts]
      );
    } catch (error: any) {
      console.error("Error fetching liked posts:", error.message);
    } finally {
      setLoadingLiked(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setPostPage(1);
    setLikedPostPage(1);
    setTaggedPostPage(1);
    setWorkoutPage(1);
    setHasMorePosts(true);
    setHasMoreTagged(true);
    setHasMoreLiked(true);
    setHasMoreWorkouts(true);

    fetchUserData();
    if (activeTab === "Tagged") {
      fetchTaggedPosts(1, true);
    } else if (activeTab === "Liked") {
      fetchLikedPosts(1, true);
    } else if (activeTab === "Posts") {
      fetchPosts(1, true);
    } else if (activeTab === "Workouts") {
      fetchWorkouts(1, true);
    }
  };

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isNearBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 100;

    if (isNearBottom) {
      switch (activeTab) {
        case "Posts":
          if (!loadingPosts && hasMorePosts) {
            setPostPage((prevPage) => {
              const nextPage = prevPage + 1;
              fetchPosts(nextPage);
              return nextPage;
            });
          }
          break;
        case "Tagged":
          if (!loadingTagged && hasMoreTagged) {
            setTaggedPostPage((prevPage) => {
              const nextPage = prevPage + 1;
              fetchTaggedPosts(nextPage);
              return nextPage;
            });
          }
          break;
        case "Liked":
          if (!loadingLiked && hasMoreLiked) {
            setLikedPostPage((prevPage) => {
              const nextPage = prevPage + 1;
              fetchLikedPosts(nextPage);
              return nextPage;
            });
          }
          break;
        case "Workouts":
          if (!loadingWorkouts && hasMoreWorkout) {
            setWorkoutPage((prevPage) => {
              const nextPage = prevPage + 1;
              fetchWorkouts(nextPage);
              return nextPage;
            });
          }
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
    router.push({
      pathname: "/(feed)",
      params: { user_id: user_id, post_id: post.post_id, ...tabs },
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Posts":
        return (
          <PostsTab posts={postsContent} handlePostClick={handlePostClick} />
        );
      case "Workouts":
        return (
          <WorkoutsTab
            posts={wokroutsContent}
            handlePostClick={handlePostClick}
          />
        );
      case "Tagged":
        return (
          <PostsTab posts={taggedPosts} handlePostClick={handlePostClick} />
        );
      case "Liked":
        return (
          <PostsTab posts={likedPosts} handlePostClick={handlePostClick} />
        );
      default:
        return null;
    }
  };

  if (!profileData || !fitnessProfileData || !userAchievements) {
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
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        stickyHeaderIndices={[3]}
      >
        <ProfileHeader
          data={{
            user_profile: profileData,
            fitness_profile: fitnessProfileData,
            achievements: userAchievements,
            user_stats: { ...followCounts, posts: postsCount },
          }}
          other_user={other_user}
        />
        <ProfileExtraInfo
          data={{
            user_profile: profileData,
            fitness_profile: fitnessProfileData,
            achievements: userAchievements,
            user_stats: { ...followCounts, posts: postsCount },
          }}
          other_user={other_user}
        />
        <ProfileInteraction
          data={{
            user_profile: profileData,
            fitness_profile: fitnessProfileData,
            achievements: userAchievements,
            user_stats: { ...followCounts, posts: postsCount },
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
          {renderTabContent()}
        </ThemedView>
        {(loadingPosts || loadingLiked || loadingTagged) && (
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
