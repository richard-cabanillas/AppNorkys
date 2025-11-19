import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuListScreen } from "../Screens/Restaurante/MenuListScreen";
import {InfoMenu} from "../Screens/Restaurante/InfoMenu";
import {screen} from '../utils'
const Stack = createNativeStackNavigator();

export function MenuListStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screen.menulist.tab} // Usamos string literal para evitar problemas con screen.menulist.List
        component={MenuListScreen}
        options={{ title: "Lista del menú" }}
      />

      <Stack.Screen 
        name={screen.menulist.info}
        component={InfoMenu}
        options={{title:"Informacion del menu"}}
      />

      
    </Stack.Navigator>

  );
}
