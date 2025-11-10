import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function MenuListScreen() {
  const [category, setCategory] = useState('Pollos');
  const [search, setSearch] = useState('');

  // Menú con imágenes reales y enlaces
  const menu = {
    Pollos: [
      {
        id: '1',
        name: 'Pollo a la Brasa Entero',
        desc: 'Pollo entero a la brasa con papas, ensalada y cremas.',
        price: 45.90,
        oldPrice: 52.00,
        tag: 'Popular',
        image: 'https://losmaderos.pe/public/img/products/prd_wc61187987efbb2.jpg',
      },
      {
        id: '2',
        name: 'Medio Pollo a la Brasa',
        desc: 'Ideal para compartir, incluye papas fritas y ensalada.',
        price: 25.90,
        image: 'https://s3-rokys-pro.s3.amazonaws.com/media/catalog/product/m/e/medio-pollo-melona_2.jpg',
      },
      {
        id: '3',
        name: '1/4 de Pollo a la Brasa',
        desc: 'Porción individual con papas fritas y cremas.',
        price: 15.90,
        image: 'https://www.magacin247.com/wp-content/uploads/2023/05/Rokys-lanza-promocion-de-%C2%BC-de-pollo-a-10-soles-768x414.jpg',
      },
      {
        id: '8',
        name: 'Broaster con papas',
        desc: 'Crujiente pollo broaster con papas doradas.',
        price: 17.90,
        image: 'https://tse2.mm.bing.net/th/id/OIP.uaKi9A-ozdKn_wSgd139hwHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
      },
      {
        id: '12',
        name: 'Alitas Rockys (6 piezas)',
        desc: 'Alitas de pollo con salsa especial Rockys y papas.',
        price: 19.90,
        image: 'https://img0.didiglobal.com/static/soda_public/img_bd72986412e9d3968cd165425e693dda.jpg',
      },
    ],

    Acompañamientos: [
      {
        id: '4',
        name: 'Papas Fritas Grandes',
        desc: 'Crocantes, doradas y con toque de sal.',
        price: 9.90,
        image: 'https://tse1.mm.bing.net/th/id/OIP.2N6uuqhOICCys-_b35A4awHaE8?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
      },
      {
        id: '5',
        name: 'Arroz Chaufa',
        desc: 'Arroz chaufa clásico con verduras y soya.',
        price: 11.50,
        image: 'https://tse1.mm.bing.net/th/id/OIP.77K3XXRSierEJpt_B7Uw4QHaEK?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
      },
      {
        id: '9',
        name: 'Ensalada Fresca',
        desc: 'Lechuga, tomate, zanahoria y palta.',
        price: 10.00,
        image: 'https://lafamiliachickengrill.com/wp-content/uploads/2024/06/Ensalada-clasica-1-1024x768.jpg',
      },
    ],

    Bebidas: [
      {
        id: '6',
        name: 'Inca Kola 1L',
        desc: 'Gaseosa peruana original 1 litro.',
        price: 6.50,
        image: 'https://d2o812a6k13pkp.cloudfront.net/fit-in/1080x1080/Productos/40527007_0120230815110625.jpg',
      },
      {
        id: '7',
        name: 'Coca-Cola 1L',
        desc: 'Refresco clásico 1 litro.',
        price: 6.50,
        image: 'https://tse3.mm.bing.net/th/id/OIP.kCfWMQS1RPtapVUqaGeHlgHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
      },
      {
        id: '10',
        name: 'Chicha Morada',
        desc: 'Bebida tradicional peruana natural.',
        price: 5.90,
        image: 'https://tse4.mm.bing.net/th/id/OIP.oeaa9ymJLuUFQ6ZirI2zZQHaHa?cb=12&rs=1&pid=ImgDetMain&o=7&rm=3',
      },
      {
        id: '11',
        name: 'Maracuyá',
        desc: 'Refrescante bebida natural de maracuyá.',
        price: 5.90,
        image: 'https://polleriaslagranja.com/wp-content/uploads/2022/10/La-Granja-Real-Food-Chicken-Jarra-de-Maracuya.png',
      },
    ],
  };

  // Filtro de búsqueda
  const filteredData = menu[category].filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Menú Rocky’s</Text>
        <TextInput
          style={styles.search}
          placeholder="Buscar platillos..."
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {Object.keys(menu).map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.tab, category === cat && styles.activeTab]}
            onPress={() => setCategory(cat)}
          >
            <Text style={[styles.tabText, category === cat && styles.activeTabText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.desc}>{item.desc}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>S/ {item.price.toFixed(2)}</Text>
                {item.oldPrice && (
                  <Text style={styles.oldPrice}>S/ {item.oldPrice.toFixed(2)}</Text>
                )}
                {item.tag && <Text style={styles.tag}>{item.tag}</Text>}
              </View>
            </View>
            <TouchableOpacity style={styles.addButton}>
              <Ionicons name="add" size={22} color="#fff" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { backgroundColor: '#ff6600', padding: 15 },
  title: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 8 },
  search: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff7e6',
    paddingVertical: 10,
  },
  tab: { paddingVertical: 6, paddingHorizontal: 15, borderRadius: 20 },
  activeTab: { backgroundColor: '#ff6600' },
  tabText: { color: '#333', fontWeight: '500' },
  activeTabText: { color: '#fff' },
  list: { padding: 10 },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff7e6',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: { width: 80, height: 80, borderRadius: 10, marginRight: 10 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  desc: { fontSize: 13, color: '#666', marginVertical: 2 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  price: { fontSize: 15, color: '#ff6600', fontWeight: 'bold' },
  oldPrice: { fontSize: 13, color: '#999', textDecorationLine: 'line-through' },
  tag: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#ff6600',
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#ff6600',
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
});
