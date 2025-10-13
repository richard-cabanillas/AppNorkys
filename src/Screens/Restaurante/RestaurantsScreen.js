import React from 'react';
import { View, Text,Button } from 'react-native'
import{screen} from "../../utils"

export  function RestaurantsScreen(props) {
  const{navigation} = props;
  
  const goTAddRestaurant=() =>{
    //esto sirve para navegar entre  las mismas pantallas
    navigation.navigate(screen.restaurant.information)

    // esto sirve para navegar de una pantalla hacia otra stack distinta
    //navigation.navigate(screen.account.tab, {screen: screen.account.List})

  }

  return (
    <View>
      <Text>Estamos en la Screen Restaurants</Text>
      <Button  title="Crear restaurante"onPress={goTAddRestaurant}/>
    </View>
  )
}