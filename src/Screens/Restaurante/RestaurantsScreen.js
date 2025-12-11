import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Button, Dimensions, Alert } from 'react-native';
import { ScrollView, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from '../Restaurante/RestaurantsScreen.style';
import { screen } from "../../utils";

export function RestaurantsScreen(props) {
  const { navigation } = props;

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

  // Calculadora Haversine
  const toRad = (value) => (value * Math.PI) / 180;
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; 
    const φ1 = toRad(lat1);
    const φ2 = toRad(lat2);
    const Δφ = toRad(lat2 - lat1);
    const Δλ = toRad(lon2 - lon1);
    const a = Math.sin(Δφ / 2) ** 2 +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestRocky = () => {
    if (!userLocation) return null;
    let nearest = null;
    let minDist = Infinity;

    for (const r of rockysLocations) {
      const d = haversineDistance(
        userLocation.latitude, userLocation.longitude,
        r.latitude, r.longitude
      );
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
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhCOPzX_H-IsCStGx3DgwVbhUQnxyFiHalxA&s',
    },
    {
      id: '2',
      title: 'Combo Familiar',
      subtitle: '2 pollos + papas + gaseosa 1.5L',
      price: 'S/ 69.90',
      tag: 'Oferta',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeV5GVgZJXq5L8aS88-Hp9l3wUhA-VE_NWFA&s=100',
    },
  ];

  const renderSpecialty = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.name}>Rocky's</Text>
            <Text style={styles.subname}>Pollería Peruana</Text>
            <View style={styles.metaRow}>
              <Ionicons name="time-outline" size={16} color="#fff" />
              <Text style={styles.metaText}> 25-35 min</Text>
              <Ionicons name="bicycle-outline" size={16} color="#fff" style={{ marginLeft: 12 }} />
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

        {/* BOTONES */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Pedir Ahora</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.outlineButton} onPress={goToMenu}>
            <Text style={styles.outlineButtonText}>Ver Menú</Text>
          </TouchableOpacity>
        </View>

        {/* ESPECIALIDADES */}
        <Text style={styles.sectionTitle}>Especialidades del Día</Text>
        <FlatList
          data={specialties}
          keyExtractor={i => i.id}
          renderItem={renderSpecialty}
          scrollEnabled={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        />

        {/* PROMOCIONES */}
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

        {/* MAPA */}
        <Text style={styles.sectionTitle}>Ubícanos</Text>
        <View style={{ paddingHorizontal: 16, marginBottom: 16 }}>
          <View style={{ height: 350, borderRadius: 12, overflow: 'hidden', marginBottom: 8 }}>
            <MapView
              ref={mapRef}
              style={{ flex: 1 }}
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

        <View style={{ height: 80 }} />

      </ScrollView>
    </SafeAreaView>
  );
}
