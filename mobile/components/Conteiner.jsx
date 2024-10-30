import { View, StyleSheet, Text} from 'react-native';
import React from 'react';

const Conteiner = ({labelTitle, labelText}) => {
    return (
        <View style={[styles.Conteiner ]}> 
            <Text style={styles.TitleText}>
                {labelTitle}
            </Text>
            <Text style={styles.Text}>
                {labelText}
            </Text>
        </View>       
    );
}

const styles = StyleSheet.create({
    Conteiner: {
        backgroundColor: '#D3D3D3',
        borderRadius: 15,
        width: '100%',
        height: 'auto',
        alignSelf: 'center',
        alignContent: 'center',
        padding: 20,
    },
    TitleText:{   
        textAlign: 'left',
        color: 'black',
        fontSize: 18,
        fontWeight: 'bold',
    },
    Text:{   
        textAlign: 'left',
        color: 'black',
        fontSize: 14,   
    },
});

export default Conteiner;