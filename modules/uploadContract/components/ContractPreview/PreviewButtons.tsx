import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../../../theme";
import { styles } from "../../styles/previsualizacionStyles";

export default function PreviewButtons({ navigation }: any) {
  return (
    <>
      <TouchableOpacity
        style={styles.analyzeBtn}
        onPress={() => navigation.navigate("UploadSuccess")}
      >
        <Ionicons name="sparkles-outline" size={18} color="#fff" />
        <Text style={styles.analyzeText}>Analizar con IA</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("DetallesContrato")}
        style={styles.uploadAnother}
      >
        <Text style={styles.uploadText}>Subir otro archivo</Text>
      </TouchableOpacity>
    </>
  );
}
