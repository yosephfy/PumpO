import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Carousel from "@/components/Carousel";
import PopupCard from "@/components/PopupCard";
import { useRouter } from "expo-router";
import { UpdateUserFitnessProfile } from "@/Services/userServices";
import { ThemedFadedView, ThemedView } from "@/components/ThemedView";
import { ThemedText, ThemedTextInput } from "@/components/ThemedText";

const ProfileExtraInfo = ({
  data,
  other_user,
}: {
  data: DT_ProfilePage;
  other_user: boolean;
}) => {
  const { fitness_profile, achievements } = data;

  // Fitness Metrics Component
  const FitnessMetrics = () => {
    const router = useRouter();
    const [unit, setUnit] = useState<"metric" | "imperial">("metric");
    const [height, setHeight] = useState<number>(fitness_profile.height || 0);
    const [weight, setWeight] = useState<number>(fitness_profile.weight || 0);
    const [bodyFat, setBodyFat] = useState<number>(
      fitness_profile.body_fat_percentage || 0
    );
    const [seasonalStatus, setSeasonalStatus] = useState<string>(
      fitness_profile.seasonal_status || ""
    );
    const seasonalStatusList = ["Bulking", "Maintaining", "Cutting"];

    const handleSave = () => {
      const updatedProfile: DT_FitnessProfile = {
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

        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>
            Height ({unit === "metric" ? "cm" : "in"}):
          </ThemedText>
          <ThemedTextInput
            style={styles.input}
            keyboardType="numeric"
            value={height.toString()}
            onChangeText={(value) => setHeight(parseFloat(value) || 0)}
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>
            Weight ({unit === "metric" ? "kg" : "lb"}):
          </ThemedText>
          <ThemedTextInput
            style={styles.input}
            keyboardType="numeric"
            value={weight.toString()}
            onChangeText={(value) => setWeight(parseFloat(value) || 0)}
          />
        </View>
        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Body Fat Percentage (%):</ThemedText>
          <ThemedTextInput
            style={styles.input}
            keyboardType="numeric"
            value={bodyFat.toString()}
            onChangeText={(value) => setBodyFat(parseFloat(value) || 0)}
          />
        </View>

        <View style={styles.inputGroup}>
          <ThemedText style={styles.label}>Seasonal Status:</ThemedText>
          <View style={styles.accountTypeContainer}>
            {seasonalStatusList.map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.seasonalStatusButton,
                  seasonalStatus === type &&
                    styles.selectedSeasonalStatusButton,
                ]}
                onPress={() => setSeasonalStatus(type)}
              >
                <ThemedText
                  style={[
                    styles.seasonalStatusText,
                    seasonalStatus === type &&
                      styles.selectedSeasonalStatusText,
                  ]}
                >
                  {type}
                </ThemedText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
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

  // Achievements Component
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
      <PopupCard visible={popped} onClose={() => setPopped(false)}>
        {popupChildren}
      </PopupCard>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    //borderBottomWidth: 1,
    //borderTopWidth: 1,
    //borderColor: "#ddd",
    //backgroundColor: "#f9f9f9",
  },
  carouselContainer: {},
  itemContainer: {
    width: "85%",
    height: 75,
    justifyContent: "space-around",
    //backgroundColor: "white",
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
    //backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#999",
    right: -10,
    top: -10,
  },
  metricsContainer: {
    flexDirection: "row",
    //backgroundColor: "white",
  },
  metricItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricText: {
    fontSize: 14,
    marginLeft: 8,
    //color: "#333",
  },
  achievementsContainer: {
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  achievement: {
    flexDirection: "row",
    alignItems: "center",
    //marginBottom: 4,
  },
  achievementText: {
    fontSize: 14,
    //color: "#555",
  },
  progressText: {
    fontSize: 12,
    width: 35,
    marginRight: 8,
    textAlign: "right",
    //color: "#888",
  },

  popupContainer: {
    paddingTop: 30,
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
    //backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  unitText: {
    fontSize: 16,
    //color: "#333",
  },
  selectedUnitText: {
    fontSize: 16,
    //color: "#fff",
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    fontSize: 14,
    //color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  accountTypeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  seasonalStatusButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedSeasonalStatusButton: {
    backgroundColor: "#007BFF",
    borderColor: "#007BFF",
  },
  seasonalStatusText: {
    fontSize: 12,
    //color: "#333",
  },
  selectedSeasonalStatusText: {
    color: "#fff",
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
