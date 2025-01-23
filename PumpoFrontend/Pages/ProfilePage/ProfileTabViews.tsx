import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

export const PostsTab = ({
  posts,
  handlePostClick,
}: {
  posts: DT_Post[];
  handlePostClick: (post: DT_Post) => any;
}) => (
  <ThemedFadedView style={styles.postsContainer}>
    {posts.map((post) => {
      type UnifiedContent = {
        order: number;
        type: "photo" | "video" | "text";
        media_url?: string;
        thumbnail_url?: string;
        content?: string;
      };

      const photos = (post.content.photos || []).map((photo) => ({
        order: photo.order,
        type: "photo" as const,
        media_url: photo.media_url,
      }));

      const videos = (post.content.videos || []).map((video) => ({
        order: video.order,
        type: "video" as const,
        media_url: video.media_url,
        thumbnail_url: video.thumbnail_url,
      }));

      const texts = (post.content.texts || []).map((text) => ({
        order: text.order,
        type: "text" as const,
        content: text.content,
      }));

      const allContent: UnifiedContent[] = [...photos, ...videos, ...texts];
      const firstContent = allContent.sort((a, b) => a.order - b.order)[0];

      let media: React.ReactNode = <View></View>;
      if (firstContent.type === "photo") {
        media = (
          <Image
            source={{
              uri: firstContent.media_url,
            }}
            style={styles.postImage}
          />
        );
      } else if (firstContent.type === "video") {
        media = (
          <Image
            source={{
              uri: firstContent.thumbnail_url,
            }}
            style={styles.postImage}
          />
        );
      } else if (firstContent.type === "text") {
        media = (
          <ThemedView style={styles.postImage} lightColor="#888">
            <ThemedFadedView style={styles.postsTextTab}>
              <ThemedText style={styles.postsTextTabLabel} numberOfLines={3}>
                {firstContent.content}
              </ThemedText>
            </ThemedFadedView>
          </ThemedView>
        );
      }

      return (
        <TouchableOpacity
          key={post.post_id}
          style={styles.postContainer}
          onPress={() => handlePostClick(post)}
        >
          {media}
        </TouchableOpacity>
      );
    })}
    {posts.length === 0 && <EmptyContent contentType="No posts yet!" />}
  </ThemedFadedView>
);

export const WorkoutsTab = ({
  posts,
  handlePostClick,
}: {
  posts: any[];
  handlePostClick: (post: any) => any;
}) => (
  <ThemedFadedView style={styles.workoutsContainer}>
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
    {posts.length === 0 && <EmptyContent contentType="No workouts yet!" />}
  </ThemedFadedView>
);

const EmptyContent = ({ contentType }: { contentType: string }) => (
  <View style={styles.emptyContent}>
    <ThemedText
      style={styles.emptyContentText}
      darkColor="#555"
      lightColor="#ddd"
    >
      {contentType}
    </ThemedText>
  </View>
);

const styles = StyleSheet.create({
  postContainer: {
    width: "33.33%",
    aspectRatio: 1,
    padding: 1,
  },
  postsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
  },
  workoutsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    height: "100%",
  },
  workoutContainer: {
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
    padding: 10,
  },
  workoutDetailsText: {
    fontSize: 14,
  },
  postImage: {
    width: "100%",
    height: "100%",
    borderRadius: 2,
  },
  workoutImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  postsTextTab: {
    flex: 1,
    margin: 7,
    borderRadius: 7,
    justifyContent: "center",
    padding: 10,
  },
  postsTextTabLabel: {
    fontSize: 14,
  },
  emptyContent: {
    flex: 1,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    top: 100,
  },
  emptyContentText: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
