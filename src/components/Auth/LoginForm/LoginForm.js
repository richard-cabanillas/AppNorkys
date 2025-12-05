import React from 'react'
import { View, Text, TextInput, TouchableOpacity  } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import{styles} from "./LoginForm.style";
import{useNavigation} from "@react-navigation/native";
import{screen} from "../../../utils"
import { useState } from 'react';
import {useFormik} from "formik";
import {signInWithEmailAndPassword} from "firebase/auth";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./LoginForm.data";
import {auth} from "../../../utils"
// import { initialValues,validationSchema } from '../RegisterFomr/RegisterForm.data';

export function LoginForm() {

    const navigation = useNavigation(); // Definida aquí para que esté disponible en onSubmit
    const [showPassword, setShowPassword] = useState(false)
    const showHidenPassword =() => setShowPassword((prevState) =>!prevState);

        const formik=useFormik({
        initialValues:initialValues(),
        validationSchema:validationSchema(),
        validateOnChange:false,
        onSubmit:async (formValue) =>{
        try {
                // ← CAMBIO: Usa auth importado directamente
                await signInWithEmailAndPassword(
                    auth,
                    formValue.email,
                    formValue.password
                );

                navigation.navigate(screen.account.list)

            } catch (error) {
                console.error("Login Error:", error);

                const code = error.code;
                let message = "Usuario o contraseña incorrectos";
                if (code === 'auth/wrong-password') message = 'Contraseña incorrecta';
                else if (code === 'auth/user-not-found') message = 'Usuario no encontrado';
                else if (code === 'auth/invalid-email') message = 'Correo inválido';

                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: message,
                    text2: code,
                })
            }
        },
    });

    const goToResgister =()=>{
        navigation.navigate(screen.account.register);
    }

    // NUEVA FUNCIÓN: Navegación a la pantalla de recuperación
    const goToRecoverPassword = () => {
        // Debes reemplazar 'screen.account.recoverPassword' con la ruta real
        // que uses para la pantalla de recuperación de contraseña en tu proyecto.
        navigation.navigate(screen.account.forgotPassword); 
    };

    return (
        <View style={styles.container}>
            {/* Título */}
            <Text style={styles.title}>¡Hola de nuevo!</Text>
            <Text style={styles.subtitle}>
                ¡Comencemos! Sigue los pasos. {"\n"}¿Necesitas ayuda? ¡Estamos aquí!
            </Text>


            <TouchableOpacity style={styles.appleButton}>
                <Ionicons name="logo-apple" size={20} color="black" />
                <Text style={styles.appleText}>Continuar con Apple</Text>
            </TouchableOpacity>

            {/* Botón Google */}
            <TouchableOpacity style={styles.googleButton}>
                <Ionicons name="logo-google" size={20} color="black" />
                <Text style={styles.googleText}>Continuar con Google</Text>
            </TouchableOpacity>

            {/* Separador */}
            <Text style={styles.separator}>O INGRESAR CON CORREO</Text>

            {/* Inputs */}
            <TextInput
                placeholder="Correo electrónico"
                style={styles.input}
                placeholderTextColor="#aaa"
                onChangeText={(text) => formik.setFieldValue("email",text)}
                value={formik.values.email} // Añadido para asegurar que el input esté controlado
                errorMessage={formik.errors.email}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                placeholder="Contraseña"
                secureTextEntry={ showPassword ? false : true}
                style={styles.passwordInput}
                placeholderTextColor="#aaa"
                onChangeText={(text)=>formik.setFieldValue("password",text)}
                value={formik.values.password} // Añadido para asegurar que el input esté controlado
                errorMessage={formik.errors.password}
                />
                <Ionicons
                name={showPassword ? "eye-off-outline": "eye-outline"}
                size={20} color="gray"
                style={styles.eyeIcon}
                onPress={showHidenPassword}
                />
            </View>

            {/* Botón ¿Olvidaste tu contraseña? - AHORA CON ACCIÓN */}
            <TouchableOpacity onPress={goToRecoverPassword}> 
                <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            {/* Botón Ingresar - CORRECCIÓN APLICADA AQUÍ */}
            <TouchableOpacity 
                style={styles.loginButton}
                onPress={formik.handleSubmit} // <-- ¡AQUÍ ESTÁ EL CAMBIO CLAVE PARA QUE FUNCIONE!
                disabled={formik.isSubmitting} // Mejora de UX: evita múltiples clics
            >
                <Text 
                    style={styles.loginText}
                >
                    {formik.isSubmitting ? "Ingresando..." : "Ingresar"}
                </Text>
            </TouchableOpacity>

            {/* Huella */}
            <View style={styles.fingerprintContainer}>
                <Ionicons name="finger-print" size={50} color="gray" />
            </View>

            {/* Registro */}
            <Text style={styles.registerText}>
                ¿No tienes una cuenta?{" "}
                <Text onPress={goToResgister} style={styles.registerLink}>Regístrate</Text>
            </Text>
            </View>
        );
}
