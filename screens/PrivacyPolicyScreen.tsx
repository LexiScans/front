import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

const PrivacyPolicyScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Política de Privacidad</Text>
      <Text style={styles.text}>
        Esta aplicación respeta tu privacidad. Toda la información personal que
        ingreses será protegida y utilizada únicamente para mejorar tu
        experiencia dentro de la aplicación.
      </Text>
      <Text style={styles.text}>
        Al utilizar nuestros servicios, aceptas los términos de esta política y
        consientes el tratamiento de tus datos según lo indicado.
      </Text>
      <Text style={styles.text}>
        Para más información, contáctanos a nuestro correo de soporte.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    alignSelf: "center",
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
});

export default PrivacyPolicyScreen;
