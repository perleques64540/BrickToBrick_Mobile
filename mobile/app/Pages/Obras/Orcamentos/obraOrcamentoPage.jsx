import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import Container from "../../../../components/Container";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState, useEffect } from "react";

import obrasData from "../../../../data/obras.json";
import tasksData from "../../../../data/tasks.json";
import orcamentosData from "../../../../data/quotes.json";


const obraOrcamentoPage = () => {
  const router = useRouter();

  const { id } = useLocalSearchParams(); // Fetch the id from URL params
  const [obra, setObra] = useState(null); // State to hold the obra data
  const [tasks, setTasks] = useState(tasksData.filter((item) => item.obraId == id));
  const [doneTasks, setDoneTasks] = useState([])

  // Function to get obra by obraId
  const fetchObraById = (id) => {
    const foundObra = obrasData.find((item) => item.id == id);
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

  const [orcamentos, setOrcamentos] = useState([]); // State to hold the obra data
  const fetchOrcamentosObra = (id) => {
    const orcamentosTmp = orcamentosData.filter((item) => item.obraId == id);
    if (orcamentosTmp) {
      setOrcamentos(orcamentosTmp); // Set the obra if found
    } else {
      setOrcamentos([]); // Reset if obraId is not found
    }
  };

  useEffect(() => {
    if (id) {
      const obraId = parseInt(id, 10); // Convert `id` to a number
      fetchObraById(obraId); // This will call fetchObraById with the numeric id
      fetchObraTasks(obraId);
      fetchOrcamentosObra(obraId);
    }
  }, [id]); // Ensure that useEffect watches the id.

  if (!obra) {
    return <Text>Loading...</Text>; // Display loading message until obra is fetched
  }

  const renderBudgetItem = ({ item }) => (
    <TouchableOpacity
      style={styles.orcamento}
      onPress={() => {
        router.push({
          pathname: "/Pages/Obras/Orcamentos/orcamentoPage",
          params: {
            id: item.id,
          },
        });
      }}
    >
      <Container labelTitle={item.title} labelText={item.description} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <View style={styles.backArrowContainer}>
          <TouchableOpacity onPress={() => router.push('/')}>
          <Image
            source={require("../../../../Images/backArrow.png")}
            style={styles.backArrowImage}
          />
        </TouchableOpacity>
        </View>
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

      <Text style={styles.budgetsHeader}>Orçamentos</Text>

      <View style={styles.alignContainers}>
        <FlatList
          data={orcamentos}
          style={styles.orcamento}
          renderItem={renderBudgetItem}
          keyExtractor={(item) => item.id}
        />
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
  budgetsHeader: {
    fontSize: 26,
    fontWeight: "bold",
  },
  backArrowImage: {
    resizeMode: "contain",
    height: 20,
    width: 20,
  },
  alignContainers: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
    marginTop: 10,
  },
  orcamento: {
    width: "100%",
    marginBottom: 5,
  },
});

export default obraOrcamentoPage;
