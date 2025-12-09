import { View } from 'react-native';
import React, { useState } from 'react';
import { styles } from "./ChangeDisplayNameForm.style";
import { Input, Button } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./ChangeDisplayNameForm.data";
import { auth } from "../../../utils/firebase";  // ← AJUSTA ESTA RUTA
import Toast from "react-native-toast-message";

export function ChangeEmailForm(props) {
  const { onClose, onReload } = props;

  const [showPassword, setShowPassword] = useState(false);
  const onShowPassword = () => setShowPassword((prev) => !prev);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,

    onSubmit: async (formValue) => {
      try {
        const currentUser = auth().currentUser;

        // Crear credencial para reautenticación
        const credential = auth.EmailAuthProvider.credential(
          currentUser.email,
          formValue.password
        );

        // Reautenticar usuario
        await currentUser.reauthenticateWithCredential(credential);

        // Actualizar email
        await currentUser.updateEmail(formValue.email);

        onReload();
        onClose();
      } catch (error) {
        console.log("🔥 ERROR:", error);
        Toast.show({
          type: "error",
          position: "bottom",
          text1: "Error al cambiar el email",
        });
      }
    }
  });

  return (
    <View style={styles.content}>
      <Input
        placeholder='Nuevo Email'
        onChangeText={(text) => formik.setFieldValue("email", text)}
        errorMessage={formik.errors.email}
        containerStyle={styles.content}
        rightIcon={
          <MaterialCommunityIcons
            name="email-edit-outline"
            size={24}
            color="#ec7f26ff"
          />
        }
      />

      <Input
        placeholder='Contraseña'
        secureTextEntry={!showPassword}
        containerStyle={styles.content}
        rightIcon={
          <MaterialCommunityIcons
            name={showPassword ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#ec7f26ff"
            onPress={onShowPassword}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        errorMessage={formik.errors.password}
      />

      <Button
        title="Cambiar email"
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
