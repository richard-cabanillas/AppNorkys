import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Ionicons from "@expo/vector-icons/Ionicons";

// IMPORTAR SDK NATIVO
import auth from '@react-native-firebase/auth';

import { UserGuestScreen } from "./UserGuestScreen/UserGuestScreen";
import { UserLoggedScreen } from "./UserLoggedScreen/UserLoggedScreen";
import { LoadingModal } from "../../components";

export function AccountScreen() {

  const [hasLogged, setHasLogged] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setHasLogged(user ? true : false);
    });

    return unsubscribe;
  }, []);

  if (hasLogged === null) {
    return <LoadingModal show text="Cargando" />;
  }

  return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />;
}
