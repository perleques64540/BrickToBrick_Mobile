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
import tasksData from "../../../../data/tasks.json"; // Import your obras data JSON file
import obrasData from "../../../../data/obras.json";
import { usePopUp } from "../../../_layout"; // Import usePopUp
import EmptyList from "../../../../components/EmptyList";

const obraTarefas = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Fetch the id from URL params
  const [obra, setObra] = useState(null); // State to hold the obra data
  const [tasks, setTasks] = useState(
    tasksData.filter((item) => item.obraId == id)
  );
  const [doneTasks, setDoneTasks] = useState([]);

  // Function to get obra by obraId
  const fetchObraById = (id) => {
    const foundObra = obrasData.find((item) => item.id == id);
    if (foundObra) {
      setObra(foundObra); // Set the obra if found
    } else {
      setObra(null); // Reset if obraId is not found
    }
  };

  const { showPopUp } = usePopUp(); // Get showPopUp function

  const handleShowPopUp = (itemId) => {
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
    // Remove the item from the list by filtering it out
    const updatedData = fetchObraTasks(itemId); //lista de tasks sem a task que queremos apagar
    //TODO: dar delete da task no json das tasks
    setTasks(updatedData); //TODO: mudar para dar push do updatedData para um notificações.json
  };

  const fetchObraTasks = (id) => {
    const taskTmp = tasksData.filter((item) => item.obraId == id);
    if (taskTmp) {
      setTasks(taskTmp);
      countDoneTasks();
    } else {
      setTasks([]);
    }
  };

  const countDoneTasks = () => {
    const doneTasksTmp = tasks.filter((item) => item.done == true);
    setDoneTasks(doneTasksTmp);
  };

  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    if (id) {
      const obraId = parseInt(id, 10); // Convert `id` to a number
      fetchObraById(obraId); // This will call fetchObraById with the numeric id
      fetchObraTasks(obraId);
    }
  }, [id]); // Ensure that useEffect watches the id.

  // Load obra data (from local file or API)
  useEffect(() => {
    let aux = tasksData.filter((item) => item.obraId == id);
    if (selectedFilter !== null) {
      aux = aux.filter((tasks) => tasks.done === selectedFilter);
    }
    setTasks(aux);
  }, [selectedFilter]);

  const filterByState = (state) => {
    // If the same filter is selected, deselect it
    setSelectedFilter(selectedFilter === state ? null : state);
  };

  const renderTaskItem = ({ item }) => (
    <ContainerDelete
      labelTitle={item.title}
      labelText={item.description}
      onPress={() => handleShowPopUp(item.id)}
    />
  );

  if (!obra) {
    return <Text>Loading...</Text>; // Display loading message until obra is fetched
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
            Tarefas concluídas: {doneTasks.length}/{tasks.length}
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
            selected={selectedFilter === true}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => filterByState(false)}>
          <OrangeEmptyButton
            label={"Por fazer"}
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
