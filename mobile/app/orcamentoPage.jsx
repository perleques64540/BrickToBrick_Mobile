import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import ConteinerDelete from "../components/ConteinerDelete";
import OrangeButton from "../components/OrangeButton";
import { useRouter } from "expo-router";

const DATA = [
  {
    id: "1",
    title: "Substituição de Janela",
    description: "230€ qualquer coisa que seja importante.",
  },
  {
    id: "2",
    title: "Remoção de Telhado",
    description: "Uma descrição e um preço talvez",
  },
  {
    id: "3",
    title: "Remoção de Telhado",
    description: "Uma descrição e um preço talvez",
  },
];

const orcamentoPage = () => {
  const router = useRouter();

  // Calculate container height based on number of items (e.g., 100px per item, up to a max of 300px)
  const containerHeight = Math.min(DATA.length * 125);

  const renderBudgetItem = ({ item }) => (
    <TouchableOpacity>
      <ConteinerDelete labelTitle={item.title} labelText={item.description} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require("../Images/backArrow.png")}
            style={styles.backArrowImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerTextPosition}>
        <Text style={styles.headerTitle}>Substituição de Janela</Text>
        <Text style={styles.headerDescription}>
          Descrição do orçamento em questão e outras informações que talvez
          sejam relevantes em relação a este orçamento
        </Text>
      </View>

      <Text style={styles.headerTitle}>Documentos</Text>

      <View style={[styles.alignConteiners, { height: containerHeight }]}>
        <FlatList
          data={DATA}
          renderItem={renderBudgetItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <OrangeButton width={250} height={50} label={"Adicionar documento"} />
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
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  headerDescription: {
    fontSize: 16,
  },
  headerTextPosition: {
    width: 350,
    height: 90,
    alignContent: "center",
    alignSelf: "center",
    alignItems: "flex-start",
    marginBottom: 30,
  },
  backArrowImage: {
    resizeMode: "contain",
    height: 20,
    width: 20,
  },
  alignConteiners: {
    alignItems: "center",
    alignSelf: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    width: 390,
  },
  buttonContainer: {
    alignSelf: "center",
  },
});

export default orcamentoPage;
