import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Colors } from "../theme";

type RootStackParamList = {
    Home: undefined;
    UploadModal: undefined;
    DetallesContrato: { fileUri?: string; fileName?: string };
    PrevisualizacionContrato: {
        fileUri?: string;
        fileName?: string;
        titulo: string;
        tipo: string;
        parteA: string;
        parteB: string;
        fechaFirma: string;
        vencimiento: string;
    };
    ContractSummary: undefined;
};


type DetallesContratoRouteProp = {
    key: string;
    name: "DetallesContrato";
    params?: { fileUri?: string; fileName?: string };
};

export default function DetallesContrato() {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<DetallesContratoRouteProp>();

    const { fileUri, fileName } = route.params || {};

    const [titulo, setTitulo] = useState("");
    const [tipo, setTipo] = useState("");
    const [parteA, setParteA] = useState("");
    const [parteB, setParteB] = useState("");
    const [fechaFirma, setFechaFirma] = useState("");
    const [vencimiento, setVencimiento] = useState("");
    const [notas, setNotas] = useState("");

    const tiposContrato = [
        "Empleo",
        "Servicios",
        "Arrendamiento",
        "Confidencialidad",
        "Ventas",
        "Licencia",
        "Préstamo",
    ];

    const handleNext = () => {
        if (!titulo || !tipo) {
            Alert.alert("Campos incompletos", "Por favor, completa los campos requeridos.");
            return;
        }
        navigation.navigate("PrevisualizacionContrato", {
            fileName,
            fileUri,
            titulo,
            tipo,
            parteA,
            parteB,
            fechaFirma,
            vencimiento,
        });
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Detalles del Contrato</Text>
            <Text style={styles.subtitle}>Paso 1 de 3</Text>

            <View style={styles.progressContainer}>
                <View style={styles.progressBar} />
            </View>

            <Text style={styles.description}>
                Completa la información clave del contrato para una mejor organización.
            </Text>

            {fileName && (
                <View style={styles.fileBox}>
                    <Text style={styles.fileTitle}>📄 {fileName}</Text>
                    <Text style={styles.filePath}>{fileUri}</Text>
                </View>
            )}

            <Text style={styles.label}>Título del Contrato</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej. Contrato de Arrendamiento"
                value={titulo}
                onChangeText={setTitulo}
            />

            <Text style={styles.label}>Tipo de Contrato</Text>
            {tiposContrato.map((t, i) => (
                <TouchableOpacity
                    key={i}
                    style={[
                        styles.tipoBtn,
                        tipo === t && { backgroundColor: Colors.primary, borderColor: Colors.primary },
                    ]}
                    onPress={() => setTipo(t)}
                >
                    <Text
                        style={[
                            styles.tipoText,
                            tipo === t && { color: "#fff", fontWeight: "700" },
                        ]}
                    >
                        {t}
                    </Text>
                </TouchableOpacity>
            ))}

            <Text style={styles.label}>Parte A</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej. Juan Pérez"
                value={parteA}
                onChangeText={setParteA}
            />

            <Text style={styles.label}>Parte B</Text>
            <TextInput
                style={styles.input}
                placeholder="Ej. María Rodríguez"
                value={parteB}
                onChangeText={setParteB}
            />

            <Text style={styles.label}>Fecha de Firma</Text>
            <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={fechaFirma}
                onChangeText={setFechaFirma}
            />

            <Text style={styles.label}>Vencimiento</Text>
            <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={vencimiento}
                onChangeText={setVencimiento}
            />

            <Text style={styles.label}>Notas</Text>
            <TextInput
                style={[styles.input, { height: 100, textAlignVertical: "top" }]}
                placeholder="Añade comentarios o detalles importantes..."
                value={notas}
                onChangeText={setNotas}
                multiline
            />

            <TouchableOpacity style={styles.btnNext} onPress={handleNext}>
                <Text style={styles.btnNextText}>Siguiente: Subir Archivo</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btnCancel}
                onPress={() => navigation.navigate("Home")}
            >
                <Text style={styles.btnCancelText}>Cancelar</Text>
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
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: Colors.secondary,
    },
    subtitle: {
        color: Colors.textSecondary,
        marginBottom: 6,
    },
    progressContainer: {
        height: 6,
        backgroundColor: "#e5e7eb",
        borderRadius: 4,
        marginBottom: 16,
    },
    progressBar: {
        height: 6,
        width: "33%",
        backgroundColor: Colors.primary,
        borderRadius: 4,
    },
    description: {
        color: Colors.textSecondary,
        marginBottom: 16,
    },
    label: {
        fontWeight: "600",
        color: Colors.text,
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 8,
        padding: 10,
        marginTop: 4,
        color: Colors.text,
    },
    tipoBtn: {
        borderWidth: 1,
        borderColor: "#cbd5e1",
        borderRadius: 6,
        padding: 10,
        marginTop: 6,
    },
    tipoText: {
        color: Colors.text,
    },
    btnNext: {
        backgroundColor: "#0b2e42",
        borderRadius: 10,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 20,
    },
    btnNextText: {
        color: "#fff",
        fontWeight: "700",
    },
    btnCancel: {
        alignItems: "center",
        paddingVertical: 10,
        marginTop: 10,
    },
    btnCancelText: {
        color: Colors.textSecondary,
    },
    fileBox: {
        backgroundColor: "#F8FAFC",
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
    },
    fileTitle: {
        fontWeight: "600",
        color: Colors.text,
    },
    filePath: {
        fontSize: 12,
        color: Colors.textSecondary,
    },
});
