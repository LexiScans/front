import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Colors } from "../theme";
import BottomNav from "../components/BottomNav";
import UploadModal from "../components/UploadModal";
import { Ionicons } from "@expo/vector-icons";

const dummyContracts = [
  { id: "1", title: "Contrato de Arrendamiento - Abril", status: "Pendiente" },
  { id: "2", title: "Contrato Laboral - Empresa X", status: "Analizado" },
  { id: "3", title: "Acuerdo de Confidencialidad", status: "Pendiente" },
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerRow}>
          <Text style={styles.hi}>Hola, Santiago</Text>
          <Ionicons
            name="person-circle-outline"
            size={28}
            color={Colors.secondary}
            style={{ marginLeft: 8 }}
          />
        </View>
        <Text style={styles.small}>Contratos recientes</Text>
      </View>

      <FlatList
        data={dummyContracts}
        contentContainerStyle={{ padding: 20 }}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <TouchableOpacity activeOpacity={0.9} style={styles.card}>
            <View>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardSubtitle}>{item.status}</Text>
            </View>
            <Text style={styles.chev}>›</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", color: Colors.textSecondary }}>
            No hay contratos
          </Text>
        }
      />

      <BottomNav onPressCentral={() => setModalVisible(true)} />

      <UploadModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bg },
  header: { padding: 20, paddingTop: 30 },
  hi: { fontSize: 20, fontWeight: "700", color: Colors.secondary },
  small: { fontSize: 13, color: Colors.textSecondary, marginTop: 4 },
  card: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardTitle: { fontWeight: "700", color: Colors.text },
  cardSubtitle: { color: Colors.textSecondary, marginTop: 6 },
  chev: { color: Colors.primary, fontSize: 22 },
});
