import React from "react";
import { Text } from "react-native";
import { styles } from "../../styles/uploadSuccess.styles";
import { Colors } from "../../../../theme";

export default function SuccessMessage() {
  return (
    <>
      <Text style={styles.title}>¡Contrato subido!</Text>
      <Text style={styles.subtitle}>
        Tu contrato se ha subido con éxito. Nuestra IA está lista para
        analizarlo y darte los insights que necesitas.
      </Text>
    </>
  );
}
