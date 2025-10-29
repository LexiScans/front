import React from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";

const AddPaymentMethodScreen = () => {
  return (
    <SafeAreaView style={styles.webContainer}>
      <Text style={styles.title}>Agregar nuevo método de pago</Text>
      <Text style={styles.subtitle}>
        En la versión web, Stripe nativo no está disponible todavía.
      </Text>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#9CA3AF" }]}
        onPress={() => Alert.alert("Función no disponible", "Esta función solo está en móvil.")}
      >
        <Text style={styles.buttonText}>Función no disponible</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AddPaymentMethodScreen;

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center", marginBottom: 6 },
  subtitle: { fontSize: 16, color: "#6B7280", textAlign: "center", marginBottom: 20 },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
