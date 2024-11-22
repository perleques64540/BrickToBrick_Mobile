import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Container from "../../../../components/Container";
import OrangeButton from "../../../../components/OrangeButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";
import obrasData from "../../../../data/obras.json";
import tasksData from "../../../../data/tasks.json";

const DATA = [
  {
    id: "1",
    title: "Zé Manel da Silva",
    description:
      "Tarefa concluída por Quim Roscas em Rua de esquina com farmácia",
  },
  {
    id: "2",
    title: "Zé Manel da Silva",
    description:
      "Tarefa concluída por Quim Roscas em Rua de esquina com farmácia",
  },
  {
    id: "3",
    title: "Zé Manel da Silva",
    description:
      "Tarefa concluída por Quim Roscas em Rua de esquina com farmácia",
  },
  {
    id: "4",
    title: "Zé Manel da Silva",
    description:
      "Tarefa concluída por Quim Roscas em Rua de esquina com farmácia",
  },
];

const obraFuncionarios = () => {
  const router = useRouter();

  const { id } = useLocalSearchParams(); // Fetch the id from URL params
  const [obra, setObra] = useState(null); // State to hold the obra data
  const [tasks, setTasks] = useState(
    tasksData.filter((item) => item.obraId == id)
  );
  const [doneTasks, setDoneTasks] = useState([]);

  // Function to get obra by obraId
  const fetchObraById = (id) => {
    const foundObra = obrasData.find((item) => item.id === id);
    if (foundObra) {
      setObra(foundObra); // Set the obra if found
    } else {
      setObra(null); // Reset if obraId is not found
    }
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

  useEffect(() => {
    if (id) {
      const obraId = parseInt(id, 10); // Convert `id` to a number
      fetchObraById(obraId); // This will call fetchObraById with the numeric id
      fetchObraTasks(obraId);
    }
  }, [id]); // Ensure that useEffect watches the id.

  const renderItem = ({ item }) => (
    <Container
      path={item.path}
      labelTitle={item.title}
      labelText={item.description}
      height={90}
    />
  );

  if (!obra) {
    return <Text>Loading...</Text>; // Display loading message until obra is fetched
  }

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
          <Text style={styles.headerTitle}>{obra.title}</Text>
          <Text style={styles.headerDescription}>
            Estado: {obra.done ? "Concluida" : "Em progresso"}
          </Text>
          <Text style={styles.headerDescription}>
            Tarefas concluídas: {doneTasks.length}/{tasks.length}
          </Text>
        </View>
      </View>

      <Text style={styles.headerTitle}>Funcionários</Text>

      <View style={styles.listContainer}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <OrangeButton
            label={"Adicionar Funcionário"}
            onPress={() =>
              router.push({
                pathname: "Pages/Obras/Funcionarios/obraFuncionariosPage",
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
  listContainer: {
    width: 390,
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 10,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "red",
  },
  buttonContainer: {
    alignSelf: "center",
    position: "absolute",
    bottom: 70,
  },
});

export default obraFuncionarios;
