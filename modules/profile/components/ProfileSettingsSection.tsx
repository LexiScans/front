import React from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../screens/styles";

interface Props {
  notificationsEnabled: boolean;
  setNotificationsEnabled: (value: boolean) => void;
  onSupport: () => void;
  onLogout: () => void;
}

const ProfileSettingsSection: React.FC<Props> = ({
  notificationsEnabled,
  setNotificationsEnabled,
  onSupport,
  onLogout,
}) => (
  <View style={styles.section}>
    <View style={styles.menuItem}>
      <View style={styles.menuItemLeft}>
        <Ionicons name="notifications-outline" size={22} color="#6B7280" />
        <Text style={styles.menuItemText}>Notificaciones</Text>
      </View>
      <Switch
        value={notificationsEnabled}
        onValueChange={setNotificationsEnabled}
        trackColor={{ false: "#D1D5DB", true: "#6fa7c7ff" }}
        thumbColor={notificationsEnabled ? "#ffffff" : "#f4f3f4"}
      />
    </View>

    <TouchableOpacity style={styles.menuItem} onPress={onSupport}>
      <View style={styles.menuItemLeft}>
        <Ionicons name="help-circle-outline" size={22} color="#6B7280" />
        <Text style={styles.menuItemText}>Ayuda y Soporte</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
    </TouchableOpacity>

    <TouchableOpacity
      style={[styles.menuItem, styles.logoutItem]}
      onPress={onLogout}
    >
      <View style={styles.menuItemLeft}>
        <Ionicons name="log-out-outline" size={22} color="#EF4444" />
        <Text style={[styles.menuItemText, styles.logoutText]}>
          Cerrar Sesión
        </Text>
      </View>
    </TouchableOpacity>
  </View>
);

export default ProfileSettingsSection;
