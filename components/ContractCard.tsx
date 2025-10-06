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
        return { label: "Firmado", color: "#16a34a", background: "#e8f9f0" };
      case "Procesando":
        return { label: "Procesando", color: "#f97316", background: "#fff2e7" };
      case "Analizado":
        return { label: "Analizado", color: "#2563eb", background: "#e7f0ff" };
      case "Pendiente":
        return { label: "Pendiente", color: "#6b7280", background: "#f4f4f4" };
      default:
        return { label: status, color: "#6b7280", background: "#f4f4f4" };
    }
  };

  const statusInfo = getStatusStyle();

  return (
    <TouchableOpacity activeOpacity={0.88} onPress={onPress}>
      <View style={[styles.card, { borderColor: statusInfo.color }]}>
        {/* Header del contrato */}
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="document-text-outline" size={26} color="#074468" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.label}>Contrato</Text>
            <Text style={styles.title}>{title}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </View>

        {/* Línea divisoria sutil */}
        <View style={styles.divider} />

        {/* Info secundaria */}
        <View style={styles.footer}>
          <Text style={styles.typeText}>Tipo: {type}</Text>
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: statusInfo.background,
              },
            ]}
          >
            <Text style={[styles.statusText, { color: statusInfo.color }]}>
              {statusInfo.label}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    borderWidth: 1.3,
    borderColor: "#e5e7eb",
    marginBottom: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    backgroundColor: "#eaf4f9",
    padding: 10,
    borderRadius: 14,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#6b7280",
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontWeight: "600",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#f1f1f1",
    marginVertical: 12,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  typeText: {
    fontSize: 14,
    color: "#4b5563",
  },
  statusBadge: {
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 16,
  },
  statusText: {
    fontSize: 13,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});

export default ContractCard;
