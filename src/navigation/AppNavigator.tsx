import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Telas
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import MainScreen from "../screens/MainScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import CartScreen from "../screens/CartScreen"; 
import { CartProvider } from "../screens/CartContext"; 
import CheckoutScreen from "../screens/CheckoutScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AdminDashboard from "../screens/AdminDashboard"; 


// Tipos das rotas
export type RootStackParamList = {
  Login: undefined; 
  Home: undefined;  
  Main: undefined;
  SignUp: undefined;
  ProductDetail: { product: any };
  Cart: undefined; 
  Checkout: undefined;
  Profile: undefined;
  Admin: undefined;
};

//Stack Navigator com os tipos
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <CartProvider> {}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen
          name="Checkout"
          component={CheckoutScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="Admin"
          component={AdminDashboard}
          options={{ headerShown: false }} 
        />

        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
};

export default AppNavigator;
