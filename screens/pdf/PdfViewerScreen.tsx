import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  PanResponder,
  Platform,
} from "react-native";
import { WebView } from "react-native-webview";
import { Svg, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import ChatModal from "../../components/pdfView/ChatModal";
import SignatureModal from "../../components/pdfView/SignatureModal";
import ConfirmSignatureModal from "../../components/pdfView/ConfirmSignatureModal";
import SuccessModal from "../../components/pdfView/SuccessModal";
import WarningModal from "../../components/pdfView/WarningModal";
import { styles } from "./styles";

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
  const [signatureBase64, setSignatureBase64] = useState<string | null>(null);

  const scrollViewRef = useRef<ScrollView>(null);
  const webViewRef = useRef<WebView>(null);

  const [pdfUrl, setPdfUrl] = useState(
    "https://lexiscan.blob.core.windows.net/pdfs/contrato%20para%20lexisacn.pdf?sv=2024-08-04&se=2025-10-08T20%3A56%3A24Z&sr=b&sp=r&sig=HtO4tALpxH2t2QKkFjuGaYafREiqkzAGskDhi737Nxw%3D&rscd=inline&rsct=application%2Fpdf"
  );
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

  const handleFinalSignature = useCallback(async () => {
    if (!signatureBase64) {
      setWarningModalVisible(true);
      return;
    }
    setIsSigning(true);
    try {
      const payload = {
        contractId: "fa85d36f-9034-4698-84c8-f960bd7d66a9",
        signatureBase64,
        x: signaturePosition.x,
        y: signaturePosition.y,
      };
      const response = await fetch("http://10.0.2.2:8083/contracts/sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      setPdfUrl(data.signedUrl);
      setSuccessModalVisible(true);
      setConfirmModalVisible(false);
      setPlacingSignature(false);
    } catch (error) {
      console.error("Error enviando firma:", error);
      setWarningModalVisible(true);
    } finally {
      setIsSigning(false);
    }
  }, [signatureBase64, signaturePosition]);

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
          showsHorizontalScrollIndicator
          showsVerticalScrollIndicator={false}
          directionalLockEnabled
          decelerationRate="fast"
          snapToAlignment="center"
        >
          <WebView
            ref={webViewRef}
            source={{ uri: viewerUrl }}
            style={styles.webview}
            onLoadEnd={handleLoadEnd}
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            cacheEnabled
            cacheMode="LOAD_CACHE_ELSE_NETWORK"
          />
        </ScrollView>

        {placingSignature && signaturePaths.length > 0 && (
          <View
            style={[
              styles.signatureOverlay,
              { top: signaturePosition.y, left: signaturePosition.x },
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
          showsVerticalScrollIndicator
          nestedScrollEnabled
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
        onSignatureBase64={setSignatureBase64}
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

export default PdfViewerScreen;
