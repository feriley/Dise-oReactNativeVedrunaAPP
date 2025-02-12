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

const AddScreen = () => {
  const navigation = useNavigation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null); // 🔹 Estado para la imagen

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

  // 🔹 Función para publicar la publicación
  const handlePublish = async () => {
    if (!image || title.trim() === '' || description.trim() === '') {
      Alert.alert('Error', 'Debes completar todos los campos y seleccionar una imagen.');
      return;
    }

    if (title.length > 40 || description.length > 250) {
      Alert.alert('Error', 'Título máx: 40 caracteres. Descripción máx: 250 caracteres.');
      return;
    }

    const newPost = {
      user_id: "123456",
      image_url: image, // 🔹 Ahora usa la imagen seleccionada
      titulo: title,
      comentario: description,
    };

    try {
      const response = await fetch('http://192.168.0.18:8080/proyecto01/publicaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) throw new Error('Error al enviar la publicación');

      Alert.alert('Publicado', 'Tu publicación ha sido enviada correctamente.');
      navigation.navigate('Home');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al publicar.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PUBLICACIÓN</Text>

      {/* 🔹 Botón para seleccionar imagen */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Ionicons name="image-outline" size={80} color="#9FC63B" />
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        placeholder="Máx. 40 caracteres"
        placeholderTextColor="#808080"
        maxLength={40}
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Máx. 250 caracteres"
        placeholderTextColor="#808080"
        maxLength={250}
        multiline
        numberOfLines={4}
        value={description}
        onChangeText={setDescription}
      />

      <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
        <Text style={styles.publishButtonText}>Publicar</Text>
      </TouchableOpacity>

      {/* 🔹 Menú de navegación (Tab Bar) */}
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
  publishButton: {
    backgroundColor: '#9FC63B',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  publishButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
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
    borderTopColor: '#323639'
  }
});

export default AddScreen;
