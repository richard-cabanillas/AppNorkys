import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from "@react-navigation/native";
import { database } from "../../../utils/firebase";  // ← IMPORT NATIVO
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./ChangeInfoPedido.style";

export function ChangeInfoPedido() {
  const route = useRoute();
  const navigation = useNavigation();
  const { pedido } = route.params;

  const [detalleItems, setDetalleItems] = useState([]);

  useEffect(() => {
    const productosRef = database().ref("Productos");

    const listener = productosRef.on("value", (snapshot) => {
      const productos = snapshot.val();
      if (!productos) return;

      const itemsCompletos = Object.values(pedido.items).map((item) => {
        const prod = productos[item.productoId];

        return {
          ...item,
          titulo: prod?.Titulo || "Sin título",
          imagen: prod?.Icono || null,
        };
      });

      setDetalleItems(itemsCompletos);
    });

    return () => productosRef.off("value", listener);
  }, []);

  return (
    <View style={styles.listCard}>
      <FlatList
        data={detalleItems}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 150 }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.imagen }} style={styles.cardImage} />
            
            <View style={{ flex: 1 }}>
              <Text style={styles.titleCard}>{item.titulo}</Text>
              <Text style={styles.cantidadCard}>Cantidad: {item.cantidad}</Text>
              <Text style={styles.colorText}>S/. {item.precio}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.seccionMonto}>
        <View style={styles.vistaInfo}>
          <Text style={styles.infoText}>Delivery</Text>
          <Text style={{ color: "#666" }}>
            Ordenes mayores a S/. 100 tienen delivery GRATIS
          </Text>
        </View>

        <View style={styles.vistaDivisor} />

        <View style={styles.vistaTotal}>
          <Text style={styles.textTotalVista}>Total</Text>
          <Text style={styles.textTotalVista}>S/. {pedido.total}</Text>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity style={styles.btnRegresar} onPress={() => navigation.goBack()}>
            <Text style={styles.textbtn}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
