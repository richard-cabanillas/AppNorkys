import{createNativeStackNavigator} from "@react-navigation/native-stack";
import{AccountScreen} from  "../Screens/Account/AccountScreen";
import{screen} from "../utils";
import{LoginScreen} from "../Screens/Account/LoginScreen/LoginScreen";
import{ResgisterScreen} from "../Screens/Account/RegisterScreen/ResgisterScreen";

const Stack = createNativeStackNavigator();

export function AccountStack(){
    return(
        <Stack.Navigator>

            <Stack.Screen name={screen.account.List} component={AccountScreen} 
            options={{title:"Configurar cuenta"}}/>

            <Stack.Screen name={screen.account.login} component={LoginScreen} 
            options={{title:"Iniciar Sesion"}}/>
            
            <Stack.Screen name={screen.account.register} component={ResgisterScreen} 
            options={{title:"Crea tu cuenta"}}/>


        </Stack.Navigator>
        
    )
}