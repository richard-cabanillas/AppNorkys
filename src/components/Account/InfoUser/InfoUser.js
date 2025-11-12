import { View, Text, Alert, Image } from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-elements";
import { getAuth, updateProfile } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./InfoUser.style";

export function InfoUser(props) {
  const { setLoading, setLoadingText } = props;
  const { uid, photoURL, displayName, email } = getAuth().currentUser;

  const [avatar, setAvatar] = useState(photoURL);
  const [uploading, setUploading] = useState(false);

  const selectImageSource = () => {
    Alert.alert(
      "Seleccionar Foto",
      "Elige una opción para actualizar tu foto de perfil:",
      [
        {
          text: "Tomar una Foto",
          onPress: () => openCamera(),
        },
        {
          text: "Seleccionar de Galería",
          onPress: () => openGallery(),
        },
        {
          text: "Cancelar",
          style: "cancel",
        },
      ],
      { cancelable: true }
    );
  };

  const openGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        await uploadImageToCloudinary(imageUri);
      }
    } catch (error) {
      console.error("Error al seleccionar de galería:", error);
      Alert.alert("Error", "No se pudo seleccionar la imagen de la galería");
    }
  };

  const openCamera = async () => {
    try {
      // 1. Solicitar permiso para la cámara
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          "Permiso Denegado",
          "Necesitamos permiso para acceder a la cámara para tomar una foto."
        );
        return;
      }

      // 2. Abrir la cámara
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        await uploadImageToCloudinary(imageUri);
      }
    } catch (error) {
      console.error("Error al usar la cámara:", error);
      Alert.alert("Error", "No se pudo iniciar la cámara");
    }
  };

  const uploadImageToCloudinary = async (imageUri) => {
    setLoadingText("Actualizando Avatar...");
    setLoading(true);

    try {
      setUploading(true);

      const data = new FormData();
      data.append("file", {
        uri: imageUri,
        type: "image/jpeg",
        name: `avatar_${uid}.jpg`,
      });
      data.append("upload_preset", "unsigned_reactnative");
      data.append("cloud_name", "di0v74jtd");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/di0v74jtd/image/upload",
        { method: "POST", body: data }
      );

      const result = await response.json();

      if (result.secure_url) {
        const auth = getAuth();
        await updateProfile(auth.currentUser, { photoURL: result.secure_url });
        updatePhotoUrl(result.secure_url);
      } else {
        throw new Error("No se obtuvo una URL válida de Cloudinary");
      }
    } catch (error) {
      console.error("Error subiendo a Cloudinary:", error);
      Alert.alert("Error", "No se pudo subir la imagen");
    } finally {
      setUploading(false);
      setLoading(false);
    }
  };

  const updatePhotoUrl = (imageUrl) => {
    setAvatar(imageUrl);
  };

  return (
    <View style={styles.content}>
      <Avatar
        size="large"
        rounded
        containerStyle={styles.avatar}
        source={avatar ? { uri: avatar } : null}
        icon={{ name: "person-outline", type: "ionicon", color: "gray", size: 59 }}
      >
        <Avatar.Accessory
          size={28}
          color="white"
          style={styles.accessory}
          onPress={selectImageSource} 
          iconProps={{ name: "create-outline", type: "ionicon" }}
        />
      </Avatar>

      <View>
        <Text style={styles.displayName}>{displayName || "Anónimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}