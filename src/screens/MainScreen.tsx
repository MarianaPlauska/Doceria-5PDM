import React, { useEffect, useState } from "react";
import { db } from "../config/firebase"; 
import { collection, getDocs } from "firebase/firestore";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "../navigation/AppNavigator"; 
import { useCart } from './CartContext';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Ionicons } from "@expo/vector-icons";

type NavigationProps = NavigationProp<RootStackParamList, 'ProductDetail'>;

export default function MainScreen() {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [selectedCategory, setSelectedCategory] = useState("Todos"); 
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); 
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const { getTotalItems } = useCart(); 

   // Função para atualizar o carrinho 
   const addToCart = () => {
    setCartCount((prevCount) => prevCount + 1); // Incrementa o contador de itens no carrinho
  };

  const imageMap = {
    "doceprincip.png": require("../../assets/doceprincip.png"),
    "doce4.png": require("../../assets/doce4.png"),
    "doce1.png": require("../../assets/doce1.png"),
    "doce3.png": require("../../assets/doce3.png"),
    "doce2.png": require("../../assets/doce2.png"),
    "doce10.png": require("../../assets/doce10.png"),
    "doce8.png": require("../../assets/doce8.png"),
    "doce7.png": require("../../assets/doce7.png"),
    "doce9.png": require("../../assets/doce9.png"),
    "doce11.png": require("../../assets/doce11.png"),
   
  };

  // Função para buscar produtos do Firestore
  const fetchProductsFirestore = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "produtos"));
      const data = querySnapshot.docs.map((doc) => {
        const product = doc.data();
        return {
          id: doc.id,
          ...product,
          preco: product.preco ?? product.valor ?? 0, // Usa `preco` ou fallback para `valor`
        };
      });
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar produtos do Firestore:", error);
      setLoading(false);
    }
  };
  

  // useEffect para buscar os dados
  useEffect(() => {
    fetchProductsFirestore(); // Use o Firestore para buscar os dados
  }, []);

  // Filtrar produtos pela categoria selecionada
   const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "Todos" || product.categoria === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.descricao.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Função para selecionar a categoria
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho com título e ícone, fixo na parte superior */}
      <View style={styles.header}>
        <Text style={styles.title}>Doceria das Gêmeas</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Icon name="person-circle" size={30} color="#8A4A9D" />
        </TouchableOpacity>

      </View>

      {/* Barra de pesquisa */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.searchBarContainer}>
          <View style={styles.searchBar}>
            <TextInput
              placeholder="Bateu fome de qual docinho?..."
              placeholderTextColor="#999"
              style={styles.searchInput}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Icon name="search" size={20} color="#999" style={styles.searchIcon} />
          </View>
        </View>

      {/* Categorias */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
          <TouchableOpacity 
            style={selectedCategory === "Todos" ? styles.categoryButtonSelected : styles.categoryButton} 
            onPress={() => handleCategorySelect("Todos")}
          >
            <Text style={selectedCategory === "Todos" ? styles.categoryTextSelected : styles.categoryText}>Todos</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={selectedCategory === "Brownie" ? styles.categoryButtonSelected : styles.categoryButton} 
            onPress={() => handleCategorySelect("Brownie")}
          >
            <Text style={selectedCategory === "Brownie" ? styles.categoryTextSelected : styles.categoryText}>Brownie</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={selectedCategory === "Especial" ? styles.categoryButtonSelected : styles.categoryButton} 
            onPress={() => handleCategorySelect("Especial")}
          >
            <Text style={selectedCategory === "Especial" ? styles.categoryTextSelected : styles.categoryText}>Especial de Natal</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={selectedCategory === "Palha" ? styles.categoryButtonSelected : styles.categoryButton} 
            onPress={() => handleCategorySelect("Palha")}
          >
            <Text style={selectedCategory === "Palha" ? styles.categoryTextSelected : styles.categoryText}>Palha</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={selectedCategory === "Cone" ? styles.categoryButtonSelected : styles.categoryButton} 
            onPress={() => handleCategorySelect("Cone")}
          >
            <Text style={selectedCategory === "Cone" ? styles.categoryTextSelected : styles.categoryText}>Cone</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={selectedCategory === "Bolo de pote" ? styles.categoryButtonSelected : styles.categoryButton} 
            onPress={() => handleCategorySelect("Bolo de pote")}
          >
            <Text style={selectedCategory === "Bolo de pote" ? styles.categoryTextSelected : styles.categoryText}>Bolo de Pote</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={selectedCategory === "Pao de mel" ? styles.categoryButtonSelected : styles.categoryButton} 
            onPress={() => handleCategorySelect("Pao de mel")}
          >
            <Text style={selectedCategory === "Pao de mel" ? styles.categoryTextSelected : styles.categoryText}>Pão de mel</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={selectedCategory === "Trufa" ? styles.categoryButtonSelected : styles.categoryButton} 
            onPress={() => handleCategorySelect("Trufa")}
          >
            <Text style={selectedCategory === "Trufa" ? styles.categoryTextSelected : styles.categoryText}>Trufa</Text>
          </TouchableOpacity>

        </ScrollView>

     
        {/* Promoção  */}
        {selectedCategory === "Todos" && searchQuery.trim() === "" && (
          <View style={styles.promotionContainer}>
            <Image
              source={require("../../assets/doceprincip.png")}
              style={styles.promotionImage}
            />
            <View style={styles.promotionTextContainer}>
              <Text style={styles.promotionTitle}>Brownie de Brigadeiro</Text>
              <Text style={styles.promotionDescription}>Pague 3 e leve 4</Text>
              
            </View>
          </View>
        )}


        {/* Título de Produtos */}
        <Text style={styles.sectionTitle}>Produtos</Text>
        {/* Exibe o indicador de carregamento enquanto os produtos estão sendo carregados */}
        {loading ? (
          <ActivityIndicator size="large" color="#8A4A9D" />
        ) : filteredProducts.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#999', marginVertical: 20 }}>
            Nenhum produto encontrado.
          </Text>
        ) : (
          <View style={styles.productContainer}>
            {/* Renderiza os produtos filtrados pela categoria */}
            {filteredProducts.map((product) => (
          <TouchableOpacity
            key={product.id}
            onPress={() =>
              navigation.navigate("ProductDetail", {
                product: { ...product, resolvedImage: imageMap[product.image] }
              })
            }
        style={styles.productCard}
              >
                <Image source={imageMap[product.image]} style={styles.productImage} />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productDescription}>{product.descricao}</Text>
                <Text style={styles.productPrice}>
              {product.preco ? `R$ ${parseFloat(product.preco).toFixed(2)}` : "Preço indisponível"}
            </Text>

          </TouchableOpacity>
        ))}
          </View>
        )}
      </ScrollView>

      {/* Barra de navegação inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Icon name="home-outline" size={30} color="#8A4A9D" />
        </TouchableOpacity>
      
        <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
          <View style={styles.cartIconContainer}>
            <Icon name="cart-outline" size={30} color="#8A4A9D" />
            {getTotalItems() > 0 && ( // Mostra o badge se houver itens no carrinho
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{getTotalItems()}</Text>
              </View>
            )}
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="exit-outline" size={28} color="#800080" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFE6F3",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFE6F3",
    height: 80,
    zIndex: 20,
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#8A4A9D",
  },
  scrollContent: {
    paddingBottom: 60, 
  },
  searchBarContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    height: 40,
    paddingHorizontal: 15,
    borderColor: "#CCCCCC",
    borderWidth: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 10,
  },
  categoryContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: "#F2E8F7",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    height: 40,
  },
  categoryButtonSelected: {
    backgroundColor: "#8A4A9D",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    height: 40,
  },
  categoryText: {
    color: "#8A4A9D",
    fontWeight: "bold",
  },
  categoryTextSelected: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  promotionContainer: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    flexDirection: "row",
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    marginHorizontal: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  promotionImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  promotionTextContainer: {
    marginLeft: 15,
    flex: 1,
  },
  promotionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8A4A9D",
    marginBottom: 5,
  },
  promotionDescription: {
    fontSize: 14,
    color: "#999",
    marginVertical: 5,
  },
  promoButton: {
    backgroundColor: "#8A4A9D",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  promoButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8A4A9D",
    marginBottom: 10,
    marginHorizontal: 20,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  productCard: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    width: "48%",
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 20,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#8A4A9D",
  },
  productDescription: {
    fontSize: 14,
    color: "#999",
    marginVertical: 5,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#E87EB7",
  },
  addToCartButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#8A4A9D",
    borderRadius: 20,
  },
  addToCartText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cartIconContainer: {
    position: "relative",
  },
  cartBadge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: "#FFFFFF",
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});