import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// 🔹 URL del backend
const API_URL = 'http://192.168.0.18:8080/proyecto01/incidencias';

const CrearIncidenciaScreen = () => {
  const navigation = useNavigation();
  const [numEquipo, setNumEquipo] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [image, setImage] = useState(null); // Estado para la imagen

  // 🔹 Función para abrir la galería y seleccionar una imagen
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 🔹 Función para enviar la incidencia a la API
  const handleSubmit = async () => {
    if (!image || numEquipo.trim() === '' || titulo.trim() === '' || descripcion.trim() === '') {
      Alert.alert('Error', 'Debes completar todos los campos y adjuntar una imagen.');
      return;
    }

    if (titulo.length > 40 || descripcion.length > 250) {
      Alert.alert('Error', 'Título máx: 40 caracteres. Descripción máx: 250 caracteres.');
      return;
    }

    const nuevaIncidencia = {
      user_id: "123456", 
      num_equipo: numEquipo,
      image_url: image,
      titulo: titulo,
      descripcion: descripcion,
      estado: "EN TRÁMITE" // Estado inicial x defecto cuando creamos una incidencia.
    };

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaIncidencia),
      });

      if (!response.ok) throw new Error('Error al enviar la incidencia');

      Alert.alert('Éxito', 'Incidencia reportada correctamente.');
      navigation.navigate('Incidencias'); 
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al reportar la incidencia.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>INCIDENCIA</Text>

      {/* 🔹 Botón para seleccionar imagen */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Ionicons name="image-outline" size={80} color="#9FC63B" />
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Nº de equipo / clase:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: Aula 101 / PC-05"
        placeholderTextColor="#808080"
        value={numEquipo}
        onChangeText={setNumEquipo}
      />

      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        placeholder="Máx. 40 caracteres"
        placeholderTextColor="#808080"
        maxLength={40}
        value={titulo}
        onChangeText={setTitulo}
      />

      <Text style={styles.label}>Descripción problema:</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Máx. 250 caracteres"
        placeholderTextColor="#808080"
        maxLength={250}
        multiline
        numberOfLines={4}
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>ENVIAR</Text>
      </TouchableOpacity>
    </View>
  );
};

// 📌 **Estilos**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9FC63B',
    marginTop: 40,
    marginBottom: 20,
  },
  imagePicker: {
    width: 150,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#323639',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    color: '#9FC63B',
    alignSelf: 'flex-start',
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    backgroundColor: '#323639',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    color: '#FFF',
    marginBottom: 15,
  },
  descriptionInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    borderColor: '#9FC63B',
    borderWidth: 2,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});

export default CrearIncidenciaScreen;
