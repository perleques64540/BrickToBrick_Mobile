import { View, StyleSheet, Text } from 'react-native';
import React from 'react';

const OrangeEmptyButton = ({ label, width = 350, height = 50, selected }) => {
  return (
    <View
      style={[
        styles.OrangeEmptyButton,
        { width, height },
        selected && styles.selectedButton,
      ]}
    >
      <Text style={[styles.Text, selected && styles.selectedText]}>
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  OrangeEmptyButton: {
    backgroundColor: 'white',
    borderColor: '#FF7900',
    borderWidth: 3,
    borderRadius: 15,
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: '#FF7900',
  },
  Text: {
    textAlign: 'center',
    fontSize: 17,
    color: 'black',
    letterSpacing: 1,
  },
  selectedText: {
    color: 'white',
  },
});

export default OrangeEmptyButton;