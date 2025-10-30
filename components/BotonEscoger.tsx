import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = { onPress: () => void };

const BotonEscoger = ({ onPress }: Props) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.text}>Obtener plan</Text>
  </TouchableOpacity>
);

export default BotonEscoger;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#0b2e42ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
