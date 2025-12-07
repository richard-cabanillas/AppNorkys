import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import { styles } from "./LoginForm.style";
import { useNavigation } from "@react-navigation/native";
import { screen } from "../../../utils";
import { useFormik } from "formik";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./LoginForm.data";
import { auth } from "../../../utils/firebase"; // ← Verifica esta ruta

export function LoginForm() {
    const navigation = useNavigation();
    const [showPassword, setShowPassword] = useState(false);
    
    const showHidenPassword = () => setShowPassword((prevState) => !prevState);

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                // ✅ CORRECTO: Usa auth() con paréntesis
                await auth().signInWithEmailAndPassword(
                    formValue.email.trim(),
                    formValue.password
                );

                Toast.show({
                    type: "success",
                    position: "bottom",
                    text1: "¡Bienvenido!",
                });

                navigation.navigate(screen.account.list);

            } catch (error) {
                console.error("Login Error:", error);

                let message = "Usuario o contraseña incorrectos";
                
                if (error.code === 'auth/invalid-credential') message = 'Credenciales inválidas';
                else if (error.code === 'auth/wrong-password') message = 'Contraseña incorrecta';
                else if (error.code === 'auth/user-not-found') message = 'Usuario no encontrado';
                else if (error.code === 'auth/invalid-email') message = 'Correo inválido';

                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: message,
                });
            }
        },
    });

    const goToRegister = () => {
        navigation.navigate(screen.account.register);
    };

    const goToRecoverPassword = () => {
        navigation.navigate(screen.account.forgotPassword);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>¡Hola de nuevo!</Text>
            <Text style={styles.subtitle}>
                ¡Comencemos! Sigue los pasos. {"\n"}¿Necesitas ayuda? ¡Estamos aquí!
            </Text>

            <TouchableOpacity style={styles.appleButton}>
                <Ionicons name="logo-apple" size={20} color="black" />
                <Text style={styles.appleText}>Continuar con Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.googleButton}>
                <Ionicons name="logo-google" size={20} color="black" />
                <Text style={styles.googleText}>Continuar con Google</Text>
            </TouchableOpacity>

            <Text style={styles.separator}>O INGRESAR CON CORREO</Text>

            <TextInput
                placeholder="Correo electrónico"
                style={styles.input}
                placeholderTextColor="#aaa"
                onChangeText={(text) => formik.setFieldValue("email", text)}
                value={formik.values.email}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!formik.isSubmitting}
            />

            <View style={styles.passwordContainer}>
                <TextInput
                    placeholder="Contraseña"
                    secureTextEntry={!showPassword}
                    style={styles.passwordInput}
                    placeholderTextColor="#aaa"
                    onChangeText={(text) => formik.setFieldValue("password", text)}
                    value={formik.values.password}
                    autoCapitalize="none"
                    editable={!formik.isSubmitting}
                />
                <TouchableOpacity onPress={showHidenPassword}>
                    <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="gray"
                        style={styles.eyeIcon}
                    />
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={goToRecoverPassword}>
                <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.loginButton, formik.isSubmitting && { opacity: 0.6 }]}
                onPress={formik.handleSubmit}
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.loginText}>Ingresar</Text>
                )}
            </TouchableOpacity>

            <View style={styles.fingerprintContainer}>
                <Ionicons name="finger-print" size={50} color="gray" />
            </View>

            <Text style={styles.registerText}>
                ¿No tienes una cuenta?{" "}
                <Text onPress={goToRegister} style={styles.registerLink}>
                    Regístrate
                </Text>
            </Text>
        </View>
    );
}