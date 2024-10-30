import { View, StyleSheet, Text} from 'react-native';
import React from 'react';

const OrangeEmptyButton = ({ label, width = 350, height = 50 }) => {
    return (
        <View style={[styles.OrangeEmptyButton, { width }, { height }]}> 
            <Text style={styles.Text}>
                {label}
            </Text>
        </View> 
    );
}

const styles = StyleSheet.create({
    OrangeEmptyButton: {
        backgroundColor: 'white',
        borderColor: '#FF7900',
        borderWidth: 3,
        borderRadius: 15,
        width: 350,
        justifyContent: 'center',
      },
    Text:{
        textAlign: 'center',
        fontSize: 17,
        color: 'black',
        letterSpacing: 1,
    },

});

export default OrangeEmptyButton;