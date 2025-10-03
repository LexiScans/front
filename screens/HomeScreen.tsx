import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Colors } from "../theme";
import BottomNav from "../components/BottomNav";
import UploadModal from "../components/UploadModal";
import { Ionicons } from "@expo/vector-icons";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import ContractCard from "../components/ContractCard";

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Profile: undefined;
  PaymentMethod: undefined;
  BuySubscription: undefined;
  AddPaymentMethod: undefined;
  PaymentToBuy: undefined;
  PdfViewer: undefined;
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
    navigation.navigate("PdfViewer");
  };

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
          <ContractCard
            title={item.title}
            type={item.type}
            status={item.status}
            onPress={openPdfViewer}
          />
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
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
