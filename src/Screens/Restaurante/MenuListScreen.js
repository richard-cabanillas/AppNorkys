import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
// ✅ Importar el SDK nativo
import { database } from '../../utils';
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
    // Validar que database esté inicializado
    if (!database) {
      console.error("❌ Database no inicializado");
      setError("Error de conexión");
      setLoading(false);
      return;
    }

    console.log("🔄 Conectando a Firebase con SDK Nativo...");
    
    let categoriasRef;
    let productosRef;

    try {
      // ✅ Referencias con SDK nativo
      categoriasRef = database.ref('Categorias');
      productosRef = database.ref('Productos');

      // ✅ Listener de Categorías con SDK nativo
      const categoriasListener = categoriasRef.on(
        'value',
        (snapshot) => {
          try {
            console.log("✅ Categorias recibidas");
            const data = snapshot.val();
            if (data) {
              const lista = Object.keys(data).map(key => ({
                id: String(key),
                nombre: data[key].nombre || String(data[key].Nombre || data[key].title || key)
              }));
              console.log(`✅ ${lista.length} categorías cargadas`);
              setCategorias(lista);
            } else {
              console.log("⚠️ No hay categorías");
              setCategorias([]);
            }
          } catch (err) {
            console.error("❌ Error procesando categorías:", err);
          }
        },
        (err) => {
          console.error("❌ Error Firebase Categorias:", err.message);
          setError("Error al cargar categorías");
        }
      );

      // ✅ Listener de Productos con SDK nativo
      const productosListener = productosRef.on(
        'value',
        (snapshot) => {
          try {
            console.log("✅ Productos recibidos");
            const data = snapshot.val();
            if (data) {
              const lista = Object.keys(data).map(key => {
                const raw = data[key] || {};
                const rawCat = raw.categoriaId ?? raw.categoriaID ?? raw.CategoriaId ?? 
                             raw.Categoria ?? raw.categoria ?? raw.cat ?? 
                             raw.categoryId ?? raw.category;
                return {
                  id: String(key),
                  ...raw,
                  categoriaId: rawCat !== undefined ? String(rawCat) : undefined
                };
              });
              console.log(`✅ ${lista.length} productos cargados`);
              setProductos(lista);
              setError(null);
            } else {
              console.log("⚠️ No hay productos");
              setProductos([]);
            }
            setLoading(false);
          } catch (err) {
            console.error("❌ Error procesando productos:", err);
            setError("Error al procesar datos");
            setLoading(false);
          }
        },
        (err) => {
          console.error("❌ Error Firebase Productos:", err.message);
          setError("Error al cargar productos");
          setLoading(false);
        }
      );

    } catch (err) {
      console.error("❌ Error en useEffect:", err);
      setError("Error de inicialización");
      setLoading(false);
    }

    // ✅ Cleanup con SDK nativo
    return () => {
      try {
        if (categoriasRef) {
          categoriasRef.off('value');
        }
        if (productosRef) {
          productosRef.off('value');
        }
        console.log("🧹 Listeners limpiados");
      } catch (err) {
        console.error("Error en cleanup:", err);
      }
    };
  }, []);

  const goToInfoMenu = (producto) => {
    try {
      navigation.navigate(screen.menulist.info, {
        producto,
        onAddToCart: (cantidad) => {
          setCartItems(prev => [...prev, { ...producto, cantidad }]);
          setCartCount(prev => prev + cantidad);
        },
      });
    } catch (err) {
      console.error("Error navegando a info:", err);
    }
  };

  const goToShop = () => {
    try {
      navigation.navigate(screen.shopmenu.tab, {
        cartItems,
        onUpdateCart: (newCart) => {
          setCartItems(newCart);
          const newCount = newCart.reduce((sum, item) => sum + (item.cantidad || 1), 0);
          setCartCount(newCount);
        },
      });
    } catch (err) {
      console.error("Error navegando a shop:", err);
    }
  };

  const filteredData = productos.filter(item => {
    try {
      const titulo = (item?.Titulo || "").toLowerCase();
      const desc = (item?.Descripcion || "").toLowerCase();
      const query = (search || "").toLowerCase();
      const matchSearch = titulo.includes(query) || desc.includes(query);

      if (categoriaSeleccionada === 'todas') return matchSearch;
      const itemCat = item?.categoriaId !== undefined ? String(item.categoriaId) : undefined;
      return matchSearch && itemCat === String(categoriaSeleccionada);
    } catch (err) {
      console.error("Error filtrando producto:", err);
      return false;
    }
  });

  // Pantalla de error
  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Ionicons name="warning-outline" size={64} color="#ff6b6b" />
          <Text style={{ fontSize: 18, color: '#333', marginTop: 16, textAlign: 'center', fontWeight: '600' }}>
            {error}
          </Text>
          <Text style={{ fontSize: 14, color: '#666', marginTop: 8, textAlign: 'center' }}>
            Verifica tu conexión a internet
          </Text>
          <TouchableOpacity
            style={{ 
              marginTop: 20, 
              backgroundColor: '#ff6b35', 
              paddingHorizontal: 24, 
              paddingVertical: 12, 
              borderRadius: 8 
            }}
            onPress={() => {
              setError(null);
              setLoading(true);
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Reintentar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Pantalla de carga
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#ff6b35" />
          <Text style={{ fontSize: 18, color: '#333', marginTop: 16 }}>
            Cargando menú...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

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
              <Text style={{ color: '#666', marginTop: 12 }}>
                No hay productos en esta categoría
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Image 
                source={{ uri: item.Icono }} 
                style={styles.image}
                onError={(e) => console.log("Error imagen:", item.Titulo)}
              />
              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.Titulo}</Text>
                <Text style={styles.desc} numberOfLines={2}>
                  {item.Descripcion}
                </Text>
                <Text style={styles.price}>S/ {item.Precio}</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => goToInfoMenu(item)}>
                <Ionicons name="add" size={22} color="#fff" />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />

        {/* Botón flotante de carrito */}
        {cartCount > 0 && (
          <TouchableOpacity style={styles.floatingCartButton} onPress={goToShop}>
            <View style={styles.cartIconContainer}>
              <Ionicons name="cart" size={28} color="#fff" />
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>{cartCount}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}

      </View>
    </SafeAreaView>
  );
}