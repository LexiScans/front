import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import PaymentMethodScreen from "../screens/PaymentMethodsScreen";
import AddPaymentMethodScreen from "../screens/AddPaymentMethodScreen";
import BuySubscriptionScreen from "../screens/BuySubscriptionScreen";

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Profile: undefined;
  PaymentMethod: undefined;
  BuySubscription: undefined;
  AddPaymentMethod: undefined; 
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
      <Stack.Screen name="BuySubscription" component={BuySubscriptionScreen} />
      <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen}
      />
    </Stack.Navigator>
  );
}
