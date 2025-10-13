import React from 'react'
import { View, Text, TextInput, TouchableOpacity  } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";
import{styles} from "./LoginForm.style";
import{useNavigation} from "@react-navigation/native";
import{screen} from "../../../utils"
import { useState } from 'react';
import {useFormik} from "formik";
import {getAuth,signInWithEmailAndPassword} from "firebase/auth";
import Toast from "react-native-toast-message";
import { initialValues, validationSchema } from "./LoginForm.data";
// import { initialValues,validationSchema } from '../RegisterFomr/RegisterForm.data';

export  function LoginForm() {
    
    const [showPassword, setShowPassword] = useState(false)
  const showHidenPassword =() => setShowPassword((prevState) =>!prevState);

  const formik=useFormik({
    initialValues:initialValues(),
    validationSchema:validationSchema(),
    validateOnChange:false,
    onSubmit:async (formValue) =>{
    try {
            const auth = getAuth();
            await signInWithEmailAndPassword(
                auth, 
                formValue.email,
                formValue.password 
            );

            navigation.navigate(screen.account.List)

        } catch (error) {
            Toast.show({
                type:"error",
                position:"bottom",
                text1:"Usuario o contraseña incorrectos"
            })
        }
    }, 
  });

    const navigation = useNavigation();
      const goToResgister =()=>{
        navigation.navigate(screen.account.register);
      }
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
                errorMessage={formik.errors.email}

            />
            <View style={styles.passwordContainer}>
                <TextInput
                placeholder="Contraseña"
                secureTextEntry={ showPassword ? false : true}
                style={styles.passwordInput}
                placeholderTextColor="#aaa"
                onChangeText={(text)=>formik.setFieldValue("password",text)}
                errorMessage={formik.errors.password}
                />
                <Ionicons 
                name={showPassword ? "eye-off-outline": "eye-outline"} 
                size={20} color="gray" 
                style={styles.eyeIcon} 
                onPress={showHidenPassword}
                />
            </View>
    
            <TouchableOpacity>
                <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
    
            {/* Botón Ingresar */}
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginText}
                 onPress={formik.handleSubmit} 
                loading={formik.isSubmitting}>
                    Ingresar</Text>

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