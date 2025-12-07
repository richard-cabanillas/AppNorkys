import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { database } from '../../utils/firebase'; // ← Verifica esta ruta
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("🔄 Conectando a Firebase Database...");

    let isMounted = true;

    try {
      // ✅ CORRECTO: Usa database() con paréntesis
      const categoriasRef = database().ref('Categorias');
      const productosRef = database().ref('Productos');

      const categoriasListener = categoriasRef.on(
        'value',
        (snapshot) => {
          if (!isMounted) return;
          
          const data = snapshot.val();
          if (data) {
            const lista = Object.keys(data).map(key => ({
              id: String(key),
              nombre: data[key].nombre || String(data[key].Nombre || key)
            }));
            console.log(`✅ ${lista.length} categorías cargadas`);
            setCategorias(lista);
          }
        },
        (err) => {
          if (!isMounted) return;
          console.error("❌ Error Categorias:", err);
          setError("Error al cargar categorías");
        }
      );

      const productosListener = productosRef.on(
        'value',
        (snapshot) => {
          if (!isMounted) return;
          
          const data = snapshot.val();
          if (data) {
            const lista = Object.keys(data).map(key => ({
              id: String(key),
              ...data[key],
              categoriaId: data[key].categoriaId || data[key].Categoria
            }));
            console.log(`✅ ${lista.length} productos cargados`);
            setProductos(lista);
          }
          setLoading(false);
        },
        (err) => {
          if (!isMounted) return;
          console.error("❌ Error Productos:", err);
          setError("Error al cargar productos");
          setLoading(false);
        }
      );

      return () => {
        isMounted = false;
        try {
          categoriasRef.off('value', categoriasListener);
          productosRef.off('value', productosListener);
          console.log("✅ Listeners limpiados sin errores");
        } catch (err) {
          console.log("⚠️ Error en cleanup:", err.message);
        }
      };

    } catch (err) {
      console.error("❌ Error:", err);
      setError("Error de inicialización");
      setLoading(false);
    }
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
        setCartCount(newCart.reduce((sum, item) => sum + (item.cantidad || 1), 0));
      },
    });
  };

  const filteredData = productos.filter(item => {
    const titulo = (item?.Titulo || "").toLowerCase();
    const query = search.toLowerCase();
    const matchSearch = titulo.includes(query);

    if (categoriaSeleccionada === 'todas') return matchSearch;
    return matchSearch && String(item?.categoriaId) === String(categoriaSeleccionada);
  });

  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="warning-outline" size={64} color="#ff6b6b" />
          <Text style={{ fontSize: 18, marginTop: 16 }}>{error}</Text>
          <TouchableOpacity
            style={{ marginTop: 20, backgroundColor: '#ff6b35', padding: 12, borderRadius: 8 }}
            onPress={() => { setError(null); setLoading(true); }}
          >
            <Text style={{ color: '#fff' }}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#ff6b35" />
          <Text style={{ marginTop: 16 }}>Cargando menú...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Menú</Text>
          <TextInput
            style={styles.search}
            placeholder="Buscar platillos..."
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesBar}>
          <TouchableOpacity
            style={[styles.categoryButton, categoriaSeleccionada === 'todas' && styles.categoryButtonActive]}
            onPress={() => setCategoriaSeleccionada('todas')}
          >
            <Text style={[styles.categoryText, categoriaSeleccionada === 'todas' && styles.categoryTextActive]}>
              Todas
            </Text>
          </TouchableOpacity>

          {categorias.map(cat => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.categoryButton, categoriaSeleccionada === cat.id && styles.categoryButtonActive]}
              onPress={() => setCategoriaSeleccionada(cat.id)}
            >
              <Text style={[styles.categoryText, categoriaSeleccionada === cat.id && styles.categoryTextActive]}>
                {cat.nombre}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <FlatList
          data={filteredData}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Image source={{ uri: item.Icono }} style={styles.image} />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.Titulo}</Text>
                <Text style={styles.desc} numberOfLines={2}>{item.Descripcion}</Text>
                <Text style={styles.price}>S/ {item.Precio}</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => goToInfoMenu(item)}>
                <Ionicons name="add" size={22} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

        {cartCount > 0 && (
          <TouchableOpacity style={styles.floatingCartButton} onPress={goToShop}>
            <Ionicons name="cart" size={28} color="#fff" />
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cartCount}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}