import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";

export const PostsTab = ({
  posts,
  handlePostClick,
}: {
  posts: any[];
  handlePostClick: (post: any) => any;
}) => (
  <ThemedFadedView style={styles.postsContainer}>
    {posts.map((post) => (
      <TouchableOpacity
        key={post.post_id}
        style={styles.postContainer}
        onPress={() => handlePostClick(post)}
      >
        <Image source={{ uri: post.media_url }} style={styles.postImage} />
      </TouchableOpacity>
    ))}
  </ThemedFadedView>
);

export const WorkoutsTab = ({
  posts,
  handlePostClick,
}: {
  posts: any[];
  handlePostClick: (post: any) => any;
}) => (
  <ThemedFadedView style={styles.wokroutsContainer}>
    {posts.map((workout) => (
      <TouchableOpacity
        key={workout.workout_id}
        style={styles.workoutContainer}
        onPress={() => handlePostClick(workout)}
      >
        <View style={styles.workoutCard}>
          <Image
            source={{ uri: workout.image_url }}
            style={styles.workoutImage}
          />
          <ThemedFadedView style={styles.workoutDetail}>
            <ThemedText style={styles.workoutDetailsText}>
              {workout.name}
            </ThemedText>
            <ThemedText style={styles.workoutDetailsText} type="link">
              {workout.tags.join(", ")}
            </ThemedText>
          </ThemedFadedView>
        </View>
      </TouchableOpacity>
    ))}
  </ThemedFadedView>
);

export const TaggedTab = ({
  posts,
  handlePostClick,
}: {
  posts: any[];
  handlePostClick: (post: any) => any;
}) => (
  <ThemedFadedView style={styles.postsContainer}>
    {posts.map((post) => (
      <TouchableOpacity
        key={post.post_id}
        style={styles.postContainer}
        onPress={() => handlePostClick(post)}
      >
        <Image source={{ uri: post.media_url }} style={styles.postImage} />
      </TouchableOpacity>
    ))}
  </ThemedFadedView>
);

export const LikedTab = ({
  posts,
  handlePostClick,
}: {
  posts: any[];
  handlePostClick: (post: any) => any;
}) => (
  <ThemedFadedView style={styles.postsContainer}>
    {posts.map((post) => (
      <TouchableOpacity
        key={post.post_id}
        style={styles.postContainer}
        onPress={() => handlePostClick(post)}
      >
        <Image source={{ uri: post.media_url }} style={styles.postImage} />
      </TouchableOpacity>
    ))}
  </ThemedFadedView>
);
const styles = StyleSheet.create({
  centeredContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  postContainer: {
    width: "33.33%",
    aspectRatio: 1,
    padding: 1,
  },
  postsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    //paddingHorizontal: 2,
    height: "100%",
  },
  wokroutsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    //paddingHorizontal: 2,
    height: "100%",
  },
  workoutContainer: {
    //backgroundColor: "pink",
    width: "50%",
    aspectRatio: 1,
  },
  workoutCard: {
    alignItems: "center",
    padding: 5,
    width: "100%",
  },
  workoutDetail: {
    height: "40%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    opacity: 0.95,
    //justifyContent: "center",
    padding: 10,
  },
  workoutDetailsText: {
    fontSize: 14,
  },
  postImage: {
    width: "100%",
    height: "100%",
    borderRadius: 2,
    backgroundColor: "#ddd",
  },
  workoutImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
});
