import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import OrangeButton from '../../components/OrangeButton';
import GreyButton from '../../components/GreyButton';
import TextBox from '../../components/TextBox';
import { useRouter } from 'expo-router';
import { YellowBox } from 'react-native-web';


const obraFuncionariosPage = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>

        <View style={styles.image}>
            <Image
                source={require('../../Images/personaIcon.png')}
                style={styles.backArrowImage}
            />
        </View>

        <Text style={styles.title}>Adicionar Funcionário</Text>

        <View style={styles.textInputContainer}>        
            <TextBox
                label ={'Email ou nº telemóvel'}
                width={360}
                textcolor={'black'}
                borderColor={'black'}
                backgroundColor={'white'}
            />
        </View>

        <View style={styles.buttonContainer}>  
            <TouchableOpacity onPress={() => router.push('../obraFuncionariosPageDone')}>
                <OrangeButton
                    width={360}
                    height={55}
                    label={'Confirmar'}
                />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert(`bbbbbb`)}>
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
    backgroundColor: '#f0f8f8',
  },
  image: {
    height: 200,
    width: 200,
    marginTop: 100,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  textInputContainer:{
    width: 390,
    height: 90,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonContainer:{
    width: 390,
    height: 120,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
});

export default obraFuncionariosPage;
