import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { styles, pickerSelectStyles } from "../../styles/contractDetails";
import { ContractPartes } from "./ContractPartes";
import { ContractDatePicker } from "./ContractDatePicker";
import { useNavigation } from "@react-navigation/native";
import { useContractForm } from "../../hooks/contractDetails/useContractForm";

export const ContractForm = () => {
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
        onPress={() => navigation.navigate("PrevisualizacionContrato" as never)}
      >
        <Text style={styles.nextText}>Siguiente: Subir Archivo</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Home" as never)}>
        <Text style={styles.cancelText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
};
