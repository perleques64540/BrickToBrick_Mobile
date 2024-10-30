import React, { useState } from 'react';
import {
  View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, TextInput, Image, Alert, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator, Button,
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontAwesome } from '@expo/vector-icons';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import * as ImagePicker from 'expo-image-picker';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState('../assets/images/capacete.png');
  const [isValidLength, setIsValidLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const router = useRouter();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    setIsValidLength(text.length >= 8);
    setHasUppercase(/[A-Z]/.test(text));
    setHasSpecialChar(/[!@#$%^&*(),.?":{}_|<>]/.test(text));
    setHasNumber(/\d/.test(text));
    setShowValidation(true);
  };

  const handleBlur = () => {
    setShowValidation(false);
  };

  const saveEmail = async (email) => {
    try {
      await SecureStore.setItemAsync('emailRegister', email);
    } catch (error) {
      console.error('Erro ao salvar o email:', error);
      Alert.alert('Erro', 'Falha ao salvar o email.');
    }
  };

  const showAlert = () => {
    showMessage({
      message: "Registo efetuado com sucesso",
      type: "success",
      duration: 2500, 
      icon: 'auto', 
    });
  };

  const handleRegister = async () => {
    setIsLoading(true);
    const trimmedEmail = email.trim();
    // Validate email format
    if (!validateEmail(trimmedEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    // Validate password requirements
    if (!isValidLength || !hasUppercase || !hasSpecialChar || !hasNumber) {
      Alert.alert(
        'Weak Password', 
        'Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters.'
      );
      return;
    }

    try {
      const response = await axios.post(process.env.BACKEND+'/auth/register', {
        name,
        email: trimmedEmail,
        roles: parseInt(roles, 10),
        password,
        photo: uploadedImageUrl || photo, // Use uploadedImageUrl or fallback to the manually input photo URL
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200 || response.status === 201) {
        await saveEmail(email);
        showAlert();
        setTimeout(() => {
          router.push('/registerType');
        }, 100); // Atrasa a navegação por 500ms
        console.log('Erro na API:', trimmedEmail);
        console.log('Erro na API:', password);
      } else {
        Alert.alert('Registration failed', 'Please check your details');
      }
    } catch (error) {
      console.log(error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
    if (!permissionResult.granted) {
      alert("Permissão para acessar a galeria é necessária!");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
  
    if (!result.canceled) {
      uploadImageToImgbb(result.assets[0].uri); // upload para o ImgBB
    }
  };

const uploadImageToImgbb = async (imageUri) => {
  const data = new FormData();
  const apiKey = 'df180a1ce2ff4ad8c473e242a3698290';
  
  data.append('image', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'uploaded_image.jpg',
  });

  try {
    const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
      method: 'POST',
      body: data,
    });

    const result = await response.json();

    if (result.data && result.data.url) {
      setUploadedImageUrl(result.data.url); // Armazena a URL da imagem carregada
      console.log('Imagem carregada com sucesso:', result.data.url);
    } else {
      setUploadedImageUrl('../assets/images/capacete.png');
      console.error('Falha no upload:', result);
    }
  } catch (error) {
    setUploadedImageUrl('../assets/images/capacete.png');
    console.error('Erro ao carregar a imagem:', error);
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
          <View style={styles.container}>
            <Text style={styles.loginText}>Register</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Photo</Text>
            </View>
              <View style={styles.header}>
              <TouchableOpacity style={styles.addButton} onPress={pickImage}>
                <Image style={styles.imagestyle} source={require('../assets/images/sinal-de-mais.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Name</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="none"
                />
                <Icon name="person" size={20} color="#000" style={styles.icon} />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <Icon name="email" size={20} color="#000" style={styles.icon} />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Roles</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  value={roles}
                  onChangeText={setRoles}
                  keyboardType="numeric"
                />
                <Icon name="work" size={20} color="#000" style={styles.icon} />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  secureTextEntry
                  value={password}
                  onChangeText={handlePasswordChange}
                  onFocus={() => setShowValidation(true)} 
                  onBlur={handleBlur} 
                />
                <Icon name="lock" size={20} color="#000" style={styles.icon} />
              </View>
              {showValidation && (
                <View style={styles.validationContainer}>
                  <ValidationItem isValid={isValidLength} text="Pelo menos 8 caracteres" />
                  <ValidationItem isValid={hasUppercase} text="Pelo menos uma letra maiúscula" />
                  <ValidationItem isValid={hasSpecialChar} text="Pelo menos um caractere especial" />
                  <ValidationItem isValid={hasNumber} text="Pelo menos um número" />
                </View>
              )}
            </View>
            
            <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
              {isLoading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Register</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.infoText}>Already have an account?</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
        <FlashMessage position="top" style={{ zIndex: 9999 }} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const ValidationItem = ({ isValid, text }) => (
  <View style={styles.validationItem}>
    <FontAwesome
      name={isValid ? 'check-circle' : 'times-circle'}
      size={18}
      color={isValid ? '#4CAF50' : '#f44336'}
    />
    <Text style={[styles.validationText, { color: isValid ? '#4CAF50' : '#f44336' }]}>{text}</Text>
  </View>
);

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
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  loginText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 32,
    marginBottom: 20,
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
  button: {
    backgroundColor: '#3498db',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    marginVertical: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
  icon: {
    padding: 10,
  },
  infoText: {
    fontSize: 14,
    color: 'black',
    marginTop: 10,
  },
  validationContainer: {
    marginTop: 8,
  },
  validationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  validationText: {
    marginLeft: 8,
    fontSize: 14,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    width: 100,
    height: 100,
    overflow: 'hidden',
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
});

export default Register;