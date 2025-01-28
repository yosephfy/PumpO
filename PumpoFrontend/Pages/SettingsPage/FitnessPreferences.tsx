import React, { useState } from "react";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";

const FitnessPreferences = () => {
  const [fitnessGoal, setFitnessGoal] = useState<string>("Build Muscle");
  const [workoutType, setWorkoutType] = useState<string>("Strength Training");
  const [fitnessLevel, setFitnessLevel] = useState<string>("Beginner");
  const [workoutFrequency, setWorkoutFrequency] = useState<string>("3–4 Days");
  const [workoutDuration, setWorkoutDuration] =
    useState<string>("30–60 Minutes");
  const [exerciseIntensity, setExerciseIntensity] =
    useState<string>("Medium Intensity");
  const [equipmentPreferences, setEquipmentPreferences] =
    useState<string>("Dumbbells");
  const [dietaryPreference, setDietaryPreference] =
    useState<string>("No Preference");
  const [goalDeadline, setGoalDeadline] = useState<string>("3 Months");
  const [notificationsEnabled, setNotificationsEnabled] =
    useState<boolean>(true);
  const [trackWorkoutHistory, setTrackWorkoutHistory] = useState<boolean>(true);
  const [trackCalories, setTrackCalories] = useState<boolean>(false);
  const [trackProgressPhotos, setTrackProgressPhotos] = useState<boolean>(true);
  const [workoutEnvironment, setWorkoutEnvironment] = useState<string>("Gym");

  const fitnessGroups: SettingOptionGroupProp[] = [
    {
      id: "workoutPreferences",
      title: "Workout Preferences",
      items: [
        {
          id: "1",
          label: "Workout Goals",
          type: "dropdown",
          dropdownValue: fitnessGoal,
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
          onDropdownChange: setFitnessGoal,
        },
        {
          id: "2",
          label: "Preferred Workout Type",
          type: "dropdown",
          dropdownValue: workoutType,
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
          onDropdownChange: setWorkoutType,
        },
        {
          id: "3",
          label: "Fitness Level",
          type: "dropdown",
          dropdownValue: fitnessLevel,
          dropdownOptions: [
            { label: "Beginner", value: "Beginner" },
            { label: "Intermediate", value: "Intermediate" },
            { label: "Advanced", value: "Advanced" },
          ],
          onDropdownChange: setFitnessLevel,
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
          dropdownValue: workoutFrequency,
          dropdownOptions: [
            { label: "1–2 Days", value: "1–2 Days" },
            { label: "3–4 Days", value: "3–4 Days" },
            { label: "5+ Days", value: "5+ Days" },
          ],
          onDropdownChange: setWorkoutFrequency,
        },
        {
          id: "5",
          label: "Workout Duration",
          type: "dropdown",
          dropdownValue: workoutDuration,
          dropdownOptions: [
            { label: "Under 30 Minutes", value: "Under 30 Minutes" },
            { label: "30–60 Minutes", value: "30–60 Minutes" },
            { label: "Over 60 Minutes", value: "Over 60 Minutes" },
          ],
          onDropdownChange: setWorkoutDuration,
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
          value: notificationsEnabled,
          onToggle: () => setNotificationsEnabled((prev) => !prev),
        },
        {
          id: "7",
          label: "Track Workout History",
          type: "toggle",
          value: trackWorkoutHistory,
          onToggle: () => setTrackWorkoutHistory((prev) => !prev),
        },
        {
          id: "8",
          label: "Track Calorie Count",
          type: "toggle",
          value: trackCalories,
          onToggle: () => setTrackCalories((prev) => !prev),
        },
        {
          id: "9",
          label: "Track Progress Photos",
          type: "toggle",
          value: trackProgressPhotos,
          onToggle: () => setTrackProgressPhotos((prev) => !prev),
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
          dropdownValue: dietaryPreference,
          dropdownOptions: [
            { label: "Vegetarian", value: "Vegetarian" },
            { label: "Vegan", value: "Vegan" },
            { label: "Pescatarian", value: "Pescatarian" },
            { label: "Keto", value: "Keto" },
            { label: "High Protein", value: "High Protein" },
            { label: "No Preference", value: "No Preference" },
          ],
          onDropdownChange: setDietaryPreference,
        },
      ],
    },
  ];

  return <SettingOptionsComponent optionGroups={fitnessGroups} />;
};

export default FitnessPreferences;
