import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomNav from "../../../components/BottomNav";
import UploadModal from "../components/UploadModal";
import ContractCard from "../components/ContractCard";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ENV from "../../../config/env";

type RootStackParamList = {
  Home: undefined;
  ContractSummary: { id: string };
};

type Contract = {
  id: string;
  name: string;
  url: string;
  type: string;
  state: string;
};

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    const loadUserData = async () => {
      const storedUserId = await AsyncStorage.getItem("userId");
      const storedName = await AsyncStorage.getItem("userName");

      if (!storedUserId) {
        navigation.navigate("Login");
        return;
      }

      setUserId(storedUserId);

      if (storedName) {
        setName(storedName);
        return;
      }

      try {
        const response = await fetch(
          `${ENV.USER_SERVICE}/users/${storedUserId}`,
          { method: "GET" }
        );

        if (!response.ok) return;

        const data = await response.json();
        setName(data.name);
        await AsyncStorage.setItem("userName", data.name);
      } catch (error) {}
    };

    loadUserData();
  }, [navigation]);

  const fetchContracts = async () => {
    if (!userId) return;
    try {
      const response = await fetch(
        `${ENV.PDF_SERVICE}/contracts/user/${userId}`
      );
      if (!response.ok) return;
      const data: Contract[] = await response.json();
      setContracts(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchContracts();
    }
  }, [userId]);

  const openPdfViewer = (contractId: string) => {
    navigation.navigate("ContractSummary", { contractId: contractId });
  };

  return (
    <LinearGradient
      colors={["#f8fbff", "#f1f5fa", "#ffffff"]}
      style={styles.gradientContainer}
    >
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#f8fbff" />
        <View style={styles.header}>
          <Text style={styles.hi}>Hola, {name ?? "Usuario"} 👋</Text>
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
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#2456a3"
            style={{ marginTop: 50 }}
          />
        ) : (
          <FlatList
            data={contracts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <ContractCard
                title={item.name}
                type={item.type}
                status={item.state}
                onPress={() => openPdfViewer(item.id)}
              />
            )}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyTitle}>¡No tienes contratos aún!</Text>
                <Text style={styles.emptySubtitle}>
                  Analiza tus contratos ahora y mantén todo bajo control
                </Text>
                <TouchableOpacity
                  style={styles.emptyButton}
                  onPress={() => setModalVisible(true)}
                >
                  <Text style={styles.emptyButtonText}>Analizar contrato</Text>
                </TouchableOpacity>
              </View>
            }
          />
        )}
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
  viewAll: { fontSize: 14, color: "#0b2e42ff", fontWeight: "600" },
  listContainer: { paddingHorizontal: 22, paddingBottom: 110 },
  emptyContainer: {
    marginTop: 50,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0b2e42ff",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6b7b91",
    marginBottom: 20,
    textAlign: "center",
    lineHeight: 20,
  },
  emptyButton: {
    backgroundColor: "#0b2e42ff",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
  },
  emptyButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
});
