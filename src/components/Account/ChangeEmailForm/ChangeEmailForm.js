import { View, Text } from 'react-native'
import React,{useState} from 'react';
import {styles} from "./ChangeEmailForm.style";
import {Input, Button } from "react-native-elements";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {useFormik} from "formik";
import{initialValues,validationSchema} from "./ChangeEmailForm.data";
import{getAuth,updateEmail,EmailAuthProvider,reauthenticateWithCredential} from "firebase/auth";
import Toast from "react-native-toast-message";

export  function ChangeEmailForm(props) {
     const {onClose,onReload} = props;

     const [showPassword, setShowPassword]= useState(false);
    const onShowPassword=()=>setShowPassword((prevState) =>!prevState);

     const formik = useFormik({
         initialValues:initialValues(),
         validationSchema:validationSchema(),
         validateOnChange:false,
         onSubmit: async(formValue)=>{
             try {
                 const currentUser = getAuth().currentUser;
                 const credentials= EmailAuthProvider.credential(currentUser.email, formValue.password);

                 reauthenticateWithCredential(currentUser,credentials)
                 await updateEmail(currentUser,formValue.email );
                 
                onReload();
                 onClose();
            } catch (error) {
                 console.log(error)
                 Toast.show({
                   type:"error",
                 position:"bottom",
                     text1:"Error al cambiar el email"
              })
             }
         }
         });

  return (
    <View style={styles.content}>

        <Input 
        placeholder='Nuevo Email'
        onChangeText={(text)=> formik.setFieldValue("email",text)}
        errorMessage={formik.errors.email}
        containerStyle={styles.content}
        rightIcon={
            <MaterialCommunityIcons
                name="account-circle-outline"
                size={24}
                color="#ec7f26ff"
                 
            />
                }
        />
        <Input 
            placeholder='Contraseña' 
            containerStyle={styles.content} 
            secureTextEntry={showPassword ? false :true}
            // secureTextEntry={true}
            rightIcon={
              <MaterialCommunityIcons
                name={showPassword ? "eye-off-outline": "eye-outline"}
                // name= "eye-outline"
                size={24}
                color="#ec7f26ff"
                onPress={onShowPassword}
                
              />
              
            }
            onChangeText={(text)=>formik.setFieldValue("password",text)}
            errorMessage={formik.errors.password}
        />
        <Button title="Cambiar email" containerStyle={styles.btnContainer} buttonStyle={styles.btn} 
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
        /> 


    </View>
  )
}