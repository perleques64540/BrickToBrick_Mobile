import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

// Dados de configurações com categorias e botões
const cogData = [
  {
    category: 'Geral',
    items: [
      { id: '1', title: 'Perfil', icon: 'user' },
      { id: '2', title: 'Notificações', icon: 'bell' },
    ],
  },
  {
    category: 'Segurança',
    items: [
      { id: '3', title: 'Alterar Senha', icon: 'shield' },
      { id: '4', title: 'Autenticação de Dois Fatores', icon: 'shield' },
    ],
  },
  {
    category: 'Sobre',
    items: [
      { id: '5', title: 'Sobre a App', icon: 'info-circle' },
      { id: '6', title: 'Licenças', icon: 'info-circle' },
    ],
  },
];

const SettingItem = ({ title, icon, onPress }) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
    <View style={styles.iconContainer}>
      <FontAwesome name={icon} size={26} color="#fff" />
    </View>
    <View style={styles.itemContent}>
      <Text style={styles.itemTitle}>{title}</Text>
    </View>
    <FontAwesome name="chevron-right" size={18} color="#ccc" />
  </TouchableOpacity>
);

const cogScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.title}>Configurações</Text>
      </View>
      <FlatList
        style={styles.listStyle}
        data={cogData}
        keyExtractor={(item) => item.category}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.categoryLabel}>{item.category}</Text>
            {item.items.map((setting) => (
              <SettingItem
                key={setting.id}
                title={setting.title}
                icon={setting.icon}
                onPress={() => alert(`Ir para: ${setting.title}`)}
              />
            ))}
          </View>
        )}
        contentContainerStyle={styles.flatListContent}
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
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginVertical: 20,
  },
  listStyle: {
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'darkblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#34495e',
  },
  categoryLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginTop: 20,
    marginBottom: 10,
  },
  flatListContent: {
    paddingBottom: 80,
  },
});

export default cogScreen;
