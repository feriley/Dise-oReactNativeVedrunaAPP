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

// 1️⃣ Importamos la función de Firebase para login
import { signInWithEmailAndPassword } from 'firebase/auth';
// 2️⃣ Importamos la instancia de auth desde tu archivo firebase.js
// (Asegúrate de tener un archivo en src/config/firebase.js con export const auth = getAuth(app);)
import { auth } from '../config/firebase';

const LoginScreen = ({ navigation }) => {
  // 3️⃣ Creamos los estados para email y contraseña
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 4️⃣ Función para manejar el login al presionar "Log in"
  const handleLogin = async () => {
    try {
      // signInWithEmailAndPassword retorna una promesa
      await signInWithEmailAndPassword(auth, email.trim(), password);
      // Si todo va bien, navegamos a la pantalla Home
      navigation.navigate('Home');
    } catch (error) {
      // Si ocurre un error, lo mostramos con un Alert
      Alert.alert('Error al iniciar sesión', error.message);
      // También puedes hacer console.log(error) para ver detalles en la consola
    }
  };

  return (
    <View style={styles.container}>
      {/* Imagen en la parte superior */}
      <Image
        source={require('../../assets/images/4b369d5d71efbfa1f6961ee2c182d04d.png')} 
        style={styles.image}
      />

      {/* Texto VEDRUNA EDUCACION */}
      <Text style={styles.title}>VEDRUNA</Text>
      <Text style={styles.subtitle}>EDUCACION</Text>

      {/* Campos de entrada */}
      <TextInput
        style={styles.input}
        placeholder="Introduce su correo"
        placeholderTextColor="#808080"
        value={email}
        onChangeText={setEmail}  
      />
      <TextInput
        style={styles.input}
        placeholder="Introduce su contraseña"
        placeholderTextColor="#808080"
        secureTextEntry
        value={password}
        onChangeText={setPassword}  // Guardamos en el estado
      />

      {/* Olvidaste tu contraseña */}
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste su contraseña?</Text>
      </TouchableOpacity>

      {/* Botón Log in */}
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={handleLogin} // Llamamos a la función que loguea en Firebase
      >
        <Text style={styles.loginButtonText}>Log in</Text>
      </TouchableOpacity>

      {/* Línea horizontal y enlace para crear cuenta */}
      <View style={styles.bottomContainer}>
        <View style={styles.separator} />
        <View style={styles.createAccount}>
          <Text style={styles.createAccountText}>¿No tienes cuenta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.createAccountLink}> CREAR CUENTA</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
    padding: 20,
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#DFDFDF',
  },
  subtitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#DFDFDF',
  },
  input: {
    backgroundColor: '#323639',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#FFF',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#9FC63B',
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: '#9FC63B',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#D3D3D3',
    marginVertical: 20,
  },
  createAccount: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  createAccountText: {
    fontSize: 14,
    color: '#DFDFDF',
  },
  createAccountLink: {
    fontSize: 14,
    color: '#9FC63B',
    fontWeight: 'bold',
  },
  bottomContainer: {
    
  },
});

export default LoginScreen;
