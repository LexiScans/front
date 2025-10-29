import React, { useRef, useEffect } from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import SignatureCanvas from "./SignatureCanvas";
import { captureRef } from "react-native-view-shot";

interface SignatureModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  onSignatureChange: (paths: { x: number; y: number }[][]) => void;
  onSignatureBase64: (base64: string) => void;
  initialPaths?: { x: number; y: number }[][];
}

const SignatureModal: React.FC<SignatureModalProps> = ({
  visible,
  onClose,
  onConfirm,
  onSignatureChange,
  onSignatureBase64,
  initialPaths = [],
}) => {
  const signatureRef = useRef<any>(null);

  useEffect(() => {
    if (visible && signatureRef.current) {
      signatureRef.current.clear?.();
    }
  }, [visible]);

  const handleConfirm = async () => {
  if (signatureRef.current) {
    try {
      const base64 = await captureRef(signatureRef.current, {
        format: "png",      
        quality: 1,
        result: "base64",
        width: 80,
        height: 50,
      });
      onSignatureBase64(base64);
    } catch (error) {
      console.log("Error capturando la firma:", error);
    }
  }
  onConfirm();
};


  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {initialPaths.length > 0 ? "Editar Firma" : "Área de Firma"}
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.body}>
            <Text style={styles.text}>Firma con tu dedo en el área:</Text>
            <SignatureCanvas
              ref={signatureRef}
              onSignatureChange={onSignatureChange}
              onSignatureBase64={onSignatureBase64}
            />
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#111" },
  closeButtonText: { fontSize: 18, color: "#555" },
  body: { alignItems: "center", marginVertical: 10 },
  text: { fontSize: 15, marginBottom: 10, color: "#333" },
  footer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 8,
    width: "40%",
    alignItems: "center",
  },
  cancelButton: { backgroundColor: "#ccc" },
  confirmButton: { backgroundColor: "#007AFF" },
  cancelText: { color: "#111", fontWeight: "500" },
  confirmText: { color: "#fff", fontWeight: "600" },
});

export default SignatureModal;
