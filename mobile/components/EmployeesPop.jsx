import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import employees from "../data/employees.json";
import Checkbox from "expo-checkbox";
import OrangeButton from "./OrangeButton";
import GreyButton from "./GreyButton";

const EmployeesPopup = ({ visible, onClose, onConfirm }) => {
  const [selectedEmployees, setSelectedEmployees] = useState({});

  const toggleSelection = (employeeId) => {
    setSelectedEmployees((prev) => ({
      ...prev,
      [employeeId]: !prev[employeeId],
    }));
  };

  const handleConfirm = () => {
    const selectedEmployeeIds = Object.keys(selectedEmployees).filter(
      (id) => selectedEmployees[id]
    );
    onConfirm(selectedEmployeeIds);
    onClose();
  };

  const renderEmployee = ({ item }) => (
    <View style={styles.employeeRow}>
      <Checkbox
        style={styles.checkbox}
        color={"#FF7900"}
        value={!!selectedEmployees[item.id]}
        onValueChange={() => toggleSelection(item.id)}
      />
      <Text style={styles.employeeName}>{item.name}</Text>
    </View>
  );

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <Text style={styles.title}>Selecionar Funcionário(s)</Text>
          <FlatList
            data={employees}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderEmployee}
            style={{ marginTop: 10, marginBottom: 30 }}
          />
          <View style={styles.bottomButton}>
            <TouchableOpacity>
              <OrangeButton
                label={"Confirmar"}
                width={330}
                height={50}
                onPress={handleConfirm}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bottomButton}>
            <TouchableOpacity>
              <GreyButton
                label={"Cancelar"}
                width={330}
                height={50}
                onPress={onClose}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "80%",
    height: "60%",
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  employeeRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  employeeName: {
    marginLeft: 10,
    fontSize: 16,
  },
  bottomButton: {
    marginBottom: 15,
  },
  checkbox: {
    alignSelf: "center",
  },
});

export default EmployeesPopup;
