import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { styles } from "../../styles/contractDetails";
import type { Parte } from "../../hooks/contractDetails/useContractForm";

interface Props {
  partes: Parte[];
  actualizarParte: (index: number, valor: string) => void;
  agregarParte: () => void;
}

export const ContractPartes: React.FC<Props> = ({
  partes,
  actualizarParte,
  agregarParte,
}) => (
  <View>
    <Text style={styles.label}>Partes Involucradas</Text>
    {partes.map((parte, index) => (
      <TextInput
        key={index}
        style={styles.input}
        placeholder="Ej. Juan Pérez"
        value={parte.nombre}
        onChangeText={(text) => actualizarParte(index, text)}
      />
    ))}
    <TouchableOpacity onPress={agregarParte}>
      <Text style={styles.addLink}>+ Añadir otra parte</Text>
    </TouchableOpacity>
  </View>
);
