import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';

export default function ServiceProviderDashboard() {
  const route = useRoute();
  const { data } = route.params;
  const user = data.data.user;

  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      updateUserLocation(location.coords.latitude, location.coords.longitude);
    })();
  }, []);

  const updateUserLocation = async (latitude, longitude) => {
    try {
      const response = await fetch('https://backend-alpha-swart.vercel.app/api/serviceProviderAuth/update-location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id,
          location: {
            latitude,
            longitude,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update location');
      }

      const responseData = await response.json();
      console.log('Location updated successfully:', responseData);
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  const renderFeedbackItem = ({ item }) => (
    <View style={styles.feedbackItem}>
      <Text style={styles.username}>{item.username}</Text>
      <Text style={styles.comment}>{item.comment}</Text>
      <Text style={styles.rating}>Rating: {item.rating}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Image style={styles.background} source={require('../../assets/background.png')} />
      <View style={styles.content}>
        <Image source={{ uri: user.avatar.url }} style={styles.profilePic} />
        <Text style={styles.name}>{user.fullName}</Text>
        <Text style={styles.status}>{user.role}</Text>
        <Text style={styles.sectionTitle}>Feedback</Text>
        <FlatList
          data={user.feedback}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderFeedbackItem}
          style={styles.feedbackList}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 150,
    paddingHorizontal: 20,
  },
  profilePic: {
    width: 210,
    height: 210,
    borderRadius: 105,
    marginBottom: 20,
  },
  name: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  status: {
    color: '#27ae60',
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  feedbackList: {
    width: '100%',
  },
  feedbackItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    elevation: 3,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  comment: {
    fontSize: 14,
    marginBottom: 5,
  },
  rating: {
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactButton: {
    marginTop: 20,
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
