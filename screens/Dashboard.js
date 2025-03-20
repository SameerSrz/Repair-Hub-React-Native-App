import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user } = route.params;

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <StatusBar style='light' />
            {/* Background Image */}
            <Image
                style={{ position: 'absolute', width: '100%', height: '100%' }}
                source={require('../assets/background.png')}
            />

            {/* Navigation Bar */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 40, paddingTop: 60 }}>
                <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
                    <MaterialIcons name="notifications" size={24} color="black" />
                    {/* <Image source={require('../assets/notification_icon.png')} style={{ width: 30, height: 30 }} /> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                    <Ionicons name="settings" size={24} color="black" />
                    {/* <Image source={require('../assets/settings_icon.png')} style={{ width: 30, height: 30 }} /> */}
                </TouchableOpacity>
            </View>

            {/* Profile Section */}
            <View style={{ alignItems: 'center', marginTop: 100 }}>
                <Image source={{ uri: user.data.user.avatar }} style={{ width: 100, height: 100, borderRadius: 50 }} />
                <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 10 }}>Welcome {user.data.user.username}</Text>
            </View>

            {/* Dashboard Features */}
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('Feature1')} style={{ backgroundColor: '#FF5733', padding: 20, borderRadius: 10, marginBottom: 20 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Feature 1</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Feature2')} style={{ backgroundColor: '#33FFA1', padding: 20, borderRadius: 10 }}>
                    <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Feature 2</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
