import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BottomNav from "../components/BottomNav";
import { Ionicons } from "@expo/vector-icons";
import BotonEscoger from "../components/BotonEscoger";
import BotonCancelar from "../components/BotonCancelar";
import BotonMejorarPlan from "../components/BotonMejorarPlan";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Profile: undefined;
  BuySubscription: undefined;
  PaymentMethod: undefined;
  Configuracion: undefined;
  TermsAndConditions: undefined;
  Support: undefined;
};

type UserData = {
  name: string;
  email: string;
  suscription?: {
    type: string;
    price: string;
    creationDate: string;
    endDate: string;
    ncontracts: number;
    nquestions: number;
  };
  profileImage?: string;
};

const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const userId = "45224151-7b09-45ff-835b-413062c2e815";

  useEffect(() => {
    fetch(`http://10.0.2.2:8080/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => navigation.navigate("Login");
  const handlePayment = () => navigation.navigate("PaymentMethod");
  const handleBuyPlan = () => navigation.navigate("BuySubscription");
  const handleConfiguracion = () => navigation.navigate("Configuracion");

  const handleCancelSubscription = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:8080/users/${userId}/subscription`,
        { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error al cancelar suscripción");
      Alert.alert("Éxito", "Tu suscripción ha sido cancelada");
      setUser({ ...user!, suscription: undefined });
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  const confirmCancel = () => {
    Alert.alert(
      "Cancelar suscripción",
      "¿Estás seguro de que quieres cancelar tu suscripción?",
      [
        { text: "No", style: "cancel" },
        {
          text: "Sí, cancelar",
          style: "destructive",
          onPress: handleCancelSubscription,
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#6fa7c7ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mi Cuenta</Text>
          <TouchableOpacity
            style={styles.configButton}
            onPress={handleConfiguracion}
          >
            <Ionicons name="settings-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            {user?.profileImage ? (
              <Image
                source={{ uri: user.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.profileIcon}>
                <Ionicons name="person" size={40} color="#6fa7c7ff" />
              </View>
            )}
            <View style={styles.userDetails}>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Métodos de Pago</Text>
          <TouchableOpacity style={styles.paymentCard} onPress={handlePayment}>
            <Ionicons name="card-outline" size={24} color="#6fa7c7ff" />
            <Text style={styles.paymentText}>Gestionar métodos de pago</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu Plan Actual</Text>
          <View style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planName}>
                {user?.suscription?.type || "Plan Gratis"}
              </Text>
              <TouchableOpacity style={styles.manageButton}>
                <Text style={styles.manageButtonText}>Gestionar Plan</Text>
              </TouchableOpacity>
            </View>

            {user?.suscription ? (
              <>
                <Text style={styles.planPrice}>{user.suscription.price}</Text>
                <Text style={styles.planDetails}>
                  Válido hasta: {user.suscription.endDate}
                </Text>
                <Text style={styles.planDetails}>
                  Contratos restantes: {user.suscription.ncontracts}
                </Text>
                <Text style={styles.planDetails}>
                  Preguntas restantes: {user.suscription.nquestions}
                </Text>
                <View style={styles.planActions}>
                  <BotonCancelar onPress={confirmCancel} />
                  <BotonMejorarPlan
                    currentPlan={user.suscription.type}
                    onPress={() => navigation.navigate("BuySubscription")}
                  />
                </View>
              </>
            ) : (
              <>
                <Text style={styles.planPrice}>Gratis</Text>
                <Text style={styles.planDetails}>
                  Funcionalidades básicas incluidas
                </Text>
                <BotonEscoger onPress={handleBuyPlan} />
              </>
            )}
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#6B7280"
              />
              <Text style={styles.menuItemText}>Notificaciones</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: "#D1D5DB", true: "#6fa7c7ff" }}
              thumbColor={notificationsEnabled ? "#ffffff" : "#f4f3f4"}
            />
          </View>

          {/* Botón actualizado de Ayuda y Soporte */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("Support")}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="help-circle-outline" size={22} color="#6B7280" />
              <Text style={styles.menuItemText}>Ayuda y Soporte</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={handleLogout}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name="log-out-outline" size={22} color="#EF4444" />
              <Text style={[styles.menuItemText, styles.logoutText]}>
                Cerrar Sesión
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      <BottomNav onPressCentral={() => {}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#1F2937" },
  configButton: { padding: 8 },
  userCard: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 15,
    marginTop: 20,
  },
  userInfo: { flexDirection: "row", alignItems: "center" },
  profileImage: { width: 60, height: 60, borderRadius: 30 },
  profileIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
  },
  userDetails: { marginLeft: 15 },
  userName: { fontSize: 18, fontWeight: "600", color: "#111827" },
  userEmail: { fontSize: 14, color: "#6B7280" },
  section: { marginTop: 30 },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#374151",
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 10,
    justifyContent: "space-between",
  },
  paymentText: { flex: 1, marginLeft: 10, color: "#1F2937", fontSize: 15 },
  planCard: { backgroundColor: "#F9FAFB", padding: 15, borderRadius: 12 },
  planHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  planName: { fontSize: 16, fontWeight: "700", color: "#111827" },
  manageButton: { backgroundColor: "#E5E7EB", padding: 6, borderRadius: 6 },
  manageButtonText: { color: "#374151", fontSize: 13 },
  planPrice: { fontSize: 16, color: "#4B5563", marginTop: 5 },
  planDetails: { fontSize: 14, color: "#6B7280", marginTop: 3 },
  planActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  menuItemLeft: { flexDirection: "row", alignItems: "center" },
  menuItemText: { fontSize: 15, marginLeft: 10, color: "#374151" },
  logoutItem: { marginTop: 10 },
  logoutText: { color: "#EF4444" },
  bottomSpacer: {
    height: 30,
  },
});

export default ProfileScreen;
