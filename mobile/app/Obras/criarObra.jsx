import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHammer } from '@fortawesome/free-solid-svg-icons';

import OrangeButton from '../../components/OrangeButton';
import GreyButton from '../../components/GreyButton';
import TextBox from '../../components/TextBox';
import { usePopUp } from '../_layout';  // Import usePopUp

const AddWorkScreen = () => {
  const router = useRouter();
  const { showPopUp } = usePopUp();  // Get showPopUp function

  const handleShowPopUp = () => {
    console.log("cancelar clicked")
    showPopUp({
      title: 'Maaucoo',
      message: 'Este serviço já não está disponível',
      primaryBtn: {
        label: 'Ok',
        onPress: () => console.log('Ok button pressed'),
      },
      secondaryBtn: {
        label: 'Cancelar',
        onPress: () => console.log('Cancel button pressed'),
      },
    });
  };

  return (
    <View style={styles.container}>
      <FontAwesomeIcon style={styles.icon} icon={faHammer} />
      <Text style={styles.title}>Adicionar Obra</Text>

      <TextBox label={'Titulo'} width={'100%'} />
      <TextBox label={'Descrição'} width={'100%'} />
      <TextBox label={'Outras informações'} width={'100%'} />
      <TextBox label={'Relacionadas com a obra'} width={'100%'} />

      <OrangeButton
        label={'Confirmar'}
        onPress={() => router.push('tabs/tasks')}
      />
      <GreyButton
        label={'Cancelar'}
        onPress={handleShowPopUp} // Show PopUp on Cancel button press
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e7efef',
    padding: 20,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  icon: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 30,
    color: '#333333',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333333',
  },
});

export default AddWorkScreen;
