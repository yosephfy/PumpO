import React, { useState } from "react";
import { FlatList, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import SelectableItem from "./SelectableItem";
import { ThemedFadedView } from "./ThemedView";

type SelectableFlatListProps<T> = {
  data: T[];
  renderItem: (item: T) => React.ReactNode; // Function to render custom items
  onSelectionChange: (selectedIds: string[]) => void;
  togglePosition?: "left" | "right";
  containerStyle?: StyleProp<ViewStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  separatorStyle?: StyleProp<ViewStyle>;
};

const SelectableFlatList = <T extends { id: string }>({
  data,
  renderItem,
  onSelectionChange,
  togglePosition = "right",
  containerStyle,
  itemStyle,
  separatorStyle,
}: SelectableFlatListProps<T>) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleToggle = (id: string, isSelected: boolean) => {
    const updatedSelection = isSelected
      ? [...selectedIds, id]
      : selectedIds.filter((selectedId) => selectedId !== id);

    setSelectedIds(updatedSelection);
    onSelectionChange(updatedSelection);
  };

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <SelectableItem
          isSelected={selectedIds.includes(item.id)}
          onToggle={(isSelected) => handleToggle(item.id, isSelected)}
          togglePosition={togglePosition}
          style={itemStyle}
        >
          {renderItem(item)}
        </SelectableItem>
      )}
      ItemSeparatorComponent={() => (
        <ThemedFadedView style={[styles.separator, separatorStyle]} />
      )}
      style={containerStyle}
    />
  );
};

const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  separator: {
    height: 1,
    width: "90%",
    //backgroundColor: "#eee",

    alignSelf: "center",
  },
});

export default SelectableFlatList;
