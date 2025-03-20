import React, { useRef, useEffect } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';

const Notification = ({ message, type = 'info', duration = 3000, onHide }) => {
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fadeOut = () => {
      Animated.timing(fadeValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        onHide(); // Call onHide when animation is complete
      });
    };

    Animated.timing(fadeValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(fadeOut, duration);
    });

    return () => clearTimeout(fadeOut);
  }, [fadeValue, duration]);

  const backgroundColor = type === 'info' ? 'blue' : type === 'success' ? 'green' : 'red';

  return (
    <Animated.View style={[styles.notification, { backgroundColor, opacity: fadeValue }]}>
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  notification: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
    position: 'absolute',
    top: 50,
    left: 20,
  },
  message: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Notification;
