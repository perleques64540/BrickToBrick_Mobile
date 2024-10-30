import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import TextBox from '../../components/TextBox';
import OrangeButton from '../../components/OrangeButton';
import GreyButton from '../../components/GreyButton';
import { useRouter } from 'expo-router';

const criarUser = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>


      <View style={styles.profileContainer}>
        <View>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLs9tGlth8wVAXub3lEy03EDamsQF4qC1lOg&s' }} // Replace with your user profile image URL          
            style={styles.profileImage}
          />
        </View>
        <View style={styles.profileTextContainer}>
          <Text style={styles.userName}>User Xpto</Text>
          <Text style={styles.userEmail}>userfixe@gmail.com</Text>     
        </View>
      </View> 


      <View style={styles.inputContainer}>
        <View style={styles.row}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Primeiro nome</Text>
            <TextBox
              label ={'User'}
              width={'100%'}
              textcolor={'black'}
              borderColor={'black'}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Segundo nome</Text>
            <TextBox
              label ={'XPTO'}
              width={'100%'}
              textcolor={'black'}
              borderColor={'black'}
            />
          </View>
        </View>
      </View>

        <Text style={styles.label}>Outras informações</Text>
        <TextBox
          label ={'Que possam ser uteis'}
          width={'100%'}
          textcolor={'black'}
          borderColor={'black'}
        />

      
        <Text style={styles.label}>Morada</Text>
        <TextBox
          label ={'Relacionadas com a obra'}
          width={'100%'}
          textcolor={'black'}
          borderColor={'black'}
        />

      {/* Buttons */}
      <OrangeButton
        label={'Confirmar'}
        onPress={() => alert(`Guarda user`)}
      />
      <GreyButton
        label={'Cancelar'}
        onPress={() => router.push('../editUser')} // Show PopUp on Cancel button press
      />


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7efef',
    padding: 20,
  },
  profileContainer: {
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 390,
    height: 100,
    marginBottom: 180,
    padding: 10,
  },
  profileTextContainer:{
    marginLeft: 20,
    flexDirection: 'column', 
    justifyContent: 'flex-start',
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
  },
  input1Container: {
    alignItems: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal:-5,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10,
  },
  input2Container: {
    alignItems: 'flex-start',
    alignSelf: 'center',
    alignContent: 'center',
    flexDirection: 'column',
    width: 390,
    height: 90,
    paddingHorizontal: 10,
    marginBottom: 50,
  },
  inputSmallContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 3,
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

export default criarUser;
