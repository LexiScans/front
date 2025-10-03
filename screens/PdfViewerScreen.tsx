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
        if (onSignatureChange) {
          onSignatureChange(allPaths);
        }
      }
      setCurrentPath([]);
    },
  });

  const clearCanvas = () => {
    setPaths([]);
    setCurrentPath([]);
    if (onSignatureChange) {
      onSignatureChange([]);
    }
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
              stroke="#000"
              strokeWidth={3}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {currentPath.length > 0 && (
            <Path
              d={pointsToSvgPath(currentPath)}
              stroke="#000"
              strokeWidth={3}
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

const PdfViewerScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [chatVisible, setChatVisible] = useState(false);
  const [signatureModalVisible, setSignatureModalVisible] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ text: string; isUser: boolean }>
  >([]);
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
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}>Cargando contrato...</Text>
          </View>
        )}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          style={{ flex: 1 }}
        >
          <WebView
            source={{ uri: viewerUrl }}
            style={{
              width: Dimensions.get("window").width,
              height: Dimensions.get("window").height * 0.65,
            }}
            onLoadEnd={() => setLoading(false)}
            onError={(error) => {
              console.log("Error loading PDF:", error);
              setLoading(false);
            }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
          />
        </ScrollView>
      </View>
      <View style={styles.bottomSection}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.explanationBox}>
            <Text style={styles.title}>📋 Explicación del Contrato</Text>
            <Text style={styles.explanationText}>
              CONTRATO DE PRESTACIÓN DE SERVICIOS{"\n\n"}
              El presente documento constituye un acuerdo de prestación de
              servicios celebrado entre el CONTRATANTE y el CONTRATISTA. En este
              contrato se establecen las condiciones generales bajo las cuales
              se llevará a cabo la relación contractual, incluyendo los
              derechos, obligaciones y responsabilidades de ambas partes.
              {"\n\n"}
              El objetivo de este acuerdo es garantizar que los servicios
              ofrecidos se realicen conforme a los estándares de calidad y
              dentro de los plazos pactados. Asimismo, se definen las cláusulas
              relacionadas con la forma de pago, la confidencialidad de la
              información, la duración del contrato, las posibles causas de
              terminación y las condiciones de renovación.{"\n\n"}
              Al aceptar este documento, ambas partes manifiestan su conformidad
              con los términos descritos y se comprometen a cumplir con las
              obligaciones aquí estipuladas.{"\n\n"}
              ¿Tienes dudas sobre alguna cláusula o término específico? Presiona
              el botón de ayuda y consulta directamente con el asistente para
              recibir una explicación clara y sencilla sobre cualquier punto del
              contrato.
            </Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.chatButton]}
              onPress={() => setChatVisible(true)}
            >
              <Text style={styles.chatButtonText}>💬 Hacer Pregunta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.signatureButton]}
              onPress={() => setSignatureModalVisible(true)}
            >
              <Text style={styles.signatureButtonText}>✍️ Firmar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <Modal
        visible={chatVisible}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <View style={styles.chatContainer}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>Asistente del Contrato</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setChatVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
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
                  ¡Hola! Soy tu asistente para el contrato.{"\n"}Puedo ayudarte
                  a entender:{"\n\n"}• Términos y condiciones{"\n"}•
                  Obligaciones de las partes{"\n"}• Cláusulas de
                  confidencialidad{"\n"}• Términos de pago{"\n"}• Condiciones de
                  terminación{"\n"}• Cómo navegar el documento{"\n\n"}¿En qué
                  puedo ayudarte?
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
      <Modal
        visible={signatureModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setSignatureModalVisible(false)}
      >
        <View style={styles.signatureModalOverlay}>
          <View style={styles.signatureModalContent}>
            <View style={styles.signatureModalHeader}>
              <Text style={styles.signatureModalTitle}>Área de Firma</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSignatureModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>X</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.signatureModalBody}>
              <Text style={styles.signatureModalText}>
                Firma con tu dedo en el área:
              </Text>
              <SignatureCanvas onSignatureChange={setSignaturePaths} />
              <View style={styles.instructionsSection}>
                <Text style={styles.instructionsTitle}>Instrucciones:</Text>
                <Text style={styles.instructionsText}>
                  • Toca y arrastra para firmar{"\n"}• Usa el botón Limpiar para
                  empezar de nuevo{"\n"}• Confirma cuando hayas terminado tu
                  firma
                </Text>
              </View>
            </View>
            <View style={styles.signatureModalFooter}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setSignatureModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleSignatureConfirm}
              >
                <Text style={styles.confirmButtonText}>Confirmar Firma</Text>
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
  webviewContainer: { flex: 0.65, backgroundColor: "#f0f0f0" },
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
  loadingText: { marginTop: 10, fontSize: 16, color: "#666" },
  bottomSection: { flex: 0.35, padding: 10 },
  scrollContent: { paddingBottom: 20 },
  explanationBox: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { fontWeight: "bold", marginBottom: 10, fontSize: 18, color: "#333" },
  explanationText: { fontSize: 14, lineHeight: 20, color: "#444" },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  chatButton: { backgroundColor: "#007AFF" },
  signatureButton: { backgroundColor: "#FF6B6B" },
  chatButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  signatureButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  chatContainer: { flex: 1, backgroundColor: "#fff" },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#f8f9fa",
  },
  chatTitle: { fontSize: 18, fontWeight: "bold", color: "#333" },
  closeButton: { padding: 5 },
  closeButtonText: { fontSize: 18, color: "#666", fontWeight: "bold" },
  messagesContainer: { flex: 1, padding: 15 },
  welcomeMessage: {
    backgroundColor: "#e3f2fd",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  welcomeText: { fontSize: 14, lineHeight: 20, color: "#1565c0" },
  messageBubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  userMessage: { alignSelf: "flex-end", backgroundColor: "#007AFF" },
  botMessage: { alignSelf: "flex-start", backgroundColor: "#f1f1f1" },
  messageText: { fontSize: 14, lineHeight: 18 },
  userMessageText: { color: "white" },
  botMessageText: { color: "#333" },
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
  sendButtonText: { color: "white", fontWeight: "bold" },
  signatureModalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  signatureModalContent: {
    backgroundColor: "white",
    borderRadius: 12,
    width: "100%",
    maxHeight: "90%",
    overflow: "hidden",
  },
  signatureModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  signatureModalTitle: { fontSize: 20, fontWeight: "bold", color: "#333" },
  signatureModalBody: { padding: 20 },
  signatureModalText: {
    fontSize: 16,
    lineHeight: 22,
    color: "#444",
    marginBottom: 20,
    textAlign: "center",
  },
  canvasContainer: { marginBottom: 20 },
  canvas: {
    height: 300,
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    borderStyle: "dashed",
    overflow: "hidden",
  },
  clearButton: {
    backgroundColor: "#6c757d",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 6,
    alignSelf: "center",
    marginTop: 10,
  },
  clearButtonText: { color: "white", fontSize: 14, fontWeight: "600" },
  instructionsSection: {
    backgroundColor: "#f8f9fa",
    padding: 15,
    borderRadius: 8,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  instructionsText: { fontSize: 14, lineHeight: 20, color: "#666" },
  signatureModalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    gap: 10,
  },
  modalButton: { flex: 1, padding: 15, borderRadius: 8, alignItems: "center" },
  cancelButton: { backgroundColor: "#f1f1f1" },
  confirmButton: { backgroundColor: "#FF6B6B" },
  cancelButtonText: { color: "#666", fontSize: 16, fontWeight: "600" },
  confirmButtonText: { color: "white", fontSize: 16, fontWeight: "600" },
});

export default PdfViewerScreen;
