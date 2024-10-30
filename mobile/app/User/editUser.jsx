import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import TextBox from '../../components/TextBox';
import OrangeButton from '../../components/OrangeButton';
import GreyButton from '../../components/GreyButton';
import { useRouter } from 'expo-router';

const editUser = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>


      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLs9tGlth8wVAXub3lEy03EDamsQF4qC1lOg&s' }} // Replace with your user profile image URL
          style={styles.profileImage}
        />
        <View style={styles.content}>
        <Text style={styles.userName}>User Xpto</Text>
        <Text style={styles.userEmail}>userfixe@gmail.com</Text>
        </View>
      </View>
        
      <View style={styles.buttonContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity onPress={() => router.push('../criarUser')}>
            <GreyButton style={styles.button} label="Editar"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => alert(`Apagar registo`)}>
            <GreyButton style={styles.button} 
            label="Apagar"
            /> 
          </TouchableOpacity>
           
        </View> 
      </View>

      <View style={styles.inputContainer} pointerEvents="none">
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Primeiro nome</Text>
            <TextBox
              label ={'User'}
              width={'100%'}
              textcolor={'#33333359'}
              borderColor={'#33333359'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Segundo nome</Text>
            <TextBox
              label ={'XPTO'}
              width={'100%'}
              textcolor={'#33333359'}
              borderColor={'#33333359'}
            />
          </View>
        </View>
        <View style={styles.inputSmallContainer}>        
          <Text style={styles.label}>Segundo nome</Text>  
          <TextBox
            label ={'XPTO'}
            width={160}
            textcolor={'#33333359'}
            borderColor={'#33333359'}
          />
        </View>
      </View>

        <Text style={styles.label}>Outras informações</Text>
        <TextBox
        label ={'Que possam ser uteis'}
        width={'100%'}
        textcolor={'#33333359'}
        borderColor={'#33333359'}
        />

      <View style={styles.input2Container} pointerEvents="none">
        <Text style={styles.label}>Morada</Text>
        <TextBox
        label ={'Relacionadas com a obra'}
        width={'100%'}
        textcolor={'#33333359'}
        borderColor={'#33333359'}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7efef',
    padding: 20,
    
  },
  content:{
    marginLeft:10,
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'black',
  },
  buttonRow: {
    flexDirection: 'row',
  },
  profileContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ddd',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  userEmail: {
    fontSize: 17,
    position: 'static',
  },
  inputContainer: {
    marginBottom: 20,
    marginTop:20
  },
  input1Container: {
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    marginHorizontal: -5
  },
  inputWrapper: {
    flex: 1,
    paddingHorizontal: 5
  },
  label: {
    fontSize: 16,

  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,

    backgroundColor: '#fff',
  },
  buttonContainer: {

  },
  saveButton: {
    backgroundColor: '#f58824',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',

  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#ddd',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainerSingle: {
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
  },
  button:{
    paddingHorizontal:25,
    paddingVertical:7,
    marginRight: 10,
    fontWeight: '600',
    borderRadius:13,
    backgroundColor: '#DADADA',
    color: '#333333'
  }
});

export default editUser;
