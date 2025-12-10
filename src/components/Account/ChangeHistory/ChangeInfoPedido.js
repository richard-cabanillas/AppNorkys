import { 
  View, Text, FlatList, Image, TouchableOpacity, 
  Alert, Platform, ActivityIndicator 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute, useNavigation } from "@react-navigation/native";
import { database, auth } from "../../../utils/firebase";
import { styles } from "./ChangeInfoPedido.style";

import * as Print from "expo-print";
import * as Sharing from "expo-sharing";


const generateHTMLContent = (details, user) => {
  let itemsHtml = details.items
    .map((item) => {
      const isTotal = item.isTotal || false;
      const isSummary = item.isSummary || false;

      const rowStyle = isTotal
        ? "background-color: #ffe0b2; font-weight: bold; font-size: 1.1em;"
        : isSummary
        ? "background-color: #f2f2f2;"
        : "";

      const nameCell =
        isTotal || isSummary
          ? `<td colspan="2" style="border:1px solid #ddd;padding:10px;text-align:right;${rowStyle}"><strong>${item.name}</strong></td>`
          : `
                <td style="border:1px solid #ddd;padding:8px;">${item.name}</td>
                <td style="border:1px solid #ddd;padding:8px;text-align:center;">${item.quantity}</td>
            `;

      return `
          <tr style="${rowStyle}">
              ${nameCell}
              <td style="border:1px solid #ddd;padding:8px;text-align:right;">S/. ${item.price.toFixed(
                2
              )}</td>
          </tr>
      `;
    })
    .join("");

  return `
  <html>
    <body style="font-family: Arial; padding: 20px;">
      <h1 style="text-align:center;">Boleta de Venta</h1>

      <p><strong>Cliente:</strong> ${user.displayName}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>ID de Orden:</strong> ${details.orderId}</p>
      <p><strong>Fecha:</strong> ${details.purchaseDate}</p>
      <p><strong>Método de Pago:</strong> ${details.paymentMethod}</p>

      <table style="width:100%;border-collapse:collapse;margin-top:20px;">
        <thead>
          <tr>
            <th style="border:1px solid #ddd;padding:10px;text-align:left;">Producto</th>
            <th style="border:1px solid #ddd;padding:10px;text-align:center;">Cantidad</th>
            <th style="border:1px solid #ddd;padding:10px;text-align:right;">Precio</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
      </table>

      <p style="text-align:center;margin-top:40px;color:#666;">Gracias por su compra</p>
    </body>
  </html>
  `;
};


export function ChangeInfoPedido() {
  const route = useRoute();
  const navigation = useNavigation();
  const { pedido } = route.params;

  const [detalleItems, setDetalleItems] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const currentUser = auth().currentUser;

  const userInfo = {
    displayName: currentUser?.displayName || "Cliente",
    email: currentUser?.email || "N/A",
  };

  
  useEffect(() => {
    const productosRef = database().ref("Productos");

    const listener = productosRef.on("value", (snapshot) => {
      const productos = snapshot.val();
      if (!productos) return;

      const itemsCompletos = Object.values(pedido.items).map((item) => {
        const prod = productos[item.productoId];

        return {
          id: item.productoId + "-" + item.cantidad,
          name: prod?.Titulo || "Sin título",
          titulo: prod?.Titulo || "Sin título",
          imagen: prod?.Icono || null,
          cantidad: item.cantidad,
          precio: parseFloat(item.precio),
        };
      });

      setDetalleItems(itemsCompletos);
    });

    return () => productosRef.off("value", listener);
  }, [pedido]);

  const purchaseDetailsForReceipt = {
    orderId: pedido.id || "SIN-ID",
    purchaseDate: new Date().toLocaleDateString("es-ES"),
    paymentMethod: pedido.payment || "Efectivo",

    items: detalleItems.map((item) => ({
      name: item.titulo,
      quantity: item.cantidad,
      price: item.precio,
    })),

    total: parseFloat(pedido.total),
  };

  const finalItems = [...purchaseDetailsForReceipt.items];
  if (finalItems.length > 0) {
    finalItems.push({
      name: "TOTAL FINAL",
      quantity: 1,
      price: purchaseDetailsForReceipt.total,
      isSummary: true,
      isTotal: true,
    });
  }

  const finalPurchaseDetails = { ...purchaseDetailsForReceipt, items: finalItems };

  const generateAndSharePDF = async () => {
    if (!finalPurchaseDetails.items.length) {
      Alert.alert("Error", "No hay información para generar la boleta.");
      return;
    }

    setIsGenerating(true);

    try {
      const htmlContent = generateHTMLContent(finalPurchaseDetails, userInfo);

      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      if (Platform.OS === "web") {
        window.open(uri, "_blank"); // DESCARGA AUTOMÁTICA
      } else {
        Alert.alert("PDF Generado", "La boleta se abrirá ahora.");
        await Print.printAsync({ uri }); // ABRE EL PDF EN MOVIL
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo generar el PDF");
    }

    setIsGenerating(false);
  };


  return (
    <View style={styles.listCard}>
      <FlatList
        data={detalleItems}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 150 }}
        keyExtractor={(item) => item.id}
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

        {/* BOTÓN PDF */}
        <View style={{ paddingHorizontal: 20, marginTop: 15, marginBottom: 10 }}>
          <TouchableOpacity
            style={[
              styles.btnRegresar,
              { backgroundColor: isGenerating ? "#999" : "#28a745" },
            ]}
            onPress={generateAndSharePDF}
            disabled={isGenerating}
          >
            {isGenerating ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.textbtn}>Generar Boleta (PDF)</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <TouchableOpacity
            style={styles.btnRegresar}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.textbtn}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
