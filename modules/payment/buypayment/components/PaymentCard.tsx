import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CARD_WIDTH = 280;
const CARD_HEIGHT = 170;

type PaymentCardProps = {
  type?: string;
  number: string; 
  holder?: string;
  expiry?: string;
  color?: string;
};

export default function PaymentCard({
  type = "",
  number,
  holder = "",
  expiry = "",
  color = "#171717",
}: PaymentCardProps) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const currentValueRef = useRef(0);

  useEffect(() => {
    const id = animatedValue.addListener(({ value }) => {
      currentValueRef.current = value;
    });
    return () => animatedValue.removeListener(id);
  }, [animatedValue]);

  const flipCard = () => {
    const toValue = currentValueRef.current >= 90 ? 0 : 180;
    Animated.spring(animatedValue, {
      toValue,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
  };

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const maskedNumber = `**** **** **** ${number}`;

  return (
    <TouchableWithoutFeedback onPress={flipCard}>
      <View style={styles.wrapper}>
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: color,
              transform: [{ perspective: 1000 }, { rotateY: frontInterpolate }],
            },
          ]}
        >
          <Text style={styles.small}>{type}</Text>
          <Ionicons
            name="card-outline"
            size={28}
            color="#ff9800"
            style={styles.icon}
          />

          <Text style={styles.number}>{maskedNumber}</Text>

          <View style={styles.row}>
            <Text style={styles.date}>{expiry}</Text>
            <Text style={styles.name}>{holder}</Text>
          </View>
        </Animated.View>

        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor: color,
              transform: [{ perspective: 1000 }, { rotateY: backInterpolate }],
            },
          ]}
        >
          <View style={styles.blackStrip} />
          <View style={styles.whiteStrip} />
          <View style={styles.cvvBox}>
            <Text style={styles.cvvText}>***</Text>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    position: "relative",
  },
  card: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 16,
    padding: 18,
    justifyContent: "flex-end",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
    backfaceVisibility: "hidden",
  },

  small: {
    position: "absolute",
    top: 14,
    left: 18,
    color: "#e5e7eb",
    fontSize: 12,
    letterSpacing: 2,
  },
  icon: {
    position: "absolute",
    top: 12,
    right: 12,
  },
  number: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 2,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  date: {
    color: "#e5e7eb",
    fontSize: 14,
  },
  name: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  blackStrip: {
    height: 36,
    width: "100%",
    backgroundColor: "#000",
    marginBottom: 14,
  },
  whiteStrip: {
    height: 26,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  cvvBox: {
    alignSelf: "flex-end",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  cvvText: {
    color: "#000",
    fontWeight: "700",
  },
});
