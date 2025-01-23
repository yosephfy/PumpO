import React, { ReactElement, useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import PostComponent from "@/Pages/FeedPage/PostComponent";

const FeedPage = ({
  refreshControlComponent,
  posts,
  handleLoadMore,
  loading,
  landingPost,
}: {
  refreshControlComponent: ReactElement;
  posts: DT_Post[];
  handleLoadMore: () => any;
  loading: boolean;
  landingPost?: string;
}) => {
  const listRef = useRef<FlatList>(null);
  const [isListReady, setIsListReady] = useState(false);
  const [landingIndex, setLanding] = useState(0);

  useEffect(() => {
    const l = landingPost
      ? posts.findIndex((post) => post.post_id == landingPost)
      : 0;
    setLanding(l);
    /* console.log({
      landingPost,
      landingIndex,
      posts: posts.map((x) => x.post_id),
    }); */
    if (isListReady && landingIndex >= 0 && posts.length) {
      listRef.current?.scrollToIndex({ index: landingIndex, animated: true });
    }
  }, [isListReady, landingIndex]);

  return (
    <ThemedView style={styles.container}>
      <FlatList
        ref={listRef}
        refreshControl={refreshControlComponent}
        data={posts}
        renderItem={({ item }) => <PostComponent post={item} />}
        keyExtractor={(item) => item.post_id}
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="small"
              color="#007BFF"
              style={styles.loader}
            />
          ) : null
        }
        onContentSizeChange={() => setIsListReady(true)} // Notify when list is ready
        onLayout={() => setIsListReady(true)} // Backup for readiness
        onScrollToIndexFailed={(error) => {
          console.warn("Scroll to index failed", error);
          listRef.current?.scrollToOffset({ offset: 0, animated: true }); // Fallback
        }}
      />
    </ThemedView>
  );
};

export default FeedPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 1,
  },
  loader: {
    marginVertical: 10,
  },
});
