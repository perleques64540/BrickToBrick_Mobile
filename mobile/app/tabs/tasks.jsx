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
import tasksData from "../../data/tasks.json";
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
  const [tasks, setTasks] = useState(tasksData);
  const [selectedFilter, setSelectedFilter] = useState(null);

  useEffect(() => {
    let filteredTasks = tasksData.filter((task) =>
      task.description.toLowerCase().includes(searchText.toLowerCase())
    );

    if (selectedFilter !== null) {
      filteredTasks = filteredTasks.filter(
        (task) => task.done === selectedFilter
      );
    }

    setTasks(filteredTasks);
  }, [searchText, selectedFilter]);

  const filterByState = (state) => {
    setSelectedFilter(selectedFilter === state ? null : state);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Tarefas</Text>
        <SearchBar
          label={"Pesquisar"}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => filterByState(true)}
            style={styles.button}
          >
            <OrangeEmptyButton
              label={"Concluídas"}
              width={160}
              height={45}
              selected={selectedFilter === true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => filterByState(false)}
            style={styles.button}
          >
            <OrangeEmptyButton
              label={"Pendentes"}
              width={160}
              height={45}
              selected={selectedFilter === false}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.listStyle}
          data={tasks}
          contentContainerStyle={styles.flatListContent}
          renderItem={({ item }) => (
            <TaskItem
              title={item.title}
              description={item.description}
              icon={"task"}
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
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    flexDirection: "column",
  },
  safeArea: {
    flex: 1,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 20,
  },
  button: {
    borderRadius: 5,
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
    marginTop: 10,
    alignItems: "center",
  },
});

export default App;
