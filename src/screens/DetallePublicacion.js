import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Alert,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

// 🔹 URL del backend
const API_URL = 'http://192.168.0.18:8080/proyecto01';

const DetallePublicacion = ({ route }) => {
  const navigation = useNavigation();
  const { post } = route.params;

  const [likes, setLikes] = useState(post.likes);
  const [liked, setLiked] = useState(false);
  const [comentarios, setComentarios] = useState([]);
  const [nuevoComentario, setNuevoComentario] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const userId = "789012"; // 🔹 Asegúrate de usar el ID real del usuario

  // 🔹 Obtener comentarios de la API cuando se carga la pantalla
  useEffect(() => {
    fetch(`${API_URL}/comentarios/${post.id}`)
      .then(response => response.json())
      .then(data => setComentarios(data))
      .catch(error => console.error("Error al cargar comentarios:", error));
  }, []);

  // 🔹 Función para dar Like
  const handleLike = async () => {
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);

    try {
      const response = await fetch(`${API_URL}/publicaciones/put/${post.id}/${userId}`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error('Error al actualizar el like');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Hubo un problema al dar like.');
    }
  };

  // 🔹 Función para enviar comentario (CORRECTO: SE USA **POST**)
  const enviarComentario = async () => {
    if (!nuevoComentario.trim()) {
      Alert.alert("Error", "No puedes enviar un comentario vacío.");
      return;
    }

    const comentarioData = {
      user_id: userId, // Usuario autenticado
      idPublicacion: post.id, // ID de la publicación seleccionada
      comentario: nuevoComentario, // Comentario ingresado por el usuario
    };

    console.log("📤 Enviando comentario:", comentarioData);

    try {
      const response = await fetch(`${API_URL}/comentarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comentarioData),
      });

      if (!response.ok) {
        throw new Error(`Error en el servidor: ${await response.text()}`);
      }

      fetch(`${API_URL}/comentarios/${post.id}`)
        .then(response => response.json())
        .then(data => setComentarios(data))
        .catch(error => console.error("Error al cargar comentarios:", error));

      setNuevoComentario('');
      setModalVisible(false);
      Alert.alert("Éxito", "Comentario publicado correctamente.");
    } catch (error) {
      console.error('❌ Error en enviarComentario:', error);
      Alert.alert('Error', 'Hubo un problema al enviar el comentario.');
    }
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Botón Volver */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={24} color="#9FC63B" />
      </TouchableOpacity>

      {/* 🔹 Info del usuario */}
      <View style={styles.userInfo}>
        <Image source={post.userImage} style={styles.userImage} />
        <View>
          <Text style={styles.postUser}>Publicado por {post.user}</Text>
          <Text style={styles.postTime}>Hace 4 días</Text>
        </View>
      </View>

      {/* 🔹 Imagen de la publicación */}
      <Image source={post.postImage} style={styles.postImage} />

      {/* 🔹 Botón de Like */}
      <View style={styles.reactions}>
        <TouchableOpacity onPress={handleLike}>
          <AntDesign name={liked ? "heart" : "hearto"} size={24} color={liked ? "red" : "black"} />
        </TouchableOpacity>
        <Text style={styles.likesText}>{likes} Me gusta</Text>
      </View>

      {/* 🔹 Información de la publicación */}
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postDescription}>{post.description}</Text>

      {/* 🔹 Sección de Comentarios */}
      <Text style={styles.commentsHeader}>COMENTARIOS:</Text>
      <FlatList
        data={comentarios}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.commentItem}>
            <Image source={require('../../assets/images/imgperfil.jpg')} style={styles.commentUserImage} />
            <View>
              <Text style={styles.commentUser}>Usuario:</Text>
              <Text style={styles.commentText}>{item.comentario}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noComments}>No hay comentarios.</Text>}
      />

      {/* 🔹 Botón flotante para comentar */}
      <TouchableOpacity style={styles.commentButton} onPress={() => setModalVisible(true)}>
        <FontAwesome name="comment" size={24} color="white" />
      </TouchableOpacity>

      {/* 🔹 Modal para escribir comentarios */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.commentBox}>
            <Text style={styles.modalTitle}>Comentario:</Text>
            <TextInput
              style={styles.input}
              placeholder="Máx. 250 caracteres"
              maxLength={250}
              multiline
              value={nuevoComentario}
              onChangeText={setNuevoComentario}
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.publishButton} onPress={enviarComentario}>
                <Text style={styles.buttonText}>Publicar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// 📌 Estilos actualizados (solo esta sección cambia)
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1A1A1A',
      paddingHorizontal: 15,
    },
    backButton: {
      position: 'absolute',
      top: 40,
      left: 15,
      zIndex: 1,
      backgroundColor: 'rgba(0,0,0,0.6)',
      borderRadius: 20,
      padding: 8,
    },
    userInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 50,
      marginBottom: 15,
    },
    userImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
      marginRight: 15,
      borderWidth: 2,
      borderColor: '#9FC63B',
    },
    postUser: {
      color: '#FFF',
      fontSize: 16,
      fontWeight: '600',
    },
    postTime: {
      color: '#7F8487',
      fontSize: 12,
    },
    postImage: {
      width: '100%',
      height: 300,
      borderRadius: 12,
      marginVertical: 10,
    },
    reactions: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 15,
      paddingVertical: 8,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: '#333333',
    },
    likesText: {
      color: '#FFF',
      marginLeft: 10,
      fontSize: 16,
    },
    postTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: '#9FC63B',
      marginBottom: 8,
    },
    postDescription: {
      fontSize: 14,
      color: '#CCCCCC',
      lineHeight: 22,
      marginBottom: 20,
    },
    commentsHeader: {
      fontSize: 18,
      color: '#9FC63B',
      fontWeight: '700',
      marginBottom: 15,
    },
    commentItem: {
      flexDirection: 'row',
      backgroundColor: '#2A2A2A',
      borderRadius: 8,
      padding: 12,
      marginBottom: 10,
      alignItems: 'flex-start',
    },
    commentUserImage: {
      width: 36,
      height: 36,
      borderRadius: 18,
      marginRight: 12,
    },
    commentUser: {
      color: '#9FC63B',
      fontSize: 12,
      marginBottom: 4,
    },
    commentText: {
      color: '#FFF',
      fontSize: 14,
      lineHeight: 20,
    },
    noComments: {
      color: '#666',
      textAlign: 'center',
      marginTop: 20,
    },
    commentButton: {
      position: 'absolute',
      bottom: 30,
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
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
    },
    commentBox: {
      backgroundColor: '#2A2A2A',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 20,
    },
    modalTitle: {
      color: '#9FC63B',
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 15,
    },
    input: {
      backgroundColor: '#333333',
      borderRadius: 12,
      minHeight: 100,
      padding: 15,
      color: '#FFF',
      fontSize: 16,
      textAlignVertical: 'top',
      marginBottom: 20,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
    },
    cancelButton: {
      backgroundColor: '#444444',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    publishButton: {
      backgroundColor: '#9FC63B',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    buttonText: {
      color: '#FFF',
      fontWeight: '600',
    },
  });

export default DetallePublicacion;
