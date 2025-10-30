import React from "react";
import { View, Text, StyleSheet } from "react-native";
import BotonEscoger from "../../../components/BotonEscoger";
import BotonCancelar from "../../../components/BotonCancelar";
import BotonMejorarPlan from "../../../components/BotonMejorarPlan";
import type { UserData } from "../hooks/useProfileData";

interface Props {
  user: UserData | null;
  onCancel: () => void;
  onBuy: () => void;
  onUpgrade: (plan: string) => void;
}

const ProfilePlanSection: React.FC<Props> = ({
  user,
  onCancel,
  onBuy,
  onUpgrade,
}) => (
  <View style={styles.section}>
    <Text style={styles.title}>Tu Plan Actual</Text>

    <View style={styles.card}>
      <Text style={styles.planName}>
        {user?.suscription?.type || "Plan Gratis"}
      </Text>

      <Text style={styles.planSubtitle}>
        {user?.suscription
          ? "Acceso premium a tus funciones personalizadas"
          : "Disfruta del acceso gratuito con funciones básicas"}
      </Text>

      <View style={styles.divider} />

      {user?.suscription ? (
        <>
          <Text style={styles.planPrice}>{user.suscription.price}</Text>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              🗓️ <Text style={styles.infoLabel}>Válido hasta:</Text>{" "}
              {user.suscription.endDate}
            </Text>
            <Text style={styles.infoText}>
              📄 <Text style={styles.infoLabel}>Contratos restantes:</Text>{" "}
              {user.suscription.ncontracts}
            </Text>
            <Text style={styles.infoText}>
              💬 <Text style={styles.infoLabel}>Preguntas restantes:</Text>{" "}
              {user.suscription.nquestions}
            </Text>
          </View>

          <View style={styles.actions}>
            <BotonCancelar onPress={onCancel} />
            <BotonMejorarPlan
              currentPlan={user.suscription.type}
              onPress={onUpgrade}
            />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.planPrice}>Gratis</Text>
          <Text style={styles.infoText}>
            Accede a funcionalidades básicas sin costo.
          </Text>
          <View style={styles.actions}>
            <BotonEscoger onPress={onBuy} />
          </View>
        </>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0b2e42ff",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 18,
    padding: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  planName: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0b2e42ff",
    textAlign: "center",
  },
  planSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 14,
  },
  planPrice: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
    textAlign: "center",
    marginBottom: 12,
  },
  infoContainer: {
    marginBottom: 18,
  },
  infoText: {
    fontSize: 15,
    color: "#374151",
    textAlign: "center",
    marginVertical: 2,
  },
  infoLabel: {
    fontWeight: "600",
    color: "#0b2e42ff",
  },
  actions: {
    marginTop: 10,
    gap: 10,
  },
});

export default ProfilePlanSection;
