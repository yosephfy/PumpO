import { UpdateUserFitnessProfile } from "@/Services/userServices";
import Carousel from "@/components/Carousel";
import SettingOptionsComponent, {
  SettingOptionGroupProp,
} from "@/components/OptionsComponent";
import PopupCard from "@/components/PopupCard";
import { ThemedText } from "@/components/ThemedText";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

const ProfileExtraInfo = ({
  data,
  other_user,
}: {
  data: DT_ProfilePage;
  other_user: boolean;
}) => {
  const { fitness_profile, achievements } = data;

  const FitnessMetrics = () => {
    const router = useRouter();
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [height, setHeight] = useState<number>(fitness_profile.height || 0);
    const [weight, setWeight] = useState<number>(fitness_profile.weight || 0);
    const [bodyFat, setBodyFat] = useState<number>(
      fitness_profile.body_fat_percentage || 0
    );
    const [seasonalStatus, setSeasonalStatus] = useState<
      DT_FitnessProfile["seasonal_status"]
    >(fitness_profile.seasonal_status || "");

    const handleSave = () => {
      const updatedProfile: Partial<DT_FitnessProfile> = {
        height,
        weight,
        body_fat_percentage: bodyFat,
        seasonal_status: seasonalStatus,
        profile_id: fitness_profile.profile_id,
        user_id: fitness_profile.user_id,
      };
      UpdateUserFitnessProfile(fitness_profile.profile_id, updatedProfile);
      router.dismissTo("/(app)/(my_profile)");
    };

    const FitnessPrompts: SettingOptionGroupProp[] = [
      {
        id: "",
        items: [
          {
            id: "1",
            label: `Height (${unit === "metric" ? "cm" : "ft"})`,
            type: "textinput",
            value: height.toString(),
            placeholder: "169cm",
            onSave: (val) => setHeight(parseFloat(val || "") || 0),
          },
          {
            id: "2",
            label: `Weight (${unit === "metric" ? "kg" : "lbs"})`,
            type: "textinput",
            value: weight.toString(),
            placeholder: "60kg",
            onSave: (val) => setWeight(parseFloat(val || "") || 0),
          },
          {
            id: "3",
            label: "BodyFat Percent (%)",
            type: "textinput",
            value: bodyFat.toString(),
            placeholder: "25%",
            onSave: (val) => setBodyFat(parseFloat(val || "") || 0),
          },
          {
            id: "4",
            label: "Seasonal Status",
            type: "dropdown",
            dropdownOptions: [
              { value: "Bulking", label: "Bulking" },
              { value: "Maintaining", label: "Maintaining" },
              { value: "Cutting", label: "Cutting" },
            ] as {
              value: DT_FitnessProfile["seasonal_status"];
              label: string;
            }[],
            dropdownValue: seasonalStatus,
            onDropdownChange: (val: any) => setSeasonalStatus(val),
          },
        ],
      },
    ];

    const options = (
      <ThemedView style={styles.popupContainer}>
        <View style={styles.unitSelector}>
          <TouchableOpacity
            style={[
              styles.unitButton,
              unit === "metric" && styles.selectedUnitButton,
            ]}
            onPress={() => setUnit("metric")}
          >
            <ThemedText
              style={
                unit === "metric" ? styles.selectedUnitText : styles.unitText
              }
            >
              Metric
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.unitButton,
              unit === "imperial" && styles.selectedUnitButton,
            ]}
            onPress={() => setUnit("imperial")}
          >
            <ThemedText
              style={
                unit === "imperial" ? styles.selectedUnitText : styles.unitText
              }
            >
              Imperial
            </ThemedText>
          </TouchableOpacity>
        </View>

        <SettingOptionsComponent optionGroups={FitnessPrompts} />
        <TouchableOpacity onPress={handleSave} style={styles.optionsSaveButton}>
          <ThemedText style={styles.optionsSaveButtonLabel}>Save</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    );

    return (
      <EditableFitnessComponent
        editable={!other_user}
        popupChildren={options}
        componentStyles={styles.metricsContainer}
      >
        <View style={styles.metricItem}>
          <Ionicons name="scale-outline" size={20} color="#007BFF" />
          <ThemedText style={styles.metricText}>
            {fitness_profile.weight}
          </ThemedText>
        </View>
        <View style={styles.metricItem}>
          <Ionicons name="body-outline" size={20} color="#007BFF" />
          <ThemedText style={styles.metricText}>
            {fitness_profile.height}
          </ThemedText>
        </View>
        <View style={styles.metricItem}>
          <Ionicons name="calculator-outline" size={20} color="#007BFF" />
          <ThemedText style={styles.metricText}>
            {fitness_profile.body_fat_percentage}
          </ThemedText>
        </View>
      </EditableFitnessComponent>
    );
  };

  const Achievements = () => {
    return (
      <EditableFitnessComponent
        editable={!other_user}
        componentStyles={styles.achievementsContainer}
      >
        {achievements.map((achievement) => (
          <View key={achievement.achievement_id} style={styles.achievement}>
            <ThemedText style={styles.progressText}>
              {achievement.reward_points}pts
            </ThemedText>
            <ThemedText style={styles.achievementText}>
              {achievement.description}
            </ThemedText>
          </View>
        ))}
      </EditableFitnessComponent>
    );
  };

  return (
    <ThemedFadedView style={styles.container}>
      <Carousel
        items={[
          <FitnessMetrics key="fitness" />,
          <Achievements key="achievements" />,
        ]}
        containerStyle={styles.carouselContainer}
      />
    </ThemedFadedView>
  );
};

const EditableFitnessComponent = ({
  children,
  editable = false,
  popupChildren,
  componentStyles,
}: {
  children: React.ReactNode;
  editable?: boolean;
  popupChildren?: React.ReactNode;
  componentStyles?: StyleProp<ViewStyle>;
}) => {
  const [popped, setPopped] = useState(false);
  return (
    <ThemedView style={[styles.itemContainer, componentStyles]}>
      {children}
      {editable && (
        <ThemedView style={styles.itemOptions}>
          <TouchableOpacity onPress={() => setPopped(true)}>
            <Ionicons name="options" size={16} color="#999" />
          </TouchableOpacity>
        </ThemedView>
      )}
      <PopupCard
        visible={popped}
        onClose={() => setPopped(false)}
        style={{ width: "95%" }}
      >
        {popupChildren}
      </PopupCard>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
  },
  carouselContainer: {},
  itemContainer: {
    width: "85%",
    height: 75,
    justifyContent: "space-around",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#999",
    marginVertical: 10,
  },
  itemOptions: {
    position: "absolute",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#999",
    right: -10,
    top: -10,
  },
  metricsContainer: {
    flexDirection: "row",
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricText: {
    fontSize: 14,
    marginLeft: 8,
  },
  achievementsContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
  },
  achievementText: {
    fontSize: 14,
  },
  progressText: {
    fontSize: 12,
    width: 35,
    marginRight: 8,
    textAlign: "right",
  },
  popupContainer: {
    paddingTop: 30,
    gap: 10,
  },
  unitSelector: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 20,
  },
  unitButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  selectedUnitButton: {
    borderColor: "#007BFF",
  },
  unitText: {
    fontSize: 16,
  },
  selectedUnitText: {
    fontSize: 16,
  },
  optionsSaveButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  optionsSaveButtonLabel: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProfileExtraInfo;
