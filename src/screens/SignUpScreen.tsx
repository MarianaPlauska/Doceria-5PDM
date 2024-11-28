import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { auth, db } from "../config/firebase"; 
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import Icon from "react-native-vector-icons/FontAwesome";

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Erro", "Todos os campos são obrigatórios!");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      Alert.alert("Erro", "Por favor, insira um email válido!");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    setIsLoading(true);

    try {
      // Cria a conta no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Salva o nome no Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        createdAt: new Date(),
      });

      Alert.alert("Conta criada com sucesso!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Erro ao criar conta", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Conta</Text>

      {/* Nome */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Digite seu nome"
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor="#999"
        />
      </View>

      {/* Email */}
      <View style={styles.inputContainer}>
        <Icon name="envelope" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          placeholderTextColor="#999"
        />
      </View>

      {/* Senha */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={!showPassword} // Alterna entre mostrar/ocultar senha
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.passwordIcon}
        >
          <Icon
            name={showPassword ? "eye-slash" : "eye"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* Confirmação de Senha */}
      <View style={styles.inputContainer}>
        <Icon name="lock" size={20} color="#999" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          secureTextEntry={!showConfirmPassword} // Alterna entre mostrar/ocultar senha
          placeholderTextColor="#999"
        />
        <TouchableOpacity
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          style={styles.passwordIcon}
        >
          <Icon
            name={showConfirmPassword ? "eye-slash" : "eye"}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Criando..." : "Criar Conta"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>Já possui uma conta? Entre aqui</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFE6F2",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#E87EB7",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    marginBottom: 15,
    backgroundColor: "#FFF",
  },
  icon: {
    marginRight: 10,
  },
  passwordIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#A066D4",
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 30,
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  link: {
    color: "#A066D4",
    fontSize: 14,
    marginTop: 15,
    textDecorationLine: "underline",
  },
});
