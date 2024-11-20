import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import ContainerDelete from '../../../components/ContainerDelete';

const notifications = () => {
  const [data, setData] = useState([
    { id: '1', title: 'Armando concluiu uma nova tarefa_1', description: 'Clique para analisar resultados.' },
    { id: '2', title: 'Armando concluiu uma nova tarefa_2', description: 'Clique para analisar resultados.' },
    { id: '3', title: 'Armando concluiu uma nova tarefa_3', description: 'Clique para analisar resultados.' },
    { id: '4', title: 'Armando concluiu uma nova tarefa_4', description: 'Clique para analisar resultados.' },
    { id: '5', title: 'Armando concluiu uma nova tarefa_5', description: 'Clique para analisar resultados.' },
    { id: '6', title: 'Armando concluiu uma nova tarefa_6', description: 'Clique para analisar resultados.' },
  ]);

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
      <Text style={styles.title}>Notificações</Text>

      <FlatList
        data={data}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />

      <View style={styles.bottomContainer}>
      </View>
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
  listContent: {
    paddingBottom: 50, // To avoid being cut off by the bottom tab
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#e7efef',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
});

export default notifications;
