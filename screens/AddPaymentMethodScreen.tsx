import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { CardField, useConfirmSetupIntent } from "@stripe/stripe-react-native";

const AddPaymentMethodScreen = ({ navigation }: any) => {
  const [cardDetails, setCardDetails] = useState<any>();
  const { confirmSetupIntent } = useConfirmSetupIntent();

  const handleAddCard = async () => {
    if (!cardDetails?.complete) {
      Alert.alert("Error", "Por favor completa los datos de la tarjeta.");
      return;
    }

    try {
      const response = await fetch(
        `http://10.0.2.2:8081/payment/create-setup-intent?customerId=cus_T94eOMGUfePnLl`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al obtener el clientSecret");
      }

      const clientSecret = data.clientSecret;

      const { setupIntent, error } = await confirmSetupIntent(clientSecret, {
        paymentMethodType: "Card",
      });

      if (error) {
        Alert.alert("Error", error.message);
        return;
      }

      if (setupIntent) {
        Alert.alert("Éxito", "Tarjeta guardada correctamente.");
        console.log("PaymentMethod ID:", setupIntent.paymentMethodId);

        const addMethodBody = {
          userId: "45224151-7b09-45ff-835b-413062c2e815",
          customerId: "cus_T94eOMGUfePnLl",
          paymentMethodId: setupIntent.paymentMethodId,
          defaultPayment: true,
        };

        const addMethodResponse = await fetch(
          "http://10.0.2.2:8081/payment/addMethod",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(addMethodBody),
          }
        );

        if (!addMethodResponse.ok) {
          const errData = await addMethodResponse.json();
          throw new Error(errData.message || "Error al agregar método de pago");
        }

        console.log("Método agregado en backend correctamente");
        navigation.goBack();
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Agregar nuevo método de pago</Text>
        <Text style={styles.subtitle}>
          Ingresa los datos de tu tarjeta para guardarla como método de pago
        </Text>

        <CardField
          postalCodeEnabled={false}
          placeholders={{ number: "4242 4242 4242 4242" }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(details) => setCardDetails(details)}
        />

        <TouchableOpacity style={styles.button} onPress={handleAddCard}>
          <Text style={styles.buttonText}>Guardar método de pago</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPaymentMethodScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  scroll: { flexGrow: 1, padding: 20, marginTop: 60 },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 20,
  },
  card: { backgroundColor: "#FFFFFF", textColor: "#111827" },
  cardContainer: { height: 50, marginVertical: 30 },
  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
});
