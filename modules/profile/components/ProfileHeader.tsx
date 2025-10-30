import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../screens/styles";

interface Props {
  onConfigPress: () => void;
}

const ProfileHeader: React.FC<Props> = ({ onConfigPress }) => (
  <View style={styles.header}>
    <Text style={styles.headerTitle}>Mi Cuenta</Text>
    <TouchableOpacity style={styles.configButton} onPress={onConfigPress}>
      <Ionicons name="settings-outline" size={24} color="#6B7280" />
    </TouchableOpacity>
  </View>
);

export default ProfileHeader;
