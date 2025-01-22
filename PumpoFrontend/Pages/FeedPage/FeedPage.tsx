import SlidingModal from "@/components/SlidingModal";
import { ThemedView } from "@/components/ThemedView";
import PostComponent from "@/Pages/FeedPage/PostComponent";
import { GetInteractionSummaryByPost } from "@/Services/postInteractionServices";
import { LazyLoadPosts } from "@/Services/postServices";
import { GetUserProfile } from "@/Services/userServices";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  View,
  Text,
  RefreshControl,
  TouchableOpacity,
} from "react-native";

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
  const [landingIndex, setLandingIndex] = useState(0);
  useEffect(() => {
    if (landingIndex != 0)
      listRef.current?.scrollToIndex({ index: landingIndex });
  }, [landingIndex]);
  return (
    <ThemedView style={styles.container}>
      <FlatList
        ref={listRef}
        refreshControl={refreshControlComponent}
        data={posts}
        renderItem={({ item, index }) => {
          if (item.post_id == landingPost) setLandingIndex(index);
          return <PostComponent post={item} />;
        }}
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
        //initialScrollIndex={landingIndex}
        onScrollToIndexFailed={() => {}}
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
