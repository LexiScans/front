import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import BottomNav from "../../../components/BottomNav";
import UploadModal from "../../../components/UploadModal";
import ContractCard from "../../../components/ContractCard";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  ContractSummary: undefined;
};

const dummyContracts = [
  {
    id: "1",
    title: "Contrato de Arrendamiento - Abril",
    type: "Arrendamiento",
    status: "Pendiente",
  },
  {
    id: "2",
    title: "Contrato Laboral - Empresa X",
    type: "Prestación de Servicios",
    status: "Analizado",
  },
  {
    id: "3",
    title: "Acuerdo de Confidencialidad",
    type: "Confidencialidad",
    status: "Firmado",
  },
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const openPdfViewer = () => {
    navigation.navigate("ContractSummary");
  };

  return (
    <LinearGradient
      colors={["#f8fbff", "#f1f5fa", "#ffffff"]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8fbff" />

        <View style={styles.header}>
          <Text style={styles.hi}>Hola, Santiago 👋</Text>
          <Text style={styles.small}>
            Bienvenido a tu espacio de{" "}
            <Text style={styles.brandAccent}>contratos inteligentes</Text>
          </Text>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.heroLeft}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroTitle}>Gestiona tus documentos</Text>
              <Text style={styles.heroText}>
                Escanea, firma y analiza tus contratos fácilmente.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Contratos recientes</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={dummyContracts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <ContractCard
              title={item.title}
              type={item.type}
              status={item.status}
              onPress={openPdfViewer}
            />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No hay contratos aún</Text>
          }
        />

        <BottomNav onPressCentral={() => setModalVisible(true)} />
        <UploadModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientContainer: { flex: 1 },
  container: { flex: 1 },
  header: {
    paddingHorizontal: 28,
    paddingTop: Platform.OS === "android" ? 70 : 60,
    paddingBottom: 25,
  },
  hi: { fontSize: 26, fontWeight: "800", color: "#0e253f" },
  small: {
    fontSize: 15,
    color: "#6d7a90",
    marginTop: 6,
    lineHeight: 22,
    width: "90%",
  },
  brandAccent: { color: "#2456a3", fontWeight: "700" },
  heroCard: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 22,
    borderRadius: 22,
    paddingVertical: 22,
    paddingHorizontal: 20,
    shadowColor: "#122d4d",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
    borderWidth: 0.8,
    borderColor: "#e8edf5",
    marginBottom: 25,
  },
  heroLeft: { flexDirection: "row", alignItems: "center", flex: 1, gap: 14 },
  heroIconCircle: {
    width: 52,
    height: 52,
    borderRadius: 18,
    backgroundColor: "#e6edfa",
    alignItems: "center",
    justifyContent: "center",
  },
  heroTitle: {
    fontSize: 16.5,
    fontWeight: "700",
    color: "#122d4d",
    marginBottom: 4,
  },
  heroText: { fontSize: 13, color: "#6b7b91", lineHeight: 18 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 28,
    marginTop: 5,
    marginBottom: 12,
  },
  sectionTitle: { fontSize: 17, fontWeight: "700", color: "#23344e" },
  viewAll: { fontSize: 14, color: "#2456a3", fontWeight: "600" },
  listContainer: { paddingHorizontal: 22, paddingBottom: 110 },
  emptyText: {
    textAlign: "center",
    color: "#9aa3b5",
    fontSize: 14,
    marginTop: 40,
  },
});
