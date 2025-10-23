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
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

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
        customerId: "cus_T7zEmo7WbyrmZW",
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
      Alert.alert("Éxito", "Método de pago actualizado");
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
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Métodos de Pago</Text>
          <View style={{ width: 24 }} />
        </View>

        <Text style={styles.brandText}>Grupo LexiScan</Text>

        <Text style={styles.subtitle}>
          Selecciona o agrega una tarjeta para tu suscripción.
        </Text>

        {cards.map((card) => (
          <View key={card.id} style={styles.cardRow}>
            <RadioButton
              value={card.id}
              status={selectedCard === card.id ? "checked" : "unchecked"}
              onPress={() => setSelectedCard(card.id)}
              color="#0b2e42ff"
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
              <Ionicons name="trash-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}

        <TouchableOpacity style={styles.selectBtn} onPress={handleSelect}>
          <Text style={styles.selectText}>Seleccionar Tarjeta</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addBtn} onPress={handleAddNew}>
          <Ionicons name="add-circle-outline" size={20} color="#0b2e42ff" />
          <Text style={styles.addText}>Agregar nuevo método de pago</Text>
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
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 180,
    marginTop: 60,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
  },
  brandText: {
    fontSize: 16,
    color: "#0b2e42ff",
    marginTop: 10,
    marginBottom: 18,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 15,
    color: "#000",
    marginBottom: 20,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  cardWrapper: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
  },
  defaultCard: {
    borderWidth: 2,
    borderColor: "#0b2e42ff",
  },
  ribbon: {
    position: "absolute",
    top: -2,
    left: 0,
    backgroundColor: "#0b2e42ff",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderBottomRightRadius: 6,
  },
  ribbonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
  selectBtn: {
    backgroundColor: "#0b2e42ff",
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#0b2e42ff",
    borderWidth: 1.5,
    paddingVertical: 14,
    borderRadius: 10,
    marginTop: 12,
  },
  addText: {
    color: "#0b2e42ff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
  },
  deleteBtn: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#dd3737",
    borderRadius: 6,
  },
});
