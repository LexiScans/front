import React from "react";
import {View, Text, TouchableOpacity, StyleSheet, SafeAreaView} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../theme";

export default function UploadSuccess() {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={22} color={Colors.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Subir Contrato</Text>
                </View>

                <Text style={styles.step}>Paso 3 de 3</Text>
                <View style={styles.progressContainer}>
                    <View style={styles.progressBar} />
                </View>

                {/* Icono central */}
                <View style={styles.iconCircle}>
                    <Ionicons name="checkmark-circle" size={80} color="#16a34a" />
                </View>

                <Text style={styles.title}>¡Contrato subido!</Text>
                <Text style={styles.subtitle}>
                    Tu contrato se ha subido con éxito. Nuestra IA está lista para analizarlo y darte los
                    insights que necesitas.
                </Text>

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
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20,
        alignItems: "center",
    },
    header: {
        marginTop: 50,
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginBottom: 12,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: Colors.text,
        marginLeft: 10,
    },
    step: {
        color: Colors.textSecondary,
        alignSelf: "flex-start",
    },
    progressContainer: {
        height: 6,
        backgroundColor: "#e5e7eb",
        borderRadius: 4,
        width: "100%",
        marginTop: 4,
        marginBottom: 32,
    },
    progressBar: {
        height: 6,
        width: "100%",
        backgroundColor: "#2563eb",
        borderRadius: 4,
    },
    iconCircle: {
        backgroundColor: "#dcfce7",
        padding: 30,
        borderRadius: 100,
        marginVertical: 30,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: Colors.text,
        textAlign: "center",
        marginBottom: 10,
    },
    subtitle: {
        color: Colors.textSecondary,
        textAlign: "center",
        fontSize: 15,
        marginBottom: 40,
        lineHeight: 22,
    },
    analyzeBtn: {
        backgroundColor: "#2563eb",
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    analyzeText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
    laterBtn: {
        marginTop: 14,
    },
    laterText: {
        color: "#2563eb",
        fontWeight: "600",
    },
});
