import { View, StyleSheet, TextInput } from "react-native";
import React from "react";

const TextBox = ({
  label,
  width = 350,
  backgroundColor,
  borderColor,
  textcolor,
}) => {
  return (
    <View>
      <TextInput
        style={[styles.input, { width }, { backgroundColor }, { borderColor }]}
        placeholder={label}
        placeholderTextColor={textcolor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#333333",
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 13,
    color: "#333333",
  },
});

export default TextBox;
