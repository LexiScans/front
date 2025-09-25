import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { RadioButton } from "react-native-paper";
import BottomNav from "../components/BottomNav";
import PaymentCard from "../components/PaymentCard";
import { useNavigation } from "@react-navigation/native";

const mockCards = [
  {
    id: "1",
    type: "MASTERCARD",
    number: "9759 2484 5269 6576",
    holder: "Bruce Wayne",
    expiry: "12/24",
    color: "#171717",
  },
  {
    id: "2",
    type: "VISA",
    number: "4532 7845 1298 9876",
    holder: "Clark Kent",
    expiry: "08/26",
    color: "#1E3A8A",
  },
  {
    id: "3",
    type: "AMEX",
    number: "3791 324598 76542",
    holder: "Diana Prince",
    expiry: "05/25",
    color: "#1fac84ff",
  },
  {
    id: "4",
    type: "AMEX",
    number: "3791 324598 76542",
    holder: "Diana Prince",
    expiry: "05/25",
    color: "#dd3737ff",
  },
];
const PaymentMethodsScreen = () => {
  const [selectedCard, setSelectedCard] = useState("1");
  const navigation = useNavigation();

  const handleSelect = () => {
    console.log("Tarjeta seleccionada:", selectedCard);
  };

  const handleAddNew = () => {
    navigation.navigate("AddPaymentMethod" as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 200 }}>
        <Text style={styles.title}>Gestiona tus métodos de pago</Text>
        <Text style={styles.subtitle}>
          Escoge la tarjeta que será usada para tu suscripción mensual
        </Text>

        {mockCards.map((card) => (
          <TouchableOpacity
            key={card.id}
            activeOpacity={0.8}
            onPress={() => setSelectedCard(card.id)}
            style={styles.cardRow}
          >
            <View style={styles.radioWrapper}>
              <RadioButton
                value={card.id}
                status={selectedCard === card.id ? "checked" : "unchecked"}
                onPress={() => setSelectedCard(card.id)}
                color="#2563eb"
              />
            </View>
            <PaymentCard
              type={card.type}
              number={card.number}
              holder={card.holder}
              expiry={card.expiry}
              color={card.color}
            />
          </TouchableOpacity>
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
  radioWrapper: {
    marginRight: 10,
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
});
