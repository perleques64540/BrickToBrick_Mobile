import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import OrangeButton from "../../components/OrangeButton";
import { useRouter } from "expo-router";

const obraTarefaAddSucess = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.imagePostion}>
        <Image
          style={styles.imagestyle}
          source={require("../../Images/tasksIcon.png")}
        />
      </View>
      <View style={styles.headerPosition}>
        <Text style={styles.headerTitle}>Feito!</Text>
        <Text style={styles.subHeaderTitle}>
          Tarefa adicionada com sucesso.
        </Text>
      </View>
      <View style={styles.bottomButton}>
        <TouchableOpacity onPress={() => router.push("../obraTarefas")}>
          <OrangeButton label={"Voltar"} width={330} height={50} />
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
  imagePostion: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 80,
  },
  imagestyle: {
    height: 130,
    width: 130,
    resizeMode: "contain",
  },
  headerPosition: {
    alignContent: "center",
    alignItems: "center",
    marginBottom: 70,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subHeaderTitle: {
    fontSize: 16,
  },
  bottomButton: {
    alignItems: "center",
    marginBottom: 15,
  },
});

export default obraTarefaAddSucess;
