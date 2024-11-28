import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Alert, TouchableOpacity } from "react-native";
import { auth, db } from "../config/firebase"; 
import { collection, query, where, getDocs } from "firebase/firestore";
import Icon from "react-native-vector-icons/Ionicons"; 
import { Ionicons } from "@expo/vector-icons";
const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState(""); 
  const [orders, setOrders] = useState([]); 
  const [loading, setLoading] = useState(true);  

  const fetchUserName = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    console.log("Usuário autenticado:", user.uid); // Log do UID do usuário

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      console.log("Consulta de usuários:", querySnapshot.docs.length); 

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        console.log("Dados do usuário:", userData); 
        setUserName(userData.name || "Usuário");
      } else {
        console.log("Usuário não encontrado na base de dados.");
        setUserName("Mariana"); // Defina um valor padrão se o usuário não for encontrado
      }
      setLoading(false);  // Atualiza o estado de carregamento quando os dados forem carregados
    } catch (error) {
      console.error("Erro ao buscar nome do usuário:", error);
      setLoading(false);  
    }
  };

  const fetchOrders = async () => {
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Erro", "Usuário não autenticado.");
      return;
    }

    try {
      const ordersRef = collection(db, "orders");
      const q = query(ordersRef, where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const fetchedOrders = [];
      querySnapshot.forEach((doc) => {
        fetchedOrders.push({ id: doc.id, ...doc.data() });
      });

      setOrders(fetchedOrders);
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  useEffect(() => {
    fetchUserName();
    fetchOrders();
  }, []);

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderTitle}>Pedido #{item.id}</Text>
      <Text style={styles.orderText}>Total: R$ {item.total.toFixed(2)}</Text>
      <Text style={styles.orderText}>Data: {item.date?.toDate().toLocaleString() || "Indisponível"}</Text>
      <Text style={styles.orderText}>Frete: R$ {item.shippingCost.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header com informações do usuário */}
      <View style={styles.header}>
        <Icon name="person-circle" size={80} color="#8A4A9D" />
        <Text style={styles.userName}>{loading ? "Carregando..." : userName}</Text>  {/* Exibe 'Carregando...' enquanto estiver carregando */}
        <Text style={styles.userEmail}>{auth.currentUser?.email}</Text>
      </View>

      {/* Histórico de pedidos */}
      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Últimos Pedidos</Text>
        {orders.length === 0 ? (
          <Text style={styles.noOrders}>Você ainda não fez nenhum pedido.</Text>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.ordersList}
          />
        )}
      </View>

       {/* Barra de navegação inferior */}
       <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate("Main")}>
          <Icon name="home-outline" size={30} color="#8A4A9D" />
        </TouchableOpacity>
      

        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Ionicons name="exit-outline" size={28} color="#800080" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  header: {
    backgroundColor: "#8A4A9D",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 20, 
  },
  userEmail: {
    fontSize: 16,
    color: "#E3DFF5",
    marginTop: 5, 
  },
  ordersSection: {
    flex: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#8A4A9D",
    marginBottom: 10,
  },
  noOrders: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
  },
  ordersList: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8A4A9D",
    marginBottom: 5,
  },
  orderText: {
    fontSize: 16,
    color: "#555",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});

export default ProfileScreen;
