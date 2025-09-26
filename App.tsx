import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <NavigationContainer>
      <StripeProvider publishableKey="p">
        <RootNavigator />
      </StripeProvider>
    </NavigationContainer>
  );
}
