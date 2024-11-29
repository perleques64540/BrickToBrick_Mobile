import { View, TouchableOpacity, StyleSheet, Text, Image } from 'react-native';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const NotificationContainer = ({labelTitle,labelText,...rest}) => {
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
            <TouchableOpacity style={styles.BinImage}{...rest}>
                <FontAwesomeIcon icon={faTrash} color='#333333' size={23}/>
            </TouchableOpacity>
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
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 15,
        gap: 10,
      },
      content:{
        padding: 10,
        width: '85%',
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
});

export default NotificationContainer;