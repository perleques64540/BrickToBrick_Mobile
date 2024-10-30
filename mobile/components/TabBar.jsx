import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faHammer, faListCheck, faBell } from '@fortawesome/free-solid-svg-icons';

const TabBar = () => {
  const router = useRouter();
  
  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => router.push('/')}>       
        <FontAwesomeIcon icon={faHouse} style={styles.bottomNavButtons} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/Obras/obras')}>
        <FontAwesomeIcon icon={faHammer} style={styles.bottomNavButtons} />
      </TouchableOpacity>
      <View style={styles.addContainer}>
        <TouchableOpacity style={styles.bottomNavButtonsCenter} onPress={() => router.push('/Obras/criarObra')}>
          <Image
            source={{ uri: 'https://www.pngall.com/wp-content/uploads/10/Plus-Symbol-PNG-Images-HD.png' }} 
            style={styles.image}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.push('/User/criarUser')}>
        <FontAwesomeIcon icon={faListCheck} style={styles.bottomNavButtons} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/notifications')}>
        <FontAwesomeIcon icon={faBell} style={styles.bottomNavButtons} />
      </TouchableOpacity>        
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 90,
    alignSelf: 'center',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    position: 'absolute',
    bottom: 0,
  },
  bottomNavButtons: {
    height: 30,
    width: 30,
    color: '#333333',
  },
  bottomNavButtonsCenter: {
    width: 80,
    height: 80,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: '#FF7900',
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -20,
  },
  image: {
    width: '40%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  addContainer: {
    width: 80,
    height: 70,
  }
});

export default TabBar;
