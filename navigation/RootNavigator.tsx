import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import PaymentMethodScreen from "../screens/PaymentMethodsScreen";
import AddPaymentMethodScreen from "../screens/AddPaymentMethodScreen";
import PrevisualizacionContrato from "../screens/PrevisualizacionContrato";
import BuySubscriptionScreen from "../screens/BuySubscriptionScreen";
import PaymentToBuyScreen from "../screens/PaymentToBuyScreen";
import PdfViewerScreen from "../screens/pdf/PdfViewerScreen";
import ContractSummaryScreen from "../screens/ContractSummaryScreen";
import ConfiguracionScreen from "../screens/ConfiguracionScreen";
import TermsAndConditionsScreen from "../screens/TermsAndConditionsScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import SupportScreen from "../screens/SupportScreen";
import DetallesContrato from "../screens/DetallesContrato";
import UploadSuccess from "../screens/UploadSuccess";

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Profile: undefined;
  PaymentMethod: undefined;
  BuySubscription: undefined;
  AddPaymentMethod: undefined;
  PaymentToBuy: undefined;
  PdfViewer: undefined;
  ContractSummary: undefined;
  Configuracion: undefined;
  TermsAndConditions: undefined;
  EditProfile: undefined;
  PrivacyPolicy: undefined;
  Support: undefined;
  DetallesContrato: undefined;
  PrevisualizacionContrato: undefined;
  UploadSuccess: undefined;
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
        <Stack.Screen name="PaymentToBuy" component={PaymentToBuyScreen} />
        <Stack.Screen name="PaymentMethod" component={PaymentMethodScreen} />
        <Stack.Screen name="BuySubscription" component={BuySubscriptionScreen} />
        <Stack.Screen name="AddPaymentMethod" component={AddPaymentMethodScreen}/>
        <Stack.Screen name="DetallesContrato" component={DetallesContrato} />
        <Stack.Screen name="PdfViewer" component={PdfViewerScreen} />
        <Stack.Screen name="ContractSummary" component={ContractSummaryScreen} />
        <Stack.Screen name="Configuracion" component={ConfiguracionScreen} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen}/>
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
        <Stack.Screen name="Support" component={SupportScreen} />
        <Stack.Screen name="PrevisualizacionContrato" component={PrevisualizacionContrato} />
        <Stack.Screen name="UploadSuccess" component={UploadSuccess} />
      </Stack.Navigator>
  );
}