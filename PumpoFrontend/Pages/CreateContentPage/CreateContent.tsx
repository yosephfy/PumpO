// /create/index.tsx
import React, { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Modal,
  FlatList,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Post, PostsContext } from "@/context/PostContext";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
  SettingOptionProp,
} from "@/components/OptionsComponent";
import {
  ThemedFadedView,
  ThemedIcon,
  ThemedView,
} from "@/components/ThemedView";
import { ThemedText, ThemedTextInput } from "@/components/ThemedText";
import { CreatePost } from "@/Services/postServices";
import { useAuth } from "@/context/AuthContext";
import EditableInput from "@/components/EditableInput";
import { useThemeColor } from "@/hooks/useThemeColor";

const windowWidth = Dimensions.get("window").width;

/** A Plus Button Card to add a new post */
const PlusButtonCard = ({ onPress }: { onPress: () => void }) => (
  <TouchableOpacity style={styles.plusButtonContainer} onPress={onPress}>
    <ThemedIcon name="add" size={40} />
  </TouchableOpacity>
);

/** Modal that appears when the user taps the plus button */
const PostTypeModal = ({
  visible,
  onClose,
  onSelect,
}: {
  visible: boolean;
  onClose: () => void;
  onSelect: (type: string) => void;
}) => {
  const getIcon = (type: DT_PostType) => {
    switch (type) {
      case "photo":
        return <ThemedIcon name="camera-outline" size={40} />;
      case "video":
        return <ThemedIcon name="videocam-outline" size={40} />;
      case "text":
        return <ThemedIcon name="text-outline" size={40} />;
      case "workout":
        return <ThemedIcon name="barbell-outline" size={40} />;
    }
  };
  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity style={styles.modalOverlay} onPress={onClose}>
        <ThemedView style={styles.modalContent}>
          {["text", "video", "photo", "workout"].map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.modalButton,
                { backgroundColor: useThemeColor({}, "fadedBackground") },
              ]}
              onPress={() => onSelect(type)}
            >
              <View
                style={{
                  alignItems: "center",
                }}
              >
                {getIcon(type as DT_PostType)}
                <ThemedText style={styles.modalButtonText}>
                  {type[0].toUpperCase() + type.slice(1)}
                </ThemedText>
              </View>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </TouchableOpacity>
    </Modal>
  );
};

