import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Easing,
  Dimensions,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";

const { width, height } = Dimensions.get("window");

const ChatAssistantModal = ({ visible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardOffset(e.endCoordinates.height)
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardOffset(0)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const sendMessage = () => {
    if (inputText.trim() === "") return;
    const userMessage = { text: inputText, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
      Speech.speak(botResponse, { language: "es-ES" });
    }, 700);
  };

  const getBotResponse = (msg) => {
    const m = msg.toLowerCase();
    if (m.includes("hola"))
      return "¡Hola! ¿En qué parte del contrato necesitas ayuda?";
    if (m.includes("pago"))
      return "Los pagos se realizan dentro de los 30 días posteriores a la factura.";
    if (m.includes("terminación"))
      return "El contrato puede finalizar con aviso previo de 30 días.";
    return "Puedo explicarte cualquier parte del contrato: pagos, cláusulas o riesgos.";
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Animated.View style={[styles.modalContent, { opacity: fadeAnim }]}>
          <KeyboardAvoidingView
            style={[
              styles.keyboardAvoidingView,
              { marginBottom: keyboardOffset },
            ]}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.header}>
              <View style={styles.titleContainer}>
                <Ionicons
                  name="chatbubbles-outline"
                  size={22}
                  color="#1976D2"
                />
                <Text style={styles.title}>Asistente del Contrato</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={22} color="#555" />
              </TouchableOpacity>
            </View>

            <ScrollView
              ref={scrollViewRef}
              style={styles.messagesContainer}
              contentContainerStyle={{ paddingBottom: 16 }}
              showsVerticalScrollIndicator={false}
            >
              {messages.length === 0 ? (
                <View style={styles.welcomeBox}>
                  <Text style={styles.welcomeText}>
                    👋 ¡Hola! Soy tu asistente de contratos. Pregunta sobre
                    pagos, cláusulas o condiciones específicas y te ayudaré a
                    entenderlas mejor.
                  </Text>
                </View>
              ) : (
                messages.map((message, index) => (
                  <View
                    key={index}
                    style={[
                      styles.messageBubble,
                      message.isUser ? styles.userBubble : styles.botBubble,
                    ]}
                  >
                    <Text
                      style={message.isUser ? styles.userText : styles.botText}
                    >
                      {message.text}
                    </Text>
                  </View>
                ))
              )}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Escribe tu mensaje..."
                placeholderTextColor="#999"
                multiline
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  { backgroundColor: inputText.trim() ? "#1976D2" : "#E0E0E0" },
                ]}
                onPress={sendMessage}
                disabled={!inputText.trim()}
              >
                <Ionicons
                  name="send"
                  size={18}
                  color={inputText.trim() ? "#fff" : "#999"}
                />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    width: "100%",
    height: height * 0.88,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 12,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0D47A1",
  },
  closeButton: {
    padding: 6,
  },
  messagesContainer: {
    flex: 1,
    marginTop: 12,
  },
  welcomeBox: {
    backgroundColor: "#E3F2FD",
    borderRadius: 14,
    padding: 16,
    marginVertical: 10,
  },
  welcomeText: {
    color: "#0D47A1",
    fontSize: 15,
    lineHeight: 20,
    textAlign: "center",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 18,
    marginBottom: 10,
  },
  userBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#1976D2",
  },
  botBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#F5F5F5",
  },
  userText: {
    color: "#fff",
    fontSize: 15,
  },
  botText: {
    color: "#333",
    fontSize: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 8,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 15,
    color: "#222",
    backgroundColor: "#FAFAFA",
    maxHeight: 90,
  },
  sendButton: {
    marginLeft: 8,
    borderRadius: 20,
    padding: 10,
  },
});

export default ChatAssistantModal;
