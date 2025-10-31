import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { styles, pickerSelectStyles } from "../../styles/contractDetails";
import { ContractPartes } from "./ContractPartes";
import { ContractDatePicker } from "./ContractDatePicker";
import { useNavigation } from "@react-navigation/native";
import { useContractForm } from "../../hooks/contractDetails/useContractForm";
import ENV from "../../../../config/env";
import SuccessModal from "../../../../components/SuccessModal";
import WarningModal from "../../../../components/WarningModal";

type ContractFormProps = {
  fileUri?: string;
  fileName?: string;
};

export const ContractForm = ({ fileUri, fileName }: ContractFormProps) => {
  const navigation = useNavigation();
  const {
    titulo,
    setTitulo,
    tipo,
    setTipo,
    partes,
    agregarParte,
    actualizarParte,
    fechaFirma,
    setFechaFirma,
    vencimiento,
    setVencimiento,
    notas,
    setNotas,
    mostrarFirmaPicker,
    setMostrarFirmaPicker,
    mostrarVencimientoPicker,
    setMostrarVencimientoPicker,
    tiposContrato,
    formatearFecha,
  } = useContractForm();

  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [contractId, setContractId] = useState<string | null>(null); 

  const uploadContract = async () => {
    if (!fileUri || !fileName) {
      setWarningMessage("Debes seleccionar un archivo primero.");
      setShowWarningModal(true);
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", {
        uri: fileUri,
        name: fileName,
        type: "application/pdf",
      } as any);
      formData.append("userId", "45224151-7b09-45ff-835b-413062c2e815");
      formData.append("type", tipo || "SERVICIOS");

      const response = await fetch(`${ENV.PDF_SERVICE}/contracts/upload`, {
        method: "POST",
        headers: { "Content-Type": "multipart/form-data" },
        body: formData,
      });

      if (!response.ok) {
        setWarningMessage("Error al subir el contrato");
        setShowWarningModal(true);
        return;
      }

      const data = await response.json();
      console.log("Contrato subido:", data);

      if (data?.id) {
        setContractId(data.id);
      }

      setShowSuccessModal(true);
    } catch (error: any) {
      console.error(error);
      setWarningMessage(error.message || "Error al subir el contrato");
      setShowWarningModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Text style={styles.label}>Título del Contrato</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej. Contrato de Arrendamiento"
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Tipo de Contrato</Text>
      <RNPickerSelect
        onValueChange={(value) => setTipo(value)}
        items={tiposContrato}
        placeholder={{ label: "Selecciona el tipo de contrato", value: null }}
        style={pickerSelectStyles}
        value={tipo}
      />

      <ContractPartes
        partes={partes}
        agregarParte={agregarParte}
        actualizarParte={actualizarParte}
      />

      <View style={styles.row}>
        <ContractDatePicker
          label="Fecha de Firma"
          date={fechaFirma}
          showPicker={mostrarFirmaPicker}
          setShowPicker={setMostrarFirmaPicker}
          setDate={setFechaFirma}
          formatearFecha={formatearFecha}
        />

        <ContractDatePicker
          label="Vencimiento"
          date={vencimiento}
          showPicker={mostrarVencimientoPicker}
          setShowPicker={setMostrarVencimientoPicker}
          setDate={setVencimiento}
          formatearFecha={formatearFecha}
        />
      </View>

      <Text style={styles.label}>Notas</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: "top" }]}
        multiline
        placeholder="Añade comentarios o detalles importantes aquí..."
        value={notas}
        onChangeText={setNotas}
      />

      <TouchableOpacity
        style={styles.nextBtn}
        onPress={uploadContract}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.nextText}>Siguiente: Subir Archivo</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home" as never)}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>

      <SuccessModal
        visible={showSuccessModal}
        onClose={() => {
          setShowSuccessModal(false);
          if (contractId) {
            navigation.navigate(
              "PrevisualizacionContrato" as never,
              { id: contractId } as never
            );
          } else {
            navigation.navigate("PrevisualizacionContrato" as never);
          }
        }}
      />

      <WarningModal
        visible={showWarningModal}
        onClose={() => setShowWarningModal(false)}
        message={warningMessage}
      />
    </View>
  );
};
