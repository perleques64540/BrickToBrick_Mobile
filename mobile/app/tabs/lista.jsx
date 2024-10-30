import React, { useState } from 'react';
import {
  View, Text, SafeAreaView, StyleSheet, StatusBar, FlatList, Image, TouchableOpacity,
} from 'react-native';
import { SearchBar } from 'react-native-elements';
import { useRouter } from 'expo-router';

const data = [
  { id: '1', title: 'Casa da D.Maria', description: 'Montagem de janelas', street: 'Rua A. de Lisboa 2810-765', endDate: '24/05', image: require('../../assets/images/casa.jpg') },
  { id: '2', title: 'Casa da D.Manu', description: 'Montagem de janelas', street: 'Rua A. de Lisboa 2810-765', endDate: '24/05', image: require('../../assets/images/casa.jpg') },
  { id: '3', title: 'Casa da D.Maria', description: 'Montagem de janelas', street: 'Rua A. de Lisboa 2810-765', endDate: '24/05', image: require('../../assets/images/casa.jpg') },
  { id: '4', title: 'Casa da D.Maria', description: 'Montagem de janelas', street: 'Rua A. de Lisboa 2810-765', endDate: '24/05', image: require('../../assets/images/casa.jpg') },
  { id: '5', title: 'Casa da D.Maria', description: 'Montagem de janelas', street: 'Rua A. de Lisboa 2810-765', endDate: '24/05', image: require('../../assets/images/casa.jpg') },
  { id: '6', title: 'Casa da D.Maria', description: 'Montagem de janelas', street: 'Rua A. de Lisboa 2810-765', endDate: '24/05', image: require('../../assets/images/casa.jpg') },
  { id: '7', title: 'Casa da D.Maria', description: 'Montagem de janelas', street: 'Rua A. de Lisboa 2810-765', endDate: '24/05', image: require('../../assets/images/casa.jpg') },
  { id: '8', title: 'Casa da D.Maria', description: 'Montagem de janelas', street: 'Rua A. de Lisboa 2810-765', endDate: '24/05', image: require('../../assets/images/casa.jpg') },
  { id: '9', title: 'Casa da D.Maria', description: 'Montagem de janelas', street: 'Rua A. de Lisboa 2810-765', endDate: '24/05', image: require('../../assets/images/casa.jpg') },
  { id: '10', title: 'Casa da D.Maria', description: 'Montagem de janelas', street: 'Rua A. de Lisboa 2810-765', endDate: '24/05', image: require('../../assets/images/casa.jpg') },
];

const Item = ({ title, description, street, endDate, image, onPress }) => (
  <View style={styles.item}>
    <View style={styles.content}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.info}>{description}</Text>
        <Text style={styles.info}>{street}</Text>
        <Text style={styles.info}>Conclusão Prevista: {endDate}</Text>
      </View>
      <Image source={image} style={styles.image} resizeMode="cover" />
    </View>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Ver Detalhes</Text>
    </TouchableOpacity>
  </View>
);

const Lista = () => {
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const router = useRouter();

  const handleSearch = (query) => {
    setSearch(query);
    if (query) {
      const newData = data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
      setFilteredData(newData);
    } else {
      setFilteredData(data);
    }
  };

  const handleItemPress = (itemId) => {
    router.push('tabs/info');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        ListHeaderComponent={
          <View>
            <Text style={styles.titlePage}>Obras</Text>
            <SearchBar
              placeholder="Pesquisar..."
              onChangeText={handleSearch}
              value={search}
              containerStyle={styles.searchBarContainer}
              inputContainerStyle={styles.searchBarInput}
              inputStyle={styles.searchBarInputText}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Recentes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Acabadas</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        data={filteredData}
        contentContainerStyle={styles.flatListContent}
        renderItem={({ item }) => (
          <Item
            title={item.title}
            description={item.description}
            street={item.street}
            endDate={item.endDate}
            image={item.image}
            onPress={() => handleItemPress(item.id)}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 20,
    backgroundColor: '#e9e9e9',
  },
  titlePage: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 20,
    marginTop: 10,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },
  searchBarInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  searchBarInputText: {
    color: 'black',
    borderRadius: 10,
  },
  item: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
    minHeight: 175,
    justifyContent: 'flex-start',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  image: {
    width: 175,
    height: 175,
    marginRight: 10,
    borderRadius: 10,
  },
  infoContainer: {
    flex: 1,
    marginRight: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 1,
  },
  info: {
    marginBottom: 5,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: 100,
    alignSelf: 'flex-start',
    marginRight: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 100,
  },
});

export default Lista;
