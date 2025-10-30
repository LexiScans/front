import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/previsualizacionStyles";

export default function PreviewInfoBox() {
  return (
    <View style={styles.infoBox}>
      <View style={styles.infoRow}>
        <Ionicons name="checkmark-circle" size={22} color="green" />
        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>Documento legible</Text>
          <Text style={styles.infoDesc}>La calidad del escaneo es óptima.</Text>
        </View>
      </View>

      <View style={styles.infoRow}>
        <Ionicons name="id-card-outline" size={22} color="green" />
        <View style={styles.infoText}>
          <Text style={styles.infoTitle}>Firmas detectadas</Text>
          <Text style={styles.infoDesc}>
            Se encontraron 2 firmas en el documento.
          </Text>
        </View>
      </View>
    </View>
  );
}
