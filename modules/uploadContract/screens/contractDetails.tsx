import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { styles } from "../styles/contractDetails";
import { ContractForm } from "../components/contractDetails/ContractForm";

export default function DetallesContratoScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Detalles del Contrato</Text>
        <Text style={styles.subtitle}>Paso 1 de 3</Text>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar} />
        </View>

        <Text style={styles.description}>
          Completa la información clave de tu contrato para una mejor
          organización.
        </Text>

        <ContractForm />
      </ScrollView>
    </SafeAreaView>
  );
}
