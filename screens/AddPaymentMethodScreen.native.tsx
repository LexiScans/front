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
import { Ionicons } from "@expo/vector-icons";

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
        { method: "POST" }
      );

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Error al obtener el clientSecret");

      const { setupIntent, error } = await confirmSetupIntent(
        data.clientSecret,
        {
          paymentMethodType: "Card",
        }
      );

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

        navigation.goBack();
      }
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#0b2e42ff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Agregar Tarjeta</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.brandContainer}>
          <Text style={styles.brandText}>Grupo LexiScan</Text>
          <View style={styles.divider} />
        </View>

        <Text style={styles.subtitle}>
          Ingresa los datos de tu tarjeta para guardarla como método de pago
        </Text>

        <View style={styles.cardSection}>
          <View style={styles.cardLabel}>
            <Ionicons name="card-outline" size={20} color="#0b2e42ff" />
            <Text style={styles.cardLabelText}>Información de la Tarjeta</Text>
          </View>
          <CardField
            postalCodeEnabled={false}
            placeholders={{ number: "4242 4242 4242 4242" }}
            cardStyle={styles.card}
            style={styles.cardContainer}
            onCardChange={(details: any) => setCardDetails(details)}
          />
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            !cardDetails?.complete && styles.disabledButton,
          ]}
          onPress={handleAddCard}
          disabled={!cardDetails?.complete}
        >
          <Ionicons name="save-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Guardar método de pago</Text>
        </TouchableOpacity>

        <View style={styles.securityNote}>
          <Ionicons name="shield-checkmark" size={16} color="#0b2e42ff" />
          <Text style={styles.securityText}>
            Tus datos están protegidos con encriptación de grado bancario
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddPaymentMethodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    marginTop: 10,
  },
  backButton: {
    padding: 8,
    backgroundColor: "#f8fafc",
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0b2e42ff",
  },
  placeholder: {
    width: 40,
  },
  brandContainer: {
    marginBottom: 25,
  },
  brandText: {
    fontSize: 18,
    color: "#0b2e42ff",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 8,
  },
  divider: {
    height: 2,
    backgroundColor: "#0b2e42ff",
    width: "30%",
    alignSelf: "center",
    borderRadius: 2,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  cardSection: {
    marginBottom: 40,
  },
  cardLabel: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingLeft: 5,
  },
  cardLabelText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0b2e42ff",
    marginLeft: 8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    textColor: "#111827",
    borderColor: "#e5e7eb",
    borderWidth: 1,
    borderRadius: 8,
  },
  cardContainer: {
    height: 50,
  },
  button: {
    backgroundColor: "#0b2e42ff",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    shadowColor: "#0b2e42ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 20,
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
    shadowColor: "transparent",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  securityNote: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 12,
    backgroundColor: "#f0f9ff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#0b2e42ff",
  },
  securityText: {
    fontSize: 14,
    color: "#0b2e42ff",
    fontWeight: "500",
    flex: 1,
    textAlign: "center",
  },
});
