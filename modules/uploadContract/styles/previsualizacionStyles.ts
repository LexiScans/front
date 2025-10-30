import { StyleSheet } from "react-native";
import { Colors } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginLeft: 10,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginBottom: 16,
    marginTop: 4,
  },
  progressBar: {
    height: 6,
    width: "66%",
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  previewBox: {
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 12,
    padding: 16,
  },
  previewImage: {
    width: 220,
    height: 280,
    borderRadius: 12,
    marginBottom: 10,
  },
  fileName: {
    fontWeight: "700",
    color: Colors.text,
  },
  fileDetails: {
    color: Colors.textSecondary,
  },
  infoBox: {
    marginTop: 20,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 14,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
  },
  infoTitle: {
    fontWeight: "600",
    color: Colors.text,
  },
  infoDesc: {
    color: Colors.textSecondary,
  },
  analyzeBtn: {
    flexDirection: "row",
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26,
  },
  analyzeText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
  },
  uploadAnother: {
    alignItems: "center",
    marginTop: 16,
  },
  uploadText: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
