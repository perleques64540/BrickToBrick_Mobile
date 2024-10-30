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
import Conteiner from "../../components/Conteiner";
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

const obraPage = () => {
  const router = useRouter();

  const renderTaskItem = ({ item }) => (
    <ConteinerDelete labelTitle={item.title} labelText={item.description} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("../obras")}>
          <Image
            source={require("../../Images/backArrow.png")}
            style={styles.backArrowImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image source={require("../../Images/House.png")} style={styles.image} />
        <View style={styles.headerPosition}>
          <Text style={styles.headerTitle}>Rua do poço azul</Text>
          <Text style={styles.headerDescription}>Estado: em progresso</Text>
          <Text style={styles.headerDescription}>
            Tarefas concluídas: 12/24
          </Text>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Conteiner
          labelTitle={"Informações"}
          labelText={
            "Morada: Rua A de Lisboa, 2810-108\nHoras despendidas: 5 horas\nPago: não"
          }
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => router.push("Obras/obraOrcamentoPage")}>
          <View style={styles.squareButton}>
            <Image
              source={require("../../Images/orcamento.png")}
              style={styles.buttonImage}
            />
            <Text style={styles.buttonText}>Orçamentos</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("../obraTarefas")}>
          <View style={styles.squareButton}>
            {/*  <Image
              source={require('../Images/task.png')}
              style={styles.buttonImage}
            /> */}
            <Text style={styles.buttonText}>Tarefas</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.squareButton}>
            {/*  <Image
              source={require('../Images/func.png')}
              style={styles.buttonImage}
            /> */}
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
  buttonImage: {
    height: 50,
    width: 50,
    alignItems: "center",
    alignSelf: "center",
    alignContent: "center",
  },
  headerTitle: {
    fontSize: 26,
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
  infoHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 5,
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
    justifyContent: "space-between",
    alignSelf: "center",
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
