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
import ENV from "../config/env";

const { height } = Dimensions.get("window");

const TypingDots = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(dot, {
            toValue: -4,
            duration: 300,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    animateDot(dot1, 0);
    animateDot(dot2, 150);
    animateDot(dot3, 300);
  }, []);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
      {[dot1, dot2, dot3].map((dot, i) => (
        <Animated.View
          key={i}
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: "#1976D2",
            marginHorizontal: 2,
            transform: [{ translateY: dot }],
          }}
        />
      ))}
    </View>
  );
};

const ChatAssistantModal = ({ visible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [keyboardOffset, setKeyboardOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [typingText, setTypingText] = useState("");
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

  const askBackend = async (question) => {
    try {
      const response = await fetch(
        "https://485t7d4i73.execute-api.us-east-1.amazonaws.com/develop/ia/ask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question,
            contract_id: "contrato2.pdf",
          }),
        }
      );
      if (!response.ok) throw new Error(`Error: ${response.status}`);
      const data = await response.json();
      return data.answer;
    } catch (error) {
      return "Lo siento, hubo un error al procesar tu pregunta. Por favor intenta nuevamente.";
    }
  };

  const typeText = (text, index = 0) => {
    if (index < text.length) {
      setTypingText(text.substring(0, index + 1));
      setTimeout(() => typeText(text, index + 1), 30);
    } else {
      setIsLoading(false);
      Speech.speak(text, { language: "es-ES" });
    }
  };

  const getGenericResponse = (msg) => {
    if (msg.includes("hola") || msg.includes("hi") || msg.includes("hello"))
      return "¡Hola! Soy tu asistente legal. Puedo ayudarte a entender cualquier parte del contrato. ¿Sobre qué cláusula necesitas información?";
    if (msg.includes("qué tal") || msg.includes("como estas"))
      return "¡Estoy aquí para ayudarte! Puedo explicarte términos del contrato, cláusulas específicas o resolver tus dudas legales.";
    if (msg.includes("gracias") || msg.includes("thanks"))
      return "¡De nada! ¿Hay algo más del contrato que te gustaría entender mejor?";
    return "Puedo ayudarte a analizar el contrato. ¿Sobre qué aspecto específico tienes dudas?";
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    const userMessage = { text: inputText, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setTypingText("");
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: "", isUser: false }]);

    const lowerInput = inputText.toLowerCase();
    const genericQuestions = [
      "hola",
      "hi",
      "hello",
      "qué tal",
      "como estas",
      "qué pasa",
      "buenos días",
      "buenas tardes",
      "buenas noches",
    ];
    const isGenericQuestion = genericQuestions.some((q) =>
      lowerInput.includes(q)
    );

    const botResponse = isGenericQuestion
      ? getGenericResponse(lowerInput)
      : await askBackend(inputText);
    typeText(botResponse);
  };

  useEffect(() => {
    if (typingText && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      if (!lastMessage.isUser) {
        const updatedMessages = [...messages];
        updatedMessages[updatedMessages.length - 1] = {
          ...lastMessage,
          text: typingText,
        };
        setMessages(updatedMessages);
      }
    }
  }, [typingText]);

  useEffect(() => {
    if (scrollViewRef.current)
      scrollViewRef.current.scrollToEnd({ animated: true });
  }, [messages, typingText]);

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
              showsVerticalScrollIndicator={true}
              scrollEventThrottle={16}
            >
              {messages.length === 0 ? (
                <View style={styles.welcomeBox}>
                  <Text style={styles.welcomeText}>
                    👋 ¡Hola! Soy tu asistente de contratos. Puedo explicarte
                    cualquier parte del documento: cláusulas, pagos,
                    obligaciones o términos legales específicos.
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
                    {message.isUser ? (
                      <Text style={styles.userText}>{message.text}</Text>
                    ) : (
                      <View style={{ flexShrink: 1 }}>
                        {message.text ? (
                          <Text style={styles.botText}>{message.text}</Text>
                        ) : (
                          <TypingDots />
                        )}
                      </View>
                    )}
                  </View>
                ))
              )}
            </ScrollView>

            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Pregunta sobre el contrato..."
                placeholderTextColor="#999"
                multiline
                onSubmitEditing={sendMessage}
                returnKeyType="send"
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  {
                    backgroundColor:
                      inputText.trim() && !isLoading ? "#1976D2" : "#E0E0E0",
                  },
                ]}
                onPress={sendMessage}
                disabled={!inputText.trim() || isLoading}
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
  keyboardAvoidingView: { flex: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  titleContainer: { flexDirection: "row", alignItems: "center", gap: 8 },
  title: { fontSize: 17, fontWeight: "600", color: "#0D47A1" },
  closeButton: { padding: 6 },
  messagesContainer: { flex: 1, marginTop: 12 },
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
    maxWidth: "75%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    marginBottom: 6,
    flexShrink: 1,
  },
  userBubble: { alignSelf: "flex-end", backgroundColor: "#1976D2" },
  botBubble: { alignSelf: "flex-start", backgroundColor: "#F1F1F1" },
  userText: { color: "#fff", fontSize: 15 },
  botText: { color: "#333", fontSize: 15, lineHeight: 20 },
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
    maxHeight: 120,
  },
  sendButton: {
    marginLeft: 8,
    borderRadius: 20,
    padding: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatAssistantModal;
