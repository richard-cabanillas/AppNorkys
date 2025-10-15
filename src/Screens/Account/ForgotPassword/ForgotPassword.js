import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Toast from "react-native-toast-message";

import { styles } from "./ForgotPassword.style";
import { screen } from "../../../utils"; // Importamos screen para navegar al login

// --- Lógica de Formik (Valores Iniciales y Esquema) ---
const initialValues = () => ({ email: "" });
const validationSchema = () => Yup.object({
    email: Yup.string().email("Debe ser un correo electrónico válido").required("El correo es obligatorio"),
});
// --------------------------------------------------------

export function ForgotPassword() {
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth();
                
                // Función clave de Firebase: envía el correo de recuperación
                await sendPasswordResetEmail(auth, formValue.email);

                Toast.show({
                    type: "success",
                    position: "top",
                    text1: "¡Correo Enviado!",
                    text2: "Revisa tu bandeja de entrada y spam para restablecer tu contraseña.",
                });

                // Navegar al login después de un breve retraso para que el usuario vea el Toast
                setTimeout(() => {
                     navigation.navigate(screen.account.login);
                }, 3000);
               
            } catch (error) {
                console.error("Error al enviar correo de recuperación:", error);
                
                // Manejo de errores amigable
                let errorMessage = "Ocurrió un error al intentar enviar el correo.";
                if (error.code === 'auth/user-not-found') {
                    errorMessage = "No hay un usuario registrado con ese correo electrónico.";
                } else if (error.code === 'auth/invalid-email') {
                    errorMessage = "El formato del correo electrónico es inválido.";
                }

                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al enviar",
                    text2: errorMessage,
                });
            }
        },
    });

    return (
        <KeyboardAwareScrollView 
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            <View style={styles.viewContainer}>
                <Text style={styles.title}>¿Olvidaste tu Contraseña?</Text>
                <Text style={styles.subtitle}>
                    Introduce tu correo electrónico y te enviaremos un enlace para restablecer tu acceso.
                </Text>

                <TextInput
                    placeholder="Correo electrónico"
                    style={[
                        styles.input,
                        formik.errors.email && { borderColor: 'red' } // Resaltar error
                    ]}
                    placeholderTextColor="#aaa"
                    onChangeText={(text) => formik.setFieldValue("email", text)}
                    value={formik.values.email}
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
                
                {/* Muestra mensaje de error si existe */}
                {formik.errors.email && (
                    <Text style={{ color: 'red', marginBottom: 10, textAlign: 'center' }}>{formik.errors.email}</Text>
                )}

                <TouchableOpacity
                    style={styles.sendButton}
                    onPress={formik.handleSubmit}
                    disabled={formik.isSubmitting}
                >
                    <Text style={styles.sendButtonText}>
                        {formik.isSubmitting ? "Enviando..." : "Enviar Correo"}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>Volver al inicio de sesión</Text>
                </TouchableOpacity>

            </View>
        </KeyboardAwareScrollView>
    );
}
