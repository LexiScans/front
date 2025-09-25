import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import BottomNav from "../components/BottomNav";

import type { StackNavigationProp } from "@react-navigation/stack";

type AddPaymentMethodScreenProps = {
  navigation: StackNavigationProp<any>;
};

const AddPaymentMethodScreen = ({
  navigation,
}: AddPaymentMethodScreenProps) => {
  const [cardType, setCardType] = useState("VISA");
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleCardNumberChange = (text: string) => {
    const cleaned = text.replace(/\D/g, ""); 
    const formatted = cleaned.replace(/(.{4})/g, "$1 ").trim(); 
    setCardNumber(formatted);
  };

  const handleExpiryChange = (text: string) => {
    const cleaned = text.replace(/\D/g, ""); 
    let formatted = cleaned;

    if (cleaned.length >= 3) {
      formatted = cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
    }

    setExpiryDate(formatted);
  };

  const validateExpiry = () => {
    if (!expiryDate.includes("/")) return false;
    const [mm, yy] = expiryDate.split("/");
    const month = parseInt(mm, 10);

    if (month < 1 || month > 12) return false;
    return true;
  };

  const handleAddCard = () => {
    if (!validateExpiry()) {
      Alert.alert("Error", "La fecha de expiración no es válida.");
      return;
    }

    console.log({
      type: cardType,
      number: cardNumber,
      holder: cardHolder,
      expiry: expiryDate,
      cvv: cvv,
    });

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.inner}>
          <Text style={styles.title}>Agregar nuevo método de pago</Text>
          <Text style={styles.subtitle}>
            Ingresa los datos de tu tarjeta para guardarla como método de pago
          </Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Tipo de tarjeta</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={cardType}
                onValueChange={(itemValue) => setCardType(itemValue)}
              >
                <Picker.Item label="Visa" value="VISA" />
                <Picker.Item label="Mastercard" value="MASTERCARD" />
                <Picker.Item label="American Express" value="AMEX" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Número de tarjeta</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor="#9CA3AF"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={handleCardNumberChange}
              maxLength={19}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Nombre del titular</Text>
            <TextInput
              style={styles.input}
              placeholder="Bruce Wayne"
              placeholderTextColor="#9CA3AF"
              value={cardHolder}
              onChangeText={setCardHolder}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Fecha de expiración</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/AA"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                value={expiryDate}
                onChangeText={handleExpiryChange}
                maxLength={5}
              />
            </View>
            <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="***"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
                secureTextEntry
                value={cvv}
                onChangeText={setCvv}
                maxLength={4}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleAddCard}>
            <Text style={styles.buttonText}>Guardar método de pago</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <BottomNav onPressCentral={() => {}} />
    </SafeAreaView>
  );
};

export default AddPaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    paddingBottom: 200,
  },
  inner: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: "#111827",
  },
  pickerWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  row: {
    flexDirection: "row",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },
});
