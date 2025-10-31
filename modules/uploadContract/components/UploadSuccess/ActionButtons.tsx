import React from "react";
import { TouchableOpacity, Text, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles/uploadSuccess.styles";

type ActionButtonsProps = {
  contractId?: string;
};

type NavigationProp = {
  navigate: (screen: string, params?: any) => void;
};

export default function ActionButtons({ contractId }: ActionButtonsProps) {
  const navigation = useNavigation<NavigationProp>();

  const handleAnalyze = () => {
    navigation.navigate("ContractSummary", { contractId: contractId });
  };

  return (
    <>
      <TouchableOpacity style={styles.analyzeBtn} onPress={handleAnalyze}>
        <Text style={styles.analyzeText}>Iniciar análisis</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Home")}
        style={styles.laterBtn}
      >
        <Text style={styles.laterText}>Analizar más tarde</Text>
      </TouchableOpacity>
    </>
  );
}
