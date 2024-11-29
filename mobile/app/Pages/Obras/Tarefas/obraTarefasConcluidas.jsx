import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import NotificationContainer from "../../../../components/NotificationContainer";
import OrangeButton from "../../../../components/OrangeButton";
import OrangeEmptyButton from "../../../../components/OrangeEmptyButton";
import { useRouter } from "expo-router";

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

const obraTarefasConcluidas = () => {
  const router = useRouter();

  const renderTaskItem = ({ item }) => (
    <NotificationContainer labelTitle={item.title} labelText={item.description} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("../obraPage")}>
          <Image
            source={require("../../../../Images/backArrow.png")}
            style={styles.backArrowImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image source={require("../../../../Images/House.png")} style={styles.image} />
        <Text style={styles.headerTitle}>Rua do poço azul</Text>
        <Text style={styles.headerStatus}>Estado: em progresso</Text>
        <Text style={styles.headerTasks}>Tarefas concluídas: 12/24</Text>
      </View>

      <Text style={styles.tasksHeader}>Tarefas</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => router.push("../obraTarefas")}>
          <OrangeButton
            label={"Concluidas"}
            width={160}
            height={45}
            display={"yes"}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <OrangeEmptyButton label={"Pendentes"} width={160} height={45} />
        </TouchableOpacity>
      </View>
      <View style={styles.taskContainer}>
        <FlatList
          data={DATA}
          renderItem={renderTaskItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity onPress={() => router.push("../obraTarefaAdd")}>
          <OrangeButton label={"Adicionar tarefa"} width={300} height={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f8f8",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
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
    marginVertical: 10,
    marginTop: -30,
    marginLeft: 20,
  },
  headerStatus: {
    fontSize: 14,
    marginTop: 25,
    marginLeft: -195,
  },
  headerTasks: {
    fontSize: 14,
    marginTop: 65,
    marginLeft: -135,
  },
  taskContainer: {
    marginTop: -20,
    alignItems: "center",
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
    alignItems: "center",
    marginTop: -25,
  },
});

export default obraTarefasConcluidas;
