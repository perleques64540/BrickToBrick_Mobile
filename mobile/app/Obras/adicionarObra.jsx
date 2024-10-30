import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import TextBox from '../../components/TextBox';
import OrangeButton from '../../components/OrangeButton';
import GreyButton from '../../components/GreyButton';

const adicionarObra = () => {


  return (
    <View style={styles.container}>

      <View style={styles.topConteiner}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1240/1240601.png' }}
          style={styles.icon}
        />
        <Text style={styles.title}>Adicionar Obra</Text>
      </View>
      

      <View style={styles.midConteiner}>
        <TextBox
          label ={'Título'}
          width={360}
          textcolor={'black'}
          borderColor={'black'}
          backgroundColor={'white'}
        />
        <TextBox
          label ={'Descrição'}
          width={360}
          textcolor={'black'}
          borderColor={'black'}
          backgroundColor={'white'}
        />
        <TextBox
          label ={'Outras informações'}
          width={360}
          textcolor={'black'}
          borderColor={'black'}
          backgroundColor={'white'}
        />
        <TextBox
          label ={'Relacionadas com a obra'}
          width={360}
          textcolor={'black'}
          borderColor={'black'}
          backgroundColor={'white'}
        />
      </View>


      <View style={styles.buttonConteiner}>
        <TouchableOpacity onPress={() => alert(`Guarda obra`)}>
          <OrangeButton
            width={360}
            height={55}
            label={'Confirmar'}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <GreyButton
            width={360}
            height={55}
            label={'Cancelar'}
          />
        </TouchableOpacity>
      </View>
      
    
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7efef',
  },
  topConteiner:{
    width: 390,
    height: 200,
    marginTop: 60,
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent:'space-between',
  },
  midConteiner:{
    width: 390,
    height: 260,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent:'space-between',
    marginBottom: 30,
  },
  icon: {
    width: 100,
    height: 100,
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonConteiner: {
    width: 390,
    height: 125,
    alignContent:'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
});

export default adicionarObra;
