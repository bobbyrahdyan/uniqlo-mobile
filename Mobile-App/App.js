import Ionicons from "react-native-vector-icons/Ionicons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ApolloProvider } from "@apollo/client";
import HomeScreen from "./screen/HomeScreen";
import ProductScreen from "./screen/ProductScreen";
import DetailScreen from "./screen/DetailScreen";
import client from "./config/apolloClient";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function StackNav() {
  return (
    <ApolloProvider client={client}>
      <Stack.Navigator initialRouteName="Product">
        <Stack.Screen name="Product" component={ProductScreen} options={{}} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{}} />
      </Stack.Navigator>
    </ApolloProvider>
  );
}

const tabOption = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName;

    if (route.name === "Home") {
      iconName = focused ? "home-sharp" : "home-outline";
    } else if (route.name === "ShowCase") {
      iconName = focused ? "pricetag-sharp" : "pricetag-outline";
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: "#9f875d",
  tabBarInactiveTintColor: "gray",
});

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={tabOption}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen
            name="ShowCase"
            component={StackNav}
            options={{ headerShown: false }}
          />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
