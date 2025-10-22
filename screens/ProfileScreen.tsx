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
  profileImage?: string; // URL of the user's profile picture
};

const ProfileScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  const userId = "45224151-7b09-45ff-835b-413062c2e815";

  useEffect(() => {
    fetch(`http://10.0.2.2:8080/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Datos desde backend:", data);
        setUser(data);
      })
      .catch((err) => console.error("Error al obtener usuario:", err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = () => {
    navigation.navigate("Login");
  };

  const handlePayment = () => {
    navigation.navigate("PaymentMethod");
  };

  const handleBuyPlan = () => {
    navigation.navigate("BuySubscription");
  };
  
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
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 200 }}>
        <View style={styles.header}>
          <View style={styles.profileInfo}>
            {user?.profileImage ? (
              <Image
                source={{ uri: user.profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <Ionicons name="person-circle-outline" size={60} color="#111827" />
            )}
            <Text style={styles.profileName}>{user?.name}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>{user?.name}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>{user?.email}</Text>
        </View>
        
        <View style={styles.subscriptionCard}>
          <Ionicons name="star-outline" size={28} color="white" />
          <Text style={styles.planTitle}>Tu plan:</Text>
          <Text style={styles.planTitle}>
            {user?.suscription?.type || "Gratis"}
          </Text>
          <Text style={styles.planPeriod}>
            Válido hasta: {user?.suscription?.endDate || "N/A"}
          </Text>

          {!user?.suscription && <BotonEscoger onPress={handleBuyPlan} />}
          {user?.suscription && <BotonCancelar onPress={confirmCancel} />}
          {user?.suscription && <BotonCancelar onPress={confirmCancel} />}

          {user?.suscription?.type && (
            <BotonMejorarPlan
              currentPlan={user.suscription.type}
              onPress={(targetPlan) => {
                navigation.navigate("BuySubscription");
              }}
            />
          )}
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
    alignItems: "center",
    marginBottom: 20,
  },
  profileInfo: {
    alignItems: "center",
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
  profileEmail: {
    fontSize: 14,
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
