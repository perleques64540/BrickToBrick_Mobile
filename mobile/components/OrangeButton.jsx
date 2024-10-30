import { TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import React from 'react';

const OrangeButton = ({ label, display, onPress }) => {
    return (
        <TouchableOpacity style={styles.orangeButton} onPress={onPress}> 
            <Text style={styles.Text}>
                {label}
            </Text>
            
            {display === 'yes' && (
                <Image 
                    style={styles.image}
                    source={require('../Images/iconX.png')}
                />
            )}
        </TouchableOpacity> 
    );
}

const styles = StyleSheet.create({
    orangeButton: {
        backgroundColor: '#FF7900',
        borderRadius: 15,
        justifyContent: 'center',
        width:'100%',
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      },
    Text:{
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
    image:{
        width: 13,
        height: 13,
        marginLeft: 7,
    },
});

export default OrangeButton;
