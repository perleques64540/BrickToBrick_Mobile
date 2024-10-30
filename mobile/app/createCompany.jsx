import React, { useEffect, useState } from 'react';
import {
  View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, Image, TextInput, Alert,ActivityIndicator,ScrollView, KeyboardAvoidingView,Platform,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { launchImageLibrary } from 'react-native-image-picker';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import FlashMessage, { showMessage } from 'react-native-flash-message';

const CreateCompany = () => {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [telemovel, setTelemovel] = useState('');
  const [email, setEmail] = useState('');
  const [dataCriacao, setData] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [ficheiroName, setFicheiroName] = useState('exempçi');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const savedEmail = await SecureStore.getItemAsync('emailRegister');
        if (savedEmail) {
          setUserEmail(savedEmail);
        } else {
          Alert.alert('Nenhum Email Encontrado', 'Não há email salvo no armazenamento seguro.');
        }
      } catch (error) {
        console.error('Erro ao recuperar o email:', error);
        Alert.alert('Erro', 'Falha ao recuperar o email do armazenamento seguro.');
      }
    };

    fetchUserData();
  }, []);

  const handleSelectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1, // Qualidade da imagem
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert('Seleção da imagem cancelada.');
      } else if (response.errorCode) {
        Alert.alert('Erro', response.errorMessage);
      } else {
        const fileName = response.assets[0].fileName || 'Imagem não selecionada';
        setFicheiroName(fileName); // Store the file name
        Alert.alert('Imagem Selecionada', `Nome do ficheiro: ${fileName}`);
      }
    });
  };

      // Função para mostrar o flash message
      const showAlert = () => {
        showMessage({
          message: "Empresa criada com sucesso",
          type: "success",
          duration: 2500, 
          icon: 'auto', 
        });
      };

  const handleCreate = async () => {
    const trimmedEmail = email.trim();
      // Validate email format
      if (!validateEmail(trimmedEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    setIsLoading(true);
    
    try {
      const response = await axios.post(process.env.BACKEND+`/auth/registerCompany/${userEmail}`, {
        "name": nome,
        "createdAt": dataCriacao,
        "ownerId": userEmail,
        "location": localizacao,
        "phoneNumber": telemovel,
        "email": trimmedEmail,
        "photoUrl": ficheiroName
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });    

      showAlert();
      router.push('/');

    } catch (error) {
      console.error('Erro na requisição:', error.response ? error.response.data : error.message);
      Alert.alert('Erro', `Erro do servidor: ${error.response?.data?.message || 'Não especificado'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Criar Empresa</Text>
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.addButton} onPress={handleSelectImage}>
          <Image style={styles.imagestyle} source={require('../assets/images/sinal-de-mais.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome</Text>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Localização</Text>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} value={localizacao} onChangeText={setLocalizacao} />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Telemóvel</Text>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} value={telemovel} onChangeText={setTelemovel} keyboardType="phone-pad" />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <View style={styles.inputWrapper}>
          <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none"/>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data de criação</Text>
        <View style={styles.inputWrapper}>
          <TextInputMask
            style={styles.input}
            type="datetime"
            options={{ format: 'DD/MM/YYYY' }}
            placeholder="DD/MM/YYYY"
            value={dataCriacao}
            onChangeText={setData}
          />
        </View>
      </View>

      <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleCreate} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Criar</Text>}
      </TouchableOpacity>
      
      </View>
      </ScrollView>
      <FlashMessage position="top" style={{ zIndex: 9999 }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    backgroundColor: '#e9e9e9',
  },
  keyboardView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 20,
  },
  imagestyle: {
    width: 100,
    height: 100,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: 'black',
    borderStyle: 'dashed',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: 100,
    height: 100,
    overflow: 'hidden',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  label: {
    marginBottom: 5,
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    elevation: 1,
  },
  input: {
    flex: 1,
    backgroundColor: 'transparent',
    minHeight: 45,
    padding: 10,
  },
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    top:40,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default CreateCompany;