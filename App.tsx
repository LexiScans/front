import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./app/navigation/RootNavigator";
import StripeWrapper from "./adapter/StripeProviderWrapper";

export default function App() {
  return (
    <NavigationContainer>
      <StripeWrapper>
        <RootNavigator />
      </StripeWrapper>
    </NavigationContainer>
  );
}
