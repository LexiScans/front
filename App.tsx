import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./navigation/RootNavigator";
import { StripeProvider } from "@stripe/stripe-react-native";

export default function App() {
  return (
    <NavigationContainer>
      <StripeProvider publishableKey="pk_test_51SBgrABx5iKvKeWK6qD7vhhc2c2hFgISRx2aLA5wD1BVB5Yr3UWBrbws9enAgsDiNWVott00OIzupwR3D077P7oe00ArhBsBAa">
        <RootNavigator />
      </StripeProvider>
    </NavigationContainer>
  );
}
