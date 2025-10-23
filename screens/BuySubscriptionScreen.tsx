import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Profile: undefined;
  BuySubscription: undefined;
  PaymentMethod: { plan: string };
  PaymentToBuy: { plan: string };
};

const BuySubscriptionScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSelectPlan = (plan: string) => {
    console.log("Seleccionaste:", plan);
    navigation.navigate("PaymentToBuy", { plan });
  };

  const plans = [
    {
      title: "Básico",
      description:
        "Plan económico que permite procesar más contratos, hacer preguntas básicas y descargar resultados.",
      price: "$4.99/mes",
      contracts: "10 contratos / mes",
      questions: "2 preguntas incluidas",
      pdf: "Descarga de PDF: Sí",
      ads: "Publicidad: No",
      buttonText: "Seleccionar Plan",
      onPress: () => handleSelectPlan("BASIC"),
      isCurrent: false,
    },
    {
      title: "Medium",
      description:
        "Plan completo para profesionales, con alto volumen de contratos y mayor capacidad de interacción.",
      price: "$14.99/mes",
      contracts: "70 contratos / mes",
      questions: "10 preguntas incluidas",
      pdf: "Descarga de PDF: Sí",
      ads: "Publicidad: No",
      buttonText: "Seleccionar Plan",
      onPress: () => handleSelectPlan("MEDIUM"),
      isCurrent: false,
    },
    {
      title: "Full",
      description: "Plan premium sin restricciones, ideal para empresas.",
      price: "$29.99/mes",
      contracts: "Contratos: Ilimitados",
      questions: "Preguntas: Ilimitadas",
      pdf: "Descarga de PDF: Sí",
      ads: "Publicidad: No",
      buttonText: "Seleccionar Plan",
      onPress: () => handleSelectPlan("FULL"),
      isCurrent: false,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.headerTitle}>Planes de Suscripción</Text>

        {plans.map((plan, index) => (
          <View key={index} style={styles.planCard}>
            <View style={styles.planHeader}>
              <Text style={styles.planTitle}>{plan.title}</Text>
            </View>

            <Text style={styles.planDescription}>{plan.description}</Text>

            <View style={styles.planDetails}>
              <Text style={styles.planDetail}>{plan.contracts}</Text>
              <Text style={styles.planDetail}>{plan.questions}</Text>
              <Text style={styles.planDetail}>{plan.pdf}</Text>
              <Text style={styles.planDetail}>{plan.ads}</Text>
            </View>

            <View style={styles.priceContainer}>
              <Text style={styles.planPrice}>{plan.price}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.selectButton,
                plan.isCurrent && styles.currentPlanButton,
              ]}
              onPress={plan.onPress}
              disabled={plan.isCurrent}
            >
              <Text
                style={[
                  styles.buttonText,
                  plan.isCurrent && styles.currentButtonText,
                ]}
              >
                {plan.buttonText}
              </Text>
            </TouchableOpacity>

            {index < plans.length - 1 && <View style={styles.divider} />}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BuySubscriptionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    paddingTop: 80, 
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 30,
  },
  planCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  planHeader: {
    marginBottom: 8,
  },
  planTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
  },
  planDescription: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 16,
  },
  planDetails: {
    marginBottom: 16,
    paddingLeft: 8,
  },
  planDetail: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 4,
    lineHeight: 20,
  },
  priceContainer: {
    marginBottom: 20,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  selectButton: {
    backgroundColor: "#6fa7c7ff",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  currentPlanButton: {
    backgroundColor: "#E5E7EB",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  currentButtonText: {
    color: "#6B7280",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginTop: 20,
    marginHorizontal: -20,
  },
});
