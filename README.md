### **📌 README para la App en React Native**
---

# **📱 Vedruna App (React Native)**
🔹 **Aplicación móvil** desarrollada en **React Native + Expo** que consume la API de Vedruna.

![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) 
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white) 
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📌 **Características**
✅ **Home con publicaciones y sistema de "likes".**  
✅ **Detalle de publicaciones con comentarios.**  
✅ **Gestión de incidencias con estados (`SOLUCIONADO`, `EN TRÁMITE`, `DENEGADA`).**  
✅ **Pantalla de perfil estilo Instagram.**  
✅ **Carga de imágenes desde la galería.**  

---

## 🛠 **Instalación y Configuración**
### **1️⃣ Clonar el Repositorio**
```bash
git clone https://github.com/tu-repo/vedruna-app.git
cd vedruna-app
```

### **2️⃣ Instalar dependencias**
```bash
npm install
```

### **3️⃣ Ejecutar la App**
```bash
npx expo start
```
📱 **Escanea el QR con Expo Go** o ejecuta en un emulador.

---

## 📌 **Estructura del Proyecto**
```
/src
  /screens
    HomeScreen.js         # Listado de publicaciones
    AddScreen.js          # Crear una publicación
    DetallePublicacion.js # Vista detallada de una publicación
    IncidenciasScreen.js  # Listado de incidencias
    CrearIncidencia.js    # Formulario de incidencias
    PerfilScreen.js       # Perfil del usuario estilo Instagram
  /config
    firebase.js           # Configuración de Firebase
```

---

## 🔥 **Características de las Pantallas**
### 🏠 **Home Screen**
✅ Lista de publicaciones desde la API  
✅ Mostrar imagen, título, descripción y "likes"  
✅ Ir a detalles de la publicación  

### 📷 **Crear Publicación**
✅ Selección de imágenes desde la galería  
✅ Enviar datos a la API  

### 📝 **Detalle de Publicación**
✅ Comentarios en tiempo real  
✅ Dar "like" a la publicación  

### 🔧 **Incidencias**
✅ Mostrar incidencias con estados visuales  
✅ Crear una incidencia con imagen  

### 👤 **Perfil**
✅ Estilo **Instagram** con publicaciones en cuadrícula  
✅ Contador de seguidores y seguidos  

---

## 📌 **Ejemplo de Creación de una Publicación**
```json
{
  "user_id": "123456",
  "image_url": "file://ruta_de_la_imagen",
  "titulo": "Título de prueba",
  "comentario": "Descripción de la publicación."
}
```

---

## 📌 **Dependencias Principales**
✅ **React Navigation** (Sistema de navegación)  
✅ **Expo ImagePicker** (Carga de imágenes)  
✅ **Firebase Auth** (Autenticación de usuarios)  
✅ **React Native Vector Icons** (Iconos personalizados)  

---

## 📌 **Estado del Proyecto**
🚀 **100% Funcional y estable.**  
📌 **Posibles mejoras:**  
✔ Integrar autenticación real con Firebase  
✔ Mejorar animaciones y transiciones  
✔ Agregar modo oscuro

---

## 📌 **Autores**
👤 **Fernando Iglesias (@feriley8)**  
🔹 Desarrollador Backend & Mobile

--
