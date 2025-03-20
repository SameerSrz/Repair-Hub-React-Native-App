import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';
import haversine from 'haversine';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

export default function Electricians() {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [electricians, setElectricians] = useState([]);
    const [filteredElectricians, setFilteredElectricians] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState(null);
    const [radius, setRadius] = useState(15); // State for radius

    useEffect(() => {
        const fetchElectriciansData = async () => {
            try {
                const response = await axios.post('https://backend-alpha-swart.vercel.app/api/serviceProviderAuth/get-data', {
                    role: 'Electrician'
                });
                setElectricians(response.data.data);
                setLoading(false);
            } catch (error) {
                setErrorMsg('An error occurred while fetching data');
                setLoading(false);
                console.error(error);
            }
        };

        fetchElectriciansData();
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
        if (location && electricians.length > 0) {
            const filtered = electricians.filter(electrician => {
                if (electrician.location && electrician.location.latitude && electrician.location.longitude) {
                    const start = {
                        latitude: location.latitude,
                        longitude: location.longitude
                    };
                    const end = {
                        latitude: electrician.location.latitude,
                        longitude: electrician.location.longitude
                    };
                    const distance = haversine(start, end, { unit: 'km' });
                    return distance <= radius;
                }
                return false;
            });
            setFilteredElectricians(filtered);
        }
    }, [location, electricians, radius]); // Re-filter when location, electricians, or radius changes

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

    const renderContent = () => {
        if (loading) {
            return (
                <ActivityIndicator size="large" color="#0000ff" />
            );
        } else if (errorMsg) {
            return (
                <Text>{errorMsg}</Text>
            );
        } else if (filteredElectricians.length === 0) {
            return (
                <Text>No electricians found near your location</Text>
            );
        } else {
            return (
                <ScrollView contentContainerStyle={styles.gridContainer}>
                    {filteredElectricians.map((data, index) => (
                        <Animated.View key={index} entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
                            <TouchableOpacity onPress={() => navigation.push('ProfileScreen', { data })}>
                                <View style={styles.profileContainer}>
                                    <Image source={{ uri: data.avatar?.url }} style={styles.profileImage} />
                                    <View>
                                        <Text style={styles.name}>{data.fullName}</Text>
                                        <Text style={data.isOnline ? styles.online : styles.offline}>
                                            {data.isOnline ? 'Online' : 'Offline'}
                                        </Text>
                                        <View style={styles.ratingContainer}>
                                            <Text style={styles.ratingText}>Near You</Text>
                                            {/* <Text style={styles.rating}>{data.rating.toFixed(1)}</Text> */}
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        </Animated.View>
                    ))}
                </ScrollView>
            );
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar style='dark' />
            <View>
                <Animated.Text entering={FadeInUp.duration(1000).springify()} style={{ color: 'skyblue', paddingBottom: 30, fontWeight: 'bold', letterSpacing: 1, fontSize: 40 }}>
                    Electricians
                </Animated.Text>
            </View>
            <View>
                <Animated.Text entering={FadeInUp.duration(1000).springify()} style={{ color: 'black', opacity: 0.5, paddingBottom: 10, fontWeight: 'bold', letterSpacing: 1, fontSize: 20 }}>
                    Select an Electrician
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
            {renderContent()}
        </View>
    );
}
