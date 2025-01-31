import React, { useState } from "react";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import { useSetting } from "@/hooks/useSettings";
import { SETTINGS } from "@/Services/SettingTypes";

const FitnessPreferences = () => {
  const { value: fitnessGoal, updateSetting: setFitnessGoal } = useSetting(
    "fitness",
    "fitnessGoal"
  );
  const { value: workoutType, updateSetting: setWorkoutType } = useSetting(
    "fitness",
    "preferredWorkoutType"
  );
  const { value: fitnessLevel, updateSetting: setFitnessLevel } = useSetting(
    "fitness",
    "fitnessLevel"
  );
  const { value: workoutFrequency, updateSetting: setWorkoutFrequency } =
    useSetting("fitness", "weeklyWorkoutFrequency");
  const { value: workoutDuration, updateSetting: setWorkoutDuration } =
    useSetting("fitness", "workoutDuration");

  const { value: dietaryPreference, updateSetting: setDietaryPreference } =
    useSetting("fitness", "dietaryPreference");

  const {
    value: notificationsEnabled,
    updateSetting: setNotificationsEnabled,
  } = useSetting("fitness", "enableFitnessNotifications");
  const { value: trackWorkoutHistory, updateSetting: setTrackWorkoutHistory } =
    useSetting("fitness", "trackWorkoutHistory");
  const { value: trackCalories, updateSetting: setTrackCalories } = useSetting(
    "fitness",
    "trackCalories"
  );
  const { value: trackProgressPhotos, updateSetting: setTrackProgressPhotos } =
    useSetting("fitness", "trackProgressPhotos");

  const fitnessGroups: SettingOptionGroupProp[] = [
    {
      id: "workoutPreferences",
      title: "Workout Preferences",
      items: [
        {
          id: "1",
          label: "Workout Goals",
          type: "dropdown",
          dropdownValue: fitnessGoal as SETTINGS["fitness"]["fitnessGoal"],
          dropdownOptions: [
            { label: "Build Muscle", value: "Build Muscle" },
            { label: "Lose Weight", value: "Lose Weight" },
            { label: "Increase Endurance", value: "Increase Endurance" },
            { label: "Improve Flexibility", value: "Improve Flexibility" },
            {
              label: "Maintain Overall Health",
              value: "Maintain Overall Health",
            },
          ],
          onDropdownChange: (val) =>
            setFitnessGoal(val as SETTINGS["fitness"]["fitnessGoal"]),
        },
        {
          id: "2",
          label: "Preferred Workout Type",
          type: "dropdown",
          dropdownValue:
            workoutType as SETTINGS["fitness"]["preferredWorkoutType"],
          dropdownOptions: [
            { label: "Strength Training", value: "Strength Training" },
            { label: "Cardio", value: "Cardio" },
            { label: "Yoga", value: "Yoga" },
            { label: "Pilates", value: "Pilates" },
            { label: "HIIT", value: "HIIT" },
            { label: "Calisthenics", value: "Calisthenics" },
            { label: "Combat Sports", value: "Combat Sports" },
            { label: "CrossFit", value: "CrossFit" },
            { label: "Other", value: "Other" },
          ],
          onDropdownChange: (val) =>
            setWorkoutType(val as SETTINGS["fitness"]["preferredWorkoutType"]),
        },
        {
          id: "3",
          label: "Fitness Level",
          type: "dropdown",
          dropdownValue: fitnessLevel as SETTINGS["fitness"]["fitnessLevel"],
          dropdownOptions: [
            { label: "Beginner", value: "Beginner" },
            { label: "Intermediate", value: "Intermediate" },
            { label: "Advanced", value: "Advanced" },
          ],
          onDropdownChange: (val) =>
            setFitnessLevel(val as SETTINGS["fitness"]["fitnessLevel"]),
        },
      ],
    },
    {
      id: "workoutFrequency",
      title: "Workout Frequency",
      items: [
        {
          id: "4",
          label: "Weekly Workout Frequency",
          type: "dropdown",
          dropdownValue:
            workoutFrequency as SETTINGS["fitness"]["weeklyWorkoutFrequency"],
          dropdownOptions: [
            { label: "1–2 Days", value: "1–2 Days" },
            { label: "3–4 Days", value: "3–4 Days" },
            { label: "5+ Days", value: "5+ Days" },
          ],
          onDropdownChange: (val) =>
            setWorkoutFrequency(
              val as SETTINGS["fitness"]["weeklyWorkoutFrequency"]
            ),
        },
        {
          id: "5",
          label: "Workout Duration",
          type: "dropdown",
          dropdownValue:
            workoutDuration as SETTINGS["fitness"]["workoutDuration"],
          dropdownOptions: [
            { label: "Under 30 Minutes", value: "Under 30 Minutes" },
            { label: "30–60 Minutes", value: "30–60 Minutes" },
            { label: "Over 60 Minutes", value: "Over 60 Minutes" },
          ],
          onDropdownChange: (val) =>
            setWorkoutDuration(val as SETTINGS["fitness"]["workoutDuration"]),
        },
      ],
    },
    {
      id: "trackingPreferences",
      title: "Tracking Preferences",
      items: [
        {
          id: "6",
          label: "Enable Fitness Notifications",
          type: "toggle",
          value:
            notificationsEnabled as SETTINGS["fitness"]["enableFitnessNotifications"],
          onToggle: (val) => setNotificationsEnabled(val),
        },
        {
          id: "7",
          label: "Track Workout History",
          type: "toggle",
          value:
            trackWorkoutHistory as SETTINGS["fitness"]["trackWorkoutHistory"],
          onToggle: (val) => setTrackWorkoutHistory(val),
        },
        {
          id: "8",
          label: "Track Calorie Count",
          type: "toggle",
          value: trackCalories as SETTINGS["fitness"]["trackCalories"],
          onToggle: (val) => setTrackCalories(val),
        },
        {
          id: "9",
          label: "Track Progress Photos",
          type: "toggle",
          value:
            trackProgressPhotos as SETTINGS["fitness"]["trackProgressPhotos"],
          onToggle: (val) => setTrackProgressPhotos(val),
        },
      ],
    },
    {
      id: "dietaryPreferences",
      title: "Dietary Preferences",
      items: [
        {
          id: "10",
          label: "Dietary Preferences",
          type: "dropdown",
          dropdownValue:
            dietaryPreference as SETTINGS["fitness"]["dietaryPreference"],
          dropdownOptions: [
            { label: "Vegetarian", value: "Vegetarian" },
            { label: "Vegan", value: "Vegan" },
            { label: "Pescatarian", value: "Pescatarian" },
            { label: "Keto", value: "Keto" },
            { label: "High Protein", value: "High Protein" },
            { label: "No Preference", value: "No Preference" },
          ],
          onDropdownChange: (val) =>
            setDietaryPreference(
              val as SETTINGS["fitness"]["dietaryPreference"]
            ),
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={fitnessGroups} />;
};

export default FitnessPreferences;
