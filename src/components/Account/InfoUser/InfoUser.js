import { View, Text, Alert } from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./InfoUser.style";

// ⬅ IMPORTA TU ARCHIVO
import { auth } from "../../../utils/firebase";  // <-- AJUSTA LA RUTA

export function InfoUser(props) {
  const { setLoading, setLoadingText } = props;

  const currentUser = auth().currentUser;
  const { uid, photoURL, displayName, email } = currentUser;

  const [avatar, setAvatar] = useState(photoURL);
  const [uploading, setUploading] = useState(false);

  const selectImageSource = () => {
    Alert.alert(
      "Seleccionar Foto",
      "Elige una opción para actualizar tu foto de perfil:",
      [
        { text: "Tomar una Foto", onPress: () => openCamera() },
        { text: "Seleccionar de Galería", onPress: () => openGallery() },
        { text: "Cancelar", style: "cancel" },
      ],
      { cancelable: true }
    );
  };

  const openGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      await uploadImageToCloudinary(result.assets[0].uri);
    }
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permiso denegado", "La app necesita acceso a la cámara");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      await uploadImageToCloudinary(result.assets[0].uri);
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

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/di0v74jtd/image/upload",
        { method: "POST", body: data }
      );

      const upload = await res.json();

      if (!upload.secure_url) throw new Error("Error subiendo");

      // 🔥 FIREBASE NATIVO → updateProfile()
      await currentUser.updateProfile({ photoURL: upload.secure_url });

      setAvatar(upload.secure_url);
    } catch (error) {
      Alert.alert("Error", "No se pudo subir la imagen");
      console.log(error);
    } finally {
      setUploading(false);
      setLoading(false);
    }
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
          style={styles.accessory}
          onPress={selectImageSource}
        />
      </Avatar>

      <View>
        <Text style={styles.displayName}>{displayName || "Anónimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  );
}
