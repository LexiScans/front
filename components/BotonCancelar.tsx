import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    onPress: () => void;
};

const BotonCancelar = ({ onPress }: Props) => {
    return (
        <TouchableOpacity style={styles.cancelBtn} onPress={onPress}>
            <Ionicons name="close-circle-outline" size={20} color="white" />
            <Text style={styles.cancelText}>Cancelar suscripción</Text>
        </TouchableOpacity>
    );
};

export default BotonCancelar;

const styles = StyleSheet.create({
    cancelBtn: {
        backgroundColor: "#EF4444", // rojo
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 12,
    },
    cancelText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
        marginLeft: 8,
    },
});