import { View, Text, Image, TextInput, TouchableOpacity, Alert  } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Animated,{ FadeInUp, FadeOut, FadeInDown, fadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


export default function SignUp() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validateUsername = (text) => {
        const usernameRegex = /^[A-Za-z0-9_]{4,16}$/; // Adjust regex as needed
        if (!usernameRegex.test(text)) {
        setUsernameError('Username must be alphanumeric and 4-16 characters long.');
        } else {
        setUsernameError(null); // Clear error if valid
        }
    };

    const handleUsernameChange = (text) => {
        setUsername(text);
        validateUsername(text);
    };

    const handleSignUp = () => {
        setLoading(true);
        // Check if password and confirm password match
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Password and confirm password do not match');
            return;
        }

        // Make API call to signup endpoint
        axios.post('https://backend-alpha-swart.vercel.app/api/auth/register', {
            username: username,
            email: email,
            password: password,
            confirmPassword: confirmPassword
        })
        .then(response => {
            // Handle successful signup response
            console.log('Signup successful:', response.data);
            navigation.push('Login'); // Navigate to login screen after successful signup
        })
        .catch(error => {
            // Handle error response
            console.error('Error signing up:', error);
            Alert.alert('Error', 'Failed to sign up. Please try again later.');
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


      {/* title and form */}
      <View className="h-full w-full flex justify-around pt-48">
        {/* title */}
        <View className="flex items-center">
            <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
                SignUp
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
                        onChangeText={handleUsernameChange}
                    />
                    {usernameError && <Text style={{ color: 'red' }}>{usernameError}</Text>}
                </Animated.View>

                <Animated.View 
                    entering={FadeInDown.duration(1000).springify()} 
                    className="bg-black/5 p-5 rounded-2xl w-full">
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor={'gray'}
                        value={email}
                        onChangeText={text => setEmail(text)}
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
                    entering={FadeInDown.delay(200).duration(1000).springify()} 
                    className="bg-black/5 p-5 rounded-2xl w-full mb-3">
                    <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor={'gray'}
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                    />
                </Animated.View>

                <Animated.View 
                    className="w-full" 
                    entering={FadeInDown.delay(400).duration(1000).springify()}>
                    <TouchableOpacity onPress={handleSignUp} className="w-full bg-sky-400 p-3 rounded-2xl mb-3" disabled={loading}>
                        <Text className="text-xl font-bold text-white text-center">
                            {loading ? 'Signing In...' : 'SignIn'}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    animation="fadeIn" duration={500} style={{ width: '80%' }}
                    entering={FadeInDown.delay(600).duration(1000).springify()} 
                    className="flex-row justify-center">
                    <Text>Already have an account? </Text>
                    <TouchableOpacity onPress={()=> navigation.push('Login')} >
                        <Text className="text-sky-600">SignIn</Text>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View 
                    animation="fadeIn" duration={500} style={{ width: '80%' }}
                    entering={FadeInDown.delay(600).duration(1000).springify()} 
                    className="flex-row justify-center">
                    <Text>Become a Service Provider? </Text>
                    <TouchableOpacity onPress={()=> navigation.push('ProviderSignUp')} >
                        <Text className="text-sky-600">SignUp</Text>
                    </TouchableOpacity>
                </Animated.View>
        </View>
      </View>
    </View>
  )
}