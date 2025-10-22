import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { RestaurantStack } from "./RestaurantStack";
import { FavoriteStack } from "./FavoriteStack";
import { AccountStack } from "./AccountStack";
import { MenuListStack } from "./MenuListStack";
import { screen } from "../utils";

const Tab = createBottomTabNavigator();

export function AppNavigation() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#ec7f26ff",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({ color, size }) => getIcon(route, color, size),
      })}
    >
      <Tab.Screen
        name={screen.restaurant.tab}
        component={RestaurantStack}
        options={{ title: "Inicio" }}
      />

      <Tab.Screen
        name={screen.menulist.tab}
        component={MenuListStack}
        options={{ title: "Menú" }}
      />

      <Tab.Screen
        name={screen.favorites.tab}
        component={FavoriteStack}
        options={{ title: "Favoritos" }}
      />

      <Tab.Screen
        name={screen.account.tab}
        component={AccountStack}
        options={{ title: "Cuenta" }}
      />
    </Tab.Navigator>
  );
}

function getIcon(route, color, size) {
  let iconName;

  if (route.name === screen.restaurant.tab) {
    iconName = "home-outline";
  } else if (route.name === screen.menulist.tab) {
    iconName = "list-outline";
  } else if (route.name === screen.favorites.tab) {
    iconName = "heart-outline";
  } else if (route.name === screen.account.tab) {
    iconName = "person-outline";
  }

  return <Ionicons name={iconName} color={color} size={size} />;
}
