import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import Animated,{ FadeInUp, FadeOut, FadeInDown, fadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function Services() {
    const navigation = useNavigation();
    const styles = StyleSheet.create({
        container: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        },
        gridContainer: {
          flexDirection: 'row',
          flexWrap: "wrap",
          justifyContent: 'space-between',
          width: '100%', // Adjust as needed
        },
        gridItem: {
        flexBasis: '42%',
          backgroundColor: '#87CEEB',
          borderRadius: 8,
          padding: 35,
          margin: 15,
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
          fontSize: 15,
          fontWeight: 'bold',
          color: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        },
      });

  return (
    <View style={styles.container}>
      <StatusBar style='dark' />
      <View>
            <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-sky-400 pb-[70px] pt-[75px] font-bold tracking-wider text-5xl">
                Services
            </Animated.Text>
      </View>
      <ScrollView contentContainerStyle={styles.gridContainer}>
        <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
            <TouchableOpacity onPress={() => navigation.push('ServiceProvider', { role: "CheckUp" })}>
                <Text style={styles.text}>Check Up</Text>
            </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
            <TouchableOpacity onPress={() => navigation.push('ServiceProvider', { role: "EngineRepair" })}>
                <Text style={styles.text}>Engine Repair</Text>
            </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
            <TouchableOpacity onPress={() => navigation.push('ServiceProvider', { role: "TireReplacement" })}>
                <Text style={styles.text}>Tire Replacement</Text>
            </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
            <TouchableOpacity onPress={() => navigation.push('ServiceProvider', { role: "HybridBattery" })}>
                <Text style={styles.text}>Hybrid Battery</Text>
            </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
            <TouchableOpacity onPress={() => navigation.push('ServiceProvider', { role: "FuelService" })}>
                <Text style={styles.text}>Fuel Services</Text>
            </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
            <TouchableOpacity onPress={() => navigation.push('ServiceProvider', { role: "TowingService" })}>
                <Text style={styles.text}>Towing Services</Text>
            </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
            <TouchableOpacity onPress={() => navigation.push('ServiceProvider', { role: "Engine Repair" })}>
                <Text style={styles.text}>Car Wash</Text>
            </TouchableOpacity>
        </Animated.View>
        {/* <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
            <TouchableOpacity onPress={()=> navigation.push('Selection')}>
                <Text style={styles.text}>MG</Text>
            </TouchableOpacity>
        </Animated.View>
        <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
            <TouchableOpacity onPress={()=> navigation.push('Selection')}>
                <Text style={styles.text}>BMW</Text>
            </TouchableOpacity>
        </Animated.View> */}
      </ScrollView>
    </View>
  )
}