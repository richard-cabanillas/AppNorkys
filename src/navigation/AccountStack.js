import{createNativeStackNavigator} from "@react-navigation/native-stack";
import{AccountScreen} from  "../Screens/Account/AccountScreen";
import{screen} from "../utils";
import{LoginScreen} from "../Screens/Account/LoginScreen/LoginScreen";
import{RegisterScreen} from "../Screens/Account/RegisterScreen/RegisterScreen";
import{ForgotPassword} from "../Screens/Account/ForgotPassword/ForgotPassword";
import {ChangeHistory} from "../components/Account";
import {ChangeInfoPedido} from "../components/Account";


const Stack = createNativeStackNavigator();

export function AccountStack(){
    return(
        <Stack.Navigator>

            <Stack.Screen name={screen.account.list} component={AccountScreen} 
            options={{title:"Configurar cuenta"}}/>

            <Stack.Screen name={screen.account.login} component={LoginScreen} 
            options={{title:"Iniciar Sesion"}}/>
            
            <Stack.Screen name={screen.account.register} component={RegisterScreen} 
            options={{title:"Crea tu cuenta"}}/>
            
            <Stack.Screen name={screen.account.forgotPassword} component={ForgotPassword} 
            options={{title:"Recuperar contraseña"}}/>

            <Stack.Screen name={screen.account.history} component={ChangeHistory}
             options={{title:"Historial de compras"}}/>

            <Stack.Screen name={screen.account.pedido} component={ChangeInfoPedido} options={{title:"Info del pedido"}}/>
        
        </Stack.Navigator>
        
    )
}