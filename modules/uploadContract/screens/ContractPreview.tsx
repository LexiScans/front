import React from "react";
import { ScrollView, SafeAreaView, View, Text } from "react-native";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { Colors } from "../../../theme";
import HeaderPreview from "../components/ContractPreview/HeaderPreview";
import PreviewFileBox from "../components/ContractPreview/PreviewFileBox";
import PreviewInfoBox from "../components/ContractPreview/PreviewInfoBox";
import PreviewButtons from "../components/ContractPreview/PreviewButtons";
import { styles } from "../styles/previsualizacionStyles";

type PrevisualizacionContratoRouteParams = {
  id: string;
};

export default function PrevisualizacionContrato() {
  const navigation = useNavigation();
  const route =
    useRoute<
      RouteProp<Record<string, PrevisualizacionContratoRouteParams>, string>
    >();

  const { id } = route.params || {};

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView contentContainerStyle={styles.container}>
        <HeaderPreview navigation={navigation} />

        <View>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar} />
          </View>
        </View>
        <PreviewFileBox />
        <PreviewInfoBox />
        <PreviewButtons navigation={navigation} contractId={id} />
      </ScrollView>
    </SafeAreaView>
  );
}
