import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
    currentPlan: string;   // "Basic" | "Medium"
    onPress: (targetPlan: string) => void;
};

const BotonMejorarPlan = ({ currentPlan, onPress }: Props) => {
    let nextPlans: string[] = [];

    if (currentPlan.toLowerCase() === "basic") {
        nextPlans = ["Medium", "Full"];
    } else if (currentPlan.toLowerCase() === "medium") {
        nextPlans = ["Full"];
    }

    if (nextPlans.length === 0) return null;

    return (
        <>
            {nextPlans.map((plan) => (
                <TouchableOpacity
                    key={plan}
                    style={styles.btn}
                    onPress={() => onPress(plan)}
                >
                    <Text style={styles.text}>Mejorar a {plan}</Text>
                </TouchableOpacity>
            ))}
        </>
    );
};

export default BotonMejorarPlan;

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#2563EB",
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
