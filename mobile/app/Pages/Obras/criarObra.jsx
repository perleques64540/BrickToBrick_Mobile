import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHammer } from "@fortawesome/free-solid-svg-icons";

import OrangeButton from "../../../components/OrangeButton";
import GreyButton from "../../../components/GreyButton";
import TextBox from "../../../components/TextBox";
import { usePopUp } from "../../_layout"; // Import usePopUp

import obrasData from '../../../data/obras.json';

const AddWorkScreen = () => {
  const router = useRouter();
  const { showPopUp } = usePopUp(); // Get showPopUp function

  const [title, setTitle] = useState("");
  const [clientName, setClientName] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleShowPopUp = () => {
    showPopUp({
      title: "Confirmar",
      message: "Tem a certeza que deseja criar esta obra?",
      primaryBtn: {
        label: "Sim",
        onPress: () => handleAddWork(),
      },
      secondaryBtn: {
        label: "Cancelar",
        onPress: () => console.log("Cancel button pressed"),
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
      secondaryBtn: {
        label: "",
        onPress: () => console.log("Cancel button pressed"),
      },
    });
  };

  const handleConfirmButtonPress = () => {
    if (title == "" || clientName == "" || address == "" || description == "") {
      console.log("Invalid input");
      handleInvalidInput();
    }
    else{
      handleShowPopUp();
    }
  }

  const handleAddWork = async () => {  
      const newWork = {
        id: Date.now(),
        title,
        info: {
          location: address,
          hours: "0",
          paid: false,
        },
        done: false,
        quotes: [],
        tasks: [],
        employees: [],
      };
      
      obrasData.push(newWork);
    
      router.push({
        pathname: "Pages/Obras/obraPage",
        params: {
          id: newWork.id,
        },
      })
    
  };

  return (
    <View style={styles.container}>
      <FontAwesomeIcon style={styles.icon} icon={faHammer} size={70} />
      <Text style={styles.title}>Adicionar Obra</Text>

      <TextBox
        backgroundColor={"white"}
        label={"Título"}
        width={"100%"}
        textcolor={"#333"}
        value={title}
        onChangeText={setTitle}
      />
      <TextBox
        backgroundColor={"white"}
        label={"Nome Cliente"}
        width={"100%"}
        textcolor={"#333"}
        value={clientName}
        onChangeText={setClientName}
      />
      <TextBox
        backgroundColor={"white"}
        label={"Morada"}
        width={"100%"}
        textcolor={"#333"}
        value={address}
        onChangeText={setAddress}
      />
      <TextBox
        backgroundColor={"white"}
        label={"Descrição"}
        width={"100%"}
        textcolor={"#333"}
        type={"multiline"}
        value={description}
        onChangeText={setDescription}
      />

      <OrangeButton
        label={"Confirmar"}
        onPress={handleConfirmButtonPress}
      />
      <GreyButton
        label={"Cancelar"}
        onPress={router.back}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
    height: "100%",
    width: "100%",
    justifyContent: "center",
  },
  icon: {
    alignSelf: "center",
    marginBottom: 30,
    color: "#333333",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333333",
  },
});

export default AddWorkScreen;
