import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ProgressBar from "react-native-progress/Bar";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ChatAssistantModal from "../../../components/ChatAssistantModal";

const { width } = Dimensions.get("window");

const ContractSummaryScreen = () => {
  const navigation = useNavigation();
  const [expandedSections, setExpandedSections] = useState({
    explicacion: true,
    beneficios: false,
    clausulas: false,
    riesgos: false,
  });
  const [chatVisible, setChatVisible] = useState(false);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={28} color="#1E88E5" />
            </TouchableOpacity>
            <Text style={styles.title}>Resumen del Contrato</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.subtitle}>
              Contrato de Prestación de Servicios
            </Text>
            <View style={styles.progressContainer}>
              <ProgressBar
                progress={0.85}
                width={null}
                color="#4CAF50"
                unfilledColor="#E0E0E0"
                height={8}
              />
              <View style={styles.progressLabels}>
                <Text style={styles.riskText}>Riesgo Bajo</Text>
                <Text style={styles.legibilityText}>Legibilidad: 85/100</Text>
              </View>
            </View>
          </View>

          {[
            {
              key: "explicacion",
              title: "Explicación General",
              color: "#1E88E5",
              icon: "analytics",
              content:
                "Este contrato tiene condiciones equilibradas y de riesgo bajo. Se recomienda atención a cláusulas de propiedad intelectual y confidencialidad.",
            },
            {
              key: "beneficios",
              title: "Beneficios",
              color: "#4CAF50",
              icon: "checkmark-circle",
              content: [
                "Pago mensual fijo garantizado según entregables definidos.",
                "Flexibilidad en horarios y métodos de trabajo.",
                "Propiedad intelectual compartida entre ambas partes.",
              ],
            },
            {
              key: "clausulas",
              title: "Cláusulas Importantes",
              color: "#1E88E5",
              icon: "document-text",
              content: [
                "Confidencialidad: ninguna información del cliente podrá ser divulgada.",
                "Terminación: requiere aviso con 30 días de antelación.",
                "Propiedad intelectual: el código fuente entregado será propiedad del cliente.",
              ],
            },
            {
              key: "riesgos",
              title: "Riesgos Potenciales",
              color: "#F44336",
              icon: "warning",
              content: [
                "Retrasos de pago si los informes no se entregan a tiempo.",
                "Falta de claridad en entregables podría generar malentendidos.",
                "Dependencia alta de la disponibilidad del contratista.",
              ],
            },
          ].map((section) => (
            <View key={section.key} style={styles.section}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.key)}
              >
                <Text style={styles.sectionTitle}>{section.title}</Text>
                <Ionicons
                  name={
                    expandedSections[section.key]
                      ? "chevron-up-outline"
                      : "chevron-down-outline"
                  }
                  size={22}
                  color="#555"
                />
              </TouchableOpacity>

              {expandedSections[section.key] && (
                <View style={styles.sectionContent}>
                  {Array.isArray(section.content) ? (
                    section.content.map((item, index) => (
                      <View key={index} style={styles.cardItem}>
                        <Ionicons
                          name={section.icon}
                          size={22}
                          color={section.color}
                        />
                        <Text style={styles.cardItemText}>{item}</Text>
                      </View>
                    ))
                  ) : (
                    <View style={styles.cardItem}>
                      <Ionicons
                        name={section.icon}
                        size={24}
                        color={section.color}
                      />
                      <Text style={styles.cardItemText}>{section.content}</Text>
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}

          <View style={{ height: 140 }} />
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.footerButton, { backgroundColor: "#1E88E5" }]}
            onPress={() => navigation.navigate("PdfViewer")}
          >
            <Ionicons name="document-text" size={20} color="#fff" />
            <Text style={styles.footerButtonText}>Proceso de Firma</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.footerButton, { backgroundColor: "#1565C0" }]}
            onPress={() => setChatVisible(true)}
          >
            <Ionicons name="chatbubbles" size={20} color="#fff" />
            <Text style={styles.footerButtonText}>Pregunta</Text>
          </TouchableOpacity>
        </View>

        <ChatAssistantModal
          visible={chatVisible}
          onClose={() => setChatVisible(false)}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 160,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    marginRight: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1E293B",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginBottom: 10,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  riskText: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  legibilityText: {
    color: "#6B7280",
  },
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1E293B",
  },
  sectionContent: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  cardItemText: {
    flex: 1,
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  footerButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 30,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  footerButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ContractSummaryScreen;
