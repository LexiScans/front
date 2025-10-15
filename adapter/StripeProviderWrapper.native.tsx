import React from "react";
import { StripeProvider } from "@stripe/stripe-react-native";

const StripeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StripeProvider publishableKey="pk_test_51SBgrABx5iKvKeWK6qD7vhhc2c2hFgISRx2aLA5wD1BVB5Yr3UWBrbws9enAgsDiNWVott00OIzupwR3D077P7oe00ArhBsBAa">
    {children}
  </StripeProvider>
);

export default StripeWrapper;
