import { StyleSheet, Dimensions, Platform } from "react-native";

export const styles = StyleSheet.create({
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
  coordinatesText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginVertical: 5,
  },
});
