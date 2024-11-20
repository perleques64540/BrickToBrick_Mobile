import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ContainerDelete from "../../../../components/ContainerDelete";
import OrangeButton from "../../../../components/OrangeButton";
import OrangeEmptyButton from "../../../../components/OrangeEmptyButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import taskData from "../../../../data/tasks.json"; // Import your obras data JSON file

const obraTarefas = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { title } = useLocalSearchParams();
  const { state } = useLocalSearchParams();
  const [task, setTasks] = useState(taskData.filter((item) => item.obraId == id)); // State to hold the obras data
  const [selectedFilter, setSelectedFilter] = useState(null);

  // Load obra data (from local file or API)
  useEffect(() => {
    let aux = taskData.filter((item) => item.obraId == id);
    if (selectedFilter !== null) {
      aux = aux.filter((task) => task.done === selectedFilter);
    }
    setTasks(aux);
  }, [selectedFilter]);

  const filterByState = (state) => {
    // If the same filter is selected, deselect it
    setSelectedFilter(selectedFilter === state ? null : state);
  };

  const renderTaskItem = ({ item }) => (
    <ContainerDelete labelTitle={item.title} labelText={item.description} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
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
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerDescription}>
            Estado: {state ? "em progresso" : "concluída"}
          </Text>
          <Text style={styles.headerDescription}>
            Tarefas concluídas: 12/24
          </Text>
        </View>
      </View>

      <Text style={styles.tasksHeader}>Tarefas</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => filterByState(true)}>
          <OrangeEmptyButton
            label={"Concluídas"}
            width={160}
            height={45}
            selected= {selectedFilter === true}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterByState(false)}>
          <OrangeEmptyButton
            label={"Por fazer"}
            width={160}
            height={45}
            selected= {selectedFilter === false}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.taskContainer}>
        <FlatList
          data={task}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity>
          <OrangeButton
            label={"Adicionar tarefa"}
            onPress={() => router.push("Pages/Obras/Tarefas/obraTarefaAdd")}
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
    marginBottom: 20,
    flexDirection: "row",
  },
  headerPosition: {
    width: 250,
    height: 80,
    marginLeft: 15,
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
  headerTitle: {
    fontSize: 26,
    fontWeight: "bold",
  },
  headerDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  taskContainer: {
    marginTop: -20,
    alignItems: "center",
    flex: 1,
    height: 450,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
  tasksHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  bottomButton: {
    marginBottom: 20,
  },
});

export default obraTarefas;
