import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { ThemedTextInput } from "./ThemedText";

type SearchBarProps = {
  onSearch: (query: string) => void; // Function to handle search
  onChangeText?: (query: string) => void;
  style?: StyleProp<ViewStyle>;
  initialValue?: string;
};

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  style,
  onChangeText,
  initialValue,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialValue || "");

  const handleClearSearch = () => {
    setSearchQuery("");
  };

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <View style={[styles.searchBar, style]}>
      <View style={styles.searchInputContainer}>
        <ThemedTextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(e) => {
            setSearchQuery(e);
            onChangeText ? onChangeText(e) : () => {};
          }}
          onSubmitEditing={handleSearch}
          placeholderTextColor="#888"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            onPress={handleClearSearch}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Ionicons name="search" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    justifyContent: "space-between",
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 15,
    fontSize: 14,
  },
  clearButton: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchBar;
