import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  ScrollView 
} from "react-native";
import { auth, db } from "../config/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import Clipboard from "react-native-clipboard"; 

const CheckoutScreen = ({ navigation, route }) => {
  const { cartItems, total = 0 } = route.params;
  const shippingCost = 8.0;
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [validCard, setValidCard] = useState(false);

  const validTotal = !isNaN(Number(total)) ? Number(total) : 0;
  const totalWithShipping = (validTotal + shippingCost).toFixed(2);

  const randomPixKey = "12345678900@pix.com"; 

  const validateCardNumber = () => {
    if (cardNumber.length !== 16) {
      Alert.alert("Erro", "Número do cartão inválido. Insira 16 dígitos.");
      return false;
    }
    return true;
  };

  const validateExpiryDate = () => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/; // Verifica o formato MM/AA
    if (!regex.test(expiryDate)) {
      Alert.alert("Erro", "Data de validade inválida. Use o formato MM/AA.");
      return false;
    }
    return true;
  };

  const validateCvv = () => {
    if (cvv.length !== 3) {
      Alert.alert("Erro", "CVV inválido. Insira 3 dígitos.");
      return false;
    }
    return true;
  };

  const validateCardHolder = () => {
    if (cardHolder.trim().length === 0) {
      Alert.alert("Erro", "Nome do titular é obrigatório.");
      return false;
    }
    return true;
  };

  const handleExpiryDateChange = (text) => {
    let formattedText = text.replace(/\D/g, ""); // Remove qualquer caractere não numérico
    if (formattedText.length > 2) {
      formattedText = formattedText.substring(0, 2) + "/" + formattedText.substring(2, 4);
    }
    setExpiryDate(formattedText);
  };
  

  const handleFinalizePurchase = async () => {
    if (!selectedPayment) {
      Alert.alert("Atenção", "Por favor, selecione uma forma de pagamento.");
      return;
    }

    if (selectedPayment === "creditCard") {
      if (!validateCardNumber() || !validateExpiryDate() || !validateCvv() || !validateCardHolder()) {
        return;
      }
      setValidCard(true);
    }

    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("Erro", "Usuário não autenticado.");
        return;
      }

      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        items: cartItems,
        total: parseFloat(totalWithShipping),
        shippingCost: shippingCost,
        paymentMethod: selectedPayment,
        date: serverTimestamp(),
      });

      Alert.alert("Sucesso", "Compra finalizada com sucesso!");
      navigation.navigate("Main");
    } catch (error) {
      console.error("Erro ao salvar pedido:", error);
      Alert.alert("Erro", "Não foi possível finalizar a compra.");
    }
  };

  const handleCopyPix = () => {
    Clipboard.setString(randomPixKey);
    Alert.alert("Pix Copiado", "Chave Pix copiada com sucesso!");
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.cartItemImage} />
      <View style={styles.cartItemDetails}>
        <Text style={styles.cartItemName}>{item.name}</Text>
        <Text style={styles.cartItemPrice}>R$ {item.preco.toFixed(2)}</Text>
        <Text style={styles.cartItemQuantity}>Quantidade: {item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Finalizar Compra</Text>

        <View style={styles.cartSummary}>
          <Text style={styles.sectionTitle}>Resumo do Carrinho:</Text>
          <FlatList
            data={cartItems}
            renderItem={renderCartItem}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.summary}>
          <Text style={styles.summaryText}>Subtotal: R$ {validTotal.toFixed(2)}</Text>
          <Text style={styles.summaryText}>Frete: R$ {shippingCost.toFixed(2)}</Text>
          <Text style={styles.summaryTextTotal}>Total: R$ {totalWithShipping}</Text>
        </View>

        <Text style={styles.sectionTitle}>Selecione a Forma de Pagamento:</Text>
        <TouchableOpacity
          style={[styles.paymentOption, selectedPayment === "pix" && styles.selectedOption]}
          onPress={() => setSelectedPayment("pix")}
        >
          <Text style={styles.paymentText}>Pix</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentOption, selectedPayment === "creditCard" && styles.selectedOption]}
          onPress={() => setSelectedPayment("creditCard")}
        >
          <Text style={styles.paymentText}>Cartão de Crédito</Text>
        </TouchableOpacity>

        {selectedPayment === "pix" && (
          <View style={styles.pixInfoContainer}>
            <Text style={styles.pixText}>Chave Pix: {randomPixKey}</Text>
            <TouchableOpacity onPress={handleCopyPix} style={styles.copyButton}>
              <Text style={styles.copyButtonText}>Copiar</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedPayment === "creditCard" && (
          <View style={styles.cardInputContainer}>
            <Text style={styles.inputLabel}>Número do Cartão:</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite 16 dígitos do cartão"
              keyboardType="numeric"
              value={cardNumber}
              onChangeText={setCardNumber}
              maxLength={16}
            />
            <Text style={styles.inputLabel}>Data de Validade (MM/AA):</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/AA"
              keyboardType="numeric"
              value={expiryDate}
              onChangeText={handleExpiryDateChange}
              maxLength={5}
            />

            <Text style={styles.inputLabel}>CVV:</Text>
            <TextInput
              style={styles.input}
              placeholder="CVV"
              keyboardType="numeric"
              value={cvv}
              onChangeText={setCvv}
              maxLength={3}
            />
            <Text style={styles.inputLabel}>Nome do Titular:</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do titular"
              value={cardHolder}
              onChangeText={setCardHolder}
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.finalizeButton}
          onPress={handleFinalizePurchase}
        >
          <Text style={styles.finalizeButtonText}>Finalizar Compra</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F9",
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4A4E69",
    textAlign: "center",
    marginBottom: 20,
  },
  cartSummary: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  cartItemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  cartItemDetails: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4A4E69",
  },
  cartItemPrice: {
    fontSize: 14,
    color: "#8A4A9D",
    marginTop: 4,
  },
  cartItemQuantity: {
    fontSize: 14,
    color: "#555",
  },
  summary: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryText: {
    fontSize: 16,
    color: "#4A4E69",
    marginBottom: 5,
  },
  summaryTextTotal: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D81B60",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4A4E69",
    marginBottom: 15,
  },
  paymentOption: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedOption: {
    borderWidth: 2,
    borderColor: "#8A4A9D",
  },
  paymentText: {
    fontSize: 16,
    fontWeight: "400",
    color: "#4A4E69",
  },
  pixInfoContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#F1F1F1",
    borderRadius: 8,
  },
  pixText: {
    fontSize: 16,
    color: "#4A4E69",
    marginBottom: 10,
  },
  copyButton: {
    backgroundColor: "#8A4A9D",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  copyButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  cardInputContainer: {
    marginTop: 20,
  },
  inputLabel: {
    fontSize: 12,
    color: "#4A4E69",
    marginBottom: 3,
  },
  input: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#D1D1D1",
    fontSize: 14,
  },
  finalizeButton: {
    backgroundColor: "#8A4A9D",
    paddingVertical: 15,
    borderRadius: 16,
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  finalizeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
});


export default CheckoutScreen;
