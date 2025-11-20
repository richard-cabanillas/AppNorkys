import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "./CarritoScreen.styles";
import {screen} from "../../../utils";

export function CarritoScreen({ route, navigation }) {
  const { cartItems: initialCartItems = [], onUpdateCart } = route.params || {};
  const [cartItems, setCartItems] = useState(initialCartItems);

  // Calcular subtotal
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.Precio * (item.cantidad || 1)),
    0
  );

  // Función para eliminar producto
  const removeItem = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);

    if (onUpdateCart) onUpdateCart(newCart);

    // Si el carrito queda vacío, regresar con retraso
    if (newCart.length === 0) {
      setTimeout(() => {
        navigation.goBack();
      }, 300); // retrasa 300ms antes de regresar
    }
  };

  // Cambiar cantidad
  const changeQuantity = (index, delta) => {
    const newCart = [...cartItems];
    const item = newCart[index];
    const newQty = (item.cantidad || 1) + delta;

    if (newQty < 1) {
      removeItem(index); // elimina si llega a 0
      return;
    }

    item.cantidad = newQty;
    setCartItems(newCart);
    if (onUpdateCart) onUpdateCart(newCart);
  };

  // Función para pagar
  const handlePagar = () => {
    // Aquí puedes poner la lógica de pago o navegar a otra pantalla
    alert('Funcionalidad de pago aún no implementada');
  };


  const gotPayment = ()=> {
    navigation.navigate(screen.payment.list)

  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 10 }}>
        <Text style={styles.title}>Carrito</Text>
      </View>

      {cartItems.length === 0 ? (
        <View style={{ padding: 10, alignItems: 'center' }}>
          <Ionicons name="cart-outline" size={64} color="#ccc" />
          <Text>El carrito está vacío</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.list}
            renderItem={({ item, index }) => (
              <View style={styles.card}>
                <Image source={{ uri: item.Icono }} style={styles.image} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.Titulo}</Text>
                  {item.Descripcion && <Text style={styles.desc}>{item.Descripcion}</Text>}
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>S/ {item.Precio}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                      <TouchableOpacity onPress={() => changeQuantity(index, -1)} style={styles.counterButton}>
                        <Text style={styles.counterText}>-</Text>
                      </TouchableOpacity>
                      <Text style={{ marginHorizontal: 6 }}>{item.cantidad || 1}</Text>
                      <TouchableOpacity onPress={() => changeQuantity(index, 1)} style={styles.counterButton}>
                        <Text style={styles.counterText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.deleteButton} onPress={() => removeItem(index)}>
                  <Ionicons name="trash-outline" size={22} color="#fff" />
                </TouchableOpacity>
              </View>
            )}
          />

          {/* Subtotal */}
          <View style={{ padding: 10, borderTopWidth: 1, borderColor: '#ddd', marginTop: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Subtotal: S/ {subtotal.toFixed(2)}</Text>
          </View>

          {/* Botón Pagar */}
          <TouchableOpacity
            style={{
              backgroundColor: '#FF6347',
              padding: 15,
              margin: 10,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              width: '95%',
              alignSelf: 'center'
            }}
            onPress={gotPayment}
          >
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Agregar tarjeta</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
}
