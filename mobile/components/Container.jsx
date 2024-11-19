import { View, StyleSheet, Text } from "react-native";
import React from "react";

const Container = ({ labelTitle, labelText }) => {
  return (
    <View style={[styles.Container]}>
      <Text style={styles.TitleText}>{labelTitle}</Text>
      <Text style={styles.Text}>{labelText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#D3D3D3",
    borderRadius: 15,
    width: "100%",
    height: "auto",
    alignSelf: "center",
    alignContent: "center",
    padding: 20,
    marginBottom: 10,
  },
  TitleText: {
    textAlign: "left",
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
  Text: {
    textAlign: "left",
    color: "black",
    fontSize: 14,
  },
});

export default Container;
