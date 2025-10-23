import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const TermsAndConditionsScreen = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = useState<string | null>(null);
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: expanded ? 1 : 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const toggleExpand = (section: string) => {
    setExpanded(expanded === section ? null : section);
  };

  const animatedStyle = {
    opacity: animation,
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [-8, 0],
        }),
      },
    ],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Ionicons name="arrow-back" size={26} color="#111827" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Términos y Condiciones</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => toggleExpand("intro")}
        >
          <Text style={styles.dropdownTitle}>1. Introducción</Text>
          <Ionicons
            name={expanded === "intro" ? "chevron-up" : "chevron-down"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
        {expanded === "intro" && (
          <Animated.View style={[animatedStyle]}>
            <Text style={styles.dropdownContent}>
              Bienvenido a <Text style={styles.bold}>LexiScan</Text>, un grupo
              especializado en tecnología legal dedicada al análisis inteligente
              de contratos.{"\n\n"}
              Al utilizar nuestra plataforma, aceptas los presentes términos y
              condiciones, cuyo propósito es garantizar transparencia, seguridad
              y confidencialidad durante todo el proceso de revisión documental.
            </Text>
          </Animated.View>
        )}

        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => toggleExpand("security")}
        >
          <Text style={styles.dropdownTitle}>2. Seguridad y Privacidad</Text>
          <Ionicons
            name={expanded === "security" ? "chevron-up" : "chevron-down"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
        {expanded === "security" && (
          <Animated.View style={[animatedStyle]}>
            <Text style={styles.dropdownContent}>
              En <Text style={styles.bold}>LexiScan</Text> utilizamos un sistema
              de inteligencia artificial que analiza los contratos de manera
              automatizada, asegurando la máxima protección de la información.
              {"\n\n"}
              Antes de cualquier procesamiento, los documentos pasan por un
              proceso de limpieza y anonimización para eliminar datos sensibles,
              garantizando que ninguna información personal quede expuesta o sea
              utilizada para otros fines.
            </Text>
          </Animated.View>
        )}

        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => toggleExpand("use")}
        >
          <Text style={styles.dropdownTitle}>3. Uso del Servicio</Text>
          <Ionicons
            name={expanded === "use" ? "chevron-up" : "chevron-down"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
        {expanded === "use" && (
          <Animated.View style={[animatedStyle]}>
            <Text style={styles.dropdownContent}>
              El servicio ofrecido por <Text style={styles.bold}>LexiScan</Text>{" "}
              tiene como objetivo facilitar la comprensión y el análisis de
              contratos mediante herramientas tecnológicas avanzadas.{"\n\n"}
              La información generada tiene carácter orientativo y no sustituye
              la asesoría jurídica profesional. El usuario es responsable de
              validar cualquier interpretación legal final.
            </Text>
          </Animated.View>
        )}

        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => toggleExpand("liability")}
        >
          <Text style={styles.dropdownTitle}>
            4. Limitación de Responsabilidad
          </Text>
          <Ionicons
            name={expanded === "liability" ? "chevron-up" : "chevron-down"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
        {expanded === "liability" && (
          <Animated.View style={[animatedStyle]}>
            <Text style={styles.dropdownContent}>
              <Text style={styles.bold}>LexiScan</Text> realiza esfuerzos
              continuos para mantener altos estándares de ciberseguridad y
              protección de datos.{"\n\n"}Sin embargo, no podemos garantizar una
              protección absoluta frente a ataques informáticos o incidentes
              externos. En caso de vulneración, notificaremos oportunamente a
              los usuarios conforme a la legislación vigente.
            </Text>
          </Animated.View>
        )}

        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => toggleExpand("changes")}
        >
          <Text style={styles.dropdownTitle}>
            5. Actualización de los Términos
          </Text>
          <Ionicons
            name={expanded === "changes" ? "chevron-up" : "chevron-down"}
            size={20}
            color="#6B7280"
          />
        </TouchableOpacity>
        {expanded === "changes" && (
          <Animated.View style={[animatedStyle]}>
            <Text style={styles.dropdownContent}>
              <Text style={styles.bold}>LexiScan</Text> se reserva el derecho de
              actualizar estos términos de manera periódica, con el fin de
              adaptarse a cambios legales, técnicos o de seguridad.{"\n\n"}
              Te recomendamos revisar esta sección regularmente para mantenerte
              informado sobre cómo protegemos tus datos y garantizamos el uso
              ético de la inteligencia artificial aplicada al ámbito legal.
            </Text>
          </Animated.View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsAndConditionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  headerWrapper: {
    marginTop: 70,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 60,
  },
  dropdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  dropdownTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#111827",
  },
  dropdownContent: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 10,
    marginBottom: 14,
    color: "#333333",
    lineHeight: 22,
  },
  bold: {
    fontWeight: "600",
    color: "#111827",
  },
});
