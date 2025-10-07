import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  PanResponder,
  StyleSheet,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import { Svg, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import ChatModal from "../components/pdfView/ChatModal";
import SignatureModal from "../components/pdfView/SignatureModal";
import ConfirmSignatureModal from "../components/pdfView/ConfirmSignatureModal";
import SuccessModal from "../components/pdfView/SuccessModal";
import WarningModal from "../components/pdfView/WarningModal";

const PdfViewerScreen: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [chatVisible, setChatVisible] = useState(false);
  const [signatureModalVisible, setSignatureModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [inputText, setInputText] = useState("");
  const [signaturePaths, setSignaturePaths] = useState<
    { x: number; y: number }[][]
  >([]);
  const [placingSignature, setPlacingSignature] = useState(false);
  const [signaturePosition, setSignaturePosition] = useState({ x: 50, y: 100 });

  const scrollViewRef = useRef<ScrollView>(null);
  const webViewRef = useRef<WebView>(null);

  const pdfUrl = "https://cimav.edu.mx/pnt/LGPDPPSO/2.2.2.pdf";
  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    pdfUrl
  )}`;

  const sendMessage = useCallback(() => {
    if (inputText.trim() === "") return;
    const userMessage = { text: inputText, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    }, 1000);
  }, [inputText]);

  const getBotResponse = (msg: string) => {
    const m = msg.toLowerCase();
    if (m.includes("hola") || m.includes("buenos"))
      return "¡Hola! Soy tu asistente del contrato. ¿En qué puedo ayudarte con el documento?";
    if (m.includes("pago") || m.includes("precio"))
      return "Los términos de pago están en la sección 3 del contrato.";
    if (m.includes("confidencialidad"))
      return "La cláusula de confidencialidad protege la información sensible.";
    if (m.includes("terminación") || m.includes("finalizar"))
      return "Las condiciones de terminación están en la sección 6 del documento.";
    return "Entiendo tu pregunta. ¿Podrías ser más específico?";
  };

  const handleSignatureConfirm = useCallback(() => {
    if (signaturePaths.length === 0) {
      setWarningModalVisible(true);
      return;
    }
    setSignatureModalVisible(false);
    setPlacingSignature(true);
  }, [signaturePaths]);

  const moveResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setSignaturePosition({
          x: signaturePosition.x + gestureState.dx,
          y: signaturePosition.y + gestureState.dy,
        });
      },
    })
  ).current;

  const handleConfirmSignaturePlacement = useCallback(() => {
    setConfirmModalVisible(true);
  }, []);

  const handleFinalSignature = useCallback(() => {
    setIsSigning(true);

    setTimeout(() => {
      setIsSigning(false);
      setConfirmModalVisible(false);
      setPlacingSignature(false);

      setSuccessModalVisible(true);
    }, 2000);
  }, []);

  const handleSuccessModalClose = useCallback(() => {
    setSuccessModalVisible(false);
    navigation.navigate("Home" as never);
  }, [navigation]);

  const handleLoadEnd = useCallback(() => {
    setLoading(false);
  }, []);

  const pathsToSvg = useCallback(
    (paths: { x: number; y: number }[][], scale: number = 1) => {
      return paths
        .map((path, index) => {
          if (path.length === 0) return null;

          let d = `M ${path[0].x * scale} ${path[0].y * scale}`;
          for (let i = 1; i < path.length; i++) {
            d += ` L ${path[i].x * scale} ${path[i].y * scale}`;
          }

          return (
            <Path
              key={index}
              d={d}
              stroke="#111"
              strokeWidth={3 * scale}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          );
        })
        .filter(Boolean);
    },
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.webviewContainer}>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text style={styles.loadingText}>Cargando contrato...</Text>
          </View>
        )}

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          style={styles.scrollView}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={true}
          decelerationRate="fast"
          snapToAlignment="center"
        >
          <WebView
            ref={webViewRef}
            source={{ uri: viewerUrl }}
            style={styles.webview}
            onLoadEnd={handleLoadEnd}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={true}
            cacheEnabled={true}
            cacheMode="LOAD_CACHE_ELSE_NETWORK"
          />
        </ScrollView>

        {placingSignature && signaturePaths.length > 0 && (
          <View
            style={[
              styles.signatureOverlay,
              {
                top: signaturePosition.y,
                left: signaturePosition.x,
              },
            ]}
            {...moveResponder.panHandlers}
          >
            <Svg width={150} height={75} style={styles.signatureSvg}>
              {pathsToSvg(signaturePaths, 0.25)}
            </Svg>
          </View>
        )}
      </View>

      <View style={styles.bottomSection}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.bottomScrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={true}
          nestedScrollEnabled={true}
          overScrollMode="always"
          removeClippedSubviews={Platform.OS === "android"}
        >
          <View style={styles.explanationBox}>
            <Text style={styles.title}>📋 Explicación del Contrato</Text>
            <Text style={styles.explanationText}>
              El presente documento constituye un acuerdo de prestación de
              servicios celebrado entre las partes, detallando obligaciones,
              pagos y cláusulas de confidencialidad. {"\n\n"}Presiona el botón
              de ayuda si necesitas entender una sección específica.
            </Text>
          </View>

          {signaturePaths.length > 0 && !placingSignature && (
            <View style={styles.signaturePreview}>
              <Text style={styles.previewTitle}>Vista previa de tu firma:</Text>
              <View style={styles.previewContainer}>
                <Svg width={200} height={100}>
                  {pathsToSvg(signaturePaths, 0.3)}
                </Svg>
              </View>
            </View>
          )}

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
              <Text style={styles.actionText}>
                ✍️ {signaturePaths.length > 0 ? "Cambiar Firma" : "Firmar"}
              </Text>
            </TouchableOpacity>
          </View>

          {placingSignature && (
            <View style={styles.placementControls}>
              <Text style={styles.placementText}>
                Arrastra la firma a la posición deseada en el PDF
              </Text>
              <TouchableOpacity
                style={styles.confirmPlacementButton}
                onPress={handleConfirmSignaturePlacement}
              >
                <Text style={styles.confirmPlacementText}>
                  Confirmar posición y Firmar
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

      <ChatModal
        visible={chatVisible}
        messages={messages}
        inputText={inputText}
        onClose={() => setChatVisible(false)}
        onSend={sendMessage}
        onChangeText={setInputText}
      />

      <SignatureModal
        visible={signatureModalVisible}
        onClose={() => setSignatureModalVisible(false)}
        onConfirm={handleSignatureConfirm}
        onSignatureChange={setSignaturePaths}
        initialPaths={signaturePaths}
      />

      <ConfirmSignatureModal
        visible={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        onConfirm={handleFinalSignature}
        isLoading={isSigning}
      />

      <SuccessModal
        visible={successModalVisible}
        onClose={handleSuccessModalClose}
        title="¡Documento Firmado!"
        message="El contrato ha sido firmado exitosamente. Serás redirigido al inicio."
      />

      <WarningModal
        visible={warningModalVisible}
        onClose={() => setWarningModalVisible(false)}
        title="Firma Requerida"
        message="Por favor dibuja tu firma antes de continuar."
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  webviewContainer: {
    flex: 0.65,
    backgroundColor: "#fafafa",
    position: "relative",
  },
  scrollView: {
    flex: 1,
  },
  webview: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.65,
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.8)",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 8,
    color: "#555",
    fontSize: 15,
  },
  bottomSection: {
    flex: 0.35,
    paddingHorizontal: 18,
  },
  bottomScrollView: {
    flex: 1,
  },
  explanationBox: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ececec",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111",
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14.5,
    color: "#555",
    lineHeight: 22,
  },
  signaturePreview: {
    backgroundColor: "#f0f8ff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    alignItems: "center",
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#007AFF",
    marginBottom: 8,
  },
  previewContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
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
  chatButton: {
    backgroundColor: "#007AFF",
  },
  signatureButton: {
    backgroundColor: "#FF6B6B",
  },
  actionText: {
    color: "#fff",
    fontSize: 15.5,
    fontWeight: "600",
  },
  placementControls: {
    marginTop: 12,
    alignItems: "center",
  },
  placementText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  confirmPlacementButton: {
    backgroundColor: "#28a745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 8,
    width: "100%",
  },
  confirmPlacementText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  cancelPlacementButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
  },
  cancelPlacementText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  signatureOverlay: {
    position: "absolute",
    backgroundColor: "transparent",
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
    zIndex: 5,
  },
  signatureSvg: {
    backgroundColor: "transparent",
  },
  scrollContent: {
    paddingBottom: 20,
  },
});

export default PdfViewerScreen;
