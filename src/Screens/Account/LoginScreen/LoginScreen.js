import React from 'react';
import { View, Text } from 'react-native';
import {Image} from "react-native-elements";

import{styles} from "./LoginScreen.style";
import{LoginForm} from "../../../components/Auth"

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export  function LoginScreen() {

    return (
    <KeyboardAwareScrollView style={styles.container}
      contentContainerStyle={styles.contentContainer}>

      <View style={styles.viewContainer}>

          <LoginForm/>

      </View>

    </KeyboardAwareScrollView>
    );
}
