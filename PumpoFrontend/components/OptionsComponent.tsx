import React, { useRef } from "react";
import {
  FlatList,
  FlatListProps,
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Dimensions,
} from "react-native";
import { Dropdown, IDropdownRef } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemedFadedView, ThemedIcon } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import DateTimePicker from "@react-native-community/datetimepicker";

export type SettingOptionProp = {
  id: string;
  label: string;
  type: "toggle" | "dropdown" | "navigation" | "button" | "datetime" | "text";
  value?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  onToggle?: (value: boolean) => void;
  dropdownOptions?: { label: string; value: string }[];
  dropdownValue?: string;
  onDropdownChange?: (value: string) => void;
  screen?: string;
  onPress?: () => void;
  datetimeValue?: Date;
  onDateTimeChange?: (date: Date) => void;
  mode?: "date" | "time" | "datetime";
  disabled?: boolean;
};

export type SettingOptionGroupProp = {
  id: string;
  title?: string;
  items: SettingOptionProp[];
};

type ReusableOptionsListProps = Omit<
  FlatListProps<SettingOptionGroupProp>,
  "data" | "renderItem"
> & {
  optionGroups: SettingOptionGroupProp[];
};

// Individual Components for Each Option Type
export const SettingToggleOption: React.FC<{
  item: SettingOptionProp;
}> = ({ item }) => (
  <View style={styles.optionContainer}>
    {item.icon && (
      <View style={styles.iconContainer}>
        <ThemedIcon name={item.icon} size={24} />
      </View>
    )}
    <ThemedText style={styles.optionLabel}>{item.label}</ThemedText>
    <Switch
      value={item.value}
      onValueChange={item.onToggle}
      thumbColor={item.value ? "#007BFF" : "#f4f3f4"}
      trackColor={{ false: "#767577", true: "#81b0ff" }}
      disabled={item.disabled}
    />
  </View>
);

export const SettingNavigationOption: React.FC<{
  item: SettingOptionProp;
}> = ({ item }) => (
  <TouchableOpacity style={styles.optionContainer} onPress={item.onPress}>
    {item.icon && (
      <View style={styles.iconContainer}>
        <ThemedIcon name={item.icon} size={24} />
      </View>
    )}
    <ThemedText style={styles.optionLabel}>{item.label}</ThemedText>
    <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
  </TouchableOpacity>
);

export const SettingDropdownOption: React.FC<{
  item: SettingOptionProp;
  backgroundColor: string;
  textColor: string;
}> = ({ item, backgroundColor, textColor }) => {
  const ref = useRef<IDropdownRef>(null);
  return (
    <View style={styles.dropdownContainer}>
      {item.icon && (
        <View style={styles.iconContainer}>
          <ThemedIcon name={item.icon} size={24} />
        </View>
      )}
      <ThemedText style={styles.optionLabel}>{item.label}</ThemedText>
      <Dropdown
        ref={ref}
        data={item.dropdownOptions || []}
        labelField="label"
        valueField="value"
        value={item.dropdownValue}
        onChange={(selectedItem) => item.onDropdownChange?.(selectedItem.value)}
        style={[styles.dropdown]}
        placeholderStyle={[styles.dropdownPlaceholder]}
        selectedTextStyle={[styles.dropdownSelectedText, { color: textColor }]}
        itemTextStyle={[{ color: textColor }]}
        containerStyle={[styles.dropdownContent, { backgroundColor }]}
        activeColor={"transparent"}
        disable={item.disabled}
      />
    </View>
  );
};

export const SettingButtonOption: React.FC<{
  item: SettingOptionProp;
}> = ({ item }) => (
  <TouchableOpacity
    style={[styles.optionContainer, styles.buttonContainer]}
    onPress={item.onPress}
    disabled={item.disabled}
  >
    <ThemedText style={[styles.optionLabel, styles.buttonText]}>
      {item.label}
    </ThemedText>
  </TouchableOpacity>
);

export const SettingDateTimeOption: React.FC<{
  item: SettingOptionProp;
}> = ({ item }) => {
  const onDateChange = (_: any, selectedDate: Date | undefined) => {
    if (selectedDate && item.onDateTimeChange) {
      item.onDateTimeChange(selectedDate);
    }
  };

  return (
    <View style={styles.optionContainer}>
      {item.icon && (
        <View style={styles.iconContainer}>
          <ThemedIcon name={item.icon} size={24} />
        </View>
      )}
      <ThemedText style={styles.optionLabel}>{item.label}</ThemedText>
      <DateTimePicker
        value={item.datetimeValue || new Date(2000, 0, 1)}
        mode={item.mode || "date"}
        display={"default"}
        onChange={onDateChange}
        disabled={item.disabled}
      />
    </View>
  );
};

export const SettingTextOption: React.FC<{
  item: SettingOptionProp;
}> = ({ item }) => (
  <View style={styles.textOptionContainer}>
    {item.icon && (
      <View style={styles.iconContainer}>
        <ThemedIcon name={item.icon} size={24} />
      </View>
    )}
    <ThemedText style={styles.textValue}>{item.label}</ThemedText>
  </View>
);

// Main OptionsComponent
const SettingOptionsComponent: React.FC<ReusableOptionsListProps> = ({
  optionGroups,
  ...flatListProps
}) => {
  const router = useRouter();
  const backgroundColor = useThemeColor({}, "fadedBackground");
  const textColor = useThemeColor({}, "text");

  const renderOption = ({ item }: { item: SettingOptionProp }) => {
    switch (item.type) {
      case "toggle":
        return <SettingToggleOption item={item} />;
      case "navigation":
        return <SettingNavigationOption item={item} />;
      case "dropdown":
        return (
          <SettingDropdownOption
            item={item}
            backgroundColor={backgroundColor}
            textColor={textColor}
          />
        );
      case "button":
        return <SettingButtonOption item={item} />;
      case "datetime":
        return <SettingDateTimeOption item={item} />;
      case "text":
        return <SettingTextOption item={item} />;
      default:
        return null;
    }
  };

  const renderGroup = ({ item }: { item: SettingOptionGroupProp }) => (
    <View>
      {item.title && (
        <ThemedText style={styles.groupTitle}>{item.title}</ThemedText>
      )}
      <FlatList
        data={item.items}
        keyExtractor={(item) => item.id}
        renderItem={renderOption}
        ItemSeparatorComponent={() => <ThemedFadedView style={{ height: 1 }} />}
      />
    </View>
  );

  return (
    <FlatList
      data={optionGroups}
      keyExtractor={(group) => group.id}
      renderItem={renderGroup}
      contentContainerStyle={styles.container}
      ItemSeparatorComponent={() => <ThemedFadedView style={{ height: 5 }} />}
      {...flatListProps}
    />
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  textOptionContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  textValue: {
    fontSize: 14,
  },
  optionLabel: {
    fontSize: 16,
    flex: 1,
  },
  dropdownContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    flex: 0.7,
  },
  dropdownPlaceholder: {
    fontSize: 14,
  },
  dropdownSelectedText: {
    fontSize: 14,
  },
  dropdownContent: {
    borderRadius: 8,
    marginTop: 10,
  },
  buttonContainer: {
    justifyContent: "center",
    backgroundColor: "#007BFF",
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  iconContainer: {
    marginRight: 15,
    borderRadius: 20,
    padding: 8,
  },
});

export default SettingOptionsComponent;
