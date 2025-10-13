import { View, Text } from 'react-native'
import {Image} from "react-native-elements";
import React from 'react';
import {RegisterForm} from "../../../components/Auth";
import {styles} from "./ResgisterScreen.style";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export  function ResgisterScreen() {
  return (
    <KeyboardAwareScrollView >
      <Image 
        source={require("../../../../assets/img/image-Norky.png")}
        style={styles.image}
      />
      <Text style={styles.title}>Crear un Usuario</Text>

      <View style={styles.content}>

          <RegisterForm/>

      </View>

    </KeyboardAwareScrollView>
  )
}