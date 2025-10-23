import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const ConfiguracionScreen = () => {
  const navigation = useNavigation();
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [language, setLanguage] = useState("español");

  const handleTermsAndConditions = () => {
    navigation.navigate("TermsAndConditions" as never);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
            <Ionicons name="arrow-back" size={24} color="#6B7280" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Configuración</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perfil</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="person-outline" size={22} color="#6B7280" />
              <Text style={styles.menuItemText}>Editor Perfil</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notificaciones</Text>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#6B7280"
              />
              <Text style={styles.menuItemText}>Notificaciones Push</Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: "#D1D5DB", true: "#6fa7c7ff" }}
              thumbColor={pushNotifications ? "#ffffff" : "#f4f3f4"}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Seguridad</Text>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color="#6B7280"
              />
              <Text style={styles.menuItemText}>
                Autenticación de dos factores
              </Text>
            </View>
            <Switch
              value={twoFactorAuth}
              onValueChange={setTwoFactorAuth}
              trackColor={{ false: "#D1D5DB", true: "#6fa7c7ff" }}
              thumbColor={twoFactorAuth ? "#ffffff" : "#f4f3f4"}
            />
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="key-outline" size={22} color="#6B7280" />
              <Text style={styles.menuItemText}>Cambiar PIN</Text>
            </View>
            <Ionicons name="checkmark" size={20} color="#10B981" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="language-outline" size={22} color="#6B7280" />
              <Text style={styles.menuItemText}>Idioma</Text>
            </View>
            <View style={styles.languageSection}>
              <Text style={styles.languageText}>Español</Text>
              <Ionicons name="chevron-down" size={16} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleTermsAndConditions}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="document-text-outline"
                size={22}
                color="#6B7280"
              />
              <Text style={styles.menuItemText}>Términos y condiciones</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons name="lock-closed-outline" size={22} color="#6B7280" />
              <Text style={styles.menuItemText}>Política de privacidad</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfiguracionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#1F2937",
  },
  placeholder: {
    width: 40,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
    paddingLeft: 4,
  },
  menuItem: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
    color: "#111827",
    marginLeft: 12,
    flex: 1,
  },
  languageSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  languageText: {
    fontSize: 14,
    color: "#6B7280",
    marginRight: 8,
  },
});
