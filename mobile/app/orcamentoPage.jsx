import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import ContainerDelete from '../components/ContainerDelete';
import OrangeButton from '../components/OrangeButton';
import { useRouter } from 'expo-router';
import { usePopUp } from "./_layout"; // Import usePopUp
import * as DocumentPicker from 'expo-document-picker';


const [data, setData] = useState([
  {
    id: '1',
    title: 'Substituição de Janela',
    description: '230€ qualquer coisa que seja importante.',
  },
  {
    id: '2',
    title: 'Remoção de Telhado',
    description: 'Uma descrição e um preço talvez',
  },
  {
    id: '3',
    title: 'Remoção de Telhado',
    description: 'Uma descrição e um preço talvez',
  },
]);

const orcamentoPage = () => {
  const router = useRouter();
  const { showPopUp } = usePopUp(); // Get showPopUp function

  // Calculate container height based on number of items (e.g., 100px per item, up to a max of 300px)
  const containerHeight = Math.min(data.length * 125);

  const renderBudgetItem = ({ item }) => (
    <TouchableOpacity>
      <ContainerDelete
        labelTitle={item.title}
        labelText={item.description}
      /> 
    </TouchableOpacity>
  );

  const [selectedFile, setSelectedFile] = React.useState(null);

const handleShowPopUp = () => {
  showPopUp({
    title: "Adicionar Documento",
    message: "Escolha um ficheiro do seu dispositivo.",
    primaryBtn: {
      label: "Selecionar Ficheiro",
      onPress: async () => {
        const result = await DocumentPicker.getDocumentAsync({
          type: "*/*",//se calhar só devíamos aceitar pdfs
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
  // Remove the item from the list by filtering it out
  const updatedData = data.filter(item => item.id !== itemId);
  setData(updatedData);
};

const renderNotificationItem = ({ item }) => (
  <ContainerDelete
    labelTitle={item.title}
    labelText={item.description}
    onPress={() => handleDeleteItem(item.id)}  // Call the delete handler on press
  />
);  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image
            source={require('../Images/backArrow.png')}
            style={styles.backArrowImage}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.headerTextPosition}>
        <Text style={styles.headerTitle}>Substituição de Janela</Text>
        <Text style={styles.headerDescription}>
          Descrição do orçamento em questão e outras informações que talvez sejam relevantes em relação a este orçamento
        </Text>
      </View>

      <Text style={styles.headerTitle}>Documentos</Text>

      <View style={[styles.alignContainers, { height: containerHeight }]}>
        <FlatList
          data={data}
          renderItem={renderNotificationItem}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <OrangeButton 
            width={250}
            height={50}
            label={'Adicionar documento'}
            onPress={handleShowPopUp}
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
  header: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerDescription: {
    fontSize: 16,
  },
  headerTextPosition: {
    width: 350,
    height: 90,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  backArrowImage: {
    resizeMode: 'contain',
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
    alignSelf: 'center',
  },
});

export default orcamentoPage;
