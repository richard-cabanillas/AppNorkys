import{createNativeStackNavigator} from "@react-navigation/native-stack";
import {screen} from "../utils"
import{MenuListScreen} from "../Screens/Restaurante/MenuListScreen"

const Stack = createNativeStackNavigator();

export function MenuListStack() {
    return(
        <Stack.Navigator>
            <Stack.Screen
            name={screen.menulist.List}
            component={MenuListScreen}
            options={{title: "Lista del menu"}}
            />
        </Stack.Navigator>
    )
} 