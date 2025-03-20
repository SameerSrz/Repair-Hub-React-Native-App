import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar'
import Animated,{ FadeInUp, FadeOut, FadeInDown, fadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

export default function Selection() {
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
        flexBasis: '60%',
          backgroundColor: '#87CEEB',
          borderRadius: 8,
          padding: 50,
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
          fontSize: 17,
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
            <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-sky-400 pb-[30px] pt-[155px] font-bold tracking-wider text-5xl">
                Repair Buddies
            </Animated.Text>
      </View>
      <View>
            <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-black/50 pb-[10px] pt-[1px] font-bold tracking-wider text-2xl">
                Select an Option
            </Animated.Text>
      </View>
      <ScrollView contentContainerStyle={styles.gridContainer}>
          <TouchableOpacity onPress={()=> navigation.push('Electricains')}>
            <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
                      <Text style={styles.text}>  Electrician      </Text>
              </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.push('Mehanics')}>
            <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
                    <Text style={styles.text}>    Mechanic     </Text>
            </Animated.View>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> navigation.push('Services')}>
            <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.gridItem}>
                  <Text style={styles.text}>Other Services</Text>
            </Animated.View>
          </TouchableOpacity>
      </ScrollView>
    </View>
  )
}