import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import OrangeButton from "../../../../components/OrangeButton";
import GreyButton from "../../../../components/GreyButton";
import TextBox from "../../../../components/TextBox";
import { useLocalSearchParams, useRouter } from "expo-router";
import employeesData from "../../../../data/employees.json";
import { useState } from "react";
import { usePopUp } from "../../../_layout";

const obraFuncionariosPage = () => {
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
      pathname: "Pages/Obras/Funcionarios/obraFuncionariosPageDone",
      params: {
        id: id,
      },
    });
  }

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

      <Text style={styles.title}>Adicionar Funcionário</Text>

      <View>
        <TextBox
          label={"Nome"}
          width={360}
          textcolor={"black"}
          borderColor={"black"}
          backgroundColor={"white"}
          value={funcionarioName}
          onChangeText={setFuncionarioName}
        />
      </View>

      <View>
        <TextBox
          label={"Email ou nº telemóvel"}
          width={360}
          textcolor={"black"}
          borderColor={"black"}
          backgroundColor={"white"}
          value={funcionarioContact}
          onChangeText={setFuncionarioContact}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <OrangeButton
            width={360}
            height={55}
            label={"Confirmar"}
            onPress={() =>
              handleConfirmButtonPress()
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert(`bbbbbb`)}>
          <GreyButton
            width={360}
            height={55}
            label={"Cancelar"}
            onPress={() =>
              router.back()
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
    backgroundColor: "#f0f8f8",
  },
  image: {
    height: 200,
    width: 200,
    marginTop: 100,
    alignContent: "center",
    alignSelf: "center",
    alignItems: "center",
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

export default obraFuncionariosPage;
