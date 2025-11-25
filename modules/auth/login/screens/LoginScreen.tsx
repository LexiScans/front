import React, { useState, useRef, useEffect } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import SuccessModal from "../../../../components/SuccessModal";
import WarningModal from "../../../../components/WarningModal";
import { Ionicons } from "@expo/vector-icons";

type Props = NativeStackScreenProps<any, any>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const btnScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loadSavedCredentials = async () => {
      try {
        const savedEmail = await AsyncStorage.getItem("savedEmail");
        const savedPassword = await AsyncStorage.getItem("savedPassword");
        if (savedEmail) setEmail(savedEmail);
        if (savedPassword) setPassword(savedPassword);
      } catch {}
    };
    loadSavedCredentials();
  }, []);

  const onPressIn = () =>
    Animated.spring(btnScale, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () =>
    Animated.spring(btnScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();

  const handleLogin = async () => {
    if (!email || !password) {
      setWarningMessage("Por favor completa todos los campos");
      setWarningVisible(true);
      return;
    }

    try {
      const res = await fetch("https://lexyscan.duckdns.org/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setWarningMessage(errorData.message || "Login fallido");
        setWarningVisible(true);
        return;
      }

      const data = await res.json();
      await AsyncStorage.setItem("idToken", data.idToken);
      await AsyncStorage.setItem("userId", data.userId);
      await AsyncStorage.setItem("savedEmail", email);

      setSuccessVisible(true);
    } catch (err: any) {
      setWarningMessage(err.message || "Login fallido");
      setWarningVisible(true);
    }
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
          autoComplete={Platform.OS === "android" ? "email" : "emailAddress"}
          textContentType="username"
        />

        <Text style={[styles.label, { marginTop: 16 }]}>Contraseña</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#9AA9B3"
            secureTextEntry={!passwordVisible}
            style={styles.passwordInput}
            value={password}
            onChangeText={setPassword}
            autoComplete={Platform.OS === "android" ? "password" : "password"}
            textContentType="password"
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={passwordVisible ? "eye-off-outline" : "eye-outline"}
              size={22}
              color="#6A6A6A"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("ForgotPassword")}
          style={{ marginTop: 8, alignSelf: "flex-end" }}
        >
          <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>

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

      <SuccessModal
        visible={successVisible}
        onClose={() => {
          setSuccessVisible(false);
          navigation.replace("Home");
        }}
        title="Login exitoso"
        message="Has iniciado sesión correctamente"
      />

      <WarningModal
        visible={warningVisible}
        onClose={() => setWarningVisible(false)}
        title="Login fallido"
        message={warningMessage}
      />
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
  passwordContainer: {
    height: 46,
    borderRadius: 10,
    backgroundColor: "#F2F6F8",
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 12,
    color: Colors.text,
  },
  eyeButton: {
    paddingHorizontal: 6,
  },
  forgot: {
    color: Colors.accent,
    fontWeight: "600",
    fontSize: 13,
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
