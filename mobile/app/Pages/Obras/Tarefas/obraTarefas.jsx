import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import TaskContainer from "../../../../components/TaskContainer";
import OrangeButton from "../../../../components/OrangeButton";
import OrangeEmptyButton from "../../../../components/OrangeEmptyButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import tasksData from "../../../../data/tasks.json";
import obrasData from "../../../../data/obras.json";
import { usePopUp } from "../../../_layout";
import EmptyList from "../../../../components/EmptyList";
import EmployeesPopup from "../../../../components/EmployeesPop";

const obraTarefas = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [obra, setObra] = useState(null);
  const [tasks, setTasks] = useState(
    tasksData.filter((item) => item.obraId == id)
  );
  const [doneTasks, setDoneTasks] = useState([]);

  const fetchObraById = (id) => {
    const foundObra = obrasData.find((item) => item.id == id);
    if (foundObra) {
      setObra(foundObra);
    } else {
      setObra(null);
    }
  };

  const { showPopUp } = usePopUp();

  const handleAddPersonPopUp = () => {
    setPopupVisible(true);
  };

  const handleAssignTask = (selectedEmployeeIds) => {
    const obraId = parseInt(id, 10);
    const taskIndex = tasksData.findIndex((task) => task.id === obraId);

    if (taskIndex !== -1) {
      tasksData[taskIndex].employeeId = selectedEmployeeIds;
      console.log(tasksData[taskIndex]);
    } else {
      console.log("Task not found with ID:", obraId);
    }
    setPopupVisible(false);
  };

  const handleDeletePopUp = (itemId) => {
    showPopUp({
      title: "Apagar Tarefa?",
      message: "Tem a certeza que deseja apagar esta tarefa?",
      primaryBtn: {
        label: "Sim",
        onPress: () => handleDeleteItem(itemId),
      },
      secondaryBtn: {
        label: "Não",
        onPress: () => console.log("Cancel button pressed"),
      },
    });
  };

  const handleDeleteItem = (itemId) => {
    const updatedData = tasks.filter((item) => item.id !== itemId);
    setTasks(updatedData);
    const taskIndex = tasksData.findIndex((item) => item.id === itemId);
    if (taskIndex !== -1) {
      tasksData.splice(taskIndex, 1);
    }
    countDoneTasks(updatedData);
  };

  const handleCheckPopUp = (itemId) => {
    showPopUp({
      title: "Definir tarefa como concluída?",
      message: "Tem a certeza que deseja dar como concluída esta tarefa?",
      primaryBtn: {
        label: "Sim",
        onPress: () => handleMarkAsDone(itemId),
      },
      secondaryBtn: {
        label: "Não",
        onPress: () => console.log("Cancel button pressed"),
      },
    });
  };

  const handleXmarkPopUp = (itemId) => {
    showPopUp({
      title: "Definir tarefa como pendente?",
      message: "Tem a certeza que deseja dar como pendente esta tarefa?",
      primaryBtn: {
        label: "Sim",
        onPress: () => handleMarkAsUndone(itemId),
      },
      secondaryBtn: {
        label: "Não",
        onPress: () => console.log("Cancel button pressed"),
      },
    });
  };

  const handleMarkAsUndone = (itemId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === itemId ? { ...task, done: !task.done } : task
    );

    tasksData.forEach((task) => {
      if (task.id === itemId) {
        task.done = false;
      }
    });
    setTasks(updatedTasks);
    countDoneTasks(updatedTasks);
  };

  const handleMarkAsDone = (itemId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === itemId ? { ...task, done: !task.done } : task
    );

    tasksData.forEach((task) => {
      if (task.id === itemId) {
        task.done = true;
      }
    });
    setTasks(updatedTasks);
    countDoneTasks(updatedTasks);
  };

  const fetchObraTasks = (id) => {
    return tasksData.filter((item) => item.obraId == id);
  };

  const countDoneTasks = (taskList) => {
    const doneTasksTmp = taskList.filter((item) => item.done === true);
    setDoneTasks(doneTasksTmp);
  };

  const [selectedFilter, setSelectedFilter] = useState(null);

  const [popupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    if (id) {
      const obraId = parseInt(id, 10);
      fetchObraById(obraId);
      fetchObraTasks(obraId);
      countDoneTasks(tasks);
    }
  }, [id]);

  useEffect(() => {
    let aux = tasksData.filter((item) => item.obraId == id);
    if (selectedFilter !== null) {
      aux = aux.filter((tasks) => tasks.done === selectedFilter);
    }
    setTasks(aux);
  }, [selectedFilter, tasks]);

  const filterByState = (state) => {
    setSelectedFilter(selectedFilter === state ? null : state);
  };

  const renderTaskItem = ({ item }) => (
    <TaskContainer
      labelTitle={item.title}
      labelText={item.description}
      onAddPersonPress={() => handleAddPersonPopUp(item.id)}
      onTrashPress={() => handleDeletePopUp(item.id)}
      onCheckPress={() => handleCheckPopUp(item.id)}
      onXmarkPress={() => handleXmarkPopUp(item.id)}
      done={item.done}
    />
  );

  if (!obra) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "Pages/Obras/obraPage",
              params: {
                id: id,
              },
            })
          }
        >
          <Image
            source={require("../../../../Images/backArrow.png")}
            style={styles.backArrowImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image
          source={require("../../../../Images/House.png")}
          style={styles.image}
        />
        <View style={styles.headerPosition}>
          <Text style={styles.headerTitle}>{obra.title}</Text>
          <Text style={styles.headerDescription}>
            Estado: {obra.done ? "Concluida" : "Em progresso"}
          </Text>
          <Text style={styles.headerDescription}>
            {selectedFilter ? "Tarefas Concluídas" : selectedFilter === null ? "Tarefas" : "Tarefas Pendentes"}
            : {tasks.length}
          </Text>
        </View>
      </View>

      <Text style={styles.tasksHeader}>Tarefas</Text>

      <EmployeesPopup
        visible={popupVisible}
        id={id}
        onConfirm={(selectedEmployeeIds) => {
          console.log("Selected Employee IDs:", selectedEmployeeIds);
          handleAssignTask(selectedEmployeeIds);
        }}
        onClose={() => setPopupVisible(false)}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => filterByState(true)}>
          <OrangeEmptyButton
            label={"Concluídas"}
            width={160}
            height={45}
            selected={selectedFilter === true}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterByState(false)}>
          <OrangeEmptyButton
            label={"Pendentes"}
            width={160}
            height={45}
            selected={selectedFilter === false}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.taskContainer}>
        <FlatList
          data={tasks}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyList message="tarefas" />}
        />
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity>
          <OrangeButton
            label={"Adicionar tarefa"}
            onPress={() =>
              router.push({
                pathname: "/Pages/Obras/Tarefas/obraTarefaAdd",
                params: {
                  id: id,
                },
              })
            }
          />
        </TouchableOpacity>
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
  header: {
    alignItems: "center",
    paddingBottom: 20,
    flexDirection: "row",
  },
  headerPosition: {
    width: 250,
    height: 80,
    marginLeft: 15,
    marginBottom: 15,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 15,
  },
  backArrowImage: {
    resizeMode: "contain",
    height: 20,
    width: 20,
  },
  buttonImage: {
    height: 50,
    width: 50,
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  taskContainer: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
    flex: 1,
    paddingTop: 10,
    paddingBottom: 20
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  tasksHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bottomButton: {
    marginBottom:30,
  },
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

export default obraTarefas;
