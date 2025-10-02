import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
    onPress: () => void;
};

const BotonEscoger = ({ onPress }: Props) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>Comprar plan</Text>
        </TouchableOpacity>
    );
};

export default BotonEscoger;

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#6fa7c7ff",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 12,
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});
