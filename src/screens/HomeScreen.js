import React, { useState } from 'react';
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
import { AntDesign, Ionicons, FontAwesome5 } from '@expo/vector-icons';

const HomeScreen = () => {
  const navigation = useNavigation();

  // 🔹 Simulación de publicaciones (esto luego vendrá del microservicio)
  const [posts, setPosts] = useState([
    {
      id: '1',
      user: 'juanperez',
      userImage: require('../../assets/images/imgperfil.jpg'),
      postImage: require('../../assets/images/publi1.jpg'),
      timeAgo: 'Hace 2 días',
      likes: 10,
      liked: false,
      title: 'DIALOGOS SOBRE ACEITES Y NUTRUCIÓN',
      description: 'Sesión de formación, de la mano de de @aceite.orujo , @malnutridos & @juan_revenga en FP VEDRUNA sobre mitos y utilidad del aceite de orujo',
      comments: 3
    },
    {
      id: '2',
      user: 'maria23',
      userImage: require('../../assets/images/imgperfil.jpg'),
      postImage: require('../../assets/images/publi3.jpg'),
      timeAgo: 'Hace 5 horas',
      likes: 25,
      liked: false,
      title: 'DIALOGOS SOBRE ACEITES Y NUTRUCIÓN',
      description: 'Sesión de formación, de la mano de de @aceite.orujo , @malnutridos & @juan_revenga en FP VEDRUNA sobre mitos y utilidad del aceite de oruj',
      comments: 7
    }
  ]);

  // 🔹 Función para dar Like
  const toggleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 } : post
      )
    );
  };

  return (
    <View style={styles.container}>
      {/* 🔹 Encabezado */}
      <View style={styles.header}>
        <Image source={require('../../assets/images/4b369d5d71efbfa1f6961ee2c182d04d.png')} style={styles.logo} />
        <Text style={styles.headerText}>VEDRUNA</Text>
        <Text style={styles.userNick}>{auth.currentUser?.displayName || 'Usuario'}</Text>
      </View>

      {/* 🔹 Lista de publicaciones */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            {/* 🔹 Info del usuario */}
            <View style={styles.postHeader}>
              <Image source={item.userImage} style={styles.userImage} />
              <View>
                <Text style={styles.postUser}>Publicado por {item.user}</Text>
                <Text style={styles.postTime}>{item.timeAgo}</Text>
              </View>
            </View>

            {/* 🔹 Imagen de la publicación */}
            <Image source={item.postImage} style={styles.postImage} />

            {/* 🔹 Botón de Like */}
            <View style={styles.reactions}>
              <TouchableOpacity onPress={() => toggleLike(item.id)}>
                <AntDesign name={item.liked ? "heart" : "hearto"} size={24} color={item.liked ? "red" : "black"} />
              </TouchableOpacity>
              <Text style={styles.likesText}>{item.likes} Me gusta</Text>
            </View>

            {/* 🔹 Información de la publicación */}
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postDescription}>{item.description}</Text>
            <Text style={styles.commentsText}>{item.comments} Comentarios</Text>
          </View>
        )}
      />

      {/* 🔹 Menú de navegación */}
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
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#9FC63B'
  },
  postDescription: {
    fontSize: 14,
    color: '#FFF'
  },
  commentsText: {
    fontSize: 12,
    color: '#BBB'
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#23272A',
    paddingVertical: 10
  }
});

export default HomeScreen;
