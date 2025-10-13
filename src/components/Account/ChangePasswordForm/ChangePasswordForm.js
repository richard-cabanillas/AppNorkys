import { View } from 'react-native'
import React, { useState } from 'react';
import {styles} from "./ChangePasswordForm.style";
import {Input,Button} from "react-native-elements";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {initialValues,validationSchema} from "./ChangePasswordForm.data";
import {useFormik} from "formik";
import{getAuth, updatePassword, EmailAuthProvider,reauthenticateWithCredential} from "firebase/auth";
import Toast from 'react-native-toast-message';

export  function ChangePasswordForm(props) {
  const [showPassword, setShowPassword] = useState(false); // Contraseña actual
  const [showNewPassword, setShowNewPassword] = useState(false); // Nueva contraseña
  const [showRepeatPassword, setShowRepeatPassword] = useState(false); 
    
    const {onClose} = props;

     const toggleShowPassword = () => setShowPassword(prev => !prev);
  const toggleShowNewPassword = () => setShowNewPassword(prev => !prev);
  const toggleShowRepeatPassword = () => setShowRepeatPassword(prev => !prev);

    const formik = useFormik({
      initialValues:initialValues(),
      validationSchema:validationSchema(),
      validateOnChange: false,
      onSubmit: async(formValue) =>{
        try {
              const currentUser = getAuth().currentUser;

              const credentials= EmailAuthProvider.credential(
                currentUser.email,
                formValue.password
              );
              reauthenticateWithCredential(currentUser,credentials);

              await updatePassword(currentUser,formValue.confirmNewPassword);

              onClose();
        } catch (error) {
            Toast.show({
              type:"error",
              position:"bottom",
              text1:"Error al cambiar laa contraseña",
            })
        }
      }
    })

  return (
    <View style={styles.content}>
      <Input 
      placeholder='Contraseña actual' 
      containerStyle={styles.input} 
      secureTextEntry={showPassword ? false : true}
      rightIcon={
        <MaterialCommunityIcons
          name= {showPassword ? "eye-off-outline": "eye-outline" }
          size={24}
          color="#ec7f26ff"
          onPress={toggleShowPassword}
        />
        
      }
      onChangeText={(text) => formik.setFieldValue("password",text)}
      errorMessage={formik.errors.password}
      />

      <Input 
        placeholder='Nueva contraseña' 
        containerStyle={styles.input} 
        secureTextEntry={showNewPassword ? false : true}
        rightIcon={
          <MaterialCommunityIcons
            name= {showNewPassword ? "eye-off-outline": "eye-outline" }
            size={24}
            color="#ec7f26ff"
            onPress={toggleShowNewPassword}
          />

        }
        onChangeText={(text) => formik.setFieldValue("newPassword",text)}
        errorMessage={formik.errors.newPassword}
      />

      <Input 
          placeholder='Repite nueva contraseña' 
          containerStyle={styles.input} 
          secureTextEntry={showRepeatPassword ? false : true}
          rightIcon={
            <MaterialCommunityIcons
              name= {showRepeatPassword ? "eye-off-outline": "eye-outline" }
              size={24}
              color="#ec7f26ff"
              onPress={toggleShowRepeatPassword}
            />

          }
          onChangeText={(text)=> formik.setFieldValue("confirmNewPassword",text)}
          errorMessage={formik.errors.confirmNewPassword}
      />
      <Button title='Cambiar la contraseña' containerStyle={styles.btnContainer} buttonStyle={styles.btn}
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}
      />
    </View>
  )
}