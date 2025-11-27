import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useNavigation } from "@react-navigation/native";
import { styles } from "./ChangeHistory.style";
import {screen} from "../../../utils"
export function ChangeHistory() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const db = getDatabase();
    const pedidosRef = ref(db, "Pedidos");

    onValue(pedidosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setPedidos(lista);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <View style={styles.reload}>
        <ActivityIndicator size="large" color="#ec7f26" />
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          
          <TouchableOpacity style={styles.cardInfoPedido}
            onPress={() => navigation.navigate(screen.account.pedido, { pedido: item })}>
            
            <View>
              <Text style={styles.textPedido}>
                Pedido: {item.id}
              </Text>
              <Text style={{ color: "#666", marginTop: 4 }}>
                Estado: {item.estado}
              </Text>
              <Text style={{ color: "#666" }}>
                Fecha: {item.fecha}
              </Text>
            </View>
            <View>
              <Text style={styles.textTotal}>
                S/. {item.total}
              </Text>
            </View>

          </TouchableOpacity>

        )}
      />

    </View>
  );
}
