import { StyleSheet } from "react-native";
import { Colors } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  header: {
    marginTop: 50,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
    marginLeft: 10,
  },
  step: {
    color: Colors.textSecondary,
    alignSelf: "flex-start",
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    width: "100%",
    marginTop: 4,
    marginBottom: 32,
  },
  progressBar: {
    height: 6,
    width: "100%",
    backgroundColor: "#2563eb",
    borderRadius: 4,
  },
  iconCircle: {
    backgroundColor: "#dcfce7",
    padding: 30,
    borderRadius: 100,
    marginVertical: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: Colors.textSecondary,
    textAlign: "center",
    fontSize: 15,
    marginBottom: 40,
    lineHeight: 22,
  },
  analyzeBtn: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  analyzeText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  laterBtn: {
    marginTop: 14,
  },
  laterText: {
    color: "#2563eb",
    fontWeight: "600",
  },
});
