import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../../modules/auth/login/screens/LoginScreen";
import HomeScreen from "../../modules/landingPage/screens/HomeScreen";
import RegisterScreen from "../../modules/auth/register/screens/RegisterScreen";
import ProfileScreen from "../../modules/profile/screens/ProfileScreen";
import WelcomeScreen from "../../modules/landingPage/screens/WelcomeScreen";
import PaymentMethodScreen from "../../modules/payment/paymentMethods/screens/PaymentMethodsScreen";
import AddPaymentMethodScreen from "../../modules/payment/addpayment/screens/AddPaymentMethodScreen.native";
import PrevisualizacionContrato from "../../modules/uploadContract/screens/PrevisualizacionContrato";
import BuySubscriptionScreen from "../../modules/payment/buypayment/screens/BuySubscriptionScreen";
import PaymentToBuyScreen from "../../modules/payment/buypayment/screens/PaymentToBuyScreen";
import PdfViewerScreen from "../../modules/pdf/screen/PdfViewerScreen";
import ContractSummaryScreen from "../../modules/contracts/screens/ContractSummaryScreen";
import ConfiguracionScreen from "../../modules/settings/screens/ConfiguracionScreen";
import TermsAndConditionsScreen from "../../modules/settings/screens/TermsAndConditionsScreen";
import EditProfileScreen from "../../modules/settings/screens/EditProfileScreen";
import PrivacyPolicyScreen from "../../modules/settings/screens/PrivacyPolicyScreen";
import SupportScreen from "../../modules/settings/screens/SupportScreen";
import DetallesContrato from "../../modules/uploadContract/screens/DetallesContrato";
import UploadSuccess from "../../modules/uploadContract/screens/UploadSuccess";

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
      <Stack.Screen
        name="AddPaymentMethod"
        component={AddPaymentMethodScreen}
      />
      <Stack.Screen name="DetallesContrato" component={DetallesContrato} />
      <Stack.Screen name="PdfViewer" component={PdfViewerScreen} />
      <Stack.Screen name="ContractSummary" component={ContractSummaryScreen} />
      <Stack.Screen name="Configuracion" component={ConfiguracionScreen} />
      <Stack.Screen
        name="TermsAndConditions"
        component={TermsAndConditionsScreen}
      />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen
        name="PrevisualizacionContrato"
        component={PrevisualizacionContrato}
      />
      <Stack.Screen name="UploadSuccess" component={UploadSuccess} />
    </Stack.Navigator>
  );
}
