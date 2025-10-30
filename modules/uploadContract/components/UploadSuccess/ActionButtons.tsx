import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../styles/uploadSuccess.styles";

export default function ActionButtons() {
  const navigation = useNavigation();

  return (
    <>
      <TouchableOpacity
        style={styles.analyzeBtn}
        onPress={() => navigation.navigate("ContractSummary")}
      >
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
