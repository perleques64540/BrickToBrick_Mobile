import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import SearchBar from "../components/SearchBar";
import ConteinerImage from "../components/ConteinerImage";
import { useRouter } from "expo-router";
import obrasData from "../data/obras.json"; // Import your obras data JSON file

const DATA = [
  {
    id: "1",
    path: require("../Images/House.png"),
    labelTitle: "Rua do poço azul",
    labelText: "Outras informações \nTarefas concluídas: 12/24",
  },
  {
    id: "2",
    path: require("../Images/House.png"),
    labelTitle: "Rua do Carvalho",
    labelText: "Outras informações \nTarefas concluídas: 5/20",
  },
  {
    id: "3",
    path: require("../Images/House.png"),
    labelTitle: "Avenida das Flores",
    labelText: "Outras informações \nTarefas concluídas: 8/15",
  },
  {
    id: "4",
    path: require("../Images/House.png"),
    labelTitle: "Rua do Sol",
    labelText: "Outras informações \nTarefas concluídas: 10/22",
  },
];

const pathImg = require("../Images/House.png");

const obras = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [obras, setObras] = useState([]); // State to hold all obras data

  // Load obra data (from local file or API)
  useEffect(() => {
    setObras(obrasData); // Set obras data to state from imported JSON
  }, []);

  // Filter obras based on search text
  const filteredObras = obrasData.filter((obra) =>
    obra.title.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    setObras(filteredObras);
    console.log(obras);
  }, [searchText]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "Obras/obraPage",
          params: {
            id: item.id,
          },
        })
      }
    >
      <ConteinerImage
        path={pathImg}
        labelTitle={item.title}
        labelText={item.title}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <SearchBar
          label={"Pesquisar"}
          searchText={searchText}
          setSearchText={setSearchText}
        />
      </View>

      {/* Obras Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Obras</Text>
        <TouchableOpacity>
          <Text style={styles.headerLink}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      {/* Obras List */}

      <FlatList
        data={obras} // The data array
        renderItem={renderItem} // Render each item
        keyExtractor={(item) => item.id} // Unique key for each item
        contentContainerStyle={styles.listContent} // Styling the list container
      />

      {/* Atualizações Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Atualizações</Text>
        <TouchableOpacity>
          <Text style={styles.headerLink}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      {/* Atualizações List */}
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    padding: 20,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "space-between",
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  searchButton: {
    marginLeft: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  midContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
  },
  headerLink: {
    fontSize: 16,
    color: "#FF6E00",
  },
  list: {
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
  },
  updateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
  },
  updateTextContainer: {
    flex: 1,
  },
  updateTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  updateDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default obras;
