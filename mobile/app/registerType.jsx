import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/images/capacete2.png')} />
      <TouchableOpacity style={styles.button} onPress={() => router.push('/createCompany')}>
        <Text style={styles.buttonText}>Create Owner</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={() => router.push('/')}>
        <Text style={styles.buttonText}>Create Worker</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e9e9e9', 
  },
  button: {
    width: '80%', 
    paddingVertical: 15,
    marginVertical: 10,
    backgroundColor: '#3498db',  
    borderRadius: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,  
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
});
