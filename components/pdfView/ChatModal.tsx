import React, { useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";

interface Message {
  text: string;
  isUser: boolean;
}

interface ChatModalProps {
  visible: boolean;
  messages: Message[];
  inputText: string;
  onClose: () => void;
  onSend: () => void;
  onChangeText: (text: string) => void;
}

const { width } = Dimensions.get("window");

const ChatModal: React.FC<ChatModalProps> = ({
  visible,
  messages,
  inputText,
  onClose,
  onSend,
  onChangeText,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible]);

  useEffect(() => {
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const formatTime = () => {
    return new Date().toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <Animated.View style={[styles.chatContainer, { opacity: fadeAnim }]}>
        {/* Header Profesional */}
        <View style={styles.chatHeader}>
          <View style={styles.headerContent}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>⚖️</Text>
            </View>
            <View style={styles.headerText}>
              <Text style={styles.chatTitle}>Asesor de Contratos</Text>
              <Text style={styles.chatSubtitle}>Disponible • Tiempo real</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
        </View>

        {/* Área de Mensajes */}
        <View style={styles.chatBackground}>
          <ScrollView
            ref={scrollViewRef}
            style={styles.messagesContainer}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.messagesContent}
          >
            {messages.length === 0 ? (
              <View style={styles.welcomeContainer}>
                <View style={styles.welcomeIcon}>
                  <Text style={styles.welcomeIconText}>📋</Text>
                </View>
                <View style={styles.welcomeMessage}>
                  <Text style={styles.welcomeTitle}>
                    Asistencia de Contrato
                  </Text>
                  <Text style={styles.welcomeText}>
                    Estoy aquí para ayudarte a comprender cada sección de tu
                    documento. Puedo explicarte términos, cláusulas y responder
                    tus preguntas.
                  </Text>
                  <View style={styles.suggestionChips}>
                    <View style={styles.chip}>
                      <Text style={styles.chipText}>Términos de pago</Text>
                    </View>
                    <View style={styles.chip}>
                      <Text style={styles.chipText}>Cláusulas importantes</Text>
                    </View>
                    <View style={styles.chip}>
                      <Text style={styles.chipText}>Obligaciones</Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : (
              messages.map((m, i) => (
                <View
                  key={i}
                  style={[
                    styles.messageRow,
                    m.isUser ? styles.userRow : styles.botRow,
                  ]}
                >
                  {!m.isUser && (
                    <View style={styles.botAvatar}>
                      <Text style={styles.botAvatarText}>⚖️</Text>
                    </View>
                  )}
                  <View style={styles.messageContent}>
                    <View
                      style={[
                        styles.messageBubble,
                        m.isUser ? styles.userMessage : styles.botMessage,
                      ]}
                    >
                      <Text
                        style={[
                          styles.messageText,
                          m.isUser ? styles.userText : styles.botText,
                        ]}
                      >
                        {m.text}
                      </Text>
                    </View>
                    <Text style={styles.messageTime}>{formatTime()}</Text>
                  </View>
                  {m.isUser && (
                    <View style={styles.userAvatar}>
                      <Text style={styles.userAvatarText}>TÚ</Text>
                    </View>
                  )}
                </View>
              ))
            )}
          </ScrollView>
        </View>

        {/* Input Profesional */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.inputContainer}
        >
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={onChangeText}
              placeholder="Escribe tu consulta sobre el contrato..."
              placeholderTextColor="#8E8E93"
              multiline
              maxLength={500}
            />
            <TouchableOpacity
              style={[
                styles.sendButton,
                !inputText.trim() && styles.sendButtonDisabled,
              ]}
              onPress={onSend}
              disabled={!inputText.trim()}
            >
              <Text style={styles.sendButtonIcon}>➤</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.inputHint}>
            Escribe tu pregunta y presiona enviar
          </Text>
        </KeyboardAvoidingView>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  chatBackground: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },

  // Header Styles
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5EA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1C6EF2",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
  },
  headerText: {
    flex: 1,
  },
  chatTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1C1C1E",
  },
  chatSubtitle: {
    fontSize: 13,
    color: "#8E8E93",
    marginTop: 2,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#F2F2F7",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 20,
    color: "#8E8E93",
    fontWeight: "300",
    lineHeight: 20,
  },

  // Messages Styles
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    paddingBottom: 10,
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 40,
    marginBottom: 30,
  },
  welcomeIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#1C6EF2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  welcomeIconText: {
    fontSize: 24,
  },
  welcomeMessage: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 16,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F2F2F7",
  },
  welcomeTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1C1C1E",
    textAlign: "center",
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 15,
    color: "#666666",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 20,
  },
  suggestionChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },
  chip: {
    backgroundColor: "#1C6EF2",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  chipText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "500",
  },

  // Message Bubbles
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 4,
    maxWidth: "100%",
  },
  userRow: {
    justifyContent: "flex-end",
  },
  botRow: {
    justifyContent: "flex-start",
  },
  messageContent: {
    maxWidth: "80%",
    marginHorizontal: 8,
  },
  messageBubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 18,
  },
  userMessage: {
    backgroundColor: "#1C6EF2",
    borderBottomRightRadius: 6,
  },
  botMessage: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 6,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.3,
  },
  userText: {
    color: "#FFFFFF",
  },
  botText: {
    color: "#1C1C1E",
  },
  messageTime: {
    fontSize: 11,
    color: "#8E8E93",
    marginTop: 4,
    marginHorizontal: 4,
    fontWeight: "400",
  },

  // Avatar Styles
  botAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#1C6EF2",
    justifyContent: "center",
    alignItems: "center",
  },
  botAvatarText: {
    fontSize: 12,
  },
  userAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#34C759",
    justifyContent: "center",
    alignItems: "center",
  },
  userAvatarText: {
    fontSize: 10,
    color: "#FFFFFF",
    fontWeight: "600",
  },

  // Input Styles
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderColor: "#E5E5EA",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "#F2F2F7",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#E5E5EA",
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#1C1C1E",
    maxHeight: 100,
    paddingVertical: 8,
    paddingRight: 12,
    lineHeight: 20,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#1C6EF2",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  sendButtonDisabled: {
    backgroundColor: "#C7C7CC",
  },
  sendButtonIcon: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 2,
  },
  inputHint: {
    fontSize: 12,
    color: "#8E8E93",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "400",
  },
});

export default ChatModal;
