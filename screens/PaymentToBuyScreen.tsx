import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RadioButton } from "react-native-paper";
import BottomNav from "../components/BottomNav";
import PaymentCard from "../components/PaymentCard";
import { useNavigation, useRoute } from "@react-navigation/native";

const COLORS = ["#171717", "#1E3A8A", "#1fac84ff", "#dd3737ff"];
const USER_ID = "45224151-7b09-45ff-835b-413062c2e815";

const PaymentToBuyScreen = () => {
  const [cards, setCards] = useState<
    {
      userId: string;
      last4: string;
      color: string;
      id: string;
      isDefault: boolean;
    }[]
  >([]);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const route = useRoute();
  const { plan } = route.params as { plan: string };
  const navigation = useNavigation();

  // Precios actualizados según los nuevos planes
  const planPrices = {
    "BASIC": "$4.99",
    "MEDIUM": "$14.99", 
    "FULL": "$29.99"
  };

  const planDisplayNames = {
    "BASIC": "Básico",
    "MEDIUM": "Medium",
    "FULL": "Full"
  };

  const getPlanPrice = (planType: string) => {
    return planPrices[plan] || "$4.99";
  };

  const getPlanDisplayName = (planType: string) => {
    return planDisplayNames[plan] || "Básico";
  };

  const fetchCards = async () => {
    try {
      const response = await fetch(
        `http://10.0.2.2:8081/payment/methods/user/45224151-7b09-45ff-835b-413062c2e815`
      );
      const data = await response.json();

      const cardsWithColor = data.map((item: any) => ({
        id: item.id,
        userId: item.userId,
        last4: item.last4,
        isDefault: item.isDefault,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));

      setCards(cardsWithColor);
      if (cardsWithColor.length > 0) setSelectedCard(cardsWithColor[0].id);
    } catch (err) {
      console.error("Error al obtener tarjetas:", err);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const crearSuscripcion = async () => {
    try {
      const nuevaSuscripcion = {
        userId: "45224151-7b09-45ff-835b-413062c2e815",
        namePlan: plan,
      };

      const response = await fetch("http://10.0.2.2:8080/suscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaSuscripcion),
      });

      if (!response.ok) {
        throw new Error("Error al crear la suscripción");
      }

      const data = await response.json();
      Alert.alert("Éxito", `Suscripción ${getPlanDisplayName(plan)} activada correctamente`, [
        {
          text: "OK",
          onPress: () => navigation.goBack()
        }
      ]);
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Pasarela de Pagos</Text>
          <Text style={styles.subtitle}>Selecciona tu plan</Text>
          
          <View style={styles.planOverview}>
            <View style={styles.planItem}>
              <Text style={styles.planName}>{getPlanDisplayName(plan)}</Text>
              <Text style={styles.planPrice}>{getPlanPrice(plan)}</Text>
              <Text style={styles.planPeriod}>/mes</Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.paymentSection}>
          <Text style={styles.sectionTitle}>Método de Pago</Text>
          <Text style={styles.sectionSubtitle}>
            Escoge la tarjeta que será usada para tu suscripción mensual
          </Text>

          {cards.map((card) => (
            <View key={card.id} style={styles.cardRow}>
              <RadioButton
                value={card.id}
                status={selectedCard === card.id ? "checked" : "unchecked"}
                onPress={() => setSelectedCard(card.id)}
                color="#2563eb"
              />
              <View
                style={[styles.cardWrapper, card.isDefault && styles.defaultCard]}
              >
                {card.isDefault && (
                  <View style={styles.ribbon}>
                    <Text style={styles.ribbonText}>Predeterminada</Text>
                  </View>
                )}
                <PaymentCard number={card.last4} color={card.color} />
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.addCardButton}>
            <Text style={styles.addCardText}>+ Agregar nueva tarjeta</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={crearSuscripcion}>
          <Text style={styles.payButtonText}>
            Confirmar Pago - {getPlanPrice(plan)}/mes
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNav onPressCentral={() => {}} />
    </SafeAreaView>
  );
};

export default PaymentToBuyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 24,
  },
  planOverview: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  planItem: {
    alignItems: "center",
  },
  planName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
  },
  planPrice: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: 4,
  },
  planPeriod: {
    fontSize: 14,
    color: "#6B7280",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 24,
  },
  paymentSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 20,
    lineHeight: 20,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cardWrapper: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
    flex: 1,
  },
  defaultCard: {
    borderWidth: 2,
    borderColor: "#2563eb",
  },
  ribbon: {
    position: "absolute",
    top: -2,
    left: 0,
    backgroundColor: "#2563eb",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderBottomRightRadius: 6,
    zIndex: 1,
  },
  ribbonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  addCardButton: {
    borderColor: "#2563eb",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 8,
  },
  addCardText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "600",
  },
  payButton: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});