import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export function PedidosScreen() {
  const [pedidos, setPedidos] = useState([
    {
      id: "1",
      numero: "0001",
      fecha: "21/10/2025",
      estado: "Entregado",
      total: 45.9 + 6.5, // Pollo entero + bebida
      productos: ["Pollo a la Brasa Entero", "Inca Kola 1L"],
    },
    {
      id: "2",
      numero: "0002",
      fecha: "19/10/2025",
      estado: "En camino",
      total: 25.9 + 9.9 + 6.5, // Medio pollo + papas + Coca-Cola
      productos: ["Medio Pollo a la Brasa", "Papas Fritas Grandes", "Coca-Cola 1L"],
    },
    {
      id: "3",
      numero: "0003",
      fecha: "18/10/2025",
      estado: "Pendiente",
      total: 17.9 + 5.9, // Broaster + Chicha
      productos: ["Broaster con papas", "Chicha Morada"],
    },
  ]);

  const handleNuevoPedido = () => {
    console.log("Nuevo pedido creado");
    // Aquí puedes navegar a la pantalla de nuevo pedido
  };

  const renderPedido = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        console.log(`Ver detalles del pedido #${item.numero}`)
      }
    >
      <View style={styles.cardHeader}>
        <Text style={styles.numero}>Pedido #{item.numero}</Text>
        <View style={styles.estadoContainer}>
          <Ionicons
            name={
              item.estado === "Entregado"
                ? "checkmark-circle"
                : item.estado === "En camino"
                ? "time"
                : "alert-circle"
            }
            size={20}
            color={getColorEstado(item.estado)}
          />
          <Text style={[styles.estado, { color: getColorEstado(item.estado) }]}>
            {item.estado}
          </Text>
        </View>
      </View>
      <Text style={styles.fecha}>Fecha: {item.fecha}</Text>
      <Text style={styles.productos}>
        {item.productos.join(", ")}
      </Text>
      <Text style={styles.total}>Total: S/ {item.total.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  const getColorEstado = (estado) => {
    switch (estado) {
      case "Entregado":
        return "green";
      case "En camino":
        return "#e67e22";
      case "Pendiente":
      default:
        return "red";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mis Pedidos</Text>

      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={renderPedido}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
      />

      {/* Botón flotante */}
      <TouchableOpacity style={styles.botonFlotante} onPress={handleNuevoPedido}>
        <Ionicons name="add" size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f5",
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#b71c1c", // tono Rockys
    textAlign: "center",
  },
  lista: {
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "#ffe5e5",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  numero: {
    fontWeight: "600",
    fontSize: 18,
    color: "#333",
  },
  estadoContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  estado: {
    fontWeight: "700",
  },
  fecha: {
    marginTop: 8,
    color: "#555",
  },
  productos: {
    marginTop: 5,
    color: "#333",
    fontStyle: "italic",
  },
  total: {
    marginTop: 5,
    fontWeight: "bold",
    color: "#000",
  },
  botonFlotante: {
    position: "absolute",
    bottom: 30,
    right: 25,
    backgroundColor: "#d32f2f",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
});
