import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ContainerDelete = ({labelTitle,labelText,...rest}) => {
    return (
        <View style={styles.ContainerDelete}> 
            <View style={styles.content}>
                <Text style={styles.TitleText}>
                    {labelTitle}
                </Text>
                <Text style={styles.Text}>
                    {labelText}
                </Text>
            </View>
        </View>       
    );
}

const styles = StyleSheet.create({
    ContainerDelete: {
        backgroundColor: '#D3D3D3',
        padding: 10,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
      },
      content:{
        padding: 10,
        width: '100%'
      },
    TitleText:{   
        textAlign: 'left',
        color: '#333333',
        fontSize: 17,
        fontWeight: 'bold',
    
    },
    Text:{   
        textAlign: 'left',
        color: '#333333',
        marginTop: 2,
        fontSize: 14,      
    },
    BinImage:{
    },
});

export default ContainerDelete;