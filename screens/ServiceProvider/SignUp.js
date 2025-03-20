import { View, Text, Image, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView  } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Animated,{ FadeInUp, FadeOut, FadeInDown, fadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { CldImage } from 'cloudinary-react-native';


export default function ProviderSignUp() {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneError, setPhoneError] = useState(null);
    const [service , setService] = useState('');
    const [fullName, setFullName] = useState('');
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const cloudName = 'dffnyrdjn'; // Replace 'your_cloud_name_here' with your actual cloud name


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

    const validatePhoneNumber = (text) => {
        // Basic phone number regex (adjust as needed)
        const phoneRegex = /^\d{11}$/; // Matches exactly 11 digits
        if (!phoneRegex.test(text)) {
          setPhoneError('Please enter a valid 11-digit phone number.');
        } else {
          setPhoneError(null); // Clear error if valid
        }
      };
    
      const handlePhoneChange = (text) => {
        setPhone(text);
        validatePhoneNumber(text);
      };

      // Function to handle image selection
        const selectImage = async () => {
            let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
            }

            let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            }); 
            // console.log(result.assets.uri)
            
            if (!result.canceled && result.assets.length > 0) {
                const selectedImage = result.assets[0]; // Get the first item from the assets array
                console.log("Selected image URI:", selectedImage); // Log the URI to verify
                setImage(selectedImage); // Set the image URI
              }
        };


        const handleSignUp = async () => {
            setLoading(true);
    
            if (password !== confirmPassword) {
                Alert.alert('Error', 'Password and confirm password do not match');
                setLoading(false);
                return;
            }
    
            try {
                const formData = new FormData();
                console.log(image.uri)
                formData.append('file', {
                    uri: image.uri, // Use the URI of the selected image
                    type: 'image/jpeg', // Adjust the type as needed
                    name: 'image.jpg', // Adjust the filename as needed
                }); // Append image directly without wrapping it in an object

                formData.append('username', username);
                formData.append('fullName', fullName);
                formData.append('email', email);
                formData.append('password', password);
                formData.append('confirmPassword', confirmPassword);
                formData.append('service', service);
                formData.append('phone', phone);
                console.log('FormData:', formData);
                
                const response = await axios.post('https://backend-alpha-swart.vercel.app/api/serviceProviderAuth/register',formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                });
    
                console.log('Signup successful:', response.data);
                navigation.push('Login');
            } catch (error) {
                console.error('Error signing up:', error);
                Alert.alert('Error', 'Failed to sign up. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        formContainer: {
          width: '80%',
          paddingLeft: '10%',
          marginLeft: '5%',
        },
        inputContainer: {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: 8,
          marginBottom: 10,
        },
        input: {
          padding: 10,
          fontSize: 16,
          color: 'black',
        },
        errorText: {
          color: 'red',
        },
        button: {
          backgroundColor: '#3498db',
          paddingVertical: 12,
          borderRadius: 8,
          alignItems: 'center',
          marginBottom: 10,
        },
        buttonText: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        },
        pickerContainer: {
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          borderRadius: 8,
          marginBottom: 10,
          height: 45,
          zIndex: 1
        },
      });

  return (
    <View className="bg-white h-full w-full">
        <StatusBar style='light' />
        <Image className="h-full w-full absolute" source={require('../../assets/background.png')} />
      {/* lights */}
      <View className="flex-row justify-around w-full absolute">
        <Image className="h-[225] w-[98]" source={require('../../assets/light.png')} />
        <Image className="h-[160] w-[65]" source={require('../../assets/light.png')} />
      </View>


      {/* title and form */}
      <View className="h-full w-full flex justify-around pt-48">
        {/* title */}
        <View className="flex items-center">
            <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-white font-bold tracking-wider text-5xl">
                SignUp
            </Animated.Text>
        </View>
        <View>
            <Animated.Text entering={FadeInUp.duration(1000).springify()} className="text-black/50 pl-[40px] pb-[10px] pt-[16px] font-bold tracking-wider text-2xl">
                Become a Service Provider
            </Animated.Text>
      </View>
        {/* form */}
        <ScrollView contentContainerStyle={styles.formContainer}>
                <Animated.View entering={FadeInUp.duration(1000).springify()}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Username"
                            placeholderTextColor="gray"
                            value={username}
                            onChangeText={handleUsernameChange}
                        />
                        {usernameError && <Text style={styles.errorText}>{usernameError}</Text>}
                    </View>
                </Animated.View>

                {/* Add more input fields for other form elements */}
                {/* Full Name */}
                <Animated.View entering={FadeInUp.duration(1000).springify()}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Full Name"
                            placeholderTextColor="gray"
                            value={fullName}
                            onChangeText={text => setFullName(text)}
                        />
                    </View>
                </Animated.View>

                {/* Email */}
                <Animated.View entering={FadeInUp.duration(1000).springify()}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            placeholderTextColor="gray"
                            value={email}
                            onChangeText={text => setEmail(text)}
                        />
                    </View>
                </Animated.View>

                {/* Phone Number */}
                <Animated.View entering={FadeInUp.duration(1000).springify()}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Phone Number"
                            placeholderTextColor="gray"
                            value={phone}
                            keyboardType="phone-pad"
                            onChangeText={handlePhoneChange}
                        />
                        {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
                    </View>
                </Animated.View>

                {/* Service Picker */}
                <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.pickerContainer} >
                    <Picker
                        selectedValue={service}
                        onValueChange={(itemValue, itemIndex) => setService(itemValue)}
                    >
                        <Picker.Item label="Select a service" value=""/>
                        <Picker.Item label="Electrician" value="Electrician" />
                        <Picker.Item label="Mechanic" value="Mechanic" />
                        <Picker.Item label="Check Up" value="CheckUp" />
                        <Picker.Item label="Engine Repair" value="EngineRepair" />
                        <Picker.Item label="Tire Replacement" value="TireReplacement" />
                        <Picker.Item label="Hybrid Battery" value="HybridBattery" />
                        <Picker.Item label="Fuel Service" value="FuelService" />
                        <Picker.Item label="Towing Service" value="TowingService" />
                        <Picker.Item label="Car Wash" value="CarWash" />
                    </Picker>
                </Animated.View>

                {/* Password */}
                <Animated.View entering={FadeInUp.duration(1000).springify()}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            placeholderTextColor="gray"
                            secureTextEntry
                            value={password}
                            onChangeText={text => setPassword(text)}
                        />
                    </View>
                </Animated.View>

                {/* Confirm Password */}
                <Animated.View entering={FadeInUp.duration(1000).springify()}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            placeholderTextColor="gray"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={text => setConfirmPassword(text)}
                        />
                    </View>
                </Animated.View>

                {/* Image Upload */}
                <Animated.View entering={FadeInUp.duration(1000).springify()} style={styles.inputContainer}>
                    <TouchableOpacity style={styles.button} onPress={selectImage}>
                    <Text style={styles.buttonText}>Select Image</Text>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 100, borderRadius: 100 }} />}
                </Animated.View>

                {/* Sign Up Button */}
                <Animated.View entering={FadeInUp.duration(1000).springify()}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignUp}
                        disabled={loading}
                    >
                        <Text style={styles.buttonText}>
                            {loading ? 'Signing Up...' : 'Sign Up'}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* Already have an account */}
                <Animated.View entering={FadeInUp.duration(1000).springify()} >
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }} className='mb-9'>
                        <Text>Already have an account? </Text>
                        <TouchableOpacity onPress={() => navigation.push('Login')}>
                            <Text style={{ color: '#3498db', fontWeight: 'bold' }}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </ScrollView>
      </View>
    </View>
  )
}