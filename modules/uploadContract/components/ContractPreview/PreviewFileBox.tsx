import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "../../styles/previsualizacionStyles";

export default function PreviewFileBox({ fileName }: { fileName?: string }) {
  return (
    <View style={styles.previewBox}>
      <Image
        source={require("../../../../assets/logoSinFondo.png")}
        style={styles.previewImage}
      />
      <Text style={styles.fileName}>
        {fileName || "Contrato_Arrendamiento.pdf"}
      </Text>
      <Text style={styles.fileDetails}>1.2 MB - 5 páginas</Text>
    </View>
  );
}
