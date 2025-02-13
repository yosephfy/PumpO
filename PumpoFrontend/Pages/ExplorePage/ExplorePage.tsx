import SearchBar from "@/components/SearchBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PostsTab, WorkoutsTab } from "../ProfilePage/ProfileTabViews";
import {
  FetchSuggestedUsers,
  FetchTrendingContent,
  SearchExplore,
} from "@/Services/exploreServices";
import { useAuth } from "@/context/AuthContext";
import { GetAllWorkoutPlans } from "@/Services/workoutServices";
import { UserList } from "./UsersListComponents";

type explore_types = "";

const ExplorePage = ({ queryItem }: { queryItem?: string }) => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("People");
  const [searchQuery, setSearchQuery] = useState(queryItem || "");

  const [mediaList, setMediaList] = useState<DT_Post[]>([]);
  const [workoutList, setWorokoutList] = useState<DT_Workout[]>([]);
  const [planList, setPlanList] = useState<DT_Workout[]>([]);
  const [userList, setUserList] = useState<
    (DT_UserProfile & {
      follower_count: number;
      mutual_friends: string;
      mutual_friends_count: number;
    })[]
  >([]);

  const handleSearch = (query: string) => {
    // Hypothetical search function
    console.log(`Searching for: ${query}`);
    setSearchQuery(query);
  };

  const fetchMedia = async () => {
    if (!currentUser) return;
    if (searchQuery.length > 0) {
      const searchedContent = await SearchExplore({
        query: searchQuery,
        category: "media",
      })
        .then(({ posts }) => setMediaList(posts))
        .catch((err) => console.error("Error Fetching Media", err));
      return searchedContent;
    }
    const trendingContent = await FetchTrendingContent({
      user_id: currentUser.user_id,
      category: "media",
    })
      .then(setMediaList)
      .catch((err) => console.error("Error Fetching Media", err));

    return trendingContent;
  };

  const fetchWorkouts = async () => {
    if (!currentUser) return;

    if (searchQuery.length > 0) {
      const searchedContent = await SearchExplore({
        query: searchQuery,
        category: "workouts",
      })
        .then(({ workouts }) => setWorokoutList(workouts))
        .catch((err) => console.error("Error Fetching Workout", err));
      return searchedContent;
    }

    const response = await GetAllWorkoutPlans()
      .then(setWorokoutList)
      .catch((err) => console.error("Error Fetching WokroutPlan", err));
    return response;
  };

  const fetchPlans = async () => {
    if (!currentUser) return;

    if (searchQuery.length > 0) {
      const searchedContent = await SearchExplore({
        query: searchQuery,
        category: "plans",
      })
        .then(({ plans }) => setPlanList(plans))
        .catch((err) => console.error("Error Fetching Workout", err));
      return searchedContent;
    }

    const response = await GetAllWorkoutPlans()
      .then(setWorokoutList)
      .catch((err) => console.error("Error Fetching WokroutPlan", err));
    return response;
  };
  const fetchUsers = async () => {
    if (!currentUser) return;

    if (searchQuery.length > 0) {
      const searchedContent = await SearchExplore({
        query: searchQuery,
        category: "users",
      })
        .then(({ users }) => setUserList(users))
        .catch((err) => console.error("Error Fetching Users", err));
      return searchedContent;
    }

    const response = await FetchSuggestedUsers(currentUser.user_id)
      .then(setUserList)
      .catch((err) => console.error("Error Fetching users", err));
    return response;
  };
  useEffect(() => {
    fetchMedia();
    fetchWorkouts();
    fetchPlans();
    fetchUsers();
  }, [activeTab, searchQuery]);

  const renderResults = () => {
    switch (activeTab) {
      case "People":
        return <UserList users={userList} />;
      case "Media":
        return <PostsTab posts={mediaList} handlePostClick={() => {}} />;
      case "Workouts":
        return <WorkoutsTab posts={workoutList} handlePostClick={() => {}} />;
      case "Plans":
        return <WorkoutsTab posts={planList} handlePostClick={() => {}} />;
      default:
        return <Text style={styles.resultsText}>Trending Results</Text>;
    }
  };

  return (
    <ThemedFadedView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.topActionContainer}>
          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Ionicons name="chevron-back-outline" size={30} color="#007BFF" />
          </TouchableOpacity>

          {/* Search Bar */}
          <SearchBar
            onSearch={handleSearch}
            style={{
              flex: 1,
            }}
            onChangeText={handleSearch}
            initialValue={searchQuery} // Pass the updated query to SearchBar
          />
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          {["People", "Media", "Workouts", "Plans"].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <ThemedText
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
              >
                {tab}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>
        <ThemedView style={{ height: 1.5 }} />
      </SafeAreaView>
      {/* Results */}
      <ScrollView style={styles.resultsContainer}>{renderResults()}</ScrollView>
    </ThemedFadedView>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
  topActionContainer: {
    flexDirection: "row",
    borderBottomColor: "#ddd",
  },
  backButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    verticalAlign: "middle",
    alignContent: "center",
    alignSelf: "center",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomColor: "#ddd",
    paddingTop: 10,
  },
  tab: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#007BFF",
  },
  tabText: {
    fontSize: 14,
  },
  activeTabText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  resultsContainer: {
    flex: 1,
    padding: 1,
  },
  resultsText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ExplorePage;
