import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface BotonIniciarSesionProps {
  onPress: () => void;
}

const BotonIniciarSesion: React.FC<BotonIniciarSesionProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Iniciar Sesión</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#1E90FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BotonIniciarSesion;
