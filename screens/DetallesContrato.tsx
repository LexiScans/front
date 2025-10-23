import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Platform,
    SafeAreaView,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../theme";
import { useNavigation } from "@react-navigation/native";

interface Parte {
    nombre: string;
}

export default function DetallesContrato() {
    const navigation = useNavigation();
    const [titulo, setTitulo] = useState("");
    const [tipo, setTipo] = useState("");
    const [partes, setPartes] = useState<Parte[]>([{ nombre: "" }]);
    const [fechaFirma, setFechaFirma] = useState<Date | null>(null);
    const [vencimiento, setVencimiento] = useState<Date | null>(null);
    const [notas, setNotas] = useState("");

    const [mostrarFirmaPicker, setMostrarFirmaPicker] = useState(false);
    const [mostrarVencimientoPicker, setMostrarVencimientoPicker] = useState(false);

    const tiposContrato = [
        { label: "Empleo", value: "Empleo" },
        { label: "Servicios", value: "Servicios" },
        { label: "Arrendamiento", value: "Arrendamiento" },
        { label: "Confidencialidad", value: "Confidencialidad" },
        { label: "Ventas", value: "Ventas" },
        { label: "Licencia", value: "Licencia" },
        { label: "Préstamo", value: "Préstamo" },
    ];

    const agregarParte = () => setPartes([...partes, { nombre: "" }]);

    const actualizarParte = (index: number, valor: string) => {
        const nuevasPartes = [...partes];
        nuevasPartes[index].nombre = valor;
        setPartes(nuevasPartes);
    };

    const formatearFecha = (fecha: Date | null) => {
        if (!fecha) return "";
        const year = fecha.getFullYear();
        const month = (fecha.getMonth() + 1).toString().padStart(2, "0");
        const day = fecha.getDate().toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Detalles del Contrato</Text>
                <Text style={styles.subtitle}>Paso 1 de 3</Text>

                <View style={styles.progressContainer}>
                    <View style={styles.progressBar} />
                </View>

                <Text style={styles.description}>
                    Completa la información clave de tu contrato para una mejor organización.
                </Text>

                {/* Título */}
                <Text style={styles.label}>Título del Contrato</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ej. Contrato de Arrendamiento"
                    value={titulo}
                    onChangeText={setTitulo}
                />

                {/* Tipo (Dropdown) */}
                <Text style={styles.label}>Tipo de Contrato</Text>
                <RNPickerSelect
                    onValueChange={(value) => setTipo(value)}
                    items={tiposContrato}
                    placeholder={{ label: "Selecciona el tipo de contrato", value: null }}
                    style={pickerSelectStyles}
                    value={tipo}
                />

                {/* Partes involucradas */}
                <Text style={styles.label}>Partes Involucradas</Text>
                {partes.map((parte, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        placeholder="Ej. Juan Pérez"
                        value={parte.nombre}
                        onChangeText={(text) => actualizarParte(index, text)}
                    />
                ))}
                <TouchableOpacity onPress={agregarParte}>
                    <Text style={styles.addLink}>+ Añadir otra parte</Text>
                </TouchableOpacity>

                {/* Fechas */}
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 6 }}>
                        <Text style={styles.label}>Fecha de Firma</Text>
                        <TouchableOpacity
                            onPress={() => setMostrarFirmaPicker(true)}
                            style={styles.input}
                        >
                            <Text>
                                {fechaFirma ? formatearFecha(fechaFirma) : "Seleccionar fecha"}
                            </Text>
                        </TouchableOpacity>

                        {mostrarFirmaPicker && (
                            <DateTimePicker
                                value={fechaFirma || new Date()}
                                mode="date"
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                onChange={(event, selectedDate) => {
                                    setMostrarFirmaPicker(Platform.OS === "ios");
                                    if (selectedDate) setFechaFirma(selectedDate);
                                }}
                            />
                        )}
                    </View>

                    <View style={{ flex: 1, marginLeft: 6 }}>
                        <Text style={styles.label}>Vencimiento</Text>
                        <TouchableOpacity
                            onPress={() => setMostrarVencimientoPicker(true)}
                            style={styles.input}
                        >
                            <Text>
                                {vencimiento ? formatearFecha(vencimiento) : "Seleccionar fecha"}
                            </Text>
                        </TouchableOpacity>

                        {mostrarVencimientoPicker && (
                            <DateTimePicker
                                value={vencimiento || new Date()}
                                mode="date"
                                display={Platform.OS === "ios" ? "spinner" : "default"}
                                onChange={(event, selectedDate) => {
                                    setMostrarVencimientoPicker(Platform.OS === "ios");
                                    if (selectedDate) setVencimiento(selectedDate);
                                }}
                            />
                        )}
                    </View>
                </View>

                {/* Notas */}
                <Text style={styles.label}>Notas</Text>
                <TextInput
                    style={[styles.input, { height: 100, textAlignVertical: "top" }]}
                    multiline
                    placeholder="Añade comentarios o detalles importantes aquí..."
                    value={notas}
                    onChangeText={setNotas}
                />

                {/* Botones */}
                <TouchableOpacity
                    style={styles.nextBtn}
                    onPress={() => navigation.navigate("PrevisualizacionContrato" as never)}
                >
                    <Text style={styles.nextText}>Siguiente: Subir Archivo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate("Home" as never)}
                >
                    <Text style={styles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: Colors.text,
        marginTop: 50,
    },
    subtitle: {
        color: Colors.textSecondary,
        marginBottom: 4,
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
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        marginTop: 6,
        backgroundColor: "#F9FAFB",
    },
    addLink: {
        color: Colors.primary,
        fontWeight: "600",
        marginTop: 8,
    },
    row: {
        flexDirection: "row",
        marginTop: 8,
    },
    nextBtn: {
        backgroundColor: Colors.primary,
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    nextText: {
        color: "#fff",
        fontWeight: "700",
    },
    cancelText: {
        color: Colors.textSecondary,
        textAlign: "center",
        marginTop: 10,
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        color: Colors.text,
        backgroundColor: "#F9FAFB",
        marginTop: 6,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        color: Colors.text,
        backgroundColor: "#F9FAFB",
        marginTop: 6,
    },
});
