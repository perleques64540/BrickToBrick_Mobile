import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Animated } from 'react-native';
import OrangeButton from './OrangeButton';
import GreyButton from './GreyButton';

const PopUp = ({ title, message, primaryBtn, secondaryBtn, isVisible }) => {
  // Animated values for opacity and position
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const [visible, setVisible] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setVisible(true); // Ensure it's visible before starting animation
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Slide-down and fade-out when hidden
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 50,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => setVisible(false)); // Hide after animation completes
    }
  }, [isVisible]);

  // Only render the component if visible state is true
  if (!visible) return null;

  return (
    <Animated.View style={[styles.main, { opacity }]}>
      <Animated.View style={[styles.modal, { transform: [{ translateY }] }]}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
        {/* Render the buttons with label and onPress from props */}
        <OrangeButton
          label={primaryBtn?.label || 'Ok'}
          onPress={primaryBtn?.onPress || (() => {})}
        />
        <GreyButton
          label={secondaryBtn?.label || 'Cancelar'}
          onPress={secondaryBtn?.onPress || (() => {})}
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  main: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: 0,
    top: 0,
    backgroundColor: '#00000059',
    justifyContent: 'flex-end', // Align modal at the bottom
  },
  modal: {
    width: '100%',
    padding: 40,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 21,
    borderTopRightRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    color: '#160A02',
    marginBottom: 20,
  },
  message: {
    color: '#160A02',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default PopUp;
