import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51SBgrABx5iKvKeWK6qD7vhhc2c2hFgISRx2aLA5wD1BVB5Yr3UWBrbws9enAgsDiNWVott00OIzupwR3D077P7oe00ArhBsBAa"
);

const StripeWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Elements stripe={stripePromise}>{children}</Elements>
);

export default StripeWrapper;
