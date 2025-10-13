import { View, Text } from 'react-native'
import React from 'react';
import{styles} from "./Modal.style";
import {Overlay} from "react-native-elements"

export  function Modal(props) {
    const {show, close, children}= props;


  return (
    <Overlay 
    isVisible={show}
     overlayStyle={styles.Overlay} 
     onBackdropPress={close}>
        {children}
    </Overlay>
  )
}