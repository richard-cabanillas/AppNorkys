import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./InfoMenu.styles";

export function InfoMenu() {
  const route = useRoute();
  const navigation = useNavigation();
  const { producto, onAddToCart } = route.params; 

  const [cantidad, setCantidad] = useState(1);

  const aumentar = () => setCantidad(prev => prev + 1);
  const disminuir = () => setCantidad(prev => (prev > 1 ? prev - 1 : 1));


    const handleAddToCart = () => {
    if (onAddToCart) onAddToCart(cantidad); 
    navigation.goBack();
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>

        <Image source={{ uri: producto.Icono }} style={styles.image} />

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{producto.Titulo}</Text>
          <Text style={styles.price}>S/ {producto.Precio}</Text>
          {producto.Peso && <Text style={styles.weight}>Peso: {producto.Peso}</Text>}
          <Text style={{ fontWeight: 'bold', marginTop: 5, color: '#000' }}>Descripcion</Text>

          <Text style={styles.description}>{producto.Descripcion}</Text>

          <View style={styles.buttonsContainer}>
            <View style={styles.counterContainer}>
              <TouchableOpacity style={styles.counterButton} onPress={disminuir}>
                <Text style={styles.counterButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.counterText}>{cantidad}</Text>
              <TouchableOpacity style={styles.counterButton} onPress={aumentar}>
                <Text style={styles.counterButtonText}>+</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
              <Text style={styles.addButtonText}>Agregar al carrito</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.payButton}>
            <Text style={styles.payButtonText}>Pagar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
