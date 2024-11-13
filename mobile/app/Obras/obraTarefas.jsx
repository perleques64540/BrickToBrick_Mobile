import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ConteinerDelete from "../../components/ConteinerDelete";
import OrangeButton from "../../components/OrangeButton";
import OrangeEmptyButton from "../../components/OrangeEmptyButton";
import { useLocalSearchParams, useRouter } from "expo-router";

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
  {
    id: "3",
    title: "Substituição",
    description:
      "Tarefa concluída por Quim Roscas em Rua de esquina com farmácia",
  },
  {
    id: "4",
    title: "Substituição de Janela-2",
    description:
      "Tarefa concluída por Quim Roscas em Rua de esquina com farmácia",
  },
  {
    id: "5",
    title: "Substituição de Janela453223",
    description:
      "Tarefa concluída por Quim Roscas em Rua de esquina com farmácia",
  },
];

const obraTarefas = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  const renderTaskItem = ({ item }) => (
    <ConteinerDelete labelTitle={item.title} labelText={item.description} />
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
          <Text style={styles.headerTitle}>Rua do poço azul</Text>
          <Text style={styles.headerDescription}>Estado: em progresso</Text>
          <Text style={styles.headerDescription}>
            Tarefas concluídas: 12/24
          </Text>
        </View>
      </View>

      <Text style={styles.tasksHeader}>Tarefas</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => router.push("../obraTarefasConcluidas")}
        >
          <OrangeEmptyButton label={"Concluidas"} width={160} height={45} />
        </TouchableOpacity>
        <TouchableOpacity>
          <OrangeEmptyButton label={"Por fazer"} width={160} height={45} />
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

export default obraTarefas;
