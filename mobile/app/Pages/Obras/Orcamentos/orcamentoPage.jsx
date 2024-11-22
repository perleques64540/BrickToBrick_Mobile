import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import ContainerDelete from "../../../../components/ContainerDelete";
import OrangeButton from "../../../../components/OrangeButton";
import { useLocalSearchParams, useRouter } from "expo-router";
import { usePopUp } from "../../../_layout"; // Import usePopUp
import * as DocumentPicker from "expo-document-picker";
import orcamentosData from "../../../../data/quotes.json";
import documentosData from "../../../../data/documentos.json";
import EmptyList from "../../../../components/EmptyList";

const orcamentoPage = () => {
  const router = useRouter();

  const { id } = useLocalSearchParams();
  const [documentos, setDocumentos] = useState([]);
  const fetchDocumentosById = (id) => {
    const foundDocumentos = documentosData.filter(
      (item) => item.orcamentoId == id
    );
    if (foundDocumentos) {
      setDocumentos(foundDocumentos);
    } else {
      setDocumentos([]);
    }
  };

  const { showPopUp } = usePopUp(); // Use pop-up for file selection

  const [orcamento, setOrcamento] = useState(null);
  const [data, setData] = useState([
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
      title: "Instalação de Piso",
      description: "Orçamento detalhado para nova instalação.",
    },
  ]);

  const [selectedFile, setSelectedFile] = useState(null); // File selection state

  // Fetch specific orcamento by id
  const fetchOrcamentoById = (orcamentoId) => {
    const foundOrcamento = orcamentosData.find(
      (item) => item.id == orcamentoId
    );
    setOrcamento(foundOrcamento || null);
  };

  useEffect(() => {
    if (id) {
      const orcamentoId = parseInt(id, 10); // Ensure `id` is a number
      fetchOrcamentoById(orcamentoId);
      fetchDocumentosById(orcamentoId);
    }
  }, [id]);

  const handleShowPopUp = () => {
    showPopUp({
      title: "Adicionar Documento",
      message: "Escolha um ficheiro do seu dispositivo.",
      primaryBtn: {
        label: "Selecionar Ficheiro",
        onPress: async () => {
          const result = await DocumentPicker.getDocumentAsync({
            type: "*/*", // Accept all file types; limit to PDFs if needed
            copyToCacheDirectory: true,
          });

          if (result.type === "success") {
            setSelectedFile(result);
            console.log("File selected:", result);
          } else {
            console.log("File selection canceled");
          }
        },
      },
      secondaryBtn: {
        label: "Cancelar",
        onPress: () => console.log("Cancel button pressed"),
      },
    });
  };

  const handleDeleteItem = (itemId) => {
    const updatedData = data.filter((item) => item.id !== itemId);
    setData(updatedData); // Update state with filtered data
  };

  const renderNotificationItem = ({ item }) => (
    <ContainerDelete
      labelTitle={item.title}
      labelText={item.description}
      onPress={() => handleDeleteItem(item.id)} // Call the delete handler on press
    />
  );

  if (!orcamento) {
    return <Text>Loading...</Text>; // Loading state while fetching `orcamento`
  }

  // Dynamically calculate container height based on the number of items
  const containerHeight = Math.min(data.length * 125, 375);

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
      <View style={styles.headerTextPosition}>
        <Text style={styles.headerTitle}>{orcamento.title}</Text>
        <Text style={styles.headerDescription}>{orcamento.description}</Text>
      </View>

      <Text style={styles.headerTitle}>Documentos</Text>

      <View style={[styles.alignContainers, { height: containerHeight }]}>
        <FlatList
          data={documentos}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<EmptyList message="Documentos" />}
        />
      </View>

      <View style={styles.buttonContainer}>
        <OrangeButton
          width={250}
          height={50}
          label="Adicionar documento"
          onPress={handleShowPopUp}
        />
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
    alignContent: "center",
    alignSelf: "center",
    alignItems: "flex-start",
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  backArrowImage: {
    resizeMode: "contain",
    height: 20,
    width: 20,
  },
  alignContainers: {
    alignItems: "center",
    alignContent: "center",
    alignSelf: "center",
    width: "100%",
    marginTop: 10,
  },
  buttonContainer: {
    alignSelf: "center",
  },
});

export default orcamentoPage;
