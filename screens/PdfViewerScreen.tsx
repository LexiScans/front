import React, { useState, useRef } from "react";
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
  PanResponder,
} from "react-native";
import { WebView } from "react-native-webview";
import Svg, { Path } from "react-native-svg";

const SignatureCanvas = ({ onSignatureChange }) => {
  const [paths, setPaths] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const svgRef = useRef(null);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      const newPath = [{ x: locationX, y: locationY }];
      setCurrentPath(newPath);
    },
    onPanResponderMove: (event) => {
      const { locationX, locationY } = event.nativeEvent;
      if (
        locationX >= 0 &&
        locationX <= 300 &&
        locationY >= 0 &&
        locationY <= 300
      ) {
        const updatedPath = [...currentPath, { x: locationX, y: locationY }];
        setCurrentPath(updatedPath);
      }
    },
    onPanResponderRelease: () => {
      if (currentPath.length > 1) {
        const allPaths = [...paths, currentPath];
        setPaths(allPaths);
        if (onSignatureChange) onSignatureChange(allPaths);
      }
      setCurrentPath([]);
    },
  });

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath([]);
    if (onSignatureChange) onSignatureChange([]);
  };

  const pointsToSvgPath = (points) => {
    if (points.length === 0) return "";
    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L ${points[i].x} ${points[i].y}`;
    }
    return path;
  };

  return (
    <View style={styles.canvasContainer}>
      <View style={styles.canvas} {...panResponder.panHandlers}>
        <Svg width="100%" height="100%" ref={svgRef}>
          {paths.map((path, index) => (
            <Path
              key={index}
              d={pointsToSvgPath(path)}
              stroke="#111"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {currentPath.length > 0 && (
            <Path
              d={pointsToSvgPath(currentPath)}
              stroke="#111"
              strokeWidth={2.5}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </Svg>
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={clearCanvas}>
        <Text style={styles.clearButtonText}>🧹 Limpiar</Text>
      </TouchableOpacity>
    </View>
  );
};

const PdfViewerScreen = () => {
  const [loading, setLoading] = useState(true);
  const [chatVisible, setChatVisible] = useState(false);
  const [signatureModalVisible, setSignatureModalVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [signaturePaths, setSignaturePaths] = useState([]);

  const pdfUrl = "https://cimav.edu.mx/pnt/LGPDPPSO/2.2.2.pdf";
  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    pdfUrl
  )}`;

  const sendMessage = () => {
    if (inputText.trim() === "") return;
    const userMessage = { text: inputText, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    }, 1000);
  };

  const getBotResponse = (msg) => {
    const m = msg.toLowerCase();
    if (m.includes("hola") || m.includes("buenos")) {
      return "¡Hola! Soy tu asistente del contrato. ¿En qué puedo ayudarte con el documento?";
    }
    if (m.includes("pago") || m.includes("precio")) {
      return "Los términos de pago están en la sección 3 del contrato.";
    }
    if (m.includes("confidencialidad")) {
      return "La cláusula de confidencialidad protege la información sensible.";
    }
    if (m.includes("terminación") || m.includes("finalizar")) {
      return "Las condiciones de terminación están en la sección 6 del documento.";
    }
    return "Entiendo tu pregunta. ¿Podrías ser más específico?";
  };

  const handleSignatureConfirm = () => {
    if (signaturePaths.length === 0) {
      alert("Por favor firma antes de confirmar");
      return;
    }
    alert("Firma guardada exitosamente");
    setSignatureModalVisible(false);
    setSignaturePaths([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.webviewContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Cargando contrato...</Text>
          </View>
        )}
        <ScrollView horizontal pagingEnabled style={{ flex: 1 }}>
          <WebView
            source={{ uri: viewerUrl }}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height * 0.65,
            }}
            onLoadEnd={() => setLoading(false)}
          />
        </ScrollView>
      </View>

      <View style={styles.bottomSection}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.explanationBox}>
            <Text style={styles.title}>📋 Explicación del Contrato</Text>
            <Text style={styles.explanationText}>
              El presente documento constituye un acuerdo de prestación de
              servicios celebrado entre las partes, detallando obligaciones,
              pagos y cláusulas de confidencialidad. {"\n\n"}Presiona el botón
              de ayuda si necesitas entender una sección específica.
            </Text>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.chatButton]}
              onPress={() => setChatVisible(true)}
            >
              <Text style={styles.actionText}>💬 Hacer Pregunta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.signatureButton]}
              onPress={() => setSignatureModalVisible(true)}
            >
              <Text style={styles.actionText}>✍️ Firmar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      {/* Chat Modal */}
      <Modal visible={chatVisible} animationType="slide">
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Asistente del Contrato</Text>
            <TouchableOpacity onPress={() => setChatVisible(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.messagesContainer}>
            {messages.length === 0 ? (
              <View style={styles.welcomeMessage}>
                <Text style={styles.welcomeText}>
                  👋 ¡Hola! Soy tu asistente para el contrato.{"\n"}
                  Puedo ayudarte a entender cláusulas, términos, pagos y más.
                </Text>
              </View>
            ) : (
              messages.map((m, i) => (
                <View
                  key={i}
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
              ))
            )}
          </ScrollView>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.inputContainer}
          >
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder="Escribe tu pregunta..."
              multiline
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Enviar</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </View>
      </Modal>

      {/* Signature Modal */}
      <Modal
        visible={signatureModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setSignatureModalVisible(false)}
      >
        <View style={styles.signatureModalOverlay}>
          <View style={styles.signatureModalContent}>
            <View style={styles.signatureModalHeader}>
              <Text style={styles.signatureModalTitle}>Área de Firma</Text>
              <TouchableOpacity onPress={() => setSignatureModalVisible(false)}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.signatureModalBody}>
              <Text style={styles.signatureModalText}>
                Firma con tu dedo en el área:
              </Text>
              <SignatureCanvas onSignatureChange={setSignaturePaths} />
            </View>

            <View style={styles.signatureModalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setSignatureModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleSignatureConfirm}
              >
                <Text style={styles.confirmText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  webviewContainer: { flex: 0.65, backgroundColor: "#fafafa" },
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  loadingText: { marginTop: 8, color: "#555", fontSize: 15 },
  bottomSection: { flex: 0.35, paddingHorizontal: 18 },
  explanationBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ececec",
  },
  title: { fontSize: 18, fontWeight: "600", color: "#111", marginBottom: 8 },
  explanationText: { fontSize: 14.5, color: "#555", lineHeight: 22 },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 6,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  chatButton: { backgroundColor: "#007AFF" },
  signatureButton: { backgroundColor: "#FF6B6B" },
  actionText: { color: "#fff", fontSize: 15.5, fontWeight: "600" },
  chatContainer: { flex: 1, backgroundColor: "#fff" },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#ededed",
    backgroundColor: "#f9f9f9",
  },
  chatTitle: { fontSize: 17, fontWeight: "600", color: "#111" },
  closeButtonText: { fontSize: 18, color: "#777", fontWeight: "600" },
  messagesContainer: { flex: 1, padding: 16 },
  welcomeMessage: {
    backgroundColor: "#eef6ff",
    padding: 15,
    borderRadius: 12,
  },
  welcomeText: { color: "#004a9f", lineHeight: 22 },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 10,
    marginVertical: 6,
  },
  userMessage: { backgroundColor: "#007AFF", alignSelf: "flex-end" },
  botMessage: { backgroundColor: "#f2f2f2", alignSelf: "flex-start" },
  userText: { color: "#fff" },
  botText: { color: "#111" },
  inputContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    padding: 10,
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginLeft: 8,
  },
  sendButtonText: { color: "#fff", fontWeight: "600" },
  signatureModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  signatureModalContent: {
    backgroundColor: "#fff",
    borderRadius: 14,
    width: "100%",
    maxHeight: "90%",
    overflow: "hidden",
  },
  signatureModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  signatureModalTitle: { fontSize: 18, fontWeight: "600", color: "#111" },
  signatureModalBody: { padding: 20 },
  signatureModalText: {
    fontSize: 15,
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  canvasContainer: { marginBottom: 15 },
  canvas: {
    height: 300,
    borderWidth: 1.5,
    borderColor: "#ddd",
    borderRadius: 10,
    backgroundColor: "#fafafa",
    borderStyle: "dashed",
  },
  clearButton: {
    alignSelf: "center",
    backgroundColor: "#6c757d",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 6,
    marginTop: 10,
  },
  clearButtonText: { color: "#fff", fontSize: 14, fontWeight: "500" },
  signatureModalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 18,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    gap: 10,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  cancelButton: { backgroundColor: "#f2f2f2" },
  confirmButton: { backgroundColor: "#FF6B6B" },
  cancelText: { color: "#444", fontWeight: "600" },
  confirmText: { color: "#fff", fontWeight: "600" },
});

export default PdfViewerScreen;
