import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../theme";

export default function PrevisualizacionContrato() {
    const navigation = useNavigation();
    const route = useRoute();
    const { fileName } = route.params || {};

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={22} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Previsualización</Text>
            </View>

            {/* Paso */}
            <Text style={styles.step}>Paso 2 de 3</Text>
            <View style={styles.progressContainer}>
                <View style={styles.progressBar} />
            </View>

            <View style={styles.previewBox}>
                <Image
                    source={require("../assets/logoSinFondo.png")}
                    style={styles.previewImage}
                />
                <Text style={styles.fileName}>{fileName || "Contrato_Arrendamiento.pdf"}</Text>
                <Text style={styles.fileDetails}>1.2 MB - 5 páginas</Text>
            </View>

            <View style={styles.infoBox}>
                <View style={styles.infoRow}>
                    <Ionicons name="checkmark-circle" size={22} color="green" />
                    <View style={styles.infoText}>
                        <Text style={styles.infoTitle}>Documento legible</Text>
                        <Text style={styles.infoDesc}>La calidad del escaneo es óptima.</Text>
                    </View>
                </View>

                <View style={styles.infoRow}>
                    <Ionicons name="id-card-outline" size={22} color="green" />
                    <View style={styles.infoText}>
                        <Text style={styles.infoTitle}>Firmas detectadas</Text>
                        <Text style={styles.infoDesc}>Se encontraron 2 firmas en el documento.</Text>
                    </View>
                </View>
            </View>

            {/* Botones */}
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
        flexGrow: 1,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
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
    },
    progressContainer: {
        height: 6,
        backgroundColor: "#e5e7eb",
        borderRadius: 4,
        marginBottom: 16,
        marginTop: 4,
    },
    progressBar: {
        height: 6,
        width: "66%",
        backgroundColor: Colors.primary,
        borderRadius: 4,
    },
    previewBox: {
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        borderRadius: 12,
        padding: 16,
    },
    previewImage: {
        width: 220,
        height: 280,
        borderRadius: 12,
        marginBottom: 10,
    },
    fileName: {
        fontWeight: "700",
        color: Colors.text,
    },
    fileDetails: {
        color: Colors.textSecondary,
    },
    infoBox: {
        marginTop: 20,
        backgroundColor: "#F9FAFB",
        borderRadius: 12,
        padding: 14,
    },
    infoRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    infoText: {
        marginLeft: 10,
    },
    infoTitle: {
        fontWeight: "600",
        color: Colors.text,
    },
    infoDesc: {
        color: Colors.textSecondary,
    },
    analyzeBtn: {
        flexDirection: "row",
        backgroundColor: Colors.primary,
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 26,
    },
    analyzeText: {
        color: "#fff",
        fontWeight: "700",
        marginLeft: 8,
    },
    uploadAnother: {
        alignItems: "center",
        marginTop: 16,
    },
    uploadText: {
        color: Colors.primary,
        fontWeight: "600",
    },
});
