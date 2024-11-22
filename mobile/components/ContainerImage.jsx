import { View, Image, StyleSheet, Text } from 'react-native';
import React from 'react';

const ContainerImage = ({ path, labelTitle, labelText }) => {
  return (
    <View style={styles.ContainerImage}>
      <Image
        source={typeof path === 'string' ? { uri: path } : path} // Handles both remote and local images
        style={styles.Image}
      />
      <View style={styles.content}>
      <Text style={styles.TextTitle} numberOfLines={1}>{labelTitle}</Text>
      <Text style={styles.TextBody} numberOfLines={2}>{labelText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ContainerImage: {
    backgroundColor: '#D3D3D3',
    padding: 10,
    borderRadius: 13,
    display: 'flex',
    flexDirection:'row',
    marginBottom: 10,
  },
  content: {
    marginLeft: 10,
    flex: 1, // Ensures text shrinks instead of overflowing the container
  },
  Image: {
    width: 90,
    height: 90,
    borderRadius: 16,
  },
  TextTitle: {
    position:'static',
    fontWeight: 'bold',
    fontSize: 16,
  },
  TextBody: {
    position:'static',
    fontSize: 15,
  },

});

export default ContainerImage;