export default function CreateContent() {
  const { currentUser } = useAuth();
  const { posts } = useContext(PostsContext);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  // Render a preview for each post with some styling.
  const renderPostPreview = ({ item: post }: { item: any }) => {
    if (post.type === "video" || post.type === "photo") {
      return (
        <Image
          source={{
            uri: post.content,
          }}
          style={styles.postCard}
        />
      );
    } else if (post.type === "text") {
      return (
        <ThemedView style={styles.postCard} lightColor="#888">
          <ThemedFadedView style={styles.postsTextTab}>
            <ThemedText style={styles.postsTextTabLabel} numberOfLines={3}>
              {post.content}
            </ThemedText>
          </ThemedFadedView>
        </ThemedView>
      );
    }
    return (
      <View key={post.id} style={styles.postCard}>
        <Text style={styles.postTitle}>{post.type.toUpperCase()} POST</Text>
        <Text style={styles.postContent}>{post.content}</Text>
      </View>
    );
  };

  const handleSelectPostType = (type: string) => {
    setShowModal(false);
    router.push({
      pathname: "/(create)/[postType]",
      params: { postType: type },
    });
  };
  // State for various settings
  const [link, setLink] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [taggedFriends, setTaggedFriends] = useState<string[]>([]);
  const [location, setLocation] = useState<string | null>(null);
  const [privacy, setPrivacy] = useState("Public");
  const [scheduledDate, setScheduledDate] = useState<Date>(new Date());
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const handlePlatformToggle = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };
  function groupPostsByType(posts: Post[]): DT_Post_Content {
    return posts.reduce(
      (acc, post, index) => {
        switch (post.type) {
          case "photo":
            if (!acc.photos) acc.photos = [];
            acc.photos.push({ order: index, media_url: post.content });
            break;
          case "video":
            if (!acc.videos) acc.videos = [];
            acc.videos.push({ order: index, media_url: post.content });
            break;
          case "text":
            if (!acc.texts) acc.texts = [];
            acc.texts.push({ order: index, content: post.content });
            break;
          case "workout":
            if (!acc.workouts) acc.workouts = [];
            acc.workouts.push({ order: index, ...post.content });
            break;
        }
        return acc;
      },
      {
        photos: undefined,
        videos: undefined,
        texts: undefined,
        workouts: undefined,
      } as DT_Post_Content
    );
  }

  const handleSubmitPost = async () => {
    let submission: DT_Post_Content = groupPostsByType(posts);

    if (currentUser)
      await CreatePost({
        user_id: currentUser.user_id,
        content: submission,
        description: description || undefined,
      });
  };

  const postSettingsOptions: SettingOptionGroupProp[] = [
    {
      id: "post-settings",
      items: [
        {
          id: "add-link",
          label: "Add Link",
          type: "textinput",
          value: link,
          placeholder: "Enter Link...",
          onSave: (value) => setLink(value),
        },
        {
          id: "tag-friends",
          label: "Tag Friends",
          type: "navigation",
          onPress: () => router.push("/tag-friends"),
        },
        {
          id: "location",
          label: "Location",
          type: "navigation",
          onPress: () => router.push("/set-location"),
        },
        {
          id: "privacy",
          label: "Who can see my posts",
          type: "dropdown",
          dropdownOptions: [
            { label: "Public", value: "Public" },
            { label: "Friends Only", value: "Friends Only" },
            { label: "Only Me", value: "Only Me" },
          ],
          dropdownValue: privacy,
          onDropdownChange: (value) => setPrivacy(value),
        },
        {
          id: "more-options",
          label: "More Options",
          type: "navigation",
          onPress: () => router.push("/more-options"),
        },
        {
          id: "schedule-post",
          label: "Schedule post",
          type: "datetime",
          datetimeValue: scheduledDate,
          onDateTimeChange: (date) => setScheduledDate(date),
        },
      ],
    },
    {
      id: "share-options",
      title: "Share to",
      items: [
        {
          id: "share-facebook",
          label: "Facebook",
          type: "toggle",
          value: selectedPlatforms.includes("Facebook"),
          onToggle: () => handlePlatformToggle("Facebook"),
        },
        {
          id: "share-twitter",
          label: "Twitter",
          type: "toggle",
          value: selectedPlatforms.includes("Twitter"),
          onToggle: () => handlePlatformToggle("Twitter"),
        },
        {
          id: "share-instagram",
          label: "Instagram",
          type: "toggle",
          value: selectedPlatforms.includes("Instagram"),
          onToggle: () => handlePlatformToggle("Instagram"),
        },
      ],
    },
  ];

  return (
    <ThemedFadedView style={{ flex: 1 }} lightColor="#f2f2f2">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.carouselSection}>
          <FlatList
            data={posts}
            renderItem={renderPostPreview}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            contentContainerStyle={styles.flatListContent}
            ListFooterComponent={
              <PlusButtonCard onPress={() => setShowModal(true)} />
            }
            showsHorizontalScrollIndicator={false}
          />
          <PostTypeModal
            visible={showModal}
            onClose={() => setShowModal(false)}
            onSelect={handleSelectPostType}
          />
        </View>

        <EditableInput
          value={description || ""}
          onChange={setDescription}
          placeholder="Enter description here..."
          paragraphMode
          unlocked
          containerStyle={styles.optionsSection}
        />
        {/* Additional Options Section */}
        <ThemedView style={styles.optionsSection}>
          <SettingOptionsComponent
            optionGroups={postSettingsOptions}
            ListFooterComponent={() => (
              <View style={styles.bottomButtons}>
                <TouchableOpacity style={styles.draftButton}>
                  <ThemedText
                    style={styles.draftButtonText}
                    darkColor="#2196F3"
                    lightColor="#2196F3"
                  >
                    Save to draft
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmitPost}
                  style={styles.postButton}
                >
                  <ThemedText style={styles.postButtonText} lightColor="#fff">
                    Post
                  </ThemedText>
                </TouchableOpacity>
              </View>
            )}
            scrollEnabled={false}
          />
        </ThemedView>
      </ScrollView>
    </ThemedFadedView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    //backgroundColor: "#f2f2f2",
  },
  scrollContainer: {
    //padding: 16,
    paddingBottom: 32,
    //margin: 10,
  },
  carouselSection: {
    marginBottom: 0,
  },
  flatListContent: {
    alignItems: "center",
    padding: 16,
  },
  plusButtonContainer: {
    width: 200,
    height: 200,
    borderRadius: 10,
    backgroundColor: "rgba(80, 80, 80, 0.14)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  plusText: {
    fontSize: 48,
    color: "#333",
  },
  postCard: {
    width: 200,
    height: 200,
    borderRadius: 10,
    //backgroundColor: "#fff",
    //padding: 12,
    marginRight: 16,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  postTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  postContent: {
    fontSize: 14,
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 16,
  },
  optionsSection: {
    //backgroundColor: "#fff",
    borderRadius: 10,
    marginHorizontal: 16,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  optionLabel: {
    fontSize: 16,
    color: "#333",
  },
  optionValue: {
    fontSize: 16,
    color: "#666",
  },
  shareSection: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  shareIconsContainer: {
    flexDirection: "row",
    marginTop: 8,
  },
  shareIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#2196F3",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  shareIconText: {
    color: "#fff",
    fontWeight: "600",
  },
  bottomButtons: { marginHorizontal: 25, marginVertical: 10 },
  postButton: {
    marginTop: 10,
    backgroundColor: "#2196F3",
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  postButtonText: {
    //color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  draftButton: {
    marginTop: 10,
    borderColor: "#2196F3",
    borderWidth: 2,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
  },
  draftButtonText: {
    //color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    //backgroundColor: "white",
    paddingVertical: 4,
    borderRadius: 12,
    // width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modalTitle: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: "600",
    color: "#333",
  },
  modalButton: {
    //backgroundColor: "#2196F3",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: "1%",
    alignItems: "center",
    justifyContent: "center",
    width: "46%",
    aspectRatio: 1,

    height: 100,
  },
  modalButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  modalCancel: {
    marginTop: 16,
  },
  modalCancelText: {
    color: "#2196F3",
    fontSize: 16,
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
});
