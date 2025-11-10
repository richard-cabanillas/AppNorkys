import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Dimensions, Alert } from 'react-native'
import{screen} from "../../utils"
import {ScrollView, StyleSheet, Image, TouchableOpacity, FlatList, } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export function RestaurantsScreen(props) {
  const {navigation} = props;

  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  // Coordenadas de ejemplo para Rocky's
  const rockysLocations = [
    { id: 'r1', title: "Rocky'1 - Restaurante pollería Roky's - Surco", latitude: -12.165131761160946, longitude: -76.99236169680736 },
    { id: 'r2', title: "Rocky'2 - Villa el salvador", latitude: -12.207610904975786, longitude: -76.93826516262396 },
    { id: 'r3', title: "Rocky'3 - Polleria Norkys Villa El Salvador", latitude: -12.19734514196775, longitude: -76.96473953828236 },
    { id: 'r4', title: "Rocky'4 - Roky's Plaza Center", latitude: -12.202317413258992, longitude: -76.93306072334313 },
    { id: 'r5', title: "Rocky'5 - Villa el salvador", latitude: -12.209683624358021, longitude: -76.93903788370224 },
  ];

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permiso denegado', 'Necesitamos permiso de ubicación para mostrar restaurantes cercanos');
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        setUserLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      } catch (e) {
        console.warn('Error pidiendo ubicación:', e);
      }
    })();
  }, []);

  // Calcula la ubicación más cercana (distancia aproximada usando Haversine)
  const toRad = (value) => (value * Math.PI) / 180;
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // metros
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestRocky = () => {
    if (!userLocation) return null;
    let nearest = null;
    let minDist = Infinity;
    for (const r of rockysLocations) {
      const d = haversineDistance(userLocation.latitude, userLocation.longitude, r.latitude, r.longitude);
      if (d < minDist) {
        minDist = d;
        nearest = r;
      }
    }
    return nearest;
  };

  const centerMapOnNearest = () => {
    const nearest = findNearestRocky();
    if (!nearest) {
      Alert.alert('Ubicación no disponible', 'No se pudo determinar tu ubicación.');
      return;
    }
    mapRef.current?.animateToRegion({
      latitude: nearest.latitude,
      longitude: nearest.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    }, 800);
  };

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

      {/* Ubícanos - minimapa con botón */}
      <Text style={styles.sectionTitle}>Ubícanos</Text>
      <View style={{paddingHorizontal: 16, marginBottom: 16}}>
        <View style={{height: 350, borderRadius: 12, overflow: 'hidden', marginBottom: 8}}>
          <MapView
            ref={mapRef}
            style={{flex: 1}}
            initialRegion={{
              latitude: userLocation ? userLocation.latitude : -12.178965,
              longitude: userLocation ? userLocation.longitude : -76.9825745,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
            showsUserLocation={true}
          >
            {rockysLocations.map((loc) => (
              <Marker
                key={loc.id}
                coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
                title={loc.title}
              />
            ))}
            {userLocation && (
              <Marker
                coordinate={userLocation}
                title="Tu ubicación"
                pinColor="blue"
              />
            )}
          </MapView>
        </View>

        <TouchableOpacity style={styles.outlineButton} onPress={centerMapOnNearest}>
          <Text style={styles.outlineButtonText}>Restaurante más cercano</Text>
        </TouchableOpacity>
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