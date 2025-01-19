type DT_UserProfile = {
  user_id: string;
  username: string;
  email: string;
  profile_picture?: string;
  bio?: string;
  account_type?: string;
  created_at?: string;
  updated_at?: string;
};

type DT_Followers = {
  follower_id: string;
  followee_id: string;
  followed_at: string;
};

type DT_FitnessProfile = {
  profile_id: string;
  user_id: string;
  weight?: number;
  height?: number;
  body_fat_percentage?: number;
  seasonal_status?: string;
  created_at?: string;
  updated_at?: string;
};
type DT_Achievement = {
  name: string;
  category: string;
  description: string;
  reward_points: number;
  user_achievement_id?: string;
  user_id: string;
  achievement_id: string;
  date_awarded?: string;
  progress?: any;
  status: string;
};

type DT_ProfilePage = {
  user_profile: DT_UserProfile;
  fitness_profile: DT_FitnessProfile;
  achievements: DT_Achievement[];
  user_stats: { followers: number; following: number; posts: number };
  posts?: any;
};

type DT_Post = {
  post_id: string;
  user_id: string;
  post_type: "Photo" | "Video" | "Text";
  media_url?: string;
  tagged_items?: object;
  tagged_exercises?: object;
  description?: string;
  created_at?: string;
  updated_at?: string;
};

type DT_PostInteraction = {
  like_count: number;
  comment_count: number;
  share_count: number;
  bookmark_count: number;

  like_id?: string;
  bookmark_id?: string;
  share_id?: string;
};

type DT_comment = {
  comment_id: string;
  parent_comment_id?: string;
  username: string;
  content: string;
  likes: number;
  created_at: string;
  subcomments: DT_comment[];
  profile_picture?: string;
};

type DT_Feed = {
  posts: DT_Post;
  user_profile: DT_UserProfile;
  post_interaction: DT_PostInteraction;
};
type DT_ChatItem = {
  id: string;
  chat_name: string;
  profile_picture: string | string[];
  latest_message: "string";
  timestamp: string;
  is_read: boolean;
  chat_type: string;
};

type DT_relationship = {
  followed: boolean;
};
type DT_Pulse = {
  user_profile: DT_UserProfile;
  interactions: DT_PostInteraction;
  relationship: DT_relationship;
} & DT_Post;
