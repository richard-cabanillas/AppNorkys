import React, { useState } from 'react';
import { View } from 'react-native';
import { Input, Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./RegisterForm.style";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./RegisterForm.data";
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import { screen } from "../../../utils";
import { auth } from "../../../utils/firebase"; // ← Verifica esta ruta

export function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                // ✅ CORRECTO: Usa auth() con paréntesis
                await auth().createUserWithEmailAndPassword(
                    formValue.email.trim(),
                    formValue.password
                );

                Toast.show({
                    type: "success",
                    position: "bottom",
                    text1: "¡Registro exitoso!",
                });

                navigation.navigate(screen.account.list);

            } catch (error) {
                console.error("Error al registrar:", error);
                
                let message = 'Error al registrarse';
                
                if (error.code === 'auth/email-already-in-use') message = 'El correo ya está registrado';
                else if (error.code === 'auth/invalid-email') message = 'Correo inválido';
                else if (error.code === 'auth/weak-password') message = 'Contraseña muy débil (mínimo 6 caracteres)';

                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: message,
                });
            }
        },
    });

    const showHidenPassword = () => setShowPassword((prevState) => !prevState);
    const showHidenRepeatPassword = () => setShowRepeatPassword((prevState) => !prevState);

    return (
        <View style={styles.content}>
            <Input
                placeholder='Correo electrónico'
                containerStyle={styles.input}
                rightIcon={<Ionicons name="at" size={20} color="gray" style={styles.icon} />}
                onChangeText={(text) => formik.setFieldValue("email", text)}
                errorMessage={formik.errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                disabled={formik.isSubmitting}
            />

            <Input
                placeholder='Contraseña'
                containerStyle={styles.input}
                secureTextEntry={!showPassword}
                rightIcon={
                    <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="gray"
                        style={styles.icon}
                        onPress={showHidenPassword}
                    />
                }
                onChangeText={(text) => formik.setFieldValue("password", text)}
                errorMessage={formik.errors.password}
                autoCapitalize="none"
                disabled={formik.isSubmitting}
            />

            <Input
                placeholder='Repetir contraseña'
                containerStyle={styles.input}
                secureTextEntry={!showRepeatPassword}
                rightIcon={
                    <Ionicons
                        name={showRepeatPassword ? "eye-off-outline" : "eye-outline"}
                        size={20}
                        color="gray"
                        style={styles.icon}
                        onPress={showHidenRepeatPassword}
                    />
                }
                onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
                errorMessage={formik.errors.repeatPassword}
                autoCapitalize="none"
                disabled={formik.isSubmitting}
            />

            <Button
                title="Unirse"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={formik.handleSubmit}
                loading={formik.isSubmitting}
                disabled={formik.isSubmitting}
            />
        </View>
    );
}