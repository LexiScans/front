import { StyleSheet } from "react-native";
import { Colors } from "../../../theme";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 50,
  },
  subtitle: {
    color: Colors.textSecondary,
    marginBottom: 4,
  },
  progressContainer: {
    height: 6,
    backgroundColor: "#e5e7eb",
    borderRadius: 4,
    marginBottom: 16,
  },
  progressBar: {
    height: 6,
    width: "33%",
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  description: {
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  label: {
    fontWeight: "600",
    color: Colors.text,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 6,
    backgroundColor: "#F9FAFB",
  },
  addLink: {
    color: Colors.primary,
    fontWeight: "600",
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    marginTop: 8,
  },
  nextBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  nextText: {
    color: "#fff",
    fontWeight: "700",
  },
  cancelText: {
    color: Colors.textSecondary,
    textAlign: "center",
    marginTop: 10,
  },
});

export const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: Colors.text,
    backgroundColor: "#F9FAFB",
    marginTop: 6,
  },
  inputAndroid: {
    fontSize: 16,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    color: Colors.text,
    backgroundColor: "#F9FAFB",
    marginTop: 6,
  },
});
