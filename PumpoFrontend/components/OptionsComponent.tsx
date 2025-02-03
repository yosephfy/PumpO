import React, { useRef, useState } from "react";
import {
  FlatList,
  FlatListProps,
  View,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Dimensions,
  Modal,
} from "react-native";
import { Dropdown, IDropdownRef } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ThemedFadedView, ThemedIcon } from "./ThemedView";
import { ThemedText, ThemedTextInput } from "./ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import DropdownMenu from "./DropDownComponent";

/** 🔹 Stronger Types for Each Option Type */
export type SettingOptionBase = {
  id: string;
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
};

/** Toggle Type */
export type SettingToggleOptionProps = SettingOptionBase & {
  type: "toggle";
  value: boolean;
  onToggle: (value: boolean) => void;
};

/** Dropdown Type */
export type SettingDropdownOptionProps = SettingOptionBase & {
  type: "dropdown";
  dropdownOptions: { label: string; value: string }[];
  dropdownValue: string;
  onDropdownChange: (value: string) => void;
};

/** Navigation Type */
export type SettingNavigationOptionProps = SettingOptionBase & {
  type: "navigation";
  screen?: string;
  onPress?: () => void;
};

/** Button Type */
export type SettingButtonOptionProps = SettingOptionBase & {
  type: "button";
  onPress: () => void;
};

/** DateTime Picker Type */
export type SettingDateTimeOptionProps = SettingOptionBase & {
  type: "datetime";
  datetimeValue: Date;
  onDateTimeChange: (date: Date) => void;
  mode?: "date" | "time" | "datetime";
};

/** Read-Only Text Type */
export type SettingTextOptionProps = SettingOptionBase & {
  type: "text";
};

/** 🔹 Text Input Type */
export type SettingTextInputOptionProps = {
  id: string;
  label: string;
  type: "textinput";
  value?: string | null;
  placeholder?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onSave: (value: string | null) => void;
  paragraphMode?: boolean;
};

/** 🔹 Union of All Setting Types */
export type SettingOptionProp =
  | SettingToggleOptionProps
  | SettingDropdownOptionProps
  | SettingNavigationOptionProps
  | SettingButtonOptionProps
  | SettingDateTimeOptionProps
  | SettingTextOptionProps
  | SettingTextInputOptionProps;

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
  item: SettingToggleOptionProps;
}> = ({ item }) => (
  <View style={styles.optionContainer}>
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
      }}
    >
      {item.icon && (
        <View style={styles.iconContainer}>
          <ThemedIcon name={item.icon} size={24} />
        </View>
      )}
      <ThemedText style={styles.optionLabel}>{item.label}</ThemedText>
    </View>
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
  item: SettingNavigationOptionProps;
}> = ({ item }) => (
  <TouchableOpacity style={styles.optionContainer} onPress={item.onPress}>
    <View
      style={{
        alignItems: "center",
        flexDirection: "row",
        flex: 1,
      }}
    >
      {item.icon && (
        <View style={styles.iconContainer}>
          <ThemedIcon name={item.icon} size={24} />
        </View>
      )}
      <ThemedText style={styles.optionLabel}>{item.label}</ThemedText>
    </View>
    <Ionicons name="chevron-forward-outline" size={20} color="#ccc" />
  </TouchableOpacity>
);

export const SettingDropdownOption: React.FC<{
  item: SettingDropdownOptionProps;
  backgroundColor: string;
  textColor: string;
}> = ({ item, backgroundColor, textColor }) => {
  const ref = useRef<IDropdownRef>(null);
  return (
    <View style={styles.dropdownContainer}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
        }}
      >
        {item.icon && (
          <View style={styles.iconContainer}>
            <ThemedIcon name={item.icon} size={24} />
          </View>
        )}
        <ThemedText style={styles.optionLabel}>{item.label}</ThemedText>
      </View>
      {/* <Dropdown
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
      /> */}
      <DropdownMenu
        options={item.dropdownOptions}
        selectedValue={item.dropdownValue}
        onSelect={(selectedItem) => item.onDropdownChange?.(selectedItem)}
        triggerStyle={styles.dropdown}
        dropdownItemStyle={styles.dropdownSelectedItem}
        dropdownItemTextStyle={{ padding: 10 }}
      />
    </View>
  );
};

export const SettingButtonOption: React.FC<{
  item: SettingButtonOptionProps;
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
  item: SettingDateTimeOptionProps;
}> = ({ item }) => {
  const onDateChange = (_: any, selectedDate?: Date) => {
    if (!selectedDate) return; // Ignore empty values to prevent crashes
    if (item.onDateTimeChange) {
      item.onDateTimeChange(selectedDate);
    }
  };

  return (
    <View style={styles.optionContainer}>
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          flex: 1,
        }}
      >
        {item.icon && (
          <View style={styles.iconContainer}>
            <ThemedIcon name={item.icon} size={24} />
          </View>
        )}
        <ThemedText style={styles.optionLabel}>{item.label}</ThemedText>
      </View>
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
  item: SettingTextOptionProps;
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

export const SettingTextInputOption: React.FC<{
  item: SettingTextInputOptionProps;
}> = ({ item }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState(item.value);

  const handleSave = () => {
    item.onSave(inputValue || null);
    setModalVisible(false);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.optionContainer}
        onPress={() => setModalVisible(true)}
      >
        <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
          {item.icon && (
            <View style={styles.iconContainer}>
              <ThemedIcon name={item.icon} size={24} />
            </View>
          )}
          <ThemedText style={styles.optionLabel}>{item.label}</ThemedText>
        </View>
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          {item.value ? (
            <ThemedText style={styles.textValue} numberOfLines={1}>
              {item.value}
            </ThemedText>
          ) : (
            <ThemedText lightColor="#bbb" darkColor="#666" numberOfLines={1}>
              {item.placeholder ?? "Enter Here..."}
            </ThemedText>
          )}
        </View>
      </TouchableOpacity>

      {/* Text Input Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <ThemedFadedView style={styles.modalContainer}>
            <ThemedText style={styles.modalTitle}>{item.label}</ThemedText>
            <ThemedTextInput
              style={styles.input}
              value={inputValue || undefined}
              onChangeText={setInputValue}
              placeholder={item.placeholder ?? "Enter new value..."}
              multiline={item.paragraphMode}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <ThemedText style={styles.cancelText}>Cancel</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSave}>
                <ThemedText style={styles.saveText}>Save</ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedFadedView>
        </View>
      </Modal>
    </>
  );
};

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
      case "textinput":
        return <SettingTextInputOption item={item} />;
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
    //width: "100%",

    justifyContent: "space-between",
    gap: 40,
    //flex: 1,
  },
  dropdown: {
    //borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    //flex: 1,
    alignItems: "center",
    maxWidth: 300,
    minWidth: "40%",
    //backgroundColor: "pink",
  },
  dropdownPlaceholder: {
    fontSize: 14,
  },
  dropdownSelectedText: {
    fontSize: 14,
  },
  dropdownSelectedItem: {
    justifyContent: "center",
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContainer: {
    width: "80%",
    padding: 20,
    //backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cancelText: {
    fontSize: 16,
    color: "red",
  },
  saveText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default SettingOptionsComponent;
