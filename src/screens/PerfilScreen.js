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
import { Ionicons, FontAwesome5, AntDesign, Entypo } from '@expo/vector-icons';

// 🔹 Datos Hardcodeados para el usuario
const usuario = {
  nick: "feriley",
  nombre: "Fernando",
  apellidos: "Iglesias Leyva",
  descripcion: "Desarrollador apasionado de React Native",
  profile_picture: require('../../assets/images/imgperfilfinal.jpg') 
};

// 🔹 Datos Hardcodeados de publicaciones
const publicaciones = [
  { id: "1", image: require('../../assets/images/publi1.jpg') },
  { id: "2", image: require('../../assets/images/publi2.jpg') },
  { id: "3", image: require('../../assets/images/publi3.jpg') },
  { id: "4", image: require('../../assets/images/publi1.jpg') },
  { id: "5", image: require('../../assets/images/publi2.jpg') },
  { id: "6", image: require('../../assets/images/publi3.jpg') },
];

const PerfilScreen = () => {
  const navigation = useNavigation();
  const [showLikes, setShowLikes] = useState(false);

  return (
    <View style={styles.container}>
      {/* 🔹 Información del usuario */}
      <View style={styles.profileHeader}>
        <Image source={usuario.profile_picture} style={styles.profileImage} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{usuario.nombre} {usuario.apellidos}</Text>
          <Text style={styles.userNick}>@{usuario.nick}</Text>
          <Text style={styles.userDescription}>{usuario.descripcion}</Text>
        </View>
      </View>

      {/* 🔹 Estadísticas de usuario */}
      <View style={styles.statsContainer}>
        <View style={styles.statsItem}>
          <Text style={styles.statsNumber}>{publicaciones.length}</Text>
          <Text style={styles.statsText}>Publicaciones</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsNumber}>120</Text>
          <Text style={styles.statsText}>Seguidores</Text>
        </View>
        <View style={styles.statsItem}>
          <Text style={styles.statsNumber}>80</Text>
          <Text style={styles.statsText}>Seguidos</Text>
        </View>
      </View>

      {/* 🔹 Botones de "Mis publicaciones" y "Me gusta" */}
      <View style={styles.switchButtons}>
        <TouchableOpacity style={[styles.switchButton, !showLikes && styles.activeButton]} onPress={() => setShowLikes(false)}>
          <Entypo name="grid" size={28} color={!showLikes ? "#9FC63B" : "#FFF"} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.switchButton, showLikes && styles.activeButton]} onPress={() => setShowLikes(true)}>
          <AntDesign name="hearto" size={28} color={showLikes ? "#9FC63B" : "#FFF"} />
        </TouchableOpacity>
      </View>

      {/* 🔹 Publicaciones en cuadrícula */}
      <FlatList
        data={publicaciones}
        keyExtractor={(item) => item.id}
        numColumns={3}
        renderItem={({ item }) => (
          <Image source={item.image} style={styles.postImage} />
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

// 📌 **Estilos Finales**
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
    padding: 20,
    paddingTop: 60, // 🔹 Espacio extra arriba para que no esté pegado
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#9FC63B',
    marginRight: 15,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  userNick: {
    fontSize: 14,
    color: '#9FC63B',
    marginBottom: 5,
  },
  userDescription: {
    fontSize: 14,
    color: '#BBB',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statsItem: {
    alignItems: 'center',
  },
  statsNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9FC63B',
  },
  statsText: {
    fontSize: 12,
    color: '#FFF',
  },
  switchButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#323639',
    paddingBottom: 10,
  },
  switchButton: {
    padding: 10,
    marginHorizontal: 10,
  },
  activeButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#9FC63B',
  },
  postImage: {
    width: '32%',
    height: 100,
    margin: 2,
    borderRadius: 5,
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

export default PerfilScreen;
