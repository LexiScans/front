import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import PlanCard from "../components/PlanCard";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
    Profile: undefined;
    BuySubscription: undefined;
    PaymentMethod: { plan: string };
};

const BuySubscriptionScreen = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleSelectPlan = (plan: string) => {
        console.log("Seleccionaste:", plan);
        navigation.navigate("PaymentMethod", { plan: plan });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
                <PlanCard
                    icon="💡"
                    title="Básico"
                    price="$4.99"
                    contracts="10 contratos / mes"
                    questions="2"
                    pdf="Sí"
                    ads="No"
                    description="Plan económico que permite procesar más contratos, hacer preguntas básicas y descargar resultados."
                    onSelect={() => handleSelectPlan("Básico")}
                    color="#10B981"
                    delay={200}
                />

                <PlanCard
                    icon="⚖️"
                    title="Pro"
                    price="$14.99"
                    contracts="70 contratos / mes"
                    questions="10"
                    pdf="Sí"
                    ads="No"
                    description="Plan completo para profesionales, con alto volumen de contratos y mayor capacidad de interacción."
                    onSelect={() => handleSelectPlan("Pro")}
                    color="#3B82F6"
                    delay={400}
                />

                <PlanCard
                    icon="🏢"
                    title="Full"
                    price="$29.99"
                    contracts="Ilimitados"
                    questions="Ilimitadas"
                    pdf="Sí"
                    ads="No"
                    description="Plan premium sin restricciones, ideal para empresas."
                    onSelect={() => handleSelectPlan("Full")}
                    color="#1E40AF"
                    delay={600}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

export default BuySubscriptionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
    },
});
