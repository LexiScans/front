import React, { useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated } from "react-native";

type Props = {
    icon: string;
    title: string;
    price: string;
    contracts: string;
    questions: string;
    pdf: string;
    ads: string;
    description: string;
    onSelect: () => void;
    color: string;
    delay?: number;
};

const PlanCard = ({
                      icon,
                      title,
                      price,
                      contracts,
                      questions,
                      pdf,
                      ads,
                      description,
                      onSelect,
                      color,
                      delay = 0,
                  }: Props) => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.sequence([
            Animated.delay(delay),
            Animated.spring(animatedValue, {
                toValue: 1,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, [animatedValue, delay]);

    const rotateY = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["90deg", "0deg"],
    });

    const opacity = animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });

    return (
        <Animated.View
            style={[
                styles.card,
                {
                    transform: [{ rotateY }],
                    opacity,
                },
            ]}
        >
            <View style={styles.header}>
                <Text style={styles.icon}>{icon}</Text>
                <Text style={styles.title}>{title}</Text>
            </View>
            <Text style={styles.price}>{price} / mes</Text>

            <View style={styles.features}>
                <Text style={styles.feature}>📄 Contratos: {contracts}</Text>
                <Text style={styles.feature}>❓ Preguntas: {questions}</Text>
                <Text style={styles.feature}>📑 PDF: {pdf}</Text>
                <Text style={styles.feature}>📢 Anuncios: {ads}</Text>
            </View>

            <Text style={styles.description}>{description}</Text>

            <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onSelect}>
                <Text style={styles.buttonText}>Comprar plan</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default PlanCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        alignItems: "center",
        backfaceVisibility: "hidden",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
    },
    icon: {
        fontSize: 24,
        marginRight: 8,
    },
    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#111827",
    },
    price: {
        fontSize: 16,
        fontWeight: "600",
        color: "#2563EB",
        marginBottom: 12,
    },
    features: {
        marginBottom: 12,
        alignItems: "center",
    },
    feature: {
        fontSize: 14,
        color: "#374151",
        marginBottom: 4,
        textAlign: "center",
    },
    description: {
        fontSize: 14,
        color: "#6B7280",
        marginBottom: 12,
        textAlign: "center",
    },
    button: {
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        width: "100%",
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "600",
    },
});