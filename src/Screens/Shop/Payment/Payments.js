import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import {styles} from "./Payments.styles";
import { useNavigation } from '@react-navigation/native';
import { database } from "../../../utils/firebase"; 
// Configurar el handler de notificaciones
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// Función para enviar push notification
async function sendPushNotification(expoPushToken) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: '🎉 Pago Exitoso',
    body: 'Tu compra se ha procesado correctamente. ¡Gracias por tu pedido!',
    data: { 
      type: 'payment_success',
      timestamp: new Date().toISOString()
    },
  };

  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  } catch (error) {
    console.error('Error al enviar push notification:', error);
  }
}

// Función para registrar push notifications
async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      Alert.alert('Permiso denegado', 'No se pudo obtener permiso para notificaciones push');
      return;
    }
    
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    
    if (!projectId) {
      Alert.alert('Error', 'No se encontró el Project ID');
      return;
    }
    
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log('Expo Push Token:', pushTokenString);
      return pushTokenString;
    } catch (e) {
      Alert.alert('Error', `No se pudo obtener el token: ${e}`);
    }
  } else {
    Alert.alert('Dispositivo requerido', 'Las push notifications requieren un dispositivo físico');
  }
}

export function Payments({ route }) {  // ← CAMBIAR props por { route }
    const navigation = useNavigation();
    
    // ← AGREGAR ESTAS LÍNEAS
    const { cartItems = [], subtotal = 0 } = route.params || {};

  const [showCVV, setShowCVV] = useState(false);
  const [cvv, setCvv] = useState('');
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // Registrar para push notifications
    registerForPushNotificationsAsync()
      .then(token => setExpoPushToken(token ?? ''))
      .catch((error) => console.error('Error al registrar push token:', error));

    // Listener para notificaciones recibidas
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log('Notificación recibida:', notification);
    });

    // Listener para respuestas a notificaciones (cuando el usuario toca la notificación)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Respuesta a notificación:', response);
    });

    return () => {
         notificationListener.current?.remove();
    responseListener.current?.remove();   };
  }, []);

  const handleCvvChange = (text) => {
    const cleaned = text.replace(/[^0-9]/g, '').slice(0, 3);
    setCvv(cleaned);
  };

const handlePagar = async () => {
    // Validación simple
    if (!cvv) {
      Alert.alert('Faltan datos', 'Completa todos los campos');
      return;
    }

    if (cartItems.length === 0) {
      Alert.alert('Carrito vacío', 'No hay productos para procesar');
      return;
    }

    try {
      // Notificación local inmediata
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Procesando pago',
          body: 'Tu pago está siendo procesado...',
          sound: true,
        },
        trigger: null,
      });

      // Preparar items para Firebase
      const itemsParaFirebase = {};
      cartItems.forEach((item, index) => {
        itemsParaFirebase[`item0${index + 1}`] = {
          Titulo: item.Titulo || '',
          cantidad: item.cantidad || 1,
          precio: item.Precio || 0,
          productoId: item.id || `p${index + 1}`
        };
      });

      // Guardar en Firebase
      const pedidosRef = database().ref('Pedidos');
      const nuevoPedidoRef = pedidosRef.push();
      
      await nuevoPedidoRef.set({
        estado: "pendiente",
        fecha: new Date().toISOString(),
        id: cartItems.length,
        items: itemsParaFirebase,
        total: subtotal
      });

      console.log('✅ Pedido guardado:', nuevoPedidoRef.key);

      // Simular procesamiento de pago
      setTimeout(async () => {
        // Enviar push notification si tenemos el token
        if (expoPushToken) {
          await sendPushNotification(expoPushToken);
        }

        // Resetear campos
        setCvv('');
        setShowCVV(false);
        
        Alert.alert(
          'Pago exitoso', 
          '¡Tu pago se ha procesado correctamente! Recibirás una notificación push.'
        );
      }, 2000);

    } catch (error) {
      console.error('Error al procesar el pago:', error);
      Alert.alert('Error', 'Hubo un problema al procesar tu pago');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
<TouchableOpacity
  onPress={() => navigation.goBack()}
  style={{
    flexDirection: "row",
    alignItems: "center",
    padding: 15
  }}
>
  <Ionicons name="arrow-back" size={28} color="#333" />

  <Text
    style={{
      fontSize: 24,
      fontWeight: "600",
      marginLeft: 10 
    }}
  >
    Información de Pago
  </Text>
</TouchableOpacity>

      <ScrollView contentContainerStyle={{ padding: 20 }}>


        {/* Mostrar Push Token (solo para debug, quitar en producción) */}
        {__DEV__ && expoPushToken && (
          <View style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8, marginBottom: 15 }}>
            <Text style={{ fontSize: 12, color: '#666' }}>
              Push Token: {expoPushToken.substring(0, 30)}...
            </Text>
          </View>
        )}

        <Text style={styles.label}>Nombre del titular</Text>
        <TextInput 
          placeholder="Ej: Alexander Mendoza" 
          style={styles.input} 
          placeholderTextColor="#888" 
        />

        <Text style={styles.label}>Número de tarjeta</Text>
        <View style={styles.inputIconContainer}>
          <TextInput
            placeholder="1234 5678 9012 3456"
            style={styles.inputIconText}
            keyboardType="numeric"
            placeholderTextColor="#888"
          />
          <Ionicons name="card-outline" size={24} color="#888" />
        </View>

        <View style={{ flexDirection: 'row', gap: 15 }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Fecha exp.</Text>
            <TextInput
              placeholder="MM/AA"
              style={styles.input}
              keyboardType="numeric"
              placeholderTextColor="#888"
            />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.label}>CVV</Text>
            <View style={styles.inputIconContainer}>
              <TextInput
                placeholder="123"
                style={styles.inputIconText}
                keyboardType="numeric"
                secureTextEntry={!showCVV}
                value={cvv}
                onChangeText={handleCvvChange}
                placeholderTextColor="#888"
              />
              <TouchableOpacity onPress={() => setShowCVV(prev => !prev)}>
                <Ionicons name={showCVV ? 'eye-off' : 'eye'} size={24} color="#888" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.label}>Dirección</Text>
        <TextInput 
          placeholder="Calle, número, referencia" 
          style={styles.input} 
          placeholderTextColor="#888" 
        />

        <Text style={styles.label}>Ciudad</Text>
        <TextInput 
          placeholder="Ej: Lima" 
          style={styles.input} 
          placeholderTextColor="#888" 
        />

        <TouchableOpacity style={styles.payButton} onPress={handlePagar}>
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>Pagar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

