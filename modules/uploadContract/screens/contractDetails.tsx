import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import { styles } from "../styles/contractDetails";
import { ContractForm } from "../components/contractDetails/ContractForm";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  ContractSummary: undefined;
  DetallesContrato: { fileUri?: string; fileName?: string };
};

type Props = NativeStackScreenProps<RootStackParamList, "DetallesContrato">;

export default function DetallesContratoScreen({ route }: Props) {
  const { fileUri, fileName } = route.params || {};

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

        <ContractForm fileUri={fileUri} fileName={fileName} />
      </ScrollView>
    </SafeAreaView>
  );
}
