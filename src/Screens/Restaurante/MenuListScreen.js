import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Image, Linking } from 'react-native';
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
        image: 'https://www.recetasnestle.com.pe/sites/default/files/2022-07/pollo-a-la-brasa.jpg',
        link: 'https://es.wikipedia.org/wiki/Pollo_a_la_brasa'
      },
      {
        id: '2',
        name: 'Medio Pollo a la Brasa',
        desc: 'Ideal para compartir, incluye papas fritas y ensalada.',
        price: 25.90,
        image: 'https://comidasperuanas.net/wp-content/uploads/2021/05/medio-pollo-a-la-brasa.jpg',
        link: 'https://es.wikipedia.org/wiki/Pollo_a_la_brasa'
      },
      {
        id: '3',
        name: '1/4 de Pollo a la Brasa',
        desc: 'Porción individual con papas fritas y cremas.',
        price: 15.90,
        image: 'https://cdn0.recetasgratis.net/es/posts/0/3/9/pollo_a_la_brasa_peruano_25930_600.jpg',
        link: 'https://es.wikipedia.org/wiki/Pollo_a_la_brasa'
      },
      {
        id: '8',
        name: 'Broaster con papas',
        desc: 'Crujiente pollo broaster con papas doradas.',
        price: 17.90,
        image: 'https://www.comedera.com/wp-content/uploads/2022/08/Pollo-broaster.jpg',
        link: 'https://es.wikipedia.org/wiki/Pollo_frito'
      }
    ],
    Acompañamientos: [
      {
        id: '4',
        name: 'Papas Fritas Grandes',
        desc: 'Crocantes, doradas y con toque de sal.',
        price: 9.90,
        image: 'https://www.paulinacocina.net/wp-content/uploads/2022/03/papas-fritas-receta.jpg',
        link: 'https://es.wikipedia.org/wiki/Papas_fritas'
      },
      {
        id: '5',
        name: 'Arroz Chaufa',
        desc: 'Arroz chaufa clásico con verduras y soya.',
        price: 11.50,
        image: 'https://www.comedera.com/wp-content/uploads/2023/01/Arroz-chaufa-peruano-shutterstock_2180133381.jpg',
        link: 'https://es.wikipedia.org/wiki/Arroz_chaufa'
      },
      {
        id: '9',
        name: 'Ensalada Criolla',
        desc: 'Cebolla, tomate y limón. Refrescante.',
        price: 6.90,
        image: 'https://www.comedera.com/wp-content/uploads/2022/09/ensalada-criolla-peruana.jpg',
        link: 'https://es.wikipedia.org/wiki/Ensalada_criolla'
      },
    ],
    Bebidas: [
      {
        id: '6',
        name: 'Inca Kola 1L',
        desc: 'Gaseosa peruana original 1 litro.',
        price: 6.50,
        image: 'https://wongfood.vteximg.com.br/arquivos/ids/573290-1000-1000/184029.jpg',
        link: 'https://es.wikipedia.org/wiki/Inca_Kola'
      },
      {
        id: '7',
        name: 'Coca-Cola 1L',
        desc: 'Refresco clásico 1 litro.',
        price: 6.50,
        image: 'https://images.ctfassets.net/ywowj8d94i8y/5r4UJjSqt0sWCyScGggWgM/79854dbe33b93281891b6f51c55d0794/botella-coca-cola-original-1lt.jpg',
        link: 'https://es.wikipedia.org/wiki/Coca-Cola'
      },
      {
        id: '10',
        name: 'Chicha Morada',
        desc: 'Bebida tradicional peruana natural.',
        price: 5.90,
        image: 'https://www.comedera.com/wp-content/uploads/2022/11/Chicha-morada-peruana-shutterstock_2156790367.jpg',
        link: 'https://es.wikipedia.org/wiki/Chicha_morada'
      },
    ],
  };

  // Filtro por búsqueda
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

      {/* Tabs de categoría */}
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

      {/* Lista de productos */}
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => Linking.openURL(item.link)}
          >
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
