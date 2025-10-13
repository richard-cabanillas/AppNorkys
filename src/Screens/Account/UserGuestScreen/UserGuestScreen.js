import React from 'react'
import {  Text, ScrollView } from 'react-native'
import {Button,Image} from "react-native-elements"
// import{getAuth,onAuthStateChanged} from "firebase/auth"
import {styles} from "./UserGuestScreen.styles"
import {useNavigation} from "@react-navigation/native";
import {screen} from "../../../utils"

export  function UserGuestScreen() {

  const navigation = useNavigation();

    const goToLogin=() =>{
      navigation.navigate(screen.account.login);
    }
  return (
    <ScrollView centerContent={true} style={styles.content}>
      <Image source={require("../../../../assets/img/user-guest.png")} style={styles.image} />
      <Text style={styles.title}> Consultar tu perfil </Text>
      <Text style={styles.description} > La sección Restaurantes permite visualizar los diferentes
         establecimientos disponibles dentro de la aplicación. Aquí los usuarios pueden explorar menús, 
        consultar información detallada de cada restaurante, ver su ubicación, horarios de atención y acceder a sus principales ofertas o platos destacados.</Text>
        
        
    <Button title='Ver tu perfil' onPress={goToLogin} buttonStyle={styles.btnStyle}/>

    </ScrollView>
  )
}