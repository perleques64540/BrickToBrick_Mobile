// SearchBar.js

import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const SearchBar = ({ label, searchText, setSearchText }) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        style={styles.input}
        placeholder={label}
        value={searchText}
        onChangeText={(text) => setSearchText(text)} // Update parent state
      />
      <TouchableOpacity style={styles.searchButton}>
        <Feather name="search" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    width: "100%",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  searchButton: {
    marginLeft: 10,
  },
});

export default SearchBar;
