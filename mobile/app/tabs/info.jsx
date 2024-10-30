import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';

const Info = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image 
          source={require('../../assets/images/casa.jpg')} 
          style={styles.img} 
          resizeMode="cover"
        />
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Sed accusamus labore ad laborum autem nam autem architecto. Sed amet velit et dolore enim 
            At veritatis facere 33 aperiam labore et quod asperiores non deserunt quae quo animi fug
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {['Orçamento', 'Tarefas', 'Funcionários'].map((btnText) => (
            <TouchableOpacity key={btnText} style={[styles.button, styles.buttonPrimary]}>
              <Text style={styles.buttonText}>{btnText}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Obra da Obra</Text>
            <TouchableOpacity style={styles.smallButton}>
              <Text style={styles.smallButtonText}>Editar</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.infoText}>
            Lorem ipsum dolor sit amet. Quo tempora quam nam nemo omnis aut veritatis doloribus sed cumque laudantium.
          </Text>
          {[
            { section: 'Orçamento', text: 'Sed accusamus labore ad laborum autem nam autem architecto...' },
            { section: 'Tarefas', text: 'Sed accusamus labore ad laborum autem nam autem architecto...' },
            { section: 'Info 3', text: 'Sed accusamus labore ad laborum autem nam autem architecto...' },
            { section: 'Info 4', text: 'Sed accusamus labore ad laborum autem nam autem architecto...' },
          ].map((info) => (
            <View key={info.section}>
              <Text style={styles.sectionTitle}>{info.section}</Text>
              <Text style={styles.infoText}>{info.text}</Text>
            </View>
          ))}
          <View style={styles.infoBtn}>
            <TouchableOpacity style={styles.concluirButton}>
              <Text style={styles.concluirButtonText}>Concluir</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#e9e9e9',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 15,
    paddingBottom: 90,
  },
  img: {
    borderRadius: 20,
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 20,
    marginBottom: 20,
    
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: 'bold',
  },
  smallButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  infoText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    margin: 5,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPrimary: {
    backgroundColor: '#3498db',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoBtn: {
    alignItems: 'center',
    marginTop: 20,
  },
  concluirButton: {
    backgroundColor: '#3498db',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  concluirButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Info;
