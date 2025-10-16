import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MenuListScreen } from "../Screens/Restaurante/MenuListScreen";

const Stack = createNativeStackNavigator();

export function MenuListStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MenuList" // Usamos string literal para evitar problemas con screen.menulist.List
        component={MenuListScreen}
        options={{ title: "Lista del menú" }}
      />
    </Stack.Navigator>
  );
}
