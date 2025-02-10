import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Imagen superior */}
      <Image
        source={require('../../assets/images/imgForm.png')} 
        style={styles.image}
      />

      {/* Campos de entrada */}
      <Text style={styles.label}>Completar los siguientes campos:</Text>

      <TextInput style={styles.input} placeholder="Introduzca su correo" placeholderTextColor="#808080" />
      <TextInput style={styles.input} placeholder="Introduzca contraseña" placeholderTextColor="#808080" secureTextEntry />
      <TextInput style={styles.input} placeholder="Repita contraseña" placeholderTextColor="#808080" secureTextEntry />
      <TextInput style={styles.input} placeholder="Introduzca Nick" placeholderTextColor="#808080" />
      <TextInput style={styles.input} placeholder="Introduzca Nombre" placeholderTextColor="#808080" />
      <TextInput style={styles.input} placeholder="Introduzca Apellido" placeholderTextColor="#808080" />
      <TextInput style={styles.input} placeholder="Introduzca Segundo Apellido" placeholderTextColor="#808080" />

      {/* Botón de Finalizar */}
      <TouchableOpacity style={styles.finishButton} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.finishButtonText}>FINALIZAR</Text>
      </TouchableOpacity>
    </View>
  );
};

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
