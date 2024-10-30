import React, { useState } from 'react';
import {
  View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const data = [
  { id: '1', title: 'Montar janelas no Monte da Caparica', description: '1/1/9999', icon: 'build' },
  { id: '2', title: 'Montar janelas no Monte da Caparica', description: '1/1/9999', icon: 'group' },
  { id: '3', title: 'Montar janelas no Monte da Caparica', description: '1/1/9999', icon: 'group' },
  { id: '4', title: 'Montar janelas no Monte da Caparica', description: '1/1/9999', icon: 'group' },
  { id: '5', title: 'Montar janelas no Monte da Caparica', description: '1/1/9999', icon: 'group' },
  { id: '6', title: 'Montar janelas no Monte da Caparica', description: '1/1/9999', icon: 'build' },
  { id: '7', title: 'Montar janelas no Monte da Caparica', description: '1/1/9999', icon: 'place' },
  { id: '8', title: 'Montar janelas no Monte da Caparica', description: '1/1/9999', icon: 'place' },
  { id: '9', title: 'Montar janelas no Monte da Caparica', description: '1/1/9999', icon: 'place' },
  { id: '10', title: 'Montar janelas no Monte da Caparica', description: '1/1/9999', icon: 'place' },
];

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Tarefas</Text>
        <Text style={styles.subTitle}>Próximas tarefas</Text>
      </View>
      <FlatList
        style={styles.listStyle}
        data={data}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <TaskItem
            title={item.title}
            description={item.description}
            icon={item.icon}
            onPress={() => alert(`Tarefa selecionada: ${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 16,
    backgroundColor: '#e9e9e9',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  addButton: {
    width: '80%',
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  subTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  listStyle: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 5,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
  },
  flatListContent: {
    paddingBottom: 80,
  },
});

export default App;
