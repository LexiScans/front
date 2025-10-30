import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../screens/styles";

interface Props {
  onPress: () => void;
}

const ProfilePaymentSection: React.FC<Props> = ({ onPress }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>Métodos de Pago</Text>
    <TouchableOpacity style={styles.paymentCard} onPress={onPress}>
      <Ionicons name="card-outline" size={24} color="#6fa7c7ff" />
      <Text style={styles.paymentText}>Gestionar métodos de pago</Text>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  </View>
);

export default ProfilePaymentSection;
