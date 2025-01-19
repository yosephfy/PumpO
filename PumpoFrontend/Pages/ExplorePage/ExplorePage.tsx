import SearchBar from "@/components/SearchBar";
import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ExplorePage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("People");

  const handleSearch = (query: string) => {
    // Hypothetical search function
    console.log(`Searching for: ${query}`);
  };

  const renderResults = () => {
    switch (activeTab) {
      case "People":
        return <Text style={styles.resultsText}>Trending People</Text>;
      case "Media":
        return <Text style={styles.resultsText}>Trending Media</Text>;
      case "Workouts":
        return <Text style={styles.resultsText}>Trending Workouts</Text>;
      case "Workout Plans":
        return <Text style={styles.resultsText}>Trending Workout Plans</Text>;
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
          />
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
          {["People", "Media", "Workouts", "Workout Plans"].map((tab) => (
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

        {/* Results */}
        <ScrollView style={styles.resultsContainer}>
          {renderResults()}
        </ScrollView>
      </SafeAreaView>
    </ThemedFadedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: "#fff",
  },
  topActionContainer: {
    flexDirection: "row",
    //borderBottomWidth: 1,
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
    //borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingTop: 10,
    //backgroundColor: "#fff",
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
    //color: "#888",
  },
  activeTabText: {
    color: "#007BFF",
    fontWeight: "bold",
  },
  resultsContainer: {
    flex: 1,
    padding: 10,
  },
  resultsText: {
    fontSize: 16,
    //color: "#333",
    marginBottom: 10,
  },
});

export default ExplorePage;
