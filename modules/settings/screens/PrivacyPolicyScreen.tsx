import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Configuracion: undefined;
  PrivacyPolicy: undefined;
};

const PrivacyPolicyScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Política de Privacidad</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Contenido */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Protección de tus datos</Text>
          <Text style={styles.text}>
            En nuestra aplicación, tu privacidad es nuestra máxima prioridad.
            Toda la información que proporciones será utilizada exclusivamente
            para analizar tus contratos y ofrecerte un resumen legal claro y
            preciso.
          </Text>

          <Text style={styles.sectionTitle}>Uso de la información</Text>
          <Text style={styles.text}>
            Los datos que subas, incluyendo tus documentos y contratos, se
            almacenan de manera segura y se utilizan únicamente para procesar
            análisis legales dentro de la aplicación. No compartimos tus datos
            con terceros sin tu consentimiento explícito.
          </Text>

          <Text style={styles.sectionTitle}>Consentimiento</Text>
          <Text style={styles.text}>
            Al utilizar nuestros servicios, aceptas que podamos procesar tus
            documentos y datos personales con el fin de generar análisis
            legales, explicarte los términos y permitir la firma digital de tus
            contratos.
          </Text>

          <Text style={styles.sectionTitle}>Seguridad</Text>
          <Text style={styles.text}>
            Implementamos medidas de seguridad avanzadas para proteger la
            confidencialidad, integridad y disponibilidad de tus datos. Toda
            comunicación está encriptada y los documentos se almacenan de manera
            segura en nuestros servidores.
          </Text>

          <Text style={styles.sectionTitle}>Contacto</Text>
          <Text style={styles.text}>
            Para cualquier consulta relacionada con privacidad o uso de datos,
            contáctanos en soporte@tustartuplegal.com. Nos comprometemos a
            responder tus solicitudes de manera rápida y transparente.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60, 
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },
  content: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
  },
});
