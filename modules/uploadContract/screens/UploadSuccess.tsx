import React from "react";
import { SafeAreaView, View } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { styles } from "../styles/uploadSuccess.styles";
import HeaderUploadSuccess from "../components/UploadSuccess/HeaderUploadSuccess";
import ProgressBar from "../components/UploadSuccess/ProgressBar";
import SuccessIcon from "../components/UploadSuccess/SuccessIcon";
import SuccessMessage from "../components/UploadSuccess/SuccessMessage";
import ActionButtons from "../components/UploadSuccess/ActionButtons";

type UploadSuccessRouteParams = {
  id: string;
};

export default function UploadSuccessScreen() {
  const route =
    useRoute<RouteProp<Record<string, UploadSuccessRouteParams>, string>>();
  const { id } = route.params || {};

  const contractId = id;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>
        <HeaderUploadSuccess />
        <ProgressBar />
        <SuccessIcon />
        <SuccessMessage />

        <ActionButtons contractId={contractId} />
      </View>
    </SafeAreaView>
  );
}
