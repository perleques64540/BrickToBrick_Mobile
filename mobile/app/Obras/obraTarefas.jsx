import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ContainerDelete from "../../components/ContainerDelete";
import OrangeButton from "../../components/OrangeButton";
import OrangeEmptyButton from "../../components/OrangeEmptyButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import taskData from "../../data/tasks.json"; // Import your obras data JSON file

const obraTarefas = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { title } = useLocalSearchParams();
  const { state } = useLocalSearchParams();
  const [obras, setObras] = useState([]); // State to hold the obras data

  const fetchTaskById = (id) => {
    const foundTask = taskData.filter((item) => item.obraId == id);
    if (foundTask) {
      setObras(foundTask);
    } else {
      setObras(null);
    }
  };

  const filterByState = (state) => {
    const foundTask = taskData.filter(
      (item) => item.done == state && item.obraId == id
    );
    if (foundTask) {
      setObras(foundTask);
    } else {
      setObras(null);
    }
  };

  // Load obra data (from local file or API)
  useEffect(() => {
    fetchTaskById(id); // Set obras data to state from imported JSON
  }, []);

  const renderTaskItem = ({ item }) => (
    <ContainerDelete labelTitle={item.title} labelText={item.description} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("../../Images/backArrow.png")}
            style={styles.backArrowImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image
          source={require("../../Images/House.png")}
          style={styles.image}
        />
        <View style={styles.headerPosition}>
          <Text style={styles.headerTitle}>{title}</Text>
          <Text style={styles.headerDescription}>
            Estado: {state ? "em progresso" : "concluida"}
          </Text>
          <Text style={styles.headerDescription}>
            Tarefas concluídas: 12/24
          </Text>
        </View>
      </View>

      <Text style={styles.tasksHeader}>Tarefas</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => filterByState(true)}>
          <OrangeEmptyButton label={"Concluidas"} width={160} height={45} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterByState(false)}>
          <OrangeEmptyButton label={"Por fazer"} width={160} height={45} />
        </TouchableOpacity>
      </View>
      <View style={styles.taskContainer}>
        <FlatList
          data={obras}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity onPress={() => router.push("Obras/obraTarefaAdd")}>
          <OrangeButton
            label={"Adicionar tarefa"}
            onPress={() => router.push("Obras/obraTarefaAdd")}
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
    flexDirection: "column"
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
