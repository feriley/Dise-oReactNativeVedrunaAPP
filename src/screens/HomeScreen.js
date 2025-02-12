import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../config/firebase';
import { AntDesign, Ionicons, FontAwesome5, FontAwesome } from '@expo/vector-icons';

// 🔹 URL del backend
const API_URL = 'http://192.168.0.18:8080/proyecto01/publicaciones';

// 🔹 Mapea imágenes locales
const obtenerImagen = (imageUrl) => {
  const imagenesLocales = {
    "publi1.jpg": require('../../assets/images/publi1.jpg'),
    "publi2.jpg": require('../../assets/images/publi2.jpg'),
    "publi3.jpg": require('../../assets/images/publi3.jpg'),
  };

  return imagenesLocales[imageUrl] || { uri: imageUrl }; // Si no es local, usarla como URL
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState([]);

  // 🔹 Cargar publicaciones desde la API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        const transformedPosts = data.map((post) => ({
          id: post.id,
          user: "Usuario", 
          userImage: require('../../assets/images/imgperfil.jpg'),
          postImage: obtenerImagen(post.image_url),
          timeAgo: "Hace 4 días", 
          likes: post.like.length || 0,
          liked: false,
          title: post.titulo,
          description: post.comentario,
          comments: 0 
        }));

        setPosts(transformedPosts);
      } catch (error) {
        console.error("Error al cargar publicaciones:", error);
      }
    };

    fetchPosts();
  }, []);

  // 🔹 Función para dar Like (actualizará en la API en el futuro)
  const toggleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
      )
    );
  };

  // 🔹 Navegar a la pantalla de detalles de la publicación
  const handlePressPost = (post) => {
    navigation.navigate('DetallePublicacion', { post });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/4b369d5d71efbfa1f6961ee2c182d04d.png')} style={styles.logo} />
        <Text style={styles.headerText}>VEDRUNA</Text>
        <Text style={styles.userNick}>{auth.currentUser?.displayName || 'Usuario'}</Text>
      </View>

      {/* 🔹 Lista de publicaciones desde la API */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePressPost(item)}>
            <View style={styles.postContainer}>
              <View style={styles.postHeader}>
                <Image source={item.userImage} style={styles.userImage} />
                <View>
                  <Text style={styles.postUser}>Publicado por {item.user}</Text>
                  <Text style={styles.postTime}>{item.timeAgo}</Text>
                </View>
              </View>

              <Image source={item.postImage} style={styles.postImage} />

              <View style={styles.reactions}>
                {/* Botón de Like */}
                <TouchableOpacity onPress={() => toggleLike(item.id)}>
                  <AntDesign name={item.liked ? "heart" : "hearto"} size={24} color={item.liked ? "red" : "black"} />
                </TouchableOpacity>
                <Text style={styles.likesText}>{item.likes} Me gusta</Text>

                {/* Botón de Comentarios */}
                <TouchableOpacity style={styles.commentButton} onPress={() => handlePressPost(item)}>
                  <FontAwesome name="comment" size={24} color="#9FC63B" />
                </TouchableOpacity>
              </View>

              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.postDescription}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

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

// 📌 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1
  },
  userNick: {
    fontSize: 14,
    color: '#9FC63B'
  },
  postContainer: {
    backgroundColor: '#2C2F33',
    margin: 10,
    borderRadius: 10,
    padding: 10
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#9FC63B',
    marginRight: 10
  },
  postUser: {
    fontWeight: 'bold',
    color: '#FFF'
  },
  postTime: {
    fontSize: 12,
    color: '#BBB'
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 10
  },
  reactions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  likesText: {
    marginLeft: 10,
    color: '#FFF'
  },
  commentButton: {
    marginLeft: 15
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9FC63B'
  },
  postDescription: {
    fontSize: 14,
    color: '#FFF'
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#23272A',
    paddingVertical: 10
  }
});

export default HomeScreen;
