import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PedidosScreen } from "../Screens/PedidosScreen";


const Stack = createNativeStackNavigator();

export function PedidosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Pedidos"
        component={PedidosScreen}
        options={{ title: "Pedidos" }}
      />
    </Stack.Navigator>
  );
}
