import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import SuccessModal from "../../../../components/SuccessModal";
import WarningModal from "../../../../components/WarningModal";
import { Colors } from "../../../../theme";

export default function ForgotPasswordScreen({ navigation }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const validatePassword = (p) => {
    if (p.length < 8) return "Debe tener mínimo 8 caracteres";
    if (!/[A-Z]/.test(p)) return "Debe tener al menos una mayúscula";
    if (!/[a-z]/.test(p)) return "Debe tener al menos una minúscula";
    if (!/[0-9]/.test(p)) return "Debe tener al menos un número";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(p))
      return "Debe tener un caracter especial";
    return null;
  };

  const sendEmail = async () => {
    if (!email) {
      setWarningMessage("Ingresa tu correo");
      setWarningVisible(true);
      return;
    }

    try {
      const r = await fetch(
        "https://lexyscan.duckdns.org/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      if (!r.ok) {
        const data = await r.json();
        setWarningMessage(data.message || "Error");
        setWarningVisible(true);
        return;
      }

      setStep(2);
    } catch (e) {
      setWarningMessage("Error de conexión");
      setWarningVisible(true);
    }
  };

  const confirm = async () => {
    if (!code || !newPassword) {
      setWarningMessage("Completa todos los campos");
      setWarningVisible(true);
      return;
    }

    const pwError = validatePassword(newPassword);
    if (pwError) {
      setWarningMessage(pwError);
      setWarningVisible(true);
      return;
    }

    try {
      const r = await fetch(
        "https://lexyscan.duckdns.org/auth/confirm-forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code, newPassword }),
        }
      );

      if (!r.ok) {
        const data = await r.json();
        setWarningMessage(data.message || "Error");
        setWarningVisible(true);
        return;
      }

      setSuccessVisible(true);
      setTimeout(() => navigation.navigate("Login"), 1000);
    } catch (e) {
      setWarningMessage("Error de conexión");
      setWarningVisible(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {step === 1 ? "Recuperar contraseña" : "Restablecer contraseña"}
        </Text>
        <Text style={styles.subtitle}>
          {step === 1
            ? "Ingresa tu correo para continuar"
            : "Ingresa el código y tu nueva contraseña"}
        </Text>
      </View>

      <View style={styles.form}>
        {step === 1 && (
          <>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              keyboardType="email-address"
              placeholder="tu@correo.com"
              placeholderTextColor="#9AA9B3"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />

            <TouchableOpacity style={styles.button} onPress={sendEmail}>
              <Text style={styles.buttonText}>Enviar código</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.back}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.backText}>Volver al inicio de sesión</Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.label}>Código de verificación</Text>
            <TextInput
              placeholder="123456"
              placeholderTextColor="#9AA9B3"
              style={styles.input}
              value={code}
              onChangeText={setCode}
            />

            <Text style={[styles.label, { marginTop: 16 }]}>
              Nueva contraseña
            </Text>
            <View style={styles.passwordContainer}>
              <TextInput
                placeholder="••••••••"
                placeholderTextColor="#9AA9B3"
                secureTextEntry={!showPass}
                style={styles.passwordInput}
                value={newPassword}
                onChangeText={setNewPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPass(!showPass)}
              >
                <Ionicons
                  name={showPass ? "eye-off" : "eye"}
                  size={22}
                  color="#6B7280"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.button} onPress={confirm}>
              <Text style={styles.buttonText}>Confirmar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <SuccessModal
        visible={successVisible}
        onClose={() => setSuccessVisible(false)}
        title="Contraseña actualizada"
        message="Ya puedes iniciar sesión"
      />

      <WarningModal
        visible={warningVisible}
        onClose={() => setWarningVisible(false)}
        title="Error"
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
  button: {
    marginTop: 20,
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
  back: { marginTop: 12, alignItems: "center" },
  backText: { color: Colors.accent, fontWeight: "600" },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F6F8",
    borderRadius: 10,
    height: 46,
    paddingHorizontal: 12,
  },
  passwordInput: {
    flex: 1,
    color: Colors.text,
  },
  eyeButton: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
});
