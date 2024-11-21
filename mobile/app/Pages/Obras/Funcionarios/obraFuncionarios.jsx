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
import { useRouter } from "expo-router";
import { YellowBox } from "react-native-web";

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

  const renderItem = ({ item }) => (
    <Container
      path={item.path}
      labelTitle={item.title}
      labelText={item.description}
      height={90}
    />
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
          <Text style={styles.headerTitle}>Rua do poço azul</Text>
          <Text style={styles.headerDescription}>Estado: em progresso</Text>
          <Text style={styles.headerDescription}>
            Tarefas concluídas: 12/24
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

      <View>
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
  listContainer: {
    width: 390,
    height: 450,
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    marginBottom: 10,
  },
});

export default obraFuncionarios;
