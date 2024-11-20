import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import tasksData from "../../data/tasks.json"; // Import your tasks data JSON file
import SearchBar from "../../components/SearchBar";
import OrangeEmptyButton from "../../components/OrangeEmptyButton";

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

const App = () => {
  const [searchText, setSearchText] = useState("");
  const [task, setTask] = useState(tasksData); // Initialize with all tasks
  const [selectedFilter, setSelectedFilter] = useState(null);

  const filteredTasks = tasksData.filter((task) =>
    task.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const filterByState = (state) => {
    if (selectedFilter === state) {
      setTask(tasksData); // Reset to all tasks
      setSelectedFilter(null); // Deselect filter
    } else {
      const foundTask = tasksData.filter((item) => item.done === state);
      setTask(foundTask);
      setSelectedFilter(state); // Set selected filter
    }
  };

  useEffect(() => {
    setTask(filteredTasks);
  }, [searchText]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Tarefas</Text>
        {/* Search Bar */}
        <SearchBar
          label={"Pesquisar"}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => filterByState(true)}
            style={[
              styles.button,
              selectedFilter === true,
            ]}
          >
            <OrangeEmptyButton
              label={"Concluidas"}
              width={160}
              height={45}
              selected={ !selectedFilter }
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => filterByState(false)}
            style={[
              styles.button,
              selectedFilter === false,
            ]}
          >
            <OrangeEmptyButton
              label={"Por fazer"}
              width={160}
              height={45}
              selected={ selectedFilter }
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.listStyle}
          data={task}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <TaskItem
              title={item.title}
              description={item.description}
              icon={"task"}
              onPress={() => alert(`Tarefa selecionada: ${item.id}`)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up all available space
    paddingHorizontal: 20,
    paddingVertical: 50,
    flexDirection: "column", // Stack children vertically
  },
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 16,
  },
  header: {
    padding: 20,
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  addButton: {
    width: "80%",
    backgroundColor: "#3498db",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "500",
    color: "black",
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  button: {
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: "orange",
  },
  listStyle: {
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
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
  flatListContent: {
    paddingBottom: 80,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },
});

export default App;