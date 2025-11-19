import{createNativeStackNavigator} from "@react-navigation/native-stack";
import{screen} from "../utils"
import{RestaurantsScreen} from "../Screens/Restaurante/RestaurantsScreen";
import{InfoMenu} from "../Screens/Restaurante/InfoMenu";


const Stack = createNativeStackNavigator();

export function RestaurantStack(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
        name={screen.restaurant.restaurants}
        component={RestaurantsScreen} 
        options={{title:"restaurantes"}}
        />



    </Stack.Navigator>
    )
}