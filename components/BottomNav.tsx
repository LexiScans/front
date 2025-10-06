import React, { useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Platform,
  Animated,
} from "react-native";
import { Colors } from "../theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Profile: undefined;
};

type Props = {
  onPressCentral: () => void;
};

export default function BottomNav({ onPressCentral }: Props) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate("Home")}
      >
        <Ionicons name="home-outline" size={22} color={Colors.secondary} />
        <Text style={styles.tabLabel}>Inicio</Text>
      </TouchableOpacity>

      <View style={styles.centerWrap}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={onPressCentral}
            style={styles.centerBtn}
          >
            <Ionicons name="add" size={28} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </View>

      <TouchableOpacity
        style={styles.tab}
        onPress={() => navigation.navigate("Profile")}
      >
        <Ionicons name="person-outline" size={22} color={Colors.secondary} />
        <Text style={styles.tabLabel}>Perfil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Platform.OS === "ios" ? 84 : 70,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 10,
  },
  tab: { alignItems: "center", justifyContent: "center", width: 60 },
  tabLabel: { fontSize: 11, color: Colors.textSecondary, marginTop: 2 },
  centerWrap: {
    position: "absolute",
    left: "63%",
    transform: [{ translateX: -36 }],
    top: -20,
    zIndex: 2,
  },
  centerBtn: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: Colors.accent,
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
});
