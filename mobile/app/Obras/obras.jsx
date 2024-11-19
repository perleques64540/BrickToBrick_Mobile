import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar";
import ContainerImage from "../../components/ContainerImage";
import { useRouter } from "expo-router";
import obrasData from "../../data/obras.json"; // Import your obras data JSON file

const pathImg = require("../../Images/House.png");
const obras = () => {
  const [searchText, setSearchText] = useState("");
  const [obras, setObras] = useState([]); // State to hold the obras data
  const router = useRouter();

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
            id: item.id, // Pass obra ID to the details page
          },
        })
      }
    >
      <ContainerImage
        path={pathImg}
        labelTitle={item.title}
        labelText={item.title}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar
        label={"Pesquisar"}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Obras</Text>
      </View>

      {/* Obras List */}
      <FlatList
        data={obras} // Use the state to render data
        renderItem={renderItem} // Render each item
        keyExtractor={(item) => item.id.toString()} // Make sure id is unique, convert to string if necessary
        contentContainerStyle={styles.listContent} // Styling the list container
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up all available space
    paddingHorizontal: 20,
    paddingVertical: 50,
    flexDirection: "column", // Stack children vertically
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
    marginTop: 15,
  },
  alignContainers: {
    alignItems: "center",
    width: 390,
    height: 370,
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
