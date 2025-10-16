import React from 'react';
import { View, Text,Button } from 'react-native'
import{screen} from "../../utils"
import {ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, } from 'react-native';
import { Ionicons } from "@expo/vector-icons";

export function RestaurantsScreen(props) {
  const {navigation} = props;

  const goToMenu = () => {
  navigation.navigate(screen.menulist.tab); 
};

  const specialties = [
    {
      id: '1',
      title: 'Pollo a la Brasa',
      subtitle: 'Entero + papas + ensalada',
      price: 'S/ 45.90',
      tag: 'Popular',
      image:
        'https://losmaderos.pe/public/img/products/prd_wc61187987efbb2.jpg',
    },
    {
      id: '2',
      title: 'Combo Familiar',
      subtitle: '2 pollos + papas + gaseosa 1.5L',
      price: 'S/ 69.90',
      tag: 'Oferta',
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeV5GVgZJXq5L8aS88-Hp9l3wUhA-VE_NWFA&s=100 ',
    },

    
  ];

  const renderSpecialty = ({item}) => (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{item.tag}</Text>
          </View>
        </View>
        <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
        <Text style={styles.cardPrice}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.name}>Rocky's</Text>
          <Text style={styles.subname}>Pollería Peruana</Text>
          <View style={styles.metaRow}>
            <Ionicons name="time-outline" size={16} color="#fff" />
            <Text style={styles.metaText}> 25-35 min</Text>
            <Ionicons name="bicycle-outline" size={16} color="#fff" style={{marginLeft:12}} />
            <Text style={styles.metaText}> Delivery S/5</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.ratingBox}>
            <Text style={styles.rating}>4.8</Text>
            <Text style={styles.reviews}>1,234 reseñas</Text>
          </View>
        </View>
      </View>

     
      <View style={styles.actions}>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>Pedir Ahora</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.outlineButton} onPress={goToMenu}>
          <Text style={styles.outlineButtonText}>Ver Menú</Text>
        </TouchableOpacity>
      </View>

     
      <Text style={styles.sectionTitle}>Especialidades del Día</Text>
      <FlatList
        data={specialties}
        keyExtractor={i => i.id}
        renderItem={renderSpecialty}
        scrollEnabled={false}
        contentContainerStyle={{paddingBottom: 10}}
      />

      
      <Text style={styles.sectionTitle}>Promociones</Text>
      <View style={styles.promoCard}>
        <View style={styles.promoLeft}>
          <View style={styles.promoCircle}>
            <Text style={styles.promoPercent}>%</Text>
          </View>
        </View>
        <View style={styles.promoRight}>
          <Text style={styles.promoTitle}>20% OFF en tu primer pedido</Text>
          <Text style={styles.promoSubtitle}>Válido hasta el 31 de octubre</Text>
        </View>
      </View>

      <View style={{height: 80}} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    backgroundColor: '#ff6b00',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLeft: {flex: 1},
  headerRight: {justifyContent: 'center', alignItems: 'center'},
  name: {color: '#fff', fontSize: 24, fontWeight: '700'},
  subname: {color: '#fff', opacity: 0.9, marginTop: 4},
  metaRow: {flexDirection: 'row', marginTop: 10, alignItems: 'center'},
  metaText: {color: '#fff', opacity: 0.95},
  ratingBox: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  rating: {color: '#fff', fontWeight: '700'},
  reviews: {color: '#fff', fontSize: 12, opacity: 0.9},

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  primaryButton: {
    backgroundColor: '#ff6b00',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  primaryButtonText: {color: '#fff', fontWeight: '700'},
  outlineButton: {
    borderWidth: 1,
    borderColor: '#ff6b00',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  outlineButtonText: {color: '#ff6b00', fontWeight: '700'},

  sectionTitle: {fontSize: 18, fontWeight: '700', paddingHorizontal: 16, marginTop: 8, marginBottom: 8},

  card: {
    flexDirection: 'row',
    backgroundColor: '#fff7ee',
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  cardImage: {width: 90, height: 90},
  cardContent: {flex: 1, padding: 12},
  cardHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'},
  cardTitle: {fontWeight: '700'},
  tag: {
    borderWidth: 1,
    borderColor: '#ff8a50',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  tagText: {color: '#ff8a50', fontSize: 12},
  cardSubtitle: {color: '#666', marginTop: 6},
  cardPrice: {color: '#d35400', fontWeight: '700', marginTop: 8},

  promoCard: {
    backgroundColor: '#fff3eb',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  promoLeft: {marginRight: 12},
  promoCircle: {
    backgroundColor: '#ff8a50',
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoPercent: {color: '#fff', fontWeight: '700', fontSize: 20},
  promoRight: {},
  promoTitle: {fontWeight: '700'},
  promoSubtitle: {color: '#666', marginTop: 4},
});