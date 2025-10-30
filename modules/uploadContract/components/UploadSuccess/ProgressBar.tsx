import React from "react";
import { View, Text } from "react-native";
import { Colors } from "../../../../theme";
import { styles } from "../../styles/uploadSuccess.styles";

export default function ProgressBar() {
  return (
    <>
      <Text style={styles.step}>Paso 3 de 3</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar} />
      </View>
    </>
  );
}
