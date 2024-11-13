import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import Conteiner from '../../components/Conteiner';
import { useRouter } from 'expo-router';

const DATA = [
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
];

const obraOrcamentoPage = () => {
    const router = useRouter();

  const renderBudgetItem = ({ item }) => (
    <TouchableOpacity style={styles.orcamento} onPress={() => router.push('../orcamentoPage')}>
      <Conteiner
        labelTitle={item.title}
        labelText={item.description}
      /> 
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
       <View style={styles.header}>
            <TouchableOpacity onPress={() => router.push('../obraPage')}>
              <Image
              source={require('../../Images/backArrow.png')}
              style={styles.backArrowImage}
              />
            </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image
          source={require('../../Images/House.png')}
          style={styles.image}
        />
        <View style={styles.headerPosition}>
          <Text style={styles.headerTitle}>Rua do poço azul</Text>
          <Text style={styles.headerDescription}>Estado: em progresso</Text>
          <Text style={styles.headerDescription}>Tarefas concluídas: 12/24</Text>
        </View>
      </View>

      <Text style={styles.budgetsHeader}>Orçamentos</Text>

      <View style={styles.alignConteiners}>
        <FlatList
          data={DATA}
          style={styles.orcamento}
          renderItem={renderBudgetItem}
          keyExtractor={item => item.id}
        />
      </View>   
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8f8',
    padding: 20,
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
  },
  headerPosition: {
    width: 250,
    height: 80,
    marginLeft: 15,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  headerDescription: {
    fontSize: 14,
    marginTop: 5,
  },
  budgetsHeader: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  backArrowImage:{
    resizeMode: 'contain',
    height: 20,
    width: 20,
  },
  alignConteiners:{
    alignItems: 'center',
    alignContent: 'center',
    alignSelf: 'center',
width: '100%',
    marginTop: 10,
  },
  orcamento:{
    width: '100%',
    marginBottom: 5
  }
});

export default obraOrcamentoPage;