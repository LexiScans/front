import React, { useEffect, useRef, useState } from 'react';
import {
  Modal, View, Text, TouchableOpacity, StyleSheet, Animated, Alert, ActivityIndicator
} from 'react-native';
import { Colors } from '../theme';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import * as Print from 'expo-print';
import * as FileSystem from 'expo-file-system';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
  Home: undefined;
  ContractSummary: undefined;
  DetallesContrato: { fileUri?: string; fileName?: string };
};

type Props = {
  visible: boolean;
  onClose: () => void;
};

export default function UploadModal({ visible, onClose }: Props) {
  const slide = useRef(new Animated.Value(0)).current;
  const [loading, setLoading] = useState(false);
  const navigation =
      useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (visible) {
      Animated.timing(slide, { toValue: 1, duration: 300, useNativeDriver: true }).start();
    } else {
      Animated.timing(slide, { toValue: 0, duration: 220, useNativeDriver: true }).start();
    }
  }, [visible]);

  const goToDetallesContrato = () => {
    onClose();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.navigate("DetallesContrato", {
        fileUri: "dummy-path/documento.pdf",
        fileName: "documento_demo.pdf",
      });
    }, 500);
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });
      if (res.type === 'success') {
        Alert.alert('Archivo seleccionado', res.name);

        // Cierra el modal y navega
        setTimeout(() => {
          onClose();
          navigation.navigate("DetallesContrato", {
            fileUri: res.uri,
            fileName: res.name,
          });
        }, 500);
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo seleccionar el documento');
    }
  };

  const takePhotoAndConvertPDF = async () => {
    try {
      setLoading(true);
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se requieren permisos de cámara');
        setLoading(false);
        return;
      }
      const photo = await ImagePicker.launchCameraAsync({ quality: 0.8 });
      if (photo.canceled) {
        setLoading(false);
        return;
      }

      const html = `<html><body style="margin:0"><img src="${photo.assets[0].uri}" style="width:100%;height:auto"/></body></html>`;
      const { uri } = await Print.printToFileAsync({ html });
      const dest = FileSystem.documentDirectory + `contract_${Date.now()}.pdf`;
      await FileSystem.copyAsync({ from: uri, to: dest });

      Alert.alert('PDF creado', `Guardado en: ${dest}`);

      // Cierra modal y navega
      setTimeout(() => {
        onClose();
        navigation.navigate("DetallesContrato", {
          fileUri: dest,
          fileName: `contract_${Date.now()}.pdf`,
        });
      }, 500);
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'No se pudo crear PDF');
    } finally {
      setLoading(false);
    }
  };

  const containerTranslate = slide.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  return (
      <Modal transparent visible={visible} animationType="none">
        <View style={styles.overlay}>
          <Animated.View style={[styles.sheet, { transform: [{ translateY: containerTranslate }], opacity: slide }]}>
            <View style={styles.header}>
              <Text style={styles.title}>Subir documento</Text>
              <TouchableOpacity onPress={onClose}><Ionicons name="close" size={22} color={Colors.text} /></TouchableOpacity>
            </View>

            <Text style={styles.desc}>Selecciona un PDF o toma una foto y conviértela a PDF.</Text>

            <TouchableOpacity style={styles.actionBtn} onPress={goToDetallesContrato}>
              <Ionicons name="document-outline" size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Seleccionar PDF</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={goToDetallesContrato}>
              <Ionicons name="camera-outline" size={20} color={Colors.primary} />
              <Text style={styles.actionText}>Tomar foto y convertir a PDF</Text>
            </TouchableOpacity>

            {loading && <ActivityIndicator style={{ marginTop: 12 }} size="small" color={Colors.primary} />}

            <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
              <Text style={{ color: Colors.textSecondary }}>Cancelar</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex:1, backgroundColor: 'rgba(4,8,12,0.35)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: 'white', padding: 18, borderTopLeftRadius: 14, borderTopRightRadius: 14 },
  header: { flexDirection:'row', justifyContent:'space-between', alignItems:'center' },
  title: { fontWeight:'700', fontSize:16, color: Colors.secondary },
  desc: { color: Colors.textSecondary, marginTop:6, marginBottom:12 },
  actionBtn: { flexDirection:'row', alignItems:'center', padding:12, borderRadius:10, backgroundColor:'#F5FAFF', marginTop:8 },
  actionText: { marginLeft:12, color: Colors.text, fontWeight:'600' },
  closeBtn: { alignItems:'center', marginTop:12, padding:10 }
});
