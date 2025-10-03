import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ContractCardProps = {
  title: string;
  type: string;
  status: string;
  onPress: () => void;
};

const ContractCard: React.FC<ContractCardProps> = ({
  title,
  type,
  status,
  onPress,
}) => {
  const getStatusStyle = () => {
    switch (status) {
      case "Firmado":
        return { backgroundColor: "#28a745", borderColor: "#28a745" };
      case "Procesando":
        return { backgroundColor: "#fd7e14", borderColor: "#fd7e14" };
      case "Analizado":
        return { backgroundColor: "#007bff", borderColor: "#007bff" };
      case "Pendiente":
        return { backgroundColor: "#6c757d", borderColor: "#6c757d" };
      default:
        return { backgroundColor: "#6c757d", borderColor: "#6c757d" };
    }
  };

  return (
    <TouchableOpacity
      style={[styles.card, { borderLeftColor: getStatusStyle().borderColor }]}
      activeOpacity={0.9}
      onPress={onPress}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.contractLabel}>Contrato</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.type}>Tipo: {type}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusStyle().backgroundColor },
          ]}
        >
          <Text style={styles.statusText}>{status}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={22} color="#999" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderLeftWidth: 6,
  },
  contractLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#999",
    marginBottom: 2,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
  },
  type: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 50,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
});

export default ContractCard;
