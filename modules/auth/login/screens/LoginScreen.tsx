import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from "react-native";
import { Colors } from "../../../../theme";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any, any>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const btnScale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(btnScale, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () =>
    Animated.spring(btnScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();

  const handleLogin = () => {
    navigation.replace("Home");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Lexiscan</Text>
        <Text style={styles.subtitle}>
          Analiza contratos de forma rápida y segura
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          keyboardType="email-address"
          placeholder="tu@correo.com"
          placeholderTextColor="#9AA9B3"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Contraseña</Text>
        <TextInput
          placeholder="••••••••"
          placeholderTextColor="#9AA9B3"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <Animated.View
          style={{ transform: [{ scale: btnScale }], marginTop: 24 }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={handleLogin}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Acceder</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={styles.register}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.registerText}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: "center",
    padding: 24,
  },
  header: { marginBottom: 24, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "700", color: Colors.secondary },
  subtitle: { fontSize: 14, color: Colors.textSecondary, marginTop: 6 },
  form: {
    backgroundColor: "white",
    borderRadius: 14,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  label: { fontSize: 12, color: Colors.textSecondary, marginBottom: 6 },
  input: {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#F2F6F8",
    paddingHorizontal: 12,
    color: Colors.text,
  },
  loginButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonText: { color: "white", fontWeight: "700", fontSize: 16 },
  register: { marginTop: 12, alignItems: "center" },
  registerText: { color: Colors.accent, fontWeight: "600" },
});
