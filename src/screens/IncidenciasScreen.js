import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// 🔹 URL del backend
const API_URL = 'http://192.168.0.18:8080/proyecto01/incidencias';

const IncidenciasScreen = () => {
  const navigation = useNavigation();
  const [incidencias, setIncidencias] = useState([]);

  // 🔹 Cargar incidencias desde la API
  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setIncidencias(data);
      } catch (error) {
        console.error('Error al cargar incidencias:', error);
      }
    };

    fetchIncidencias();
  }, []);

  // 🔹 Función para determinar el color según el estado
  const getEstadoColor = (estado) => {
    switch (estado.toUpperCase()) {
      case 'SOLUCIONADO': return '#4CAF50'; // Verde
      case 'EN TRÁMITE': return '#FFA500'; // Naranja
      case 'DENEGADA': return '#D32F2F'; // Rojo
      default: return '#FFF'; // Blanco por si acaso
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INCIDENCIAS</Text>

      <FlatList
        data={incidencias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.incidenciaContainer}>
            <Text style={styles.incidenciaTitulo}>{item.titulo}</Text>
            <Text style={[styles.incidenciaEstado, { color: getEstadoColor(item.estado) }]}>
              {item.estado}
            </Text>
          </View>
        )}
      />

      {/* 🔹 Botón flotante para añadir incidencia */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('CrearIncidencia')}
      >
        <FontAwesome5 name="plus" size={24} color="white" />
      </TouchableOpacity>

      {/* 🔹 Barra de navegación */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Add')}>
          <FontAwesome5 name="plus-circle" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Incidencias')}>
          <Ionicons name="settings" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
          <FontAwesome5 name="user-alt" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// 📌 **Estilos**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
    padding: 20,
    paddingBottom: 60, 
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9FC63B',
    textAlign: 'center',
    marginBottom: 20,
  },
  incidenciaContainer: {
    backgroundColor: '#2C2F33',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  incidenciaTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9FC63B',
  },
  incidenciaEstado: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButton: {
    position: 'absolute',
    bottom: 70, 
    right: 20,
    backgroundColor: '#9FC63B',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#23272A',
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#323639',
  },
});

export default IncidenciasScreen;
