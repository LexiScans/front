import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const ContractSummaryScreen = () => {
  const navigation = useNavigation(); 

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#2596be" />
        </TouchableOpacity>
        <Text style={styles.title}>Resumen del Contrato</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Contrato de Prestación de Servicios</Text>
        <View style={styles.progressContainer}>
          <ProgressBar progress={0.85} width={null} color="#4CAF50" unfilledColor="#e0e0e0" height={8} />
          <Text style={styles.riskText}>Riesgo Bajo</Text>
          <Text style={styles.legibilityText}>Legibilidad: 85/100</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Beneficios</Text>
        <TouchableOpacity style={styles.cardItem}>
          <Ionicons name="card" size={24} color="#4CAF50" />
          <Text style={styles.cardItemText}>Condiciones de pago...</Text>
          <Text style={styles.cardItemDescription}>Pagos netos a 30 días con opción de adelanto.</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.cardItem}>
          <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
          <Text style={styles.cardItemText}>Protección de propiedad...</Text>
          <Text style={styles.cardItemDescription}>Cláusulas robustas para proteger tu trabajo.</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cláusulas Importantes</Text>
        <TouchableOpacity style={styles.cardItem}>
          <Text style={styles.cardItemText}>Cláusula 1...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardItem}>
          <Text style={styles.cardItemText}>Cláusula 2...</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Riesgos Potenciales</Text>
        <TouchableOpacity style={styles.cardItem}>
          <Text style={styles.cardItemText}>Riesgo 1...</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cardItem}>
          <Text style={styles.cardItemText}>Riesgo 2...</Text>
        </TouchableOpacity>
      </View>

      

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.fullContractButton, { backgroundColor: '#2596be' }]}
          onPress={() => navigation.navigate('PdfViewer')} 
        >
          <Text style={styles.footerButtonText}>Proceso de firma</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.askAIButton, { backgroundColor: '#2596be' }]}>
          <Text style={styles.footerButtonText}>Preguntar a la IA</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginVertical: 8,
  },
  progressContainer: {
    marginTop: 16,
  },
  riskText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
    marginTop: 8,
  },
  legibilityText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  cardItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 12,
  },
  cardItemDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 12,
    marginTop: 4,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  fullContractButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 10,
  },
  askAIButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ContractSummaryScreen;
