import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { database } from '../utils/firebase';
import { styles } from './FavoriteScreen.styles';
import { screen } from '../utils/screenName';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export function FavoriteScreen({ navigation }) {
  const [favoritesIds, setFavoritesIds] = useState([]);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadFavorites = async () => {
      try {
        const fav = await AsyncStorage.getItem('favorites');
        const parsed = fav ? JSON.parse(fav) : [];
        if (isMounted) setFavoritesIds(parsed.map(String));
      } catch (e) {
        console.log('Error leyendo favoritos', e);
      }
    };

    loadFavorites();

    const productosRef = database().ref('Productos');
    const listener = productosRef.on('value', snapshot => {
      if (!isMounted) return;
      const data = snapshot.val();
      if (data) {
        const lista = Object.keys(data).map(key => ({ id: String(key), ...data[key] }));
        setProductos(lista);
      } else {
        setProductos([]);
      }
      setLoading(false);
    });

    return () => {
      isMounted = false;
      try { productosRef.off('value', listener); } catch (err) { }
    };
  }, []);

  // Recargar favoritos cuando la pantalla gana foco (por ejemplo al marcar desde MenuListScreen)
  useFocusEffect(
    useCallback(() => {
      let mounted = true;
      const reload = async () => {
        try {
          const fav = await AsyncStorage.getItem('favorites');
          const parsed = fav ? JSON.parse(fav) : [];
          if (mounted) setFavoritesIds(parsed.map(String));
        } catch (e) {
          console.log('Error recargando favoritos', e);
        }
      };
      reload();
      return () => { mounted = false; };
    }, [])
  );

  const favoritos = productos.filter(p => favoritesIds.includes(String(p.id)));

  const goToInfo = (producto) => {
    navigation.navigate(screen.menulist.info, { producto });
  };

  const toggleFavorite = async (productId) => {
    try {
      const current = favoritesIds.slice();
      let updated = [];
      if (current.includes(String(productId))) {
        updated = current.filter(id => id !== String(productId));
      } else {
        updated = [...current, String(productId)];
      }
      setFavoritesIds(updated);
      await AsyncStorage.setItem('favorites', JSON.stringify(updated));
    } catch (e) {
      console.log('Error actualizando favoritos', e);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Cargando favoritos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.Icono }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.Titulo}</Text>
              <Text numberOfLines={2} style={styles.desc}>{item.Descripcion}</Text>
              <Text style={styles.price}>S/ {item.Precio}</Text>
            </View>

            <TouchableOpacity
              onPress={() => toggleFavorite(item.id)}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 8,
                borderWidth: 1,
                borderColor: '#eee'
              }}
            >
              <Ionicons name={'heart'} size={20} color={'#ff6b35'} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.addButton} onPress={() => goToInfo(item)}>
              <Text style={{ color: '#fff', fontWeight: '700' }}>Ver menu</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text>No tienes productos en favoritos aún.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}