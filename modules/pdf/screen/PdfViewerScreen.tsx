import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  PanResponder,
  Platform,
  StyleSheet,
  Dimensions,
  StatusBar,
} from "react-native";
import { WebView } from "react-native-webview";
import { Svg, Path } from "react-native-svg";
import { useNavigation } from "@react-navigation/native";
import SignatureModal from "../components/SignatureModal";
import ConfirmSignatureModal from "../components/ConfirmSignatureModal";
import SuccessModal from "../../../components/SuccessModal";
import WarningModal from "../../../components/WarningModal";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const statusBarHeight = StatusBar.currentHeight || 0;

const PdfViewerScreen: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [signatureModalVisible, setSignatureModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [signaturePaths, setSignaturePaths] = useState<
    { x: number; y: number }[][]
  >([]);
  const [placingSignature, setPlacingSignature] = useState(false);
  const [signaturePosition, setSignaturePosition] = useState({
    x: screenWidth * 0.1,
    y: screenHeight * 0.2, 
  });
  const [signatureBase64, setSignatureBase64] = useState<string | null>(null);
  const [pdfDimensions, setPdfDimensions] = useState({
    width: screenWidth - 32,
    height: screenHeight * 0.45, // Más reducido
  });

  const scrollViewRef = useRef<ScrollView>(null);
  const webViewRef = useRef<WebView>(null);

  const [pdfUrl, setPdfUrl] = useState(
    "https://cimav.edu.mx/pnt/LGPDPPSO/2.2.2.pdf"
  );

  const viewerUrl = `https://docs.google.com/gview?embedded=true&url=${encodeURIComponent(
    pdfUrl
  )}`;

  useEffect(() => {
    const calculatePdfDimensions = () => {
      const aspectRatio = 1.414; // Ratio A4
      const maxWidth = screenWidth - 32;
      // Altura más reducida para evitar la cámara
      const maxHeight = screenHeight * 0.45;
      const calculatedHeight = Math.min(maxWidth * aspectRatio, maxHeight);

      setPdfDimensions({ width: maxWidth, height: calculatedHeight });
    };

    calculatePdfDimensions();
  }, []);

  const handleSignatureConfirm = useCallback(() => {
    if (signaturePaths.length === 0) {
      setWarningModalVisible(true);
      return;
    }
    if (!signatureBase64) {
      console.log("Esperando base64 de la firma...");
      return;
    }
    setSignatureModalVisible(false);
    setPlacingSignature(true);
  }, [signaturePaths, signatureBase64]);

  const moveResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        setSignaturePosition({
          x: Math.max(
            0,
            Math.min(screenWidth - 150, signaturePosition.x + gestureState.dx)
          ),
          y: Math.max(
            50, // Mínimo más alto para evitar cámara
            Math.min(
              pdfDimensions.height - 75,
              signaturePosition.y + gestureState.dy
            )
          ),
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
              stroke="#0b2e42ff"
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

  // HTML personalizado para mejor visualización del PDF
  const pdfHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #f5f5f5;
          height: 100vh;
          overflow: hidden;
        }
        .pdf-container {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        iframe {
          width: 100%;
          height: 100%;
          border: none;
        }
      </style>
    </head>
    <body>
      <div class="pdf-container">
        <iframe src="${viewerUrl}" type="application/pdf"></iframe>
      </div>
    </body>
    </html>
  `;

  return (
    <View style={materialStyles.container}>
      {/* Espacio para la cámara */}
      <View style={materialStyles.cameraSpace} />

      <View style={materialStyles.header}>
        <Text style={materialStyles.headerTitle}>
          Vista Previa del Contrato
        </Text>
      </View>

      {/* Sección del PDF - Más baja */}
      <View style={materialStyles.pdfSection}>
        <View style={materialStyles.webviewContainer}>
          {loading && (
            <View style={materialStyles.loadingContainer}>
              <ActivityIndicator size="large" color="#0b2e42ff" />
              <Text style={materialStyles.loadingText}>
                Cargando contrato...
              </Text>
            </View>
          )}

          <View
            style={[
              materialStyles.pdfContainer,
              { height: pdfDimensions.height },
            ]}
          >
            <WebView
              ref={webViewRef}
              source={{ html: pdfHtml }}
              style={[materialStyles.webview, { height: pdfDimensions.height }]}
              onLoadEnd={handleLoadEnd}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              startInLoadingState={true}
              scalesPageToFit={true}
              mixedContentMode="compatibility"
            />
          </View>

          {placingSignature && signaturePaths.length > 0 && (
            <View
              style={[
                materialStyles.signatureOverlay,
                {
                  top: signaturePosition.y,
                  left: signaturePosition.x,
                },
              ]}
              {...moveResponder.panHandlers}
            >
              <Svg width={150} height={75} style={materialStyles.signatureSvg}>
                {pathsToSvg(signaturePaths, 0.25)}
              </Svg>
            </View>
          )}
        </View>
      </View>

      {/* Sección de controles - Con suficiente espacio */}
      <View style={materialStyles.controlsSection}>
        <ScrollView
          style={materialStyles.bottomScrollView}
          contentContainerStyle={materialStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {signaturePaths.length > 0 && !placingSignature && (
            <View style={materialStyles.signaturePreview}>
              <Text style={materialStyles.previewTitle}>
                Vista previa de tu firma:
              </Text>
              <View style={materialStyles.previewContainer}>
                <Svg width={200} height={100}>
                  {pathsToSvg(signaturePaths, 0.3)}
                </Svg>
              </View>
            </View>
          )}

          <View style={materialStyles.buttonsContainer}>
            <TouchableOpacity
              style={materialStyles.materialButton}
              onPress={() => setSignatureModalVisible(true)}
            >
              <Text style={materialStyles.buttonText}>
                {signaturePaths.length > 0 ? "Cambiar Firma" : "Firmar"}
              </Text>
            </TouchableOpacity>
          </View>

          {placingSignature && (
            <View style={materialStyles.placementControls}>
              <Text style={materialStyles.placementText}>
                Arrastra la firma a la posición deseada en el PDF
              </Text>
              <TouchableOpacity
                style={materialStyles.materialButton}
                onPress={handleConfirmSignaturePlacement}
              >
                <Text style={materialStyles.buttonText}>
                  Confirmar posición y Firmar
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>

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

const materialStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: Platform.OS === "ios" ? 40 : 25,
  },
  cameraSpace: {
    height: Platform.OS === "ios" ? 0 : 40,
  },
  header: {
    padding: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginTop: 5,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  pdfSection: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  controlsSection: {
    flex: 0.5,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 10,
  },
  webviewContainer: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white",
    elevation: 3,
    position: "relative",
  },
  pdfContainer: {
    width: "100%",
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    zIndex: 10,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#374151",
  },
  webview: {
    flex: 1,
    borderRadius: 12,
  },
  signatureOverlay: {
    position: "absolute",
    zIndex: 100,
  },
  signatureSvg: {
  },
  bottomScrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 15,
    minHeight: 180,
  },
  signaturePreview: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111827",
    textAlign: "center",
  },
  previewContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  materialButton: {
    backgroundColor: "#0b2e42ff",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    elevation: 2,
    minWidth: 200,
    marginVertical: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  placementControls: {
    marginTop: 8,
    alignItems: "center",
  },
  placementText: {
    marginBottom: 12,
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});
