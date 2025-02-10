import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';

// 1️⃣ Importamos la función para crear usuario y la instancia de auth
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';

const SignUpScreen = ({ navigation }) => {
  // 2️⃣ Estados para email y password (al menos)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // (Opcional) Estado para "Repita contraseña"
  const [confirmPassword, setConfirmPassword] = useState('');

  // También tienes otros campos (Nick, Nombre, etc.) que no se guardarán en Firebase Auth,
  // solo en caso de necesitar base de datos (Firestore).

  // 3️⃣ Función para manejar el registro
  const handleSignUp = async () => {
    // (Opcional) Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      // Llamamos a Firebase Auth
      await createUserWithEmailAndPassword(auth, email.trim(), password);
      Alert.alert('Registro exitoso', 'Cuenta creada correctamente');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error al registrarse', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/imgForm.png')}
        style={styles.image}
      />

      <Text style={styles.label}>Completar los siguientes campos:</Text>

      {/* Email */}
      <TextInput
        style={styles.input}
        placeholder="Introduzca su correo"
        placeholderTextColor="#808080"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password */}
      <TextInput
        style={styles.input}
        placeholder="Introduzca contraseña"
        placeholderTextColor="#808080"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {/* Repetir contraseña (opcional) */}
      <TextInput
        style={styles.input}
        placeholder="Repita contraseña"
        placeholderTextColor="#808080"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      {/* Otros campos (Nick, Nombre, Apellidos...), no se guardan en Auth */}
      <TextInput style={styles.input} placeholder="Introduzca Nick" placeholderTextColor="#808080" />
      <TextInput style={styles.input} placeholder="Introduzca Nombre" placeholderTextColor="#808080" />
      <TextInput style={styles.input} placeholder="Introduzca Apellido" placeholderTextColor="#808080" />
      <TextInput style={styles.input} placeholder="Introduzca Segundo Apellido" placeholderTextColor="#808080" />

      <TouchableOpacity style={styles.finishButton} onPress={handleSignUp}>
        <Text style={styles.finishButtonText}>FINALIZAR</Text>
      </TouchableOpacity>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: 'center',
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9FC63B',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#323639',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#FFF',
  },
  finishButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#9FC63B',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignSelf: 'center',
    width: 200,
    marginTop: 30,
    marginBottom: 20,
  },
  finishButtonText: {
    color: '#DFDFDF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SignUpScreen;
