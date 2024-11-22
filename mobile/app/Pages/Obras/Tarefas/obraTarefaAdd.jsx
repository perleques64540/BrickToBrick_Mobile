import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import OrangeButton from "../../../../components/OrangeButton";
import GreyButton from "../../../../components/GreyButton";
import TextBox from "../../../../components/TextBox";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePopUp } from "../../../_layout"; // Import usePopUp

const obraTarefaAdd = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { title } = useLocalSearchParams();
  const { state } = useLocalSearchParams();

  const { showPopUp } = usePopUp(); // Get showPopUp function

  const handleShowPopUp = (itemId) => {
    showPopUp({
      title: "Apagar Notificação?",
      message: "Tem a certeza que deseja apagar esta notificação?",
      primaryBtn: {
        label: "Sim",
        onPress: () => handleDeleteItem(itemId),
      },
      secondaryBtn: {
        label: "Não",
        onPress: () => console.log("Cancel button pressed"),
      },
    });
  };

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
              router.push({
                pathname: "/Pages/Obras/Tarefas/obraTarefaAddSuccess",
                params: {
                  id: id, // Pass obra ID to the details page
                  title: title,
                  state: state,
                },
              })
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
            onPress={() =>
              router.push({
                pathname: "/Pages/Obras/Tarefas/obraTarefas",
                params: {
                  id: id, // Pass obra ID to the details page
                  title: title,
                  state: state,
                },
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
    flexDirection: "column"
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
