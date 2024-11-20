import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import OrangeButton from '../../../../components/OrangeButton';
import { useRouter } from 'expo-router';
import { YellowBox } from 'react-native-web';


const obraFuncionariosPageDone = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>

        <View style={styles.image}>
            <Image
                source={require('../../../../Images/personaIcon.png')}
                style={styles.backArrowImage}
            />
        </View>

        <Text style={styles.title}>Feito!</Text>

        <Text style={styles.subTitle}>Funcionário adicionado com sucesso.</Text>

        <View style={styles.buttonContainer}>  
            <TouchableOpacity onPress={() => router.push('../obraFuncionariosPage')}>
                <OrangeButton
                    width={360}
                    height={55}
                    label={'Voltar'}
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
  subTitle: {
    fontSize: 18,
    alignContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
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

export default obraFuncionariosPageDone;
