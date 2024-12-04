import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import OrangeButton from "../../../../components/OrangeButton";
import GreyButton from "../../../../components/GreyButton";
import TextBox from "../../../../components/TextBox";
import { useLocalSearchParams, useRouter } from "expo-router";
import employeesData from "../../../../data/employees.json";
import { useState } from "react";
import { usePopUp } from "../../../_layout";

const createEmployeePage = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [funcionarioName, setFuncionarioName] = useState("");
  const [funcionarioContact, setFuncionarioContact] = useState("");
  const { showPopUp } = usePopUp();

  const handleCreateFuncionario = () => {
    const newFuncionario = {
      id: Date.now(),
      name: funcionarioName,
      obrasIds: [id],
      contact: funcionarioContact,
    };

    employeesData.push(newFuncionario);

    router.push({
      pathname: "Pages/Obras/Funcionarios/createEmployeeSucess",
      params: {
        id: id,
      },
    });
  };

  const handleInvalidInput = () => {
    showPopUp({
      title: "Dados Inválidos",
      message: "Por favor preencha todos os campos.",
      primaryBtn: {
        label: "Ok",
        onPress: () => console.log("Ok button pressed"),
      },
    });
  };

  const handleConfirmButtonPress = () => {
    if (funcionarioName == "" || funcionarioContact == "") {
      handleInvalidInput();
    } else {
      handleCreateFuncionario();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image
          source={require("../../../../Images/personaIcon.png")}
          style={styles.backArrowImage}
        />
      </View>

      <View style={styles.headerPosition}>
        <Text style={styles.headerTitle}>Adicionar Funcionário</Text>
      </View>
      <View style={styles.headerPosition}>
        <TextBox
          label={"Nome"}
          backgroundColor={"white"}
          textcolor={"black"}
          value={funcionarioName}
          onChangeText={setFuncionarioName}
          width={330}
          height={50}
        />

        <TextBox
          label={"Nº Telemóvel ou Email"}
          backgroundColor={"white"}
          textcolor={"black"}
          value={funcionarioContact}
          onChangeText={setFuncionarioContact}
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
            onPress={() => handleConfirmButtonPress()}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButton}>
        <TouchableOpacity>
          <GreyButton
            label={"Cancelar"}
            width={330}
            height={50}
            onPress={() => router.back()}
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
    flexDirection: "column",
  },
  image: {
    height: 200,
    width: 200,
    marginTop: 100,
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  textInputContainer: {
    width: 390,
    height: 90,
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
  },
  buttonContainer: {
    width: 360,
    height: 120,
    alignContent: "center",
    alignSelf: "center",
    justifyContent: "space-between",
  },
});

export default createEmployeePage;
