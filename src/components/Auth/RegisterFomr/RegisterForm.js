import { View, Text } from 'react-native';
import React from 'react';
import {Input,Button} from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import{styles} from "./RegisterForm.style";
import {useFormik} from "formik";
import {initialValues,validationSchema} from "./RegisterForm.data";
import { useState } from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import { useNavigation } from '@react-navigation/native';
import Toast from "react-native-toast-message";
import{screen} from "../../../utils";
import {auth} from "../../../utils";


export  function RegisterForm() {

  const [showRepeatPassword, setShowRepeatPassword] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const navigation =useNavigation();

    const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange:false,
    onSubmit:async (formValue) =>{

      try {
          // ← CAMBIO: Usa auth importado directamente
          await createUserWithEmailAndPassword(
            auth,
            formValue.email,
            formValue.password
          );

          navigation.navigate(screen.account.list);
      } catch (error) {
        console.error("Error al registrar:", error);
        
        const code = error.code;
        let message = 'Error al registrarse';
        if (code === 'auth/email-already-in-use') message = 'El correo ya está en uso';
        else if (code === 'auth/invalid-email') message = 'Correo inválido';
        else if (code === 'auth/weak-password') message = 'Contraseña muy débil';

        Toast.show({
          type: "error",
          position: "bottom",
          text1: message,
          text2: code,
        });
      }
      
    },
  });
  
  
  const showHidenPassword =() => setShowPassword((prevState) =>!prevState);
  const showHidenRepeatPassword=() => setShowRepeatPassword((prevState) => !prevState);

  return (
    <View style= {styles.content}>
        <Input 
            placeholder='Correo electronico' 
            containerStyle={styles.input} 
            rightIcon={ 
            <Ionicons type="material-community" 
            name="at" size={20} color="gray" iconStyle={styles.icon}/>
            }
            onChangeText={(text) => formik.setFieldValue("email",text)}
            errorMessage={formik.errors.email}
        />

        <Input
            placeholder='Contraseña' 
            containerStyle={styles.input} 
            secureTextEntry={ showPassword ? false : true}
            rightIcon={
            <Ionicons type="material-community" 
            name={showPassword ? "eye-off-outline": "eye-outline"} 
            size={20} color="gray" 
            iconStyle={styles.icon}
            onPress={showHidenPassword}
            />
            }
            onChangeText={(text)=> formik.setFieldValue("password",text)}
            errorMessage={formik.errors.password}

        />

        <Input
            placeholder='Repetir contraseña' 
            containerStyle={styles.input} 
            secureTextEntry={showRepeatPassword ? false : true }
            rightIcon={
            <Ionicons type="material-community" 
            name={showRepeatPassword ? "eye-off-outline" :"eye-outline"}
            size={20} color="gray" 
            iconStyle={styles.icon}
            onPress={showHidenRepeatPassword}
            />
            }
            onChangeText={(text)=>formik.setFieldValue("repeatPassword",text)}
            errorMessage={formik.errors.repeatPassword}
        />

        <Button 
        title="Unirse" 
        containerStyle={styles.btnContainer}
        buttonStyle={styles.btn}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
        />  

    </View>
  );
}