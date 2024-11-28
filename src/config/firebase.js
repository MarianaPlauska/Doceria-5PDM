// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from 'firebase/analytics';
import { get, getDatabase } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUH7ePKB8av09PMUlR3LJwW3_5SECRzFw",
  authDomain: "doceria-das-gemeas.firebaseapp.com",
  projectId: "doceria-das-gemeas",
  storageBucket: "doceria-das-gemeas.firebasestorage.app",
  messagingSenderId: "504252679400",
  appId: "1:504252679400:web:740c8ad143221b231cf55d",
  measurementId: "G-RNTJG6VJWQ"
};
// Inicializa o Firebase
// let app = initializeApp(firebaseConfig);
// let app;

// try {
//    app = initializeApp(firebaseConfig);
//   console.log("Firebase initialized successfully");
// } catch (error) {
//   console.error("Error initializing Firebase:", error);
// }
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
// const database = getDatabase(app);

export { auth, db };
// Função para buscar os produtos
// export async function fetchProdutos() {
//   const produtosRef = collection(db, "produtos");
//   const snapshot = await getDocs(produtosRef);
//   const produtos = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   return produtos;
// }

// if (isSupported()) {
//   const analytics = getAnalytics(app);
// }

// // Configurar persistência de autenticação
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage),
// });

// // Função para adicionar produtos
// const addProduto = async (produto) => {
//   try {
//     const docRef = await addDoc(collection(db, "produtos"), produto);
//     console.log("Produto adicionado com ID: ", docRef.id);
//   } catch (e) {
//     console.error("Erro ao adicionar produto: ", e);
//   }
// };

// // Função para obter todos os produtos do Firestore
// const getProdutos = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "produtos"));
//     const produtos = querySnapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data(),
//     }));
//     return produtos;
//   } catch (e) {
//     console.error("Erro ao buscar produtos: ", e);
//   }
// };


// const produtos = [
//   { nome: "Brownie de Chocolate Promoção", categoria: "Brownie especial ", preco: 12.00, imagem: require( "../../assets/doceprincip.png") },
//   { nome: "Brownie de Chocolate", categoria: "Brownie", preco: 4.00, imagem: require( "../../assets/doce1.png") },
//   { nome: "Bolo de pote", categoria: "Bolo de pote", preco: 6.00, imagem: require("../../assets/doce2.png" )},
//   { nome: "Pão de mel tradicional", categoria: "Pão de mel", preco: 3.50, imagem: require( "../../assets/doce3.jpg") },
//   { nome: "Trufa tradicional", categoria: "Trufa", preco: 2.50, imagem: require("../../assets/doce4.png") },
//   { nome: "Cone de chocolate", categoria: "Cone recheado", preco: 6.00, imagem: require( "../../assets/doce5.jpg") },
//   { nome: "Brownie de nutella", categoria: "Brownie", preco: 4.50, imagem: require("../../assets/doce6.png") },
//   { nome: "Palha tradicional", categoria: "Palha", preco: 4.00, imagem: require( "../../assets/doceprincip.png") },
//   { nome: "Especial de Natal", categoria: "Especial", preco: 4.00, imagem: require("../../assets/doceprincip.png") },
// ];

// produtos.forEach(produto => addProduto(produto));

// // Exportando funções para serem usadas no React
// export { getProdutos };
