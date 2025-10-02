import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import BottomNav from "../components/BottomNav";
import { Ionicons } from "@expo/vector-icons";
import BotonEscoger from "../components/BotonEscoger";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Profile: undefined;
  BuySubscription: undefined;
  PaymentMethod: undefined;
};

const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handlePayment = () => {
    navigation.navigate("PaymentMethod");
  };

  const handleBuyPlan = () => {
    navigation.navigate("BuySubscription");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 200 }}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Mi Perfil</Text>
          </View>
          <Ionicons name="person-circle-outline" size={60} color="#111827" />
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>Santiago Coronado</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>santiago@email.com</Text>
        </View>

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Métodos de pago</Text>
          <Text style={styles.sectionSubtitle}>
            Gestiona tus tarjetas y selecciona la preferida para tu suscripción
          </Text>
          <TouchableOpacity style={styles.paymentBtn} onPress={handlePayment}>
            <Ionicons name="card-outline" size={20} color="white" />
            <Text style={styles.paymentText}>Gestionar métodos de pago</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.subscriptionCard}>
          <Ionicons name="star-outline" size={28} color="white" />
          <Text style={styles.planTitle}>Tu plan:</Text>
          <Text style={styles.planTitle}>Gratis</Text>
          <BotonEscoger onPress={handleBuyPlan} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <View style={styles.logoutContent}>
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </View>
        </TouchableOpacity>
      </View>

      <BottomNav onPressCentral={() => {}} />
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  subscriptionCard: {
    backgroundColor: "#6fa7c7ff",
    borderRadius: 16,
    padding: 20,
    marginVertical: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  planTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    marginTop: 8,
  },
  planPeriod: {
    fontSize: 14,
    color: "white",
    marginVertical: 4,
  },
  planDescription: {
    fontSize: 14,
    color: "white",
    marginTop: 8,
    lineHeight: 20,
  },
  paymentSection: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
  },
  paymentBtn: {
    backgroundColor: "#6fa7c7ff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 10,
  },
  paymentText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  footer: {
    position: "absolute",
    bottom: 120,
    left: 20,
    right: 20,
  },
  logoutBtn: {
    backgroundColor: "#EF4444",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
});
