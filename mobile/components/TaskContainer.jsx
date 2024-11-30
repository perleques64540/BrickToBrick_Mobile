import { View, TouchableOpacity, StyleSheet, Text, Image } from "react-native";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheck, faPersonCirclePlus, faTrash, faXmark} from "@fortawesome/free-solid-svg-icons";

const TaskContainer = ({
  labelTitle,
  labelText,
  onAddPersonPress,
  onTrashPress,
  onCheckPress,
  onXmarkPress,
  done,
}) => {
  return (
    <View style={styles.ContainerDelete}>
      <View style={styles.content}>
        <Text style={styles.TitleText}>{labelTitle}</Text>
        <Text style={styles.Text}>{labelText}</Text>
      </View>
      <View style={styles.iconsContainer}>
      <TouchableOpacity onPress={onAddPersonPress}>
          <FontAwesomeIcon icon={faPersonCirclePlus} color="#333333" size={23} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onTrashPress}>
          <FontAwesomeIcon icon={faTrash} color="#333333" size={23} />
        </TouchableOpacity>
        {!done && (
          <TouchableOpacity onPress={onCheckPress}>
            <FontAwesomeIcon icon={faCheck} color="#333333" size={23} />
          </TouchableOpacity>
        )}
        {done && (
          <TouchableOpacity onPress={onXmarkPress}>
            <FontAwesomeIcon icon={faXmark} color="#333333" size={23} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerDelete: {
    backgroundColor: "#D3D3D3",
    padding: 10,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  content: {
    padding: 10,
    width: "90%",
  },
  TitleText: {
    textAlign: "left",
    color: "#333333",
    fontSize: 17,
    fontWeight: "bold",
  },
  Text: {
    textAlign: "left",
    color: "#333333",
    marginTop: 2,
    fontSize: 14,
    width: "90%",
  },
  iconsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 25,
  },
});

export default TaskContainer;
