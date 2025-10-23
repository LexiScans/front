import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Modal } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const ContractSummaryScreen = () => {
  const navigation = useNavigation();
  const [expandedSections, setExpandedSections] = useState({
    explicacion: true,
    beneficios: false,
    clausulas: false,
    riesgos: false
  });
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [inputText, setInputText] = useState("");

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sendMessage = () => {
    if (inputText.trim() === "") return;
    const userMessage = { text: inputText, isUser: true };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setTimeout(() => {
      const botResponse = getBotResponse(inputText);
      setMessages((prev) => [...prev, { text: botResponse, isUser: false }]);
    }, 1000);
  };

  const getBotResponse = (msg: string) => {
    const m = msg.toLowerCase();
    if (m.includes("hola") || m.includes("buenos"))
      return "¡Hola! Soy tu asistente del contrato. ¿En qué puedo ayudarte con el documento?";
    if (m.includes("pago") || m.includes("precio"))
      return "Los términos de pago están en la sección 3 del contrato: Pagos netos a 30 días con opción de adelanto del 50%.";
    if (m.includes("confidencialidad"))
      return "La cláusula de confidencialidad protege la información sensible por 3 años tras la finalización del contrato.";
    if (m.includes("terminación") || m.includes("finalizar"))
      return "Las condiciones de terminación permiten la resolución con 30 días de preaviso por incumplimiento grave.";
    if (m.includes("propiedad") || m.includes("intelectual"))
      return "Los derechos de propiedad intelectual se transfieren al cliente tras el pago completo de los servicios.";
    if (m.includes("riesgo") || m.includes("peligro"))
      return "El contrato tiene riesgo bajo. Los principales riesgos identificados son retrasos en pagos y ambigüedad en alcance.";
    return "Entiendo tu pregunta sobre el contrato. ¿Podrías ser más específico sobre qué cláusula o sección te interesa?";
  };

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

      {/* Sección Explicación General */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => toggleSection('explicacion')}
        >
          <Text style={styles.sectionTitle}>Explicación General</Text>
          <Ionicons 
            name={expandedSections.explicacion ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#6B7280" 
          />
        </TouchableOpacity>
        
        {expandedSections.explicacion && (
          <View style={styles.sectionContent}>
            <View style={styles.explanationCard}>
              <Ionicons name="analytics" size={24} color="#2596be" />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemText}>Análisis de Riesgo del Contrato</Text>
                <Text style={styles.cardItemDescription}>
                  Nuestra IA ha analizado tu contrato. Este es un contrato de prestación de servicios 
                  con condiciones generalmente favorables. Presenta un riesgo bajo debido a sus cláusulas 
                  equilibradas y términos claros. La legibilidad es alta, lo que facilita la comprensión 
                  de los derechos y obligaciones de ambas partes.
                </Text>
                <Text style={styles.cardItemDescription}>
                  El contrato incluye protecciones adecuadas para el proveedor de servicios y establece 
                  plazos y condiciones de pago razonables. Se recomienda prestar atención a las cláusulas 
                  de confidencialidad y propiedad intelectual.
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Sección Beneficios */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => toggleSection('beneficios')}
        >
          <Text style={styles.sectionTitle}>Beneficios</Text>
          <Ionicons 
            name={expandedSections.beneficios ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#6B7280" 
          />
        </TouchableOpacity>
        
        {expandedSections.beneficios && (
          <View style={styles.sectionContent}>
            <View style={styles.cardItem}>
              <Ionicons name="card" size={24} color="#4CAF50" />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemText}>Condiciones de pago favorables</Text>
                <Text style={styles.cardItemDescription}>Pagos netos a 30 días con opción de adelanto del 50% al inicio del proyecto.</Text>
              </View>
            </View>

            <View style={styles.cardItem}>
              <Ionicons name="shield-checkmark" size={24} color="#4CAF50" />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemText}>Protección de propiedad intelectual</Text>
                <Text style={styles.cardItemDescription}>Cláusulas robustas que garantizan la protección de tu trabajo y derechos de autor.</Text>
              </View>
            </View>

            <View style={styles.cardItem}>
              <Ionicons name="business" size={24} color="#4CAF50" />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemText}>Flexibilidad en entregables</Text>
                <Text style={styles.cardItemDescription}>Posibilidad de ajustar los entregables según necesidades cambiantes del proyecto.</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Sección Cláusulas Importantes */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => toggleSection('clausulas')}
        >
          <Text style={styles.sectionTitle}>Cláusulas Importantes</Text>
          <Ionicons 
            name={expandedSections.clausulas ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#6B7280" 
          />
        </TouchableOpacity>
        
        {expandedSections.clausulas && (
          <View style={styles.sectionContent}>
            <View style={styles.cardItem}>
              <Ionicons name="document-text" size={24} color="#2596be" />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemText}>Confidencialidad</Text>
                <Text style={styles.cardItemDescription}>Ambas partes se comprometen a mantener confidencialidad sobre información sensible por 3 años tras la finalización.</Text>
              </View>
            </View>

            <View style={styles.cardItem}>
              <Ionicons name="calendar" size={24} color="#2596be" />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemText}>Plazos de entrega</Text>
                <Text style={styles.cardItemDescription}>Entregas parciales cada 15 días con revisión y aprobación por escrito del cliente.</Text>
              </View>
            </View>

            <View style={styles.cardItem}>
              <Ionicons name="warning" size={24} color="#2596be" />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemText}>Terminación anticipada</Text>
                <Text style={styles.cardItemDescription}>Posibilidad de terminación con 30 días de preaviso por incumplimiento grave de cualquiera de las partes.</Text>
              </View>
            </View>

            <View style={styles.cardItem}>
              <Ionicons name="scale" size={24} color="#2596be" />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemText}>Propiedad intelectual</Text>
                <Text style={styles.cardItemDescription}>Los derechos de propiedad intelectual se transfieren al cliente tras el pago completo de los servicios.</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Sección Riesgos Potenciales */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => toggleSection('riesgos')}
        >
          <Text style={styles.sectionTitle}>Riesgos Potenciales</Text>
          <Ionicons 
            name={expandedSections.riesgos ? "chevron-up" : "chevron-down"} 
            size={20} 
            color="#6B7280" 
          />
        </TouchableOpacity>
        
        {expandedSections.riesgos && (
          <View style={styles.sectionContent}>
            <View style={styles.cardItem}>
              <Ionicons name="time" size={24} color="#FF6B6B" />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemText}>Retrasos en pagos</Text>
                <Text style={styles.cardItemDescription}>El cliente tiene historial de pagos con retrasos ocasionales de hasta 15 días sobre la fecha acordada.</Text>
              </View>
            </View>

            <View style={styles.cardItem}>
              <Ionicons name="expand" size={24} color="#FF6B6B" />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemText}>Ambigüedad en alcance</Text>
                <Text style={styles.cardItemDescription}>Algunos entregables no están completamente definidos, lo que podría llevar a malentendidos.</Text>
              </View>
            </View>

            <View style={styles.cardItem}>
              <Ionicons name="alert-circle" size={24} color="#FF6B6B" />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemText}>Cambios no documentados</Text>
                <Text style={styles.cardItemDescription}>Riesgo de solicitudes de cambios no documentados que afecten el cronograma y presupuesto.</Text>
              </View>
            </View>

            <View style={styles.cardItem}>
              <Ionicons name="close-circle" size={24} color="#FF6B6B" />
              <View style={styles.cardItemContent}>
                <Text style={styles.cardItemText}>Falta de penalizaciones claras</Text>
                <Text style={styles.cardItemDescription}>No se especifican penalizaciones por incumplimiento de plazos por parte del cliente.</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.fullContractButton, { backgroundColor: '#2596be' }]}
          onPress={() => navigation.navigate('PdfViewer')} 
        >
          <Text style={styles.footerButtonText}>Proceso de firma</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.askAIButton, { backgroundColor: '#2596be' }]}
          onPress={() => setChatVisible(true)}
        >
          <Text style={styles.footerButtonText}>Preguntar a la IA</Text>
        </TouchableOpacity>
      </View>

      {/* Modal de Chat */}
      <Modal
        visible={chatVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setChatVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Header del Modal */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Asistente IA del Contrato</Text>
              <TouchableOpacity 
                onPress={() => setChatVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#666" />
              </TouchableOpacity>
            </View>

            {/* Área de Mensajes */}
            <ScrollView style={styles.messagesContainer}>
              {messages.length === 0 && (
                <View style={styles.welcomeMessage}>
                  <Text style={styles.welcomeText}>
                    ¡Hola! Soy tu asistente IA. Puedo ayudarte a entender cualquier aspecto del contrato: cláusulas, pagos, riesgos, etc.
                  </Text>
                </View>
              )}
              {messages.map((message, index) => (
                <View
                  key={index}
                  style={[
                    styles.messageBubble,
                    message.isUser ? styles.userBubble : styles.botBubble,
                  ]}
                >
                  <Text style={message.isUser ? styles.userText : styles.botText}>
                    {message.text}
                  </Text>
                </View>
              ))}
            </ScrollView>

            {/* Input y Botón de Envío */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                value={inputText}
                onChangeText={setInputText}
                placeholder="Escribe tu pregunta sobre el contrato..."
                multiline
              />
              <TouchableOpacity 
                style={styles.sendButton} 
                onPress={sendMessage}
                disabled={inputText.trim() === ""}
              >
                <Ionicons 
                  name="send" 
                  size={20} 
                  color={inputText.trim() === "" ? "#ccc" : "#2596be"} 
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  sectionContent: {
    marginTop: 8,
  },
  explanationCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardItem: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  cardItemContent: {
    flex: 1,
    marginLeft: 12,
  },
  cardItemText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardItemDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 8,
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
    width: '100%',
    alignItems: 'center',
  },
  askAIButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  footerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  // Estilos del Modal de Chat
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '80%',
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  messagesContainer: {
    flex: 1,
    marginBottom: 16,
  },
  welcomeMessage: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 8,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2596be',
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f0f0',
  },
  userText: {
    color: 'white',
    fontSize: 14,
  },
  botText: {
    color: '#333',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 16,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
});

export default ContractSummaryScreen;