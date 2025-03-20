import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, Alert, StyleSheet, Linking } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const route = useRoute();
    const { data } = route.params;
    const navigation = useNavigation();
    console.log(data);

    const renderFeedbackItem = ({ item }) => (
        <View style={styles.feedbackItem}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.comment}>{item.comment}</Text>
            <Text style={styles.rating}>Rating: {item.rating}</Text>
        </View>
    );

    const handleContact = (fullName, phone) => {
        Alert.alert(
            `Contact ${fullName}`,
            'Choose an option:',
            [
                {
                    text: 'Send Message',
                    onPress: () => {
                        console.log(`Sending message to ${fullName}`);
                        Linking.openURL(`sms:${phone}`);
                    }
                },
                {
                    text: 'Call',
                    onPress: () => {
                        console.log(`Calling ${fullName}`);
                        Linking.openURL(`tel:${phone}`);
                    }
                },
                {
                    text: 'WhatsApp',
                    onPress: () => {
                        console.log(`Opening WhatsApp chat with ${fullName}`);
                        Linking.openURL(`whatsapp://send?phone=${phone}`);
                    }
                },
                {
                    text: 'Cancel',
                    style: 'cancel'
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <View style={styles.container}>
            <Image style={styles.backgroundImage} source={require('../assets/background.png')} />
            <View style={styles.content}>
                <Image source={{ uri: data.avatar.url }} style={styles.profilePic} />
                <Text style={styles.name}>{data.fullName}</Text>
                <Text style={styles.status}>{data.isOnline ? 'Online' : 'Offline'}</Text>
                <Text style={styles.rating}>Rating: {data.feedback[0]?.rating || 'No rating'}</Text>

                <Text style={styles.sectionTitle}>Feedback</Text>
                <FlatList
                    data={data.feedback}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={renderFeedbackItem}
                    style={styles.feedbackList}
                />

                <TouchableOpacity
                    onPress={() => handleContact(data.fullName, data.phone)}
                    style={styles.contactButton}>
                    <Text style={styles.buttonText}>Contact {data.role}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate('PaymentScreen', { providerId: data._id, providerName: data.fullName })}
                    style={styles.paymentButton}>
                    <Text style={styles.buttonText}>Make a Payment</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f8f8',
    },
    backgroundImage: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    content: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
        // backgroundColor: 'rgba(248, 248, 248, 0.8)',
        borderRadius: 10,
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    status: {
        color: '#27ae60',
        marginBottom: 10,
    },
    rating: {
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 15,
    },
    feedbackList: {
        width: '100%',
    },
    feedbackItem: {
        marginBottom: 15,
        padding: 10,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 3,
    },
    username: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    comment: {
        marginBottom: 5,
    },
    contactButton: {
        marginTop: 20,
        backgroundColor: '#3498db',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    paymentButton: {
        marginTop: 20,
        backgroundColor: '#e67e22',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
