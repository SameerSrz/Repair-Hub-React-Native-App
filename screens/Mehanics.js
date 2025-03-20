import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import haversine from 'haversine';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function Mechanics() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [mechanics, setMechanics] = useState([]);
  const [filteredMechanics, setFilteredMechanics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const [radius, setRadius] = useState(15); // State for radius

  useEffect(() => {
    const fetchMechanicsData = async () => {
      try {
        const response = await axios.post('https://backend-alpha-swart.vercel.app/api/serviceProviderAuth/get-data', {
          role: 'Mechanic'
        });
        setMechanics(response.data.data);
        setLoading(false);
      } catch (error) {
        setErrorMsg('An error occurred while fetching mechanics data');
        setLoading(false);
        console.error(error);
      }
    };

    fetchMechanicsData();
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location.coords);
      } catch (error) {
        setErrorMsg('An error occurred while getting location');
        console.error(error);
      }
    };

    if (!loading) {
      requestLocationPermission();
    }
  }, [loading]);

  useEffect(() => {
    if (location && mechanics.length > 0) {
      const filtered = mechanics.filter(mechanic => {
        if (mechanic.location && mechanic.location.latitude && mechanic.location.longitude) {
          const start = {
            latitude: location.latitude,
            longitude: location.longitude,
          };
          const end = {
            latitude: mechanic.location.latitude,
            longitude: mechanic.location.longitude,
          };
          const distance = haversine(start, end, { unit: 'km' });
          return distance <= radius;
        }
        return false;
      });
      setFilteredMechanics(filtered);
    }
  }, [location, mechanics, radius]); // Recalculate when radius changes

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 50,
    },
    gridContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%',
    },
    gridItem: {
      flexBasis: '45%',
      backgroundColor: '#87CEEB',
      borderRadius: 8,
      padding: 20,
      margin: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    text: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    profileImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 10,
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    online: {
      color: 'green',
    },
    offline: {
      color: 'red',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 5,
    },
    ratingText: {
      marginRight: 5,
    },
    rating: {
      color: 'orange',
      fontWeight: 'bold',
    },
    pickerContainer: {
      marginVertical: 20,
      width: '80%',
    },
    pickerLabel: {
      fontWeight: 'bold',
      marginBottom: 10,
      fontSize: 16,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View>
        <Animated.Text
          entering={FadeInUp.duration(1000).springify()}
          style={{ color: 'skyblue', paddingBottom: 30, fontWeight: 'bold', letterSpacing: 1, fontSize: 40 }}
        >
          Mechanics
        </Animated.Text>
      </View>
      <View>
        <Animated.Text
          entering={FadeInUp.duration(1000).springify()}
          style={{ color: 'black', opacity: 0.5, paddingBottom: 10, fontWeight: 'bold', letterSpacing: 1, fontSize: 20 }}
        >
          Select a Mechanic
        </Animated.Text>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select Radius (km):</Text>
        <Picker
          selectedValue={radius}
          onValueChange={(itemValue) => setRadius(itemValue)}
          mode="dropdown"
        >
          <Picker.Item label="5 km" value={5} />
          <Picker.Item label="10 km" value={10} />
          <Picker.Item label="20 km" value={20} />
          <Picker.Item label="50 km" value={50} />
          <Picker.Item label="100 km" value={100} />
        </Picker>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : filteredMechanics.length === 0 ? (
        <Text>No mechanics found near your location</Text>
      ) : (
        <ScrollView contentContainerStyle={styles.gridContainer}>
          {filteredMechanics.map((data, index) => (
            <Animated.View key={index} entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
              <TouchableOpacity onPress={() => navigation.push('ProfileScreen', { data })}>
                <View style={styles.profileContainer}>
                  <Image source={{ uri: data.avatar.url }} style={styles.profileImage} />
                  <View>
                    <Text style={styles.name}>{data.fullName}</Text>
                    <Text style={data.isOnline ? styles.online : styles.offline}>
                      {data.isOnline ? 'Online' : 'Offline'}
                    </Text>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.ratingText}>Near You</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}
