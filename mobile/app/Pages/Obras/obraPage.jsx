import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ContainerDelete from "../../../components/ContainerDelete";
import Container from "../../../components/Container";
import { useLocalSearchParams, useRouter } from "expo-router";
import obrasData from "../../../data/obras.json";
import tasksData from "../../../data/tasks.json";
import { Dimensions } from 'react-native';

const DATA = [
  {
    id: "1",
    title: "Substituição de Janela",
    description:
      "Tarefa concluída por Quim Roscas em Rua de esquina com farmácia",
  },
  {
    id: "2",
    title: "Remoção de Telhado",
    description: "Tarefa concluída por Rui Manel em Rua do poço azul",
  },
];

const obraPage = () => {
  const {width, height } = Dimensions.get('window');

  const guidelineBaseWidth = 375;
  const guidelineBaseHeight = 812;

  const { id } = useLocalSearchParams(); // Fetch the id from URL params
  const [obra, setObra] = useState(null); // State to hold the obra data
  const [tasks, setTasks] = useState(tasksData.filter((item) => item.obraId == id));
  const [doneTasks, setDoneTasks] = useState([])

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
  }

  const countDoneTasks = () => {
    const doneTasksTmp = tasks.filter((item) => item.done == true);
    setDoneTasks(doneTasksTmp);
  }

  useEffect(() => {
    if (id) {
      const obraId = parseInt(id, 10); // Convert `id` to a number
      fetchObraById(obraId); // This will call fetchObraById with the numeric id
      fetchObraTasks(obraId);
    }
  }, [id]); // Ensure that useEffect watches the id.

  const router = useRouter();

  const renderTaskItem = ({ item }) => (
    <ContainerDelete labelTitle={item.title} labelText={item.description} />
  );

  if (!obra) {
    return <Text>Loading...</Text>; // Display loading message until obra is fetched
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backArrowContainer}>
          <TouchableOpacity onPress={() => router.push('/')}>
          <Image
            source={require("../../../Images/backArrow.png")}
            style={styles.backArrowImage}
          />
        </TouchableOpacity>
        </View>
        
      </View>
      <View style={styles.header}>
        <Image
          source={require("../../../Images/House.png")}
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

      <View style={styles.infoContainer}>
        <Container
          labelTitle={"Informações"}
          labelText={`Morada: ${obra.info.location} \nHoras despendidas: ${
            obra.info.hours
          } horas \nPago: ${obra.info.paid ? "Sim" : "Não"}`}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/Pages/Obras/Orcamentos/obraOrcamentoPage", 
              params: {
                id: id, // Pass obra ID to the details page
              },
            })
          }
        >
          <View style={styles.squareButton}>
            <Image
              source={require("../../../Images/orcamento.png")}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Orçamentos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/Pages/Obras/Tarefas/obraTarefas",
              params: {
                id: id
              },
            })
          }
        >
          <View style={styles.squareButton}>
            <Image
              source={require("../../../Images/Task.png")}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Tarefas</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            router.push({
              pathname: "/Pages/Obras/Funcionarios/obraFuncionarios",
              params: {
                id: id, // Pass obra ID to the details page
              },
            })
          }
        >
          <View style={styles.squareButton}>
            <Image
              source={require("../../../Images/Func.png")}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Funcionários</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.taskContainer}>
        <Text style={styles.headerTitle}>Últimas tarefas</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>Ver todas</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderTaskItem}
        keyExtractor={(item) => item.id}
      />
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
  backArrowContainer: {
    height: 50,
    width: 50,
    justifyContent: "center",
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
  infoContainer: {
    width: "100%",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    marginTop: 10,
  },
  squareButton: {
    width: 110,
    height: 110,
    backgroundColor: "#FF7900",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 18,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  taskContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
  viewAllText: {
    fontSize: 18,
    color: "#FF6E00",
    textAlign: "center",
    marginTop: "auto",
  },
});

export default obraPage;
