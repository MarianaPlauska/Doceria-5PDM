import React from "react";
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { useCart } from "./CartContext"; // Hook do carrinho
import { MaterialIcons } from "@expo/vector-icons";

const CartScreen = ({ navigation }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  // Função para calcular o total do carrinho
  const getTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.preco * item.quantity, 0).toFixed(2);
  };

  // Função para limpar o carrinho
  const clearCart = () => {
    cartItems.forEach((item) => removeFromCart(item.id));
  };

  // Renderização de cada item no carrinho
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>R$ {item.preco.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
          >
            <MaterialIcons name="remove-circle-outline" size={24} color="#E87EB7" />
          </TouchableOpacity>
          <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)}>
            <MaterialIcons name="add-circle-outline" size={24} color="#E87EB7" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
        <MaterialIcons name="delete" size={24} color="#FF6C6C" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#8A4A9D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carrinho</Text>
        <TouchableOpacity onPress={clearCart}>
          <MaterialIcons name="delete-sweep" size={24} color="#FF6C6C" />
        </TouchableOpacity>
      </View>

      {/* Lista de itens no carrinho */}
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={(item) => item.id}
          style={styles.cartList}
        />
      ) : (
        <Text style={styles.emptyCartText}>Seu carrinho está vazio!</Text>
      )}

      {/* Total e botão de checkout */}
      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: R$ {getTotal()}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate("Checkout", { cartItems, total: getTotal() })}
          >
            <Text style={styles.checkoutButtonText}>Finalizar Compra</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE6F3",
    padding: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8A4A9D",
  },
  cartItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cartItemDetails: {
    marginLeft: 15,
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8A4A9D",
  },
  cartItemPrice: {
    fontSize: 12,
    color: "#E87EB7",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  cartItemQuantity: {
    marginHorizontal: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  removeButton: {
    marginLeft: 10,
  },
  cartList: {
    flex: 1,
  },
  emptyCartText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 20,
  },
  totalContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",
  },
  checkoutButton: {
    backgroundColor: "#8A4A9D",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  checkoutButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CartScreen;
