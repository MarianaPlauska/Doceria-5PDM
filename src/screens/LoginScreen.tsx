import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar senha

  const handleLogin = async () => {
    try {
      // Verifica se é o login do administrador
      if (email === "admin@loja.com" && password === "senhaadmin") {
        Alert.alert("Bem-vindo, administrador!");
        navigation.navigate("Admin"); // Redireciona para a área do administrador
      } else {
        // Caso contrário, realiza o login padrão
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("Login realizado com sucesso!");
        navigation.navigate("Main"); // Redireciona para a main (usuário padrão)
      }
    } catch (error) {
      // Exibe mensagem de erro em caso de falha no login
      Alert.alert("Erro ao fazer login:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Campo de Email */}
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

      {/* Campo de Senha */}
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.link}>Não possui uma conta? Crie aqui</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => Alert.alert("Login com Google em desenvolvimento!")}
      >
        <Text style={styles.googleButton}>Continuar com Google</Text>
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
    marginBottom: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  googleButton: {
    color: "#4285F4",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
  },
  link: {
    color: "#A066D4",
    fontSize: 14,
    marginTop: 15,
    textDecorationLine: "underline",
  },
});
