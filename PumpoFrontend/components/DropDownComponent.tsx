import React, { useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  FlatList,
  Dimensions,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";
import { ThemedFadedView, ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

export interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface DropdownMenuProps {
  options: DropdownOption[];
  selectedValue: string | null;
  onSelect: (value: string) => void;

  placeholder?: string;
  position?: "above" | "below" | "auto";
  maxHeight?: number;

  // Optional Style Overrides
  triggerStyle?: ViewStyle;
  triggerTextStyle?: TextStyle;
  dropdownContainerStyle?: ViewStyle;
  dropdownItemStyle?: ViewStyle;
  dropdownItemTextStyle?: TextStyle;
  disabledItemStyle?: ViewStyle;
  disabledItemTextStyle?: TextStyle;

  /**
   * NEW STYLE PROPS for the selected item in the list and the selected text on the trigger.
   */
  selectedItemStyle?: ViewStyle;
  selectedItemTextStyle?: TextStyle;
  selectedTriggerTextStyle?: TextStyle;

  disabled?: boolean;
}

/**
 * A customizable dropdown menu component for React Native (Expo),
 * relying on styling rather than a hardcoded width prop.
 */
const DropdownMenu: React.FC<DropdownMenuProps> = ({
  options,
  selectedValue,
  onSelect,

  placeholder = "Select an option",
  position = "auto",
  maxHeight = 200,

  triggerStyle,
  triggerTextStyle,
  dropdownContainerStyle,
  dropdownItemStyle,
  dropdownItemTextStyle,
  disabledItemStyle,
  disabledItemTextStyle,

  // NEW STYLE PROPS
  selectedItemStyle,
  selectedItemTextStyle,
  selectedTriggerTextStyle,

  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({ x: 0, y: 0, width: 0, height: 0 });

  const triggerRef = useRef<View>(null);

  // Determine final dropdown position after measuring
  const [dropdownPosition, setDropdownPosition] = useState<"above" | "below">(
    "below"
  );

  const selectedOption = options.find((opt) => opt.value === selectedValue);
  const displayLabel = selectedOption ? selectedOption.label : placeholder;

  /**
   * Handles opening or closing the dropdown.
   */
  const toggleDropdown = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      // Measure trigger location, then open the dropdown
      if (triggerRef.current) {
        triggerRef.current.measureInWindow((pageX, pageY, w, h) => {
          setTriggerLayout({ x: pageX, y: pageY, width: w, height: h });

          // Decide position if "auto"
          if (position === "auto") {
            const screenHeight = Dimensions.get("window").height;
            const spaceBelow = screenHeight - (pageY + h);
            const spaceAbove = pageY;

            // If there's more space below than above, position below; else above
            if (spaceBelow >= maxHeight) {
              setDropdownPosition("below");
            } else if (spaceAbove >= maxHeight) {
              setDropdownPosition("above");
            } else {
              // If neither can fit maxHeight fully, pick whichever is bigger
              if (spaceBelow > spaceAbove) {
                setDropdownPosition("below");
              } else {
                setDropdownPosition("above");
              }
            }
          } else {
            // If explicitly set to "above" or "below"
            setDropdownPosition(position === "above" ? "above" : "below");
          }

          setIsOpen(true);
        });
      }
    }
  }, [isOpen, position, maxHeight]);

  /**
   * Handle selection of an item. Closes dropdown.
   */
  const handleSelect = (option: DropdownOption) => {
    if (!option.disabled) {
      onSelect(option.value);
      setIsOpen(false);
    }
  };

  /**
   * Renders each dropdown item.
   */
  const renderItem = ({ item }: { item: DropdownOption }) => {
    const isDisabled = !!item.disabled;
    const isSelected = item.value === selectedValue;

    return (
      <TouchableOpacity
        disabled={isDisabled}
        onPress={() => handleSelect(item)}
        style={[
          styles.dropdownItem,
          dropdownItemStyle,
          isDisabled && styles.disabledItem,
          isDisabled && disabledItemStyle,
          // If the item is selected, apply selected styles
          isSelected && styles.selectedItem,
          isSelected && selectedItemStyle,
        ]}
      >
        {item.icon && <View style={styles.itemIconContainer}>{item.icon}</View>}
        <ThemedText
          style={[
            styles.dropdownItemText,
            dropdownItemTextStyle,
            isDisabled && styles.disabledItemText,
            isDisabled && disabledItemTextStyle,
            // If the item is selected, apply selected text styles
            isSelected && styles.selectedItemText,
            isSelected && selectedItemTextStyle,
          ]}
        >
          {item.label}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  /**
   * Closes dropdown when tapping outside.
   */
  const onRequestClose = (e?: GestureResponderEvent) => {
    setIsOpen(false);
  };

  return (
    <View style={{}}>
      {/* Trigger */}
      <TouchableOpacity
        ref={triggerRef}
        onPress={toggleDropdown}
        activeOpacity={0.8}
        style={[styles.triggerButton, triggerStyle]}
        disabled={disabled}
      >
        <ThemedText
          style={[
            styles.triggerButtonText,
            triggerTextStyle,
            // If there's a selected option, you can style the trigger text differently
            selectedOption && styles.triggerButtonSelectedText,
            selectedOption && selectedTriggerTextStyle,
          ]}
        >
          {displayLabel}
        </ThemedText>
      </TouchableOpacity>

      {/* Modal for the dropdown list */}
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={onRequestClose}
      >
        <TouchableOpacity
          style={styles.backdrop}
          activeOpacity={1}
          onPress={onRequestClose}
        >
          <View />
        </TouchableOpacity>

        {/* Dropdown List Container */}
        <View
          pointerEvents="box-none"
          style={[StyleSheet.absoluteFill, { justifyContent: "flex-start" }]}
        >
          <View
            style={{
              position: "absolute",
              top:
                dropdownPosition === "below"
                  ? triggerLayout.y + triggerLayout.height
                  : undefined,
              bottom:
                dropdownPosition === "above"
                  ? Dimensions.get("window").height - triggerLayout.y
                  : undefined,
              left: triggerLayout.x,
              // By default, match the measured width of the trigger.
              width: triggerLayout.width,
            }}
          >
            <ThemedFadedView
              style={[
                styles.dropdownContainer,
                { maxHeight },
                dropdownContainerStyle,
              ]}
            >
              <FlatList
                data={options}
                renderItem={renderItem}
                keyExtractor={(item) => item.value}
                nestedScrollEnabled
                showsVerticalScrollIndicator
                ItemSeparatorComponent={() => (
                  <ThemedView style={{ height: 1 }} />
                )}
              />
            </ThemedFadedView>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DropdownMenu;

const styles = StyleSheet.create({
  // Trigger button styles
  triggerButton: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    justifyContent: "center",
  },
  triggerButtonText: {
    fontSize: 16,
  },
  // An optional style if there's a selected value vs. placeholder
  triggerButtonSelectedText: {
    // You can choose a color or weight to differentiate the selected state
    //fontWeight: "500",
  },

  // Backdrop for modal
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.1)",
  },

  // Dropdown container
  dropdownContainer: {
    borderRadius: 6,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 5,
    overflow: "hidden",
  },

  // Individual item
  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  dropdownItemText: {
    fontSize: 16,
    textAlign: "center",
  },

  // Selected item highlight
  selectedItem: {
    //backgroundColor: "#e5f4ff", // example highlight color
    backgroundColor: "rgba(44, 132, 214, 0.43)",
  },
  selectedItemText: {
    //fontWeight: "bold",
  },

  // Disabled item
  disabledItem: {
    opacity: 0.5,
  },
  disabledItemText: {
    color: "#999",
  },

  // Icon container
  itemIconContainer: {
    marginRight: 8,
  },
});
