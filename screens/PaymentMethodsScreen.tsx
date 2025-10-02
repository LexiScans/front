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

const PaymentMethodsScreen = () => {
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
  const navigation = useNavigation();

  // 👇 Mueve useRoute dentro del componente
  const route = useRoute();
  const { plan } = route.params as { plan: string };

  const fetchCards = async () => {
    try {
      const response = await fetch(
          `http://10.0.2.2:8081/payment/methods/user/${USER_ID}`
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

  const handleSelect = async () => {
    if (!selectedCard) {
      Alert.alert("Error", "No hay tarjeta seleccionada.");
      return;
    }

    try {
      const changeMethod = {
        userId: USER_ID,
        customerId: "cus_T94eOMGUfePnLl",
        id: selectedCard,
      };

      const response = await fetch(
        `http://10.0.2.2:8081/payment/methods/default`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(changeMethod),
        }
      );

      if (!response.ok) throw new Error("Error al cambiar método de pago");
      Alert.alert("Éxito", `Método de pago actualizado para el plan ${plan}`);
      fetchCards();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  const handleAddNew = () => {
    navigation.navigate("AddPaymentMethod" as never);
  };

  const handleDelete = async (cardId: string) => {
    try {
      const response = await fetch(
          `http://10.0.2.2:8081/payment/methods/${cardId}`,
          { method: "DELETE" }
      );
      if (!response.ok) throw new Error("Error al eliminar tarjeta");
      Alert.alert("Éxito", "Método de pago eliminado");
      fetchCards();
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 200 }}>
          <Text style={styles.title}>Gestiona tus métodos de pago</Text>
          <Text style={styles.planTitle}>Plan seleccionado: {plan}</Text>
          <Text style={styles.subtitle}>
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
                <TouchableOpacity
                    style={styles.deleteBtn}
                    onPress={() => handleDelete(card.id)}
                >
                  <Text style={styles.deleteText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
          ))}

          <TouchableOpacity style={styles.selectBtn} onPress={handleSelect}>
            <Text style={styles.selectText}>Seleccionar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.addBtn} onPress={handleAddNew}>
            <Text style={styles.addText}>+ Agregar nuevo método de pago</Text>
          </TouchableOpacity>
        </ScrollView>

        <BottomNav onPressCentral={() => {}} />
      </SafeAreaView>
  );
};

export default PaymentMethodsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    marginTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  cardWrapper: {
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
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
  },
  ribbonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 16,
  },
  selectBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  selectText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  addBtn: {
    borderColor: "#2563eb",
    borderWidth: 1.5,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 12,
  },
  addText: {
    color: "#2563eb",
    fontSize: 16,
    fontWeight: "600",
  },
  deleteBtn: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#dd3737",
    borderRadius: 6,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "700",
  },
});
