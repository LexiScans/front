import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

interface ConfirmSignatureModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const ConfirmSignatureModal: React.FC<ConfirmSignatureModalProps> = ({
  visible,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={materialStyles.overlay}>
        <View style={materialStyles.content}>
          {isLoading ? (
            <View style={materialStyles.loadingContainer}>
              <ActivityIndicator size="large" color="#0b2e42ff" />
              <Text style={materialStyles.loadingText}>
                Firmando documento...
              </Text>
              <Text style={materialStyles.subText}>Por favor espera</Text>
            </View>
          ) : (
            <>
              <View style={materialStyles.header}>
                <Text style={materialStyles.title}>¿Confirmar firma?</Text>
              </View>

              <View style={materialStyles.body}>
                <Text style={materialStyles.message}>
                  ¿Estás seguro de que deseas firmar el documento? Esta acción
                  no se puede deshacer.
                </Text>
              </View>

              <View style={materialStyles.footer}>
                <TouchableOpacity
                  style={[materialStyles.button, materialStyles.cancelButton]}
                  onPress={onClose}
                  disabled={isLoading}
                >
                  <Text style={materialStyles.cancelText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[materialStyles.button, materialStyles.confirmButton]}
                  onPress={onConfirm}
                  disabled={isLoading}
                >
                  <Text style={materialStyles.confirmText}>Sí, Firmar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmSignatureModal;

const materialStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  content: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 24,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  body: {
    marginBottom: 24,
  },
  message: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 22,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: "#F3F4F6",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  confirmButton: {
    backgroundColor: "#0b2e42ff",
  },
  cancelText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },
  confirmText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  loadingContainer: {
    alignItems: "center",
    paddingVertical: 24,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  subText: {
    marginTop: 8,
    fontSize: 14,
    color: "#6B7280",
  },
});
