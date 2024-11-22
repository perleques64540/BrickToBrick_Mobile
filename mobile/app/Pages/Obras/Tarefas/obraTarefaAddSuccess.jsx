import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import OrangeButton from "../../../../components/OrangeButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import tasksData from "../../../../data/tasks.json";
import EmployeesPopup from "../../../../components/EmployeesPop";
import GreyButton from "../../../../components/GreyButton";

const obraTarefaAddSuccess = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const [createdTask, setCreatedTask] = useState(null);

  const fetchTaskById = (id) => {
    const foundTask = tasksData.find((item) => item.id === id);
    if (foundTask) {
      setCreatedTask(foundTask);
    } else {
      setCreatedTask(null);
    }
  };

  const handleAssignTask = (selectedEmployeeIds) => {
    const obraId = parseInt(id, 10);
    const taskIndex = tasksData.findIndex((task) => task.id === obraId);
  
    if (taskIndex !== -1) {
      tasksData[taskIndex].employeeId = selectedEmployeeIds;
      router.back();
      router.back();
    } else {
      console.log("Task not found with ID:", obraId);
    }
    setPopupVisible(false);
  };
  

  useEffect(() => {
    if (id) {
      const taskId = parseInt(id, 10);
      fetchTaskById(taskId);
    }
  }, [id]);

  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.imagePostion}>
        <Image
          style={styles.imagestyle}
          source={require("../../../../Images/tasksIcon.png")}
        />
      </View>
      <View style={styles.textAndButton}>
        <View style={styles.headerPosition}>
          <Text style={styles.headerTitle}>Feito!</Text>
          <Text style={styles.subHeaderTitle}>
            Tarefa adicionada com sucesso.
          </Text>
        </View>

        <View style={styles.bottomButton}>
          <TouchableOpacity>
            <OrangeButton
              onPress={() => setPopupVisible(true)}
              label={"Atribuir Tarefa"}
              width={330}
              height={50}
            />
          </TouchableOpacity>
        </View>

        <EmployeesPopup
          visible={popupVisible}
          id={id}
          onConfirm={(selectedEmployeeIds) => {
            console.log("Selected Employee IDs:", selectedEmployeeIds);
            handleAssignTask(selectedEmployeeIds);
          }}
          onClose={() => setPopupVisible(false)} 
        />

        <View style={styles.bottomButton}>
          <TouchableOpacity>
            <GreyButton
              label={"Mais Tarde"}
              width={330}
              height={50}
              onPress={() =>
                router.push({
                  pathname: "/Pages/Obras/Tarefas/obraTarefas",
                  params: {
                    id: id
                  },
                })
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    flexDirection: "column",
  },
  imagePostion: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 80,
  },
  imagestyle: {
    height: 130,
    width: 130,
    resizeMode: "contain",
  },
  headerPosition: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subHeaderTitle: {
    fontSize: 16,
  },
  bottomButton: {
    marginBottom: 15,
  },
  textAndButton: {
    marginTop: 20,
  },
});

export default obraTarefaAddSuccess;
