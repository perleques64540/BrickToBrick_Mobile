import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const EmptyList = ({ message }) => {
  return (
    <View style={styles.emptyContainer}>
      <Image
        source={require("../Images/empty-folder.png")}
        style={styles.imageStyle}
      />
      <Text style={styles.emptyMessage}>
        {" "}
        Não existem {message} disponíveis.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 140,
  },
  emptyMessage: {
    fontSize: 18,
    color: "gray",
    textAlign: "center",
  },
  imageStyle: {
    height: 100,
    width: 100,
    resizeMode: "contain",
  },
});

export default EmptyList;
