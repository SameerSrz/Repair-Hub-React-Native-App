import { View, Text, Image, TextInput, TouchableOpacity, Alert  } from 'react-native'
import React, { useRef, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Animated,{ FadeInUp, FadeOut, FadeInDown, fadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Notification from './Notification'
// import * as Animatable from 'react-native-animatable';


export default function Login() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [notification, setNotification] = useState(null);

    // Function to hide notification
    const hideNotification = () => {
        setNotification(null);
    };

    

    const handleLogin = () => {
        setLoading(true);

        // Make API call to signup endpoint
        axios.post('https://backend-alpha-swart.vercel.app/api/auth/login', {
            username: username,
            password: password,
        })
        .then(response => {
            // Handle successful signup response
            console.log('Signup successful:', response.data);
            const { data: { user: { role } } } = response.data;
            if(role !== 'user'){
                navigation.push('Dashboard',{ data: response.data });
            }else{
                navigation.push('CarManufacturer',{ user: response.data }); 
            }
            setNotification({ message: 'Login successful', type: 'success' });
        })
        .catch(error => {
            // Handle error response
            console.error('Error signing up:', error.message);
            setNotification({ message: error.message, type: 'failed' });
            // Alert.alert(error);
            
        }).finally(() => {
            setLoading(false);
        });
    };

  return (
    <View className="bg-white h-full w-full">
        <StatusBar style='light' />
        
        <Image className="h-full w-full absolute" source={require('../assets/background.png')} />
      {/* lights */}
      <View className="flex-row justify-around w-full absolute">
        <Image className="h-[225] w-[98]" source={require('../assets/light.png')} />
        <Image className="h-[160] w-[65]" source={require('../assets/light.png')} />
      </View>

      {notification !== null && (
        <Notification message={notification.message} type={notification.type} onHide={hideNotification}/>
      )}
      {/* title and form */}
      <View className="h-full w-full flex justify-around pt-40 pb-20">
        {/* title */}
        <View className="flex items-center">
            <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
                Login
            </Animated.Text>
        </View>
        {/* form */}
        <View className="flex items-center mx-4 space-y-2 pb-12">
            <Animated.View 
                entering={FadeInDown.duration(1000).springify()} 
                className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor={'gray'}
                        value={username}
                        onChangeText={text => setUsername(text)}
                    />
                </Animated.View>
                <Animated.View 
                    entering={FadeInDown.delay(200).duration(1000).springify()} 
                    className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                    <TextInput
                        placeholder="Password"
                        placeholderTextColor={'gray'}
                        secureTextEntry
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                </Animated.View>

                <Animated.View 
                    animation="fadeIn" duration={500} style={{ width: '80%' }}
                    className="w-full" 
                    entering={FadeInDown.delay(400).duration(1000).springify()}>
                    <TouchableOpacity onPress={handleLogin} className="w-full bg-sky-400 p-3 rounded-2xl mb-3" disabled={loading}>
                        <Text className="text-xl font-bold text-white text-center">
                        {loading ? 'Logging In...' : 'Login'}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.delay(600).duration(1000).springify()} 
                    className="flex-row justify-center">
                    <Text>Don't have an account? </Text>
                    <TouchableOpacity onPress={()=> navigation.push('Signup')}>
                        <Text className="text-sky-600">SignUp</Text>
                    </TouchableOpacity>
                </Animated.View>
                {/* <Animatable.View animation="fadeIn" duration={500} style={{ width: '80%' }}>
                <TouchableOpacity
                    onPress={handleLogin}
                    style={{
                        backgroundColor: 'blue',
                        paddingVertical: 12,
                        paddingHorizontal: 24,
                        borderRadius: 8,
                        alignItems: 'center'
                    }}
                    disabled={loading}
                >
                    <Text style={{ color: 'white', fontSize: 16 }}>
                        {loading ? 'Logging In...' : 'Login'}
                    </Text>
                </TouchableOpacity>
            </Animatable.View> */}
        </View>
      </View>
    </View>
  )
}