import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo.png')} 
      />
      <Text style={styles.slogan}>FELICIDADE EM FORMA DE DOCE</Text>
      <Text style={styles.welcome}>Bem vindo!</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Vamos começar</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fce8ed',
    padding: 20,
  },
  logo: {
    width: 350,
    height: 250,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  slogan: {
    fontSize: 16,
    color: '#E87EB7',
    marginBottom: 50,
    textAlign: 'center',
    fontWeight: '500',
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#A066D4',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  link: {
    color: '#A066D4',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline', 
  },
});
