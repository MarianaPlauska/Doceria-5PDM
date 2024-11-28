import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Para o ícone de porta
import { FontAwesome } from "@expo/vector-icons"; // Para o ícone de estrela

const screenWidth = Dimensions.get("window").width;

// Dados fictícios
const fakeSalesData = [75, 45, 80, 60, 200]; // Vendas por dia
const orders = [
  { id: 1, total: 50, status: "Concluído" },
  { id: 2, total: 12, status: "Em andamento" },
  { id: 3, total: 75, status: "Concluído" },
];
const totalSales = fakeSalesData.reduce((acc, curr) => acc + curr, 0);

// Produtos mais vendidos (dados fictícios)
const topProducts = [
  { id: 1, name: "Brownie Especial", sales: 180 },
  { id: 2, name: "Trufa Gourmet", sales: 150 },
  { id: 3, name: "Pão de Mel", sales: 100 },
];

// Avaliações fictícias com nota de entrega e produto
const reviews = [
  { id: 1, customer: "Marilena", productComment: "Amei!Beijos meninas", deliveryComment: "Entrega rápida e eficiente.", productRating: 5, deliveryRating: 5 },
  { id: 2, customer: "Mariana", productComment: "Amo as donas, amo meu amor.", deliveryComment: "Foi tudo perfeito!", productRating: 5, deliveryRating: 5 },
  { id: 3, customer: "Lucas", productComment: "Os preços são ótimos, recomendo.", deliveryComment: "Entrega no tempo certo.", productRating: 4, deliveryRating: 4 },
  { id: 3, customer: "Ana", productComment: "É bom.", deliveryComment: "Demorou muito", productRating: 4, deliveryRating: 3 },
];

// Controle de Estoque Fictício
const inventory = [
  { id: 1, product: "Brownie Especial", stock: 20 },
  { id: 2, product: "Trufa Gourmet", stock: 35 },
  { id: 3, product: "Pão de Mel", stock: 15 },
];

const AdminDashboard = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header com Bem-vinda e Sair */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Bem-vinda, Marianna</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Home")} style={styles.logoutButton}>
    <Ionicons name="exit-outline" size={28} color="#800080" />
  </TouchableOpacity>
      </View>

      {/* Resumo */}
      <View style={styles.summary}>
        <Text style={styles.summaryText}>Resumo de Vendas</Text>
        <Text style={styles.totalSales}>Total de Vendas: R$ {totalSales}</Text>
        <Text style={styles.ordersCount}>Total de Pedidos: {orders.length}</Text>
      </View>

      {/* Gráfico Fictício */}
      <Text style={styles.chartTitle}>Gráfico de Vendas (Semana)</Text>
      <BarChart
        data={{
          labels: ["Seg", "Ter", "Qua", "Qui", "Sex"],
          datasets: [
            {
              data: fakeSalesData,
            },
          ],
        }}
        width={screenWidth - 40}
        height={200}
        yAxisLabel="R$"
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f2e4ff",
          backgroundGradientTo: "#e5ccff",
          color: (opacity = 1) => `rgba(128, 0, 128, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          barPercentage: 0.5,
        }}
        style={styles.chart}
      />

      {/* Produtos mais vendidos */}
      <Text style={styles.sectionTitle}>Produtos Mais Vendidos</Text>
      <FlatList
        data={topProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Text>{item.name} - {item.sales} unidades</Text>
          </View>
        )}
      />


      {/* Controle de Estoque */}
      <Text style={styles.sectionTitle}>Estoque Atual</Text>
      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <View style={styles.inventoryItem}>
            <Text>{item.product}: {item.stock} unidades</Text>
              
          </View>
        )}
      />

       {/* Avaliações dos clientes */}
       <Text style={styles.sectionTitle}>Avaliações dos Clientes</Text>
              <FlatList
                data={reviews}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.reviewItem}>
                    <Text>
                      <Text style={styles.bold}>{item.customer}:</Text> 
                      {` "${item.productComment}"`}
                    </Text>
                    <View style={styles.ratings}>
                      <Text>Produto: </Text>
                      {[...Array(item.productRating)].map((_, index) => (
                        <FontAwesome key={index} name="star" size={16} color="#FFD700" />
                      ))}
                      {[...Array(5 - item.productRating)].map((_, index) => (
                        <FontAwesome key={index + 5} name="star-o" size={16} color="#FFD700" />
                      ))}
                    </View>
                    <Text>{`Entrega: "${item.deliveryComment}"`}</Text>
                    <View style={styles.ratings}>
                      <Text>Entrega: </Text>
                      {[...Array(item.deliveryRating)].map((_, index) => (
                        <FontAwesome key={index} name="star" size={16} color="#FFD700" />
                      ))}
                      {[...Array(5 - item.deliveryRating)].map((_, index) => (
                        <FontAwesome key={index + 5} name="star-o" size={16} color="#FFD700" />
                      ))}
                    </View>
                  </View>
                )}
              />
    </ScrollView>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  welcome: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#800080",
  },
  logoutButton: {
    marginLeft: 20,
  },
  summary: {
    backgroundColor: "#fce4ff",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#800080",
  },
  totalSales: {
    fontSize: 16,
    color: "#000",
  },
  ordersCount: {
    fontSize: 16,
    color: "#000",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#800080",
    marginBottom: 10,
  },
  chart: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#800080",
    marginTop: 20,
    marginBottom: 10,
  },
  productItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  reviewItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  ratings: {
    flexDirection: "row",
    alignItems: "center",
  },
  inventoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  bold: {
    fontWeight: "bold",
  },
});

export default AdminDashboard;
