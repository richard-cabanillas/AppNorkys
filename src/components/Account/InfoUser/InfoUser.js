import { View, Text, Alert ,Image} from "react-native";
import React, { useState  } from "react";
import { Avatar } from "react-native-elements";
import { getAuth, updateProfile } from "firebase/auth";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {styles} from "./InfoUser.style";

export function InfoUser(props) {
  const { setLoading, setLoadingText } = props;
  const { uid, photoURL, displayName, email } = getAuth().currentUser;

  const [avatar, setAvatar] = useState(photoURL);
  const [uploading, setUploading] = useState(false);

  const changeAvatar = async () => {
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
      console.error("❌ Error al seleccionar imagen:", error);
      Alert.alert("Error", "No se pudo seleccionar la imagen");
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
      console.log("🌤️ Cloudinary result:", result);

      if (result.secure_url) {
        const auth = getAuth();
        await updateProfile(auth.currentUser, { photoURL: result.secure_url });
        updatePhotoUrl(result.secure_url);
        Alert.alert("✅ Éxito", "Imagen subida correctamente a Cloudinary");
      } else {
        throw new Error("No se obtuvo una URL válida de Cloudinary");
      }
    } catch (error) {
      console.error("❌ Error subiendo a Cloudinary:", error);
      Alert.alert("Error", "No se pudo subir la imagen");
    } finally {
      setUploading(false);
      setLoading(false);
    }
  };

  const updatePhotoUrl = (imageUrl) => {
    console.log("📸 Nueva imagen subida:", imageUrl);
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
          onPress={changeAvatar}
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
