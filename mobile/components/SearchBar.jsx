import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { Feather, FontAwesome } from '@expo/vector-icons'; // For icons



const SearchBar = ({label, ...rest}) => {
    const [searchText, setSearchText] = useState('');
    return (
        <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder={label}
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity style={styles.searchButton}>
          <Feather name="search" size={20} color="black" />
        </TouchableOpacity>
      </View>
        
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderRadius: 20,
        width: '100%'
      },
      input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
      },
      searchButton: {
        marginLeft: 10,
      },
});

export default SearchBar;