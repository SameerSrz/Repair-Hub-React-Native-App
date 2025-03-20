import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { CardField, useStripe } from '@stripe/stripe-react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function PaymentScreen({ route }) {
    const { providerId, providerName } = route.params;
    const [amount, setAmount] = useState('');
    const { confirmPayment } = useStripe();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const handlePayPress = async () => {
        setLoading(true);
        try {
            const response = await axios.post('https://backend-alpha-swart.vercel.app/api/payment/create-payment-intent', {
                amount: parseInt(amount) * 100, // Convert to cents
            });
            const { clientSecret } = response.data;

            const { paymentIntent, error } = await confirmPayment(clientSecret, {
                paymentMethodType: 'Card',
                paymentMethodData: {
                    billingDetails: {
                        // Add your customer's billing details here
                    },
                },
            });

            if (error) {
                setError(error.message);
            } else if (paymentIntent) {
                Alert.alert('Payment successful!', `You have successfully paid PKR ${amount} to ${providerName}`);
                navigation.navigate('FeedbackScreen', { providerId, providerName });
                // Here you can handle any post-payment processing like updating provider or user information
            }
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <ImageBackground source={require('../assets/background.png')} style={styles.backgroundImage}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <Image source={require('../assets/appIcon.png')} style={styles.profilePic} />
                    <View style={styles.paymentContainer}>
                        <Text style={styles.title}>Payment to {providerName}</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter amount"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={setAmount}
                        />
                        <CardField
                            postalCodeEnabled={true}
                            placeholder={{
                                number: '4242 4242 4242 4242',
                            }}
                            cardStyle={styles.card}
                            style={styles.cardContainer}
                        />
                        {error && <Text style={styles.error}>{error}</Text>}
                        <TouchableOpacity
                            onPress={handlePayPress}
                            style={[styles.payButton, loading && styles.disabledButton]}
                            disabled={loading}>
                            <Text style={styles.buttonText}>Pay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    container: {
        width: '100%',
        maxWidth: 400,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    paymentContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#343a40',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 50,
        borderColor: '#ced4da',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        backgroundColor: '#ffffff',
        fontSize: 16,
        marginBottom: 20,
    },
    card: {
        backgroundColor: '#ffffff',
        textColor: '#000000',
        borderRadius: 8,
    },
    cardContainer: {
        width: '100%',
        height: 50,
        marginVertical: 20,
        borderWidth: 1,
        borderColor: '#ced4da',
        borderRadius: 8,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
        justifyContent: 'center',
    },
    error: {
        color: 'red',
        marginVertical: 10,
        textAlign: 'center',
    },
    payButton: {
        width: '100%',
        backgroundColor: '#007bff',
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    disabledButton: {
        backgroundColor: '#6c757d',
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
