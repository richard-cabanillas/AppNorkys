import{createNativeStackNavigator} from "@react-navigation/native-stack";
import {FavoriteScreen} from "../Screens/FavoriteScreen"
import {screen} from "../utils"

const Stack = createNativeStackNavigator();

export function FavoriteStack(){
    return(    
    <Stack.Navigator>
        <Stack.Screen  
        name={screen.favorites.list}
        component={FavoriteScreen}
        options={{title:"Lista de los mejores platos"}}
        />
    </Stack.Navigator>
    )
}