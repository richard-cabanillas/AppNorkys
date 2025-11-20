import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getDatabase, ref, onValue } from "firebase/database";
import { styles } from './MenuListScreen.styles';
import { screen } from "../../utils";

export function MenuListScreen(props) {
  const { navigation } = props;
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [search, setSearch] = useState('');
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todas');

  useEffect(() => {
    const db = getDatabase();

    const categoriasRef = ref(db, 'Categorias');
    onValue(categoriasRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.keys(data).map(key => ({
          id: String(key),
          nombre: data[key].nombre || String(data[key].Nombre || data[key].title || key)
        }));
        setCategorias(lista);
      } else setCategorias([]);
    });

    const productosRef = ref(db, 'Productos');
    onValue(productosRef, snapshot => {
      const data = snapshot.val();
      if (data) {
        const lista = Object.keys(data).map(key => {
          const raw = data[key] || {};
          const rawCat = raw.categoriaId ?? raw.categoriaID ?? raw.CategoriaId ?? raw.Categoria ?? raw.categoria ?? raw.cat ?? raw.categoryId ?? raw.category;
          return {
            id: String(key),
            ...raw,
            categoriaId: rawCat !== undefined ? String(rawCat) : undefined
          };
        });
        setProductos(lista);
      } else setProductos([]);
    });
  }, []);

  const goToInfoMenu = (producto) => {
    navigation.navigate(screen.menulist.info, {
      producto,
      onAddToCart: (cantidad) => {
        setCartItems(prev => [...prev, { ...producto, cantidad }]);
        setCartCount(prev => prev + cantidad);
      },
    });
  };

  const goToShop = () => {
    navigation.navigate(screen.shopmenu.tab, {
      cartItems,
      onUpdateCart: (newCart) => {
        setCartItems(newCart);
        const newCount = newCart.reduce((sum, item) => sum + (item.cantidad || 1), 0);
        setCartCount(newCount);
      },
    });
  };

  const filteredData = productos.filter(item => {
    const titulo = (item?.Titulo || "").toLowerCase();
    const desc = (item?.Descripcion || "").toLowerCase();
    const query = (search || "").toLowerCase();
    const matchSearch = titulo.includes(query) || desc.includes(query);

    if (categoriaSeleccionada === 'todas') return matchSearch;
    const itemCat = item?.categoriaId !== undefined ? String(item.categoriaId) : undefined;
    return matchSearch && itemCat === String(categoriaSeleccionada);
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Menú</Text>
          <TextInput
            style={styles.search}
            placeholder="Buscar platillos..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        {/* Categorías */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesBar}
          contentContainerStyle={styles.categoriesContent}
        >
          <TouchableOpacity
            style={[styles.categoryButton, categoriaSeleccionada === 'todas' && styles.categoryButtonActive]}
            onPress={() => setCategoriaSeleccionada('todas')}
          >
            <Text style={[styles.categoryText, categoriaSeleccionada === 'todas' && styles.categoryTextActive]}>
              Todas
            </Text>
          </TouchableOpacity>

          {categorias.map(categoria => (
            <TouchableOpacity
              key={categoria.id}
              style={[styles.categoryButton, categoriaSeleccionada === categoria.id && styles.categoryButtonActive]}
              onPress={() => setCategoriaSeleccionada(categoria.id)}
            >
              <Text style={[styles.categoryText, categoriaSeleccionada === categoria.id && styles.categoryTextActive]}>
                {categoria.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Productos filtrados */}
        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="restaurant-outline" size={64} color="#ccc" />
              <Text>No hay productos en esta categoría</Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.Icono }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.Titulo}</Text>
                <Text style={styles.desc}>{item.Descripcion}</Text>
                <Text style={styles.price}>S/ {item.Precio}</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => goToInfoMenu(item)}>
                <Ionicons name="add" size={22} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

        {/* Botón flotante de carrito */}
        <TouchableOpacity style={styles.floatingCartButton} onPress={goToShop}>
          <View style={styles.cartIconContainer}>
            <Ionicons name="cart" size={28} color="#fff" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}
