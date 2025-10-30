import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../../styles/uploadSuccess.styles";

export default function SuccessIcon() {
  return (
    <View style={styles.iconCircle}>
      <Ionicons name="checkmark-circle" size={80} color="#16a34a" />
    </View>
  );
}
