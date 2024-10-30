import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import React from 'react';

const GreyButton = ({ label, onPress }) => {
    return (
        <TouchableOpacity style={styles.greyButton} onPress={onPress}> 
            <Text style={styles.text}>
                {label}
            </Text>
        </TouchableOpacity> 
    );
};

const styles = StyleSheet.create({
    greyButton: {
        backgroundColor: '#D3D3D3',
        borderRadius: 15,
        width: '100%',
        paddingVertical: 15,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default GreyButton;
