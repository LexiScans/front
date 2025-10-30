import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = { onPress: () => void };

const BotonCancelar = ({ onPress }: Props) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Ionicons name="close-circle-outline" size={20} color="white" />
    <Text style={styles.text}>Cancelar suscripción</Text>
  </TouchableOpacity>
);

export default BotonCancelar;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#EF4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 12,
  },
  text: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
