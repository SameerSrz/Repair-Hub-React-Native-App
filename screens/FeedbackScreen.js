import React, { useState } from 'react';
import { View, Text, TextInput, Alert, Image, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function FeedbackScreen({ route }) {
    const { providerId, providerName } = route.params;
    const [username, setUsername] = useState('');
    const [feedback, setFeedback] = useState('');
    const [rating, setRating] = useState('');
    const navigation = useNavigation();

    const handleSubmitFeedback = async () => {
        if (!username || !feedback || !rating) {
            Alert.alert('Error', 'Please provide your name, feedback, and rating.');
            return;
        }

        try {
            await axios.post('https://backend-alpha-swart.vercel.app/api/serviceProviderAuth/submit-feedback', {
                providerId,
                username,
                feedback,
                rating: parseInt(rating),
            });
            Alert.alert('Thank you!', 'Your feedback has been submitted.');
            navigation.navigate('CarManufacturer');
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to submit feedback. Please try again.');
        }
    };

    return (
        <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Image source={require('../assets/appIcon.png')} style={styles.profilePic} />
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>Feedback for {providerName}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        value={username}
                        onChangeText={setUsername}
                    />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Enter your feedback"
                        value={feedback}
                        onChangeText={setFeedback}
                        multiline
                        numberOfLines={4}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter rating (1-5)"
                        keyboardType="numeric"
                        value={rating}
                        onChangeText={setRating}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmitFeedback}>
                        <Text style={styles.buttonText}>Submit Feedback</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 20,
        // backgroundColor: 'rgba(248, 249, 250, 0.8)', // Semi-transparent background
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#343a40',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        fontSize: 16, // Font size for input text
    },
    textArea: {
        height: 100, // Height for multiline input
        textAlignVertical: 'top', // Align text to the top for multiline input
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
