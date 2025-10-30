import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../../styles/contractDetails";

interface Props {
  label: string;
  date: Date | null;
  showPicker: boolean;
  setShowPicker: (show: boolean) => void;
  setDate: (date: Date | null) => void;
  formatearFecha: (fecha: Date | null) => string;
}

export const ContractDatePicker: React.FC<Props> = ({
  label,
  date,
  showPicker,
  setShowPicker,
  setDate,
  formatearFecha,
}) => (
  <View style={{ flex: 1, marginHorizontal: 6 }}>
    <Text style={styles.label}>{label}</Text>
    <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.input}>
      <Text>{date ? formatearFecha(date) : "Seleccionar fecha"}</Text>
    </TouchableOpacity>

    {showPicker && (
      <DateTimePicker
        value={date || new Date()}
        mode="date"
        display={Platform.OS === "ios" ? "spinner" : "default"}
        onChange={(event, selectedDate) => {
          setShowPicker(Platform.OS === "ios");
          if (selectedDate) setDate(selectedDate);
        }}
      />
    )}
  </View>
);
