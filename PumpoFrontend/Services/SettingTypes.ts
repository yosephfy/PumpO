// Appearance Settings
export interface SETTING_appearance {
  theme: "light" | "dark" | "system";
  darkMode: boolean;
  fontSize: "Small" | "Medium" | "Large";
  animationEnabled: boolean;
}

export type SETTING_date = { year: number; month: number; day: number };

// Account Settings
export interface SETTING_account {
  dateOfBirth: SETTING_date;
  gender: "Male" | "Female" | "Prefer not to say";
  twoFactorAuth: boolean;
  accountCreationDate: string;
  accountID: string;
}

// Security Settings
export interface SETTING_security {
  enable2FA: boolean;
  passwordExpiryReminder: boolean;
  passwordRecoveryMethod: "Email" | "SMS" | "Security Questions";
  lastPasswordChanged: SETTING_date;
}

// Privacy Settings
export interface SETTING_privacy {
  privateAccount: boolean;
  showActivityStatus: boolean;
  showProfileInSearch: boolean;
  showProfileToTaggedUsers: boolean;
  whoCanTagMe: "Everyone" | "Only People I Follow" | "No One";
  whoCanMentionMe: "Everyone" | "Only People I Follow" | "No One";
  whoCanSeeMyPosts: "Everyone" | "Only Followers" | "Custom List";
  whoCanViewMyStories: "Everyone" | "Only Followers" | "Custom List";
  whoCanReplyToMyStories: "Everyone" | "Only People I Follow" | "No One";
}

// Interaction Settings
export interface SETTING_interactions {
  whoCanComment: "Everyone" | "Only Followers" | "No One";
  enableCommentModeration: boolean;
  blockedWords: string[];
  allowLikes: boolean;
  allowReactions: boolean;
  whoCanMessageMe: "Everyone" | "Only Followers" | "No One";
  allowTagging: boolean;
  reviewTagsBeforeAppearance: boolean;
  allowReshares: boolean;
  notifyOnReshares: boolean;
  enableAnalytics: boolean;
  hideInteractionCounts: boolean;
}

// Fitness Preferences
export interface SETTING_fitness {
  fitnessGoal:
    | "Build Muscle"
    | "Lose Weight"
    | "Increase Endurance"
    | "Improve Flexibility"
    | "Maintain Overall Health";
  preferredWorkoutType:
    | "Strength Training"
    | "Cardio"
    | "Yoga"
    | "Pilates"
    | "HIIT"
    | "Calisthenics"
    | "Combat Sports"
    | "CrossFit"
    | "Other";
  fitnessLevel: "Beginner" | "Intermediate" | "Advanced";
  weeklyWorkoutFrequency: "1–2 Days" | "3–4 Days" | "5+ Days";
  workoutDuration: "Under 30 Minutes" | "30–60 Minutes" | "Over 60 Minutes";
  enableFitnessNotifications: boolean;
  trackWorkoutHistory: boolean;
  trackCalories: boolean;
  trackProgressPhotos: boolean;
  dietaryPreference:
    | "Vegetarian"
    | "Vegan"
    | "Pescatarian"
    | "Keto"
    | "High Protein"
    | "No Preference";
}

// Accessibility Settings
export interface SETTING_accessibility {
  textScaling: boolean;
  highContrastMode: boolean;
  reduceMotion: boolean;
  enableScreenReader: boolean;
  enableKeyboardNavigation: boolean;
  preferredFontSize: "Small" | "Medium" | "Large" | "Extra Large";
}

// Notifications Settings
export interface SETTING_notifications {
  pushNotifications: boolean;
  notifyLikes: boolean;
  notifyComments: boolean;
  notifyShares: boolean;
  notifyBookmarks: boolean;
  notifyNewFollowers: boolean;
  notifyUnfollowers: boolean;
  notifyNewMessages: boolean;
  notifyReplies: boolean;
  notifyNewWorkoutPlans: boolean;
  notifyFitnessStatsInteractions: boolean;
  notifyTaggedInPosts: boolean;
  notifyTaggedInWorkouts: boolean;
  muteNotifications: boolean;
  emailActivityUpdates: boolean;
  emailFollowerUpdates: boolean;
  emailAccountUpdates: boolean;
  enableNotificationSound: boolean;
  enableNotificationVibration: boolean;
}

// Language Settings
export interface SETTING_language {
  appLanguage: string;
}

// Consolidated Settings Interface
export interface SETTINGS {
  appearance: SETTING_appearance;
  account: SETTING_account;
  security: SETTING_security;
  privacy: SETTING_privacy;
  interactions: SETTING_interactions;
  fitness: SETTING_fitness;
  accessibility: SETTING_accessibility;
  notifications: SETTING_notifications;
  language: SETTING_language;
}
