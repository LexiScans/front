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
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import SuccessModal from "../../../../components/SuccessModal";
import WarningModal from "../../../../components/WarningModal";

type Props = NativeStackScreenProps<any, any>;

const VerifyModal = ({ visible, email, onClose, onSuccess }) => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      if (value !== "" && index < 5) inputs.current[index + 1].focus();
    }
  };

  const sendVerification = async () => {
    const finalCode = code.join("");
    if (finalCode.length !== 6) return;

    try {
      const res = await fetch("https://lexyscan.duckdns.org/auth/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: finalCode }),
      });

      if (!res.ok) {
        onClose();
        return;
      }

      onSuccess();
    } catch {
      onClose();
    }
  };

  return (
    <View
      style={[stylesV.modalBackground, { display: visible ? "flex" : "none" }]}
    >
      <View style={stylesV.modalContainer}>
        <Text style={stylesV.title}>Verificación</Text>
        <Text style={stylesV.subtitle}>Código enviado a {email}</Text>

        <View style={stylesV.codeRow}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              style={stylesV.codeInput}
              value={digit}
              onChangeText={(v) => handleChange(v, index)}
              maxLength={1}
              keyboardType="number-pad"
            />
          ))}
        </View>

        <TouchableOpacity style={stylesV.btn} onPress={sendVerification}>
          <Text style={stylesV.btnText}>Verificar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onClose}>
          <Text style={stylesV.cancel}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [strength, setStrength] = useState(0);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const [requirements, setRequirements] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false,
  });

  const [successVisible, setSuccessVisible] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  const [verifyVisible, setVerifyVisible] = useState(false);

  const btnScale = useRef(new Animated.Value(1)).current;

  const onPressIn = () =>
    Animated.spring(btnScale, { toValue: 0.97, useNativeDriver: true }).start();
  const onPressOut = () =>
    Animated.spring(btnScale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();

  const passwordScore = (pwd) => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd)) s++;
    if (/[a-z]/.test(pwd)) s++;
    if (/[0-9]/.test(pwd)) s++;
    if (/[!@#$%^&*()\-_=+{};:,<.>]/.test(pwd)) s++;
    return s;
  };

  useEffect(() => {
    setStrength(passwordScore(password));
    setRequirements({
      length: password.length >= 8,
      upper: /[A-Z]/.test(password),
      lower: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*()\-_=+{};:,<.>]/.test(password),
    });
  }, [password]);

  const validateField = (field, value) => {
    const e = { ...errors };

    if (field === "name")
      e.name = value.trim() === "" ? "El nombre es obligatorio" : "";
    if (field === "email") {
      if (!value) e.email = "El email es obligatorio";
      else if (!/\S+@\S+\.\S+/.test(value)) e.email = "Email inválido";
      else e.email = "";
    }
    if (field === "password") {
      if (!value) e.password = "La contraseña es obligatoria";
      else if (value.length < 8)
        e.password = "Debe tener al menos 8 caracteres";
      else e.password = "";

      if (confirmPassword && confirmPassword !== value)
        e.confirm = "Las contraseñas no coinciden";
      else if (confirmPassword) e.confirm = "";
    }
    if (field === "confirmPassword") {
      if (value !== password) e.confirm = "Las contraseñas no coinciden";
      else e.confirm = "";
    }

    setErrors(e);
  };

  const validateCognitoPassword = (pwd) => {
    if (pwd.length < 8) return "La contraseña debe tener al menos 8 caracteres";
    if (!/[A-Z]/.test(pwd)) return "Debe tener una mayúscula";
    if (!/[a-z]/.test(pwd)) return "Debe tener una minúscula";
    if (!/[0-9]/.test(pwd)) return "Debe tener un número";
    if (!/[!@#$%^&*()\-_=+{};:,<.>]/.test(pwd))
      return "Debe tener un carácter especial";
    return null;
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setWarningMessage("Por favor completa todos los campos");
      setWarningVisible(true);
      return;
    }

    if (password !== confirmPassword) {
      setWarningMessage("Las contraseñas no coinciden");
      setWarningVisible(true);
      return;
    }

    const pwdErr = validateCognitoPassword(password);
    if (pwdErr) {
      setWarningMessage(pwdErr);
      setWarningVisible(true);
      return;
    }

    try {
      const res = await fetch("https://lexyscan.duckdns.org/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setWarningMessage(errorData.message || "Registro fallido");
        setWarningVisible(true);
        return;
      }

      setVerifyVisible(true);
    } catch (err) {
      setWarningMessage(err.message || "Registro fallido");
      setWarningVisible(true);
    }
  };

  const allValid =
    name &&
    email &&
    password &&
    confirmPassword &&
    Object.values(errors).every((e) => e === "");

  const strengthColors = [
    "#D32F2F",
    "#F57C00",
    "#FBC02D",
    "#388E3C",
    "#2E7D32",
  ];

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Únete a Lexiscan en segundos</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nombre completo</Text>
        <TextInput
          placeholder="Juan Pérez"
          placeholderTextColor="#9AA9B3"
          style={styles.input}
          value={name}
          onChangeText={(v) => {
            setName(v);
            validateField("name", v);
          }}
        />
        {errors.name !== "" && <Text style={styles.error}>{errors.name}</Text>}

        <Text style={[styles.label, { marginTop: 16 }]}>Email</Text>
        <TextInput
          keyboardType="email-address"
          placeholder="tu@correo.com"
          placeholderTextColor="#9AA9B3"
          style={styles.input}
          value={email}
          onChangeText={(v) => {
            setEmail(v);
            validateField("email", v);
          }}
        />
        {errors.email !== "" && (
          <Text style={styles.error}>{errors.email}</Text>
        )}

        <Text style={[styles.label, { marginTop: 16 }]}>Contraseña</Text>

        <View style={styles.passwordWrapper}>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#9AA9B3"
            secureTextEntry={!showPassword}
            style={[styles.input, { flex: 1 }]}
            value={password}
            onChangeText={(v) => {
              setPassword(v);
              validateField("password", v);
            }}
          />

          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? "eye-off-outline" : "eye-outline"}
              size={26}
              color="#4A4A4A"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.strengthBarContainer}>
          <View
            style={[
              styles.strengthBar,
              {
                width: `${(strength / 5) * 100}%`,
                backgroundColor: strengthColors[strength - 1] || "#ccc",
              },
            ]}
          />
        </View>

        <Text style={[styles.label, { marginTop: 16 }]}>
          Confirmar contraseña
        </Text>

        <View style={styles.passwordWrapper}>
          <TextInput
            placeholder="••••••••"
            placeholderTextColor="#9AA9B3"
            secureTextEntry={!showConfirm}
            style={[styles.input, { flex: 1 }]}
            value={confirmPassword}
            onChangeText={(v) => {
              setConfirmPassword(v);
              validateField("confirmPassword", v);
            }}
          />
          <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
            <Ionicons
              name={showConfirm ? "eye-off-outline" : "eye-outline"}
              size={26}
              color="#4A4A4A"
            />
          </TouchableOpacity>
        </View>

        {errors.confirm !== "" && (
          <Text style={styles.error}>{errors.confirm}</Text>
        )}

        <View style={{ marginTop: 12 }}>
          <Text
            style={[
              styles.req,
              { color: requirements.length ? "green" : "red" },
            ]}
          >
            {requirements.length ? "✔" : "✘"} 8 caracteres
          </Text>
          <Text
            style={[
              styles.req,
              { color: requirements.upper ? "green" : "red" },
            ]}
          >
            {requirements.upper ? "✔" : "✘"} Una mayúscula
          </Text>
          <Text
            style={[
              styles.req,
              { color: requirements.lower ? "green" : "red" },
            ]}
          >
            {requirements.lower ? "✔" : "✘"} Una minúscula
          </Text>
          <Text
            style={[
              styles.req,
              { color: requirements.number ? "green" : "red" },
            ]}
          >
            {requirements.number ? "✔" : "✘"} Un número
          </Text>
          <Text
            style={[
              styles.req,
              { color: requirements.special ? "green" : "red" },
            ]}
          >
            {requirements.special ? "✔" : "✘"} Un símbolo
          </Text>
        </View>

        <Animated.View
          style={{ transform: [{ scale: btnScale }], marginTop: 24 }}
        >
          <TouchableOpacity
            activeOpacity={0.9}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            disabled={!allValid}
            onPress={handleRegister}
            style={[styles.registerButton, { opacity: allValid ? 1 : 0.6 }]}
          >
            <Text style={styles.registerButtonText}>Registrarse</Text>
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.loginText}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>

      <SuccessModal
        visible={successVisible}
        onClose={() => {
          setSuccessVisible(false);
          navigation.replace("Login");
        }}
        title="Registro exitoso"
        message="Debes ahora verificar tu cuenta"
      />

      <WarningModal
        visible={warningVisible}
        onClose={() => setWarningVisible(false)}
        title="Registro fallido"
        message={warningMessage}
      />

      <VerifyModal
        visible={verifyVisible}
        email={email}
        onClose={() => setVerifyVisible(false)}
        onSuccess={() => {
          setVerifyVisible(false);
          navigation.replace("Login");
        }}
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
  passwordWrapper: { flexDirection: "row", alignItems: "center" },
  strengthBarContainer: {
    width: "100%",
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginTop: 8,
  },
  strengthBar: { height: 6, borderRadius: 4 },
  req: { fontSize: 12, marginTop: 2 },
  registerButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonText: { color: "white", fontWeight: "700", fontSize: 16 },
  login: { marginTop: 12, alignItems: "center" },
  loginText: { color: Colors.accent, fontWeight: "600" },
  error: { color: "red", marginTop: 4, fontSize: 12 },
});

const stylesV = StyleSheet.create({
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  modalContainer: {
    width: "85%",
    backgroundColor: "white",
    padding: 22,
    borderRadius: 16,
    alignItems: "center",
  },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 8 },
  subtitle: { color: "#6A6A6A", marginBottom: 18, textAlign: "center" },
  codeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  codeInput: {
    width: 40,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#F2F4F7",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
  btn: {
    marginTop: 18,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 10,
  },
  btnText: { color: "white", fontSize: 16, fontWeight: "700" },
  cancel: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.accent,
    fontWeight: "600",
  },
});
