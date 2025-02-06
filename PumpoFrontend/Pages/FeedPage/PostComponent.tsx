import Carousel from "@/components/Carousel";
import CollapsibleText from "@/components/CollapsibleText";
import ProfilePicture from "@/components/ProfilePicture";
import ShareSheet from "@/components/ShareSheet";
import SlidingModal from "@/components/SlidingModal";
import { ThemedText } from "@/components/ThemedText";
import { ThemedIcon, ThemedView } from "@/components/ThemedView";
import ToggleIcon from "@/components/ToggleIcon";
import { useAuth } from "@/context/AuthContext";
import {
  AddLike,
  GetInteractionSummaryByPost,
  RemoveLike,
} from "@/Services/postInteractionServices";
import { GetUserProfile } from "@/Services/userServices";
import { timeAgo } from "@/utility/utilities";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WorkoutCard from "../WorkoutsPage/WorkoutCard";
import PhotoPost from "./PhotoPost";
import PostOptionsPopup from "./PostOptionsPopup";
import TextPost from "./TextPost";
import VideoPost from "./VideoPost";
import { openMessage } from "../MessagesPage/NewMessage";
import { useQuery } from "@tanstack/react-query";

const PostComponent = ({ post }: { post: DT_Post }) => {
  const router = useRouter();
  const { currentUser } = useAuth();

  const { data: userProfile, refetch: fetchUserProfile } = useQuery({
    queryKey: ["userProfile", post.user_id],
    queryFn: () => GetUserProfile(post.user_id),
    enabled: !!post.user_id,
  });

  const { data: interactionData, refetch: fetchInteractions } = useQuery({
    queryKey: ["postInteractions", post.post_id],
    queryFn: async () => {
      const {
        comment_count,
        like_count,
        share_count,
        bookmark_count,
        like_id,
        bookmark_id,
        share_id,
      } = await GetInteractionSummaryByPost(post.post_id, currentUser?.user_id);
      return {
        comment_count,
        like_count,
        share_count,
        bookmark_count,
        like_id,
        bookmark_id,
        share_id,
      };
    },
  });

  const [shareSheetVisible, setShareSheetVisible] = useState(false);

  const renderPostContent = () => {
    const photos = post.content.photos || [];
    const videos = post.content.videos || [];
    const texts = post.content.texts || [];
    const workouts = post.content.workouts || [];

    const photosElement = photos.map((x) => ({
      order: x.order,
      elem: <PhotoPost post={x} key={x.photo_id} />,
    }));
    const videosElement = videos.map((x) => ({
      order: x.order,
      elem: <VideoPost post={x} key={x.video_id} />,
    }));

    const textsElement = texts.map((x) => ({
      order: x.order,
      elem: <TextPost post={x} key={x.text_id} />,
    }));

    const workoutsElement = workouts.map((x) => ({
      order: x.order,
      elem: <WorkoutCard workout={x} onPress={() => {}} key={x.workout_id} />,
    }));

    const items: React.ReactNode[] = [
      ...photosElement,
      ...videosElement,
      ...textsElement,
      ...workoutsElement,
    ]
      .sort((a, b) => a.order - b.order)
      .map((x) => x.elem);

    if (items.length === 0)
      return <Text style={styles.unsupportedText}>Unsupported Post Type</Text>;
    return (
      <Carousel
        items={items}
        indicatorStyle={{ position: "absolute", bottom: 10 }}
      />
    );
  };

  const handleClickComment = () => {
    router.push({
      pathname: "/comment",
      params: { post_id: post.post_id },
    });
  };

  const handleClickLike = async (like: boolean) => {
    if (currentUser) {
      if (like) {
        await AddLike({
          user_id: currentUser.user_id,
          post_id: post.post_id,
        });
      } else {
        if (interactionData?.like_id) await RemoveLike(interactionData.like_id);
      }
    }
    fetchInteractions();
  };

  const handleClickProfile = (user_id: string) => {
    router.setParams({});
    router.push({ pathname: "/(app)/(profile)", params: { user_id } });
  };

  const postOptionFunctions = {
    handleClickReport: () => {},
    handleClickSavePost: () => {},
    handleClickCopyLink: () => {},
    handleClickShare: () => {
      setShareSheetVisible(true);
    },
    handleClickMute: () => {},
    handleClickBlock: () => {},
    handleClickMessage: () => {
      if (currentUser)
        openMessage({
          participants: [post.user_id],
          userId: currentUser?.user_id,
        });
    },
    handleClickEdit: () => {},
    handleClickDelete: () => {},
    handleClickInsights: () => {},
    handleClickPin: () => {},
  };

  return (
    <>
      <ThemedView style={styles.postContainer}>
        {/* Post Header */}
        <View style={styles.postHeader}>
          <View style={styles.profileImage}>
            <ProfilePicture
              imageUrl={userProfile?.profile_picture || ""}
              size={40}
              onPress={() => handleClickProfile(userProfile.user_id)}
            />
          </View>
          <ThemedText type="subtitle" style={styles.username}>
            {userProfile?.username}
          </ThemedText>
          <PostOptionsPopup
            isOwner={false}
            iconName="ellipsis-horizontal-outline"
            {...postOptionFunctions}
          />
        </View>
        {/* Dynamic Post Content */}
        <View style={styles.postContent}>{renderPostContent()}</View>
        {/* Post Actions */}
        <View style={styles.actionContainer}>
          <View style={styles.actionIcons}>
            <View style={styles.actionShareLike}>
              <View style={styles.actionGroup}>
                <ToggleIcon
                  iconName="heart"
                  onToggle={handleClickLike}
                  isInitiallyToggled={interactionData?.like_id != undefined}
                  style={{}}
                  toggledColor="red"
                  size={24}
                  touchSoundDisabled={false}
                  haptics="Medium"
                />
                <ThemedText darkColor="#b9b9b9" style={styles.actionCount}>
                  {interactionData?.like_count}
                </ThemedText>
              </View>

              <View style={styles.actionGroup}>
                <TouchableOpacity onPress={handleClickComment}>
                  <ThemedIcon name="chatbubble-outline" size={24} />
                </TouchableOpacity>
                <ThemedText darkColor="#b9b9b9" style={styles.actionCount}>
                  {interactionData?.comment_count}
                </ThemedText>
              </View>
            </View>

            <View style={styles.actionGroup}>
              <TouchableOpacity
                onPress={() => {
                  setShareSheetVisible(true);
                }}
              >
                <ThemedIcon name="arrow-redo-outline" size={24} />
              </TouchableOpacity>
              <ThemedText darkColor="#b9b9b9" style={styles.actionCount}>
                {interactionData?.share_count}
              </ThemedText>
            </View>
          </View>
        </View>
        {/* Post Details */}
        <View style={styles.detailsContainer}>
          <CollapsibleText
            text={post.description}
            maxWords={15}
            style={styles.captionText}
            allowMarkup
          />
          <Text style={styles.timestampText}>
            {timeAgo(post.created_at).long}
          </Text>
        </View>
      </ThemedView>
      <SlidingModal
        isVisible={shareSheetVisible}
        onClose={() => setShareSheetVisible(false)}
        snapToPoints={[80]}
        maxHeight={100}
      >
        <ShareSheet />
      </SlidingModal>
    </>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    //marginBottom: 2,
    //backgroundColor: "#fff",
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,

    marginRight: 10,
  },
  username: {
    flex: 1,
    //fontWeight: "bold",
    fontSize: 14,
  },
  postContent: {
    width: Dimensions.get("screen").width,
    //backgroundColor: "#eee",
  },
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  actionShareLike: { flexDirection: "row", gap: 16 },
  actionIcons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  likeToggle: { tintColor: "red", margin: 10 },
  likeUntoggle: { color: "grey", margin: 10 },
  actionGroup: {
    alignItems: "center",
  },
  actionCount: {
    fontSize: 12,
    //color: "#bbb",
    marginTop: 4,
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  likesText: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  captionText: {
    marginBottom: 5,
    fontSize: 14,
  },
  commentsText: {
    color: "gray",
  },
  unsupportedText: {
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  timestampText: {
    color: "grey",
    fontSize: 10,
    marginBottom: 10,
  },
});

export default PostComponent;
