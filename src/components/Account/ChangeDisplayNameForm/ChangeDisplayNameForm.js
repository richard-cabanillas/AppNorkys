import { View, Text } from 'react-native'
import React from 'react'
import {styles} from "./ChangeDisplayNameForm.style";
import {Input, Button } from "react-native-elements";
import {initialValues,validationSchema} from "./ChangeDisplayNameForm.data";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import {useFormik} from "formik";
import {getAuth, updateProfile} from "firebase/auth";
import Toast  from"react-native-toast-message";


export  function ChangeDisplayNameForm(props) {
    const {onClose, onReload} =props;

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema:validationSchema(),
        validateOnChange:false,
        onSubmit: async(formValue)=>{
            try {
                const {displayName} =formValue;
                const currentUser = getAuth().currentUser;
                await updateProfile(currentUser,{displayName});
            onReload();
            onClose();
            } catch (error) {
                Toast.show({
                    type:"error",
                    position:"bottom",
                    text1:"Error al cambiar el nombre y apellidos",
                })
            }
        },
    });

  return (
    <View style={styles.content}>

      <Input 
      placeholder='Nombre y Apellidos' 
        rightIcon={
          <MaterialCommunityIcons
            name="account-circle-outline"
            size={24}
            color="#ec7f26ff"
          />
        }
        onChangeText={(text) => formik.setFieldValue("displayName", text)}
        errorMessage={formik.errors.displayName}
      />

      <Button title='cambiar nombre y apellidos' 
      containerStyle={styles.btnContainer}
      buttonStyle={styles.btn}
      onPress={formik.handleSubmit}
      loading={formik.isSubmitting}
      />
    </View>
  )
}