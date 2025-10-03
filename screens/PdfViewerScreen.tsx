import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";

const PdfViewerScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);
  const [inputText, setInputText] = useState("");

  const pdfUrl = "https://cimav.edu.mx/pnt/LGPDPPSO/2.2.2.pdf";
  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    pdfUrl
  )}`;

  const sendMessage = () => {
    if (inputText.trim() === "") return;

    // Agregar mensaje del usuario
    const userMessage = { text: inputText, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");

    // Simular respuesta del asistente después de un delay
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    }, 1000);
  };

  const getBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    if (
      lowerMessage.includes("hola") ||
      lowerMessage.includes("buenos días") ||
      lowerMessage.includes("buenas tardes")
    ) {
      return "¡Hola! Soy tu asistente del contrato. ¿En qué puedo ayudarte con el documento?";
    }

    if (lowerMessage.includes("página") || lowerMessage.includes("pagina")) {
      return "Puedes navegar entre las páginas usando los controles de Google Docs Viewer en la parte superior del documento.";
    }

    if (
      lowerMessage.includes("contrato") ||
      lowerMessage.includes("documento")
    ) {
      return "Este es un contrato de prestación de servicios. Puedo ayudarte a entender las cláusulas, términos y condiciones.";
    }

    if (
      lowerMessage.includes("obligaciones") ||
      lowerMessage.includes("responsabilidades")
    ) {
      return "Las obligaciones suelen estar detalladas en las secciones 2 y 3 del contrato. Incluyen compromisos de ambas partes.";
    }

    if (
      lowerMessage.includes("pago") ||
      lowerMessage.includes("precio") ||
      lowerMessage.includes("costo")
    ) {
      return "Los términos de pago generalmente se especifican en la sección 3 del contrato. Incluyen montos, fechas y métodos de pago.";
    }

    if (
      lowerMessage.includes("confidencialidad") ||
      lowerMessage.includes("privacidad")
    ) {
      return "La cláusula de confidencialidad protege la información sensible. Suele estar en la sección 4 del documento.";
    }

    if (
      lowerMessage.includes("terminación") ||
      lowerMessage.includes("finalizar") ||
      lowerMessage.includes("cancelar")
    ) {
      return "Las condiciones de terminación del contrato se detallan en la sección 6. Incluyen plazos y causales de terminación.";
    }

    if (
      lowerMessage.includes("zoom") ||
      lowerMessage.includes("agrandar") ||
      lowerMessage.includes("achicar")
    ) {
      return "Puedes hacer zoom en el documento usando gestos de pellizco (dos dedos) sobre la pantalla.";
    }

    if (
      lowerMessage.includes("navegar") ||
      lowerMessage.includes("mover") ||
      lowerMessage.includes("deslizar")
    ) {
      return "Para navegar entre páginas, usa los controles de flechas en Google Docs Viewer o desliza horizontalmente.";
    }

    return "Entiendo tu pregunta sobre el contrato. ¿Podrías ser más específico sobre qué aspecto te interesa? Por ejemplo: obligaciones, pagos, confidencialidad, etc.";
  };

  return (
    <View style={styles.container}>
      {/* WebView para mostrar el PDF - 65% de la pantalla */}
      <View style={styles.webviewContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Cargando contrato...</Text>
          </View>
        )}

        <WebView
          source={{ uri: viewerUrl }}
          style={styles.webview}
          onLoadEnd={() => setLoading(false)}
          onError={(error) => {
            console.log("Error loading PDF:", error);
            setLoading(false);
          }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          startInLoadingState={true}
        />
      </View>

      {/* Explicación y Botón - 35% de la pantalla */}
      <View style={styles.bottomSection}>
        <View style={styles.explanationBox}>
          <Text style={styles.title}>📋 Explicación del Contrato</Text>
          <Text style={styles.explanationText}>
            CONTRATO DE PRESTACIÓN DE SERVICIOS{"\n\n"}
            Este documento establece los términos y condiciones del acuerdo de
            servicios entre las partes.{"\n\n"}
            ¿Tienes dudas sobre alguna cláusula? Presiona el botón para
            consultar con el asistente.
          </Text>
        </View>

        {/* Botón para abrir chat */}
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => setChatVisible(true)}
        >
          <Text style={styles.chatButtonText}>💬 Hacer Pregunta</Text>
        </TouchableOpacity>
      </View>

      {/* Modal del Chat */}
      <Modal
        visible={chatVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.chatContainer}>
          {/* Header del Chat */}
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Asistente del Contrato</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setChatVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>

          {/* Mensajes */}
          <ScrollView
            style={styles.messagesContainer}
            ref={(ref) => {
              if (ref) {
                setTimeout(() => ref.scrollToEnd({ animated: true }), 100);
              }
            }}
          >
            {messages.length === 0 ? (
              <View style={styles.welcomeMessage}>
                <Text style={styles.welcomeText}>
                  ¡Hola! Soy tu asistente para el contrato.{"\n"}
                  Puedo ayudarte a entender:{"\n\n"}• Términos y condiciones
                  {"\n"}• Obligaciones de las partes{"\n"}• Cláusulas de
                  confidencialidad{"\n"}• Términos de pago{"\n"}• Condiciones de
                  terminación{"\n"}• Cómo navegar el documento{"\n\n"}
                  ¿En qué puedo ayudarte?
                </Text>
              </View>
            ) : (
              messages.map((message, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageBubble,
                    message.isUser ? styles.userMessage : styles.botMessage,
                  ]}
                >
                  <Text
                    style={[
                      styles.messageText,
                      message.isUser
                        ? styles.userMessageText
                        : styles.botMessageText,
                    ]}
                  >
                    {message.text}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>

          {/* Input para escribir */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.inputContainer}
          >
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Escribe tu pregunta sobre el contrato..."
              multiline={true}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webviewContainer: {
    flex: 0.65, // 65% para el PDF
    backgroundColor: "#f0f0f0",
  },
  webview: {
    flex: 1,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.9)",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  bottomSection: {
    flex: 0.35, // 35% para la explicación y botón
    padding: 10,
  },
  explanationBox: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 18,
    color: "#333",
  },
  explanationText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#444",
  },
  chatButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  chatButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#f8f9fa",
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 5,
  },
  closeButtonText: {
    fontSize: 18,
    color: "#666",
    fontWeight: "bold",
  },
  messagesContainer: {
    flex: 1,
    padding: 15,
  },
  welcomeMessage: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#1565c0",
  },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  botMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f1f1f1",
  },
  messageText: {
    fontSize: 14,
    lineHeight: 18,
  },
  userMessageText: {
    color: "white",
  },
  botMessageText: {
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default PdfViewerScreen;
