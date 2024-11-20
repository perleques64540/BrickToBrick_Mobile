import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SearchBar from "../components/SearchBar";
import ContainerImage from "../components/ContainerImage";
import { useRouter } from "expo-router";
import obrasData from "../data/obras.json"; // Import your obras data JSON file
import tasksData from "../data/tasks.json"; // Import your obras data JSON file

const pathImg = require("../Images/House.png");

const obras = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [obras, setObras] = useState([]); // State to hold all obras data
  const [tasks, setTasks] = useState([]); // State to hold all obras data

  // Load obra data (from local file or API)
  useEffect(() => {
    setObras(obrasData); // Set obras data to state from imported JSON
    setTasks(tasksData); // Set tasks data to state from imported JSON
  }, []);

  // Filter obras based on search text
  const filteredObras = obrasData.filter((obra) =>
    obra.title.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    setObras(filteredObras);
    console.log(obras);
  }, [searchText]);

  const TaskItem = ({ title, description, icon, onPress }) => (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={icon} size={30} color="#fff" />
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/Pages/Obras/obraPage",
          params: {
            id: item.id,
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
      {/* Search Bar */}
      <SearchBar
        label={"Pesquisar"}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {/* Obras Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Obras</Text>
        <TouchableOpacity onPress={() => router.push("/Pages/Obras/obras")}>
          <Text style={styles.headerLink}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      {/* Obras List */}

      <View style={styles.obrasListContainer}>
        <FlatList
          data={obras} // The data array
          renderItem={renderItem} // Render each item
          keyExtractor={(item) => item.id} // Unique key for each item
          contentContainerStyle={styles.listContent} // Styling the list container
        />
      </View>

      {/* Atualizações Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Tarefas</Text>
        <TouchableOpacity onPress={() => router.push("/tabs/tasks")}>
          <Text style={styles.headerLink}>Ver todas</Text>
        </TouchableOpacity>
      </View>

      {/* Atualizações List */}
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            description={item.description}
            icon={"task"}
            onPress={() => alert(`Tarefa selecionada: ${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
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
    marginBottom: 15,
    marginTop: 15,
  },
  midContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  obrasListContainer: {
    height: "35%",
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
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF7900",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  item: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default obras;
