import React, { useState } from 'react';
import {
  View, Text, SafeAreaView, StyleSheet, StatusBar, TouchableOpacity, TextInput, Alert, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FontAwesome } from '@expo/vector-icons';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import * as DocumentPicker from 'expo-document-picker'; // Import para selecionar ficheiros

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [roles, setRoles] = useState('');
  const [password, setPassword] = useState('');
  const [isValidLength, setIsValidLength] = useState(false);
  const [hasUppercase, setHasUppercase] = useState(false);
  const [hasSpecialChar, setHasSpecialChar] = useState(false);
  const [hasNumber, setHasNumber] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState(null); // URL do ficheiro carregado no Cloudinary
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
    
    if (!validateEmail(trimmedEmail)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (!isValidLength || !hasUppercase || !hasSpecialChar || !hasNumber) {
      Alert.alert(
        'Weak Password', 
        'Password must be at least 8 characters long and include a mix of uppercase, lowercase, numbers, and special characters.'
      );
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(process.env.BACKEND+'/auth/register', {
        name,
        email: trimmedEmail,
        roles: parseInt(roles, 10),
        password,
        photo: uploadedFileUrl || '', // Envia a URL do ficheiro carregado, se disponível
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
        }, 100); 
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

  // Função para selecionar ficheiro
  const pickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf', // Especifique que apenas PDFs são permitidos
      copyToCacheDirectory: true,
    });
  
    console.log("File picked:", result); // Verifique os detalhes do arquivo
  
    if (!result.canceled) {
      const file = result.assets[0];
      uploadFileToCloudinary(file.uri, file.name, file.mimeType); // Envia o MIME também
    }
  };

  const uploadFileToCloudinary = async (fileUri, fileName, mimeType) => {
    const formData = new FormData();
  
    formData.append('file', {
      uri: fileUri,
      type: mimeType || 'application/pdf', // Use o tipo MIME retornado ou PDF por padrão
      name: fileName,
    });
  
    formData.append('upload_preset', 'saveDoc');
  
    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dy7opcame/raw/upload', {
        method: 'POST',
        body: formData,
        // Não defina manualmente o 'Content-Type'
      });
  
      if (!response.ok) {
        const errorResponse = await response.text();
        console.error("Upload failed with status:", response.status);
        console.error("Response:", errorResponse);
        Alert.alert('Erro no Upload', `Status: ${response.status}\nResposta: ${errorResponse}`);
        return;
      }
  
      const result = await response.json();
      console.log("Upload result:", result);
  
      if (result.secure_url) {
        setUploadedFileUrl(result.secure_url); // Guardar a URL se o upload for bem-sucedido
        showMessage({
          message: "Ficheiro carregado com sucesso!",
          type: "success",
          duration: 2500,
          icon: 'auto',
        });
      } else {
        console.error("Upload failed:", result);
        Alert.alert('Erro no Upload', 'Falha ao carregar o ficheiro.');
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      Alert.alert('Erro de Rede', 'Falha na requisição de rede. Verifique a sua conexão e tente novamente.');
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

            <TouchableOpacity style={styles.button} onPress={pickFile}>
              <Text style={styles.buttonText}>Select File</Text>
            </TouchableOpacity>
            
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

const ValidationItem = ({ isValid, text }) => {
  return (
    <View style={styles.validationItem}>
      <FontAwesome
        name={isValid ? 'check' : 'times'}
        size={16}
        color={isValid ? 'green' : 'red'}
        style={styles.validationIcon}
      />
      <Text style={[styles.validationText, { color: isValid ? 'green' : 'red' }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  loginText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  input: {
    flex: 1,
    padding: 8,
  },
  icon: {
    marginLeft: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoText: {
    color: '#007AFF',
    textAlign: 'center',
    marginTop: 16,
  },
  validationContainer: {
    marginTop: 8,
  },
  validationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  validationIcon: {
    marginRight: 8,
  },
  validationText: {
    fontSize: 14,
  },
});

export default Register;
