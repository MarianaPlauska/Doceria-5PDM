import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";
import { useCart } from "./CartContext"; 
import { MaterialIcons } from "@expo/vector-icons";

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params; 
  const { addToCart } = useCart(); 
  const [cartMessage, setCartMessage] = useState("");

  const handleAddToCart = () => {
    const preco = parseFloat(product.preco) || 0; 
    if (preco <= 0) {
      console.error("Preço inválido:", product);
      return;
    }
    const itemToAdd = {
      id: product.id,
      name: product.name,
      preco: Number(product.preco) || 0,
      image: product.resolvedImage,
      quantity: 1,
    };
    addToCart(itemToAdd); 

    // Exibe a mensagem de sucesso usando o Alert
    Alert.alert("Sucesso!", `${itemToAdd.name} foi adicionado ao carrinho.`, [
      { text: "OK", onPress: () => console.log("Item adicionado ao carrinho") },
    ]);

  };

  return (
    <View style={styles.container}>
      {/* Header com botão de voltar */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#8A4A9D" />
        </TouchableOpacity>
      </View>

      {/* Adicionando ScrollView */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Imagem do produto */}
        <Image source={product.resolvedImage} style={styles.productImage} />

        {/* Detalhes do produto */}
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.productDescription}>{product.descricao}</Text>
        <Text style={styles.productPrice}>
          {product.preco
            ? `R$ ${(Number(product.preco) || 0).toFixed(2)}`
            : "Preço não disponível"}
        </Text>

        {/* Ingredientes */}
        <View style={styles.ingredientsContainer}>
          <Text style={styles.sectionTitle}>Ingredientes:</Text>
          <Text style={styles.ingredientsText}>
            Chocolate amargo, creme de leite, morango fresco, açúcar e amor.
          </Text>
        </View>

        {/* Informações adicionais */}
        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <MaterialIcons name="timer" size={24} color="#8A4A9D" />
            <Text style={styles.infoText}>20 min</Text>
            <Text style={styles.infoSubText}>Tempo de preparo</Text>
          </View>
          <View style={styles.infoBox}>
            <MaterialIcons name="local-shipping" size={24} color="#8A4A9D" />
            <Text style={styles.infoText}>1 hora</Text>
            <Text style={styles.infoSubText}>Tempo para entrega</Text>
          </View>
        </View>

        {/* Produtos relacionados */}
        <View style={styles.relatedProductsContainer}>
          <Text style={styles.sectionTitle}>Você também poode gostar:</Text>
          <FlatList
            horizontal
            data={[
              {
                id: "101",
                name: "Trufa de Maracujá",
                preco: "3.50",
                image: require("../../assets/doce8.png"),
              },
              {
                id: "102",
                name: "Especial de Natal",
                preco: "20.00",
                image: require("../../assets/doce7.png"),
              },
            ]}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.relatedProductCard}
                onPress={() => navigation.push("ProductDetail", { product: item })}
              >
                <Image source={item.image} style={styles.relatedProductImage} />
                <Text style={styles.relatedProductName}>{item.name}</Text>
                <Text style={styles.relatedProductPrice}>R$ {item.preco}</Text>

              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {/* Botões de ação */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <MaterialIcons name="shopping-cart" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {cartMessage ? (
        <View style={styles.cartMessageContainer}>
          <Text style={styles.cartMessage}>{cartMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFE6F3" },
  scrollContainer: { padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8A4A9D",
    marginBottom: 10,
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#E87EB7",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8A4A9D",
    marginBottom: 10,
  },
  ingredientsContainer: { marginVertical: 20 },
  ingredientsText: { color: "#666", fontSize: 14, lineHeight: 20 },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  infoBox: {
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 10,
    borderColor: "#DDD",
    borderWidth: 1,
    flex: 1,
    marginHorizontal: 5,
  },
  infoText: { fontSize: 16, fontWeight: "bold", color: "#8A4A9D" },
  infoSubText: { fontSize: 12, color: "#666" },
  relatedProductsContainer: { marginTop: 20 },
  relatedProductCard: {
    backgroundColor: "#FFF",
    marginRight: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    borderColor: "#DDD",
    borderWidth: 1,
    width: 120,
  },
  relatedProductImage: {
    width: 80,
    height: 80,
    backgroundColor: "#EEE",
    borderRadius: 10,
    marginBottom: 5,
  },
  relatedProductName: { fontSize: 14, color: "#8A4A9D", textAlign: "center" },
  relatedProductPrice: { fontSize: 14, fontWeight: "bold", color: "#E87EB7" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cartButton: {
    backgroundColor: "#8A4A9D",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginRight: 10,
  },
  cartMessageContainer: {
    marginTop: 20,
    backgroundColor: "#8A4A9D",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  cartMessage: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProductDetailScreen;
