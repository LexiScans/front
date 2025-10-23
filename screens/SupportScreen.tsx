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
  Support: undefined;
};

const SupportScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ayuda y Soporte</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>¿Necesitas ayuda?</Text>
          <Text style={styles.text}>
            En LexiScan nos aseguramos de que tengas la mejor experiencia posible. 
            Nuestro equipo de soporte está disponible para asistirte con cualquier duda 
            o inconveniente que tengas dentro de la aplicación.
          </Text>

          <Text style={styles.sectionTitle}>Contacto</Text>
          <Text style={styles.text}>
            Para consultas, sugerencias o problemas, puedes escribirnos a:{" "}
            <Text style={styles.email}>LexiScan@gmail.com</Text>. 
            Te responderemos de manera rápida y eficiente.
          </Text>

          <Text style={styles.sectionTitle}>Compromiso</Text>
          <Text style={styles.text}>
            Nos comprometemos a brindarte soporte de calidad y a ayudarte a sacar 
            el máximo provecho de todas las funcionalidades de LexiScan, incluyendo 
            la revisión y explicación de tus contratos de manera clara y confiable.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupportScreen;

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
  email: {
    fontWeight: "700",
    color: "#0b2e42ff",
  },
});
