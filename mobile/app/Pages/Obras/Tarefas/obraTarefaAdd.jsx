import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import OrangeButton from "../../../../components/OrangeButton";
import GreyButton from "../../../../components/GreyButton";
import TextBox from "../../../../components/TextBox";
import { useRouter } from "expo-router";

const obraTarefaAdd = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.imagePostion}>
        <Image
          style={styles.imagestyle}
          source={require("../../../../Images/tasksIcon.png")}
        />
      </View>
      <View style={styles.headerPosition}>
        <Text style={styles.headerTitle}>Adicionar Tarefa</Text>
      </View>
      <View style={styles.headerPosition}>
        <TextBox
          label={"Título"}
          backgroundColor={"white"}
          textcolor={"black"}
          width={330}
          height={50}
        />
        <TextBox
          label={"Descrição"}
          backgroundColor={"white"}
          textcolor={"black"}
          width={330}
          height={50}
        />
      </View>

      <View style={styles.bottomButton}>
        <TouchableOpacity>
          <OrangeButton
            label={"Confirmar"}
            width={330}
            height={50}
            onPress={() =>
              router.push("Pages/Obras/Tarefas/obraTarefaAddSuccess")
            }
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButton}>
        <TouchableOpacity>
          <GreyButton
            label={"Cancelar"}
            width={330}
            height={50}
            onPress={() => router.push("Pages/Obras/Tarefas/obraTarefas")}
          />
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
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  bottomButton: {
    marginBottom: 15,
  },
});

export default obraTarefaAdd;
