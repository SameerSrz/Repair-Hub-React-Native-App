import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/Login';
import SignUp from './screens/SignUp';
import CarManufacturer from './screens/CarManufacturer';
import Selection from './screens/Selection';
import Services from './screens/Services';
import Electricains from './screens/Electricains';
import Mehanics from './screens/Mehanics';
import ProfileScreen from './screens/ProfileScreen';
// import Dashboard from './screens/ServiceProvider/Dashboard'
import ProviderSignUp from './screens/ServiceProvider/SignUp';
import ServiceProviderDashboard from './screens/ServiceProvider/ServiceProviderDashboard';
import ServiceProvider from './screens/ServiceProvider';
import PaymentScreen from './screens/PaymentScreen';
import { StripeProvider } from '@stripe/stripe-react-native';
import FeedbackScreen from './screens/FeedbackScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <StripeProvider publishableKey="pk_test_51KrXtbHLo4sgkNKUPLYpNdHSascpmf24GyDt5oeOSwbkGEtVRY9VSci1UZ4zv2GgyUfLD57oKEUI4vSe9AE3Iakd00hI2c5xul">
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="ProviderSignUp" component={ProviderSignUp} />
          <Stack.Screen name="Dashboard" component={ServiceProviderDashboard} />
          <Stack.Screen name="CarManufacturer" component={CarManufacturer} />
          <Stack.Screen name="Selection" component={Selection} />
          <Stack.Screen name="Services" component={Services} />
          <Stack.Screen name="Electricains" component={Electricains} />
          <Stack.Screen name="Mehanics" component={Mehanics} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="ServiceProvider" component={ServiceProvider} />
          <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
          <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}

export default App;