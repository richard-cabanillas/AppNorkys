import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuListScreen } from "../Screens/Restaurante/MenuListScreen";
import {InfoMenu} from "../Screens/Restaurante/InfoMenu";
import {screen} from '../utils'
import {CarritoScreen} from '../Screens/Shop';
import {Payments} from '../Screens/Shop/Payment';

const Stack = createNativeStackNavigator();

export function MenuListStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screen.menulist.tab} 
        component={MenuListScreen}
        options={{ title: "Lista del menú" }}
      />
      <Stack.Screen 
        name={screen.menulist.info}
        component={InfoMenu}
        options={{ title: "Informacion del menu" }}
      />
      <Stack.Screen
        name={screen.shopmenu.tab}
        component={CarritoScreen}
        options={{ title: "ShopTap" }}
      />
      <Stack.Screen
        name={screen.payment.list}
        component={Payments}
        options={{ title: "MetodoPago" }}
      />
    </Stack.Navigator>
  );
}

