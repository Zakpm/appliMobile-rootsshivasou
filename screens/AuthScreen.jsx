import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Button, StyleSheet, Image, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { loginUser } from '../reducers/user'; // Importez l'action d'authentification
import { login } from '../services/AuthServices';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default function AuthScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    const response = await login(username, password);
    if (response.success) {
        dispatch(loginUser({ roles: response.roles })); // Dispatcher l'action loginUser avec les rôles
        navigation.navigate('TabNavigator')
    } else {
        // Gérer l'échec de la connexion
    }
};

  return (
    <View style={styles.container}>
        <Image
        source={require('../assets/Logo-couleur.png')} // Remplacez 'logo.png' par le nom de votre fichier logo
        style={styles.logo}
        />
        <View style={styles.loginContainer}>
        <TextInput
            placeholder="Pseudo/mail"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
        />
        <View style={styles.passwordContainer}>
            <TextInput
            placeholder="mot de passe"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            style={styles.passwordInput}
            />
            <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
            >
            <FontAwesome name={passwordVisible ? 'eye' : 'eye-slash'} size={20} color="grey" />
            </TouchableOpacity>
        </View>
        <TouchableOpacity 
                    style={styles.button} 
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>connexion</Text>
                </TouchableOpacity>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#AA5042',
  },
  loginContainer: {
    backgroundColor: 'rgba(216, 189, 138, 0.9)',
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  passwordInput: {
    flex: 1,
    paddingRight: 30, // Ajustez si nécessaire pour le positionnement de l'icône
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
  },
  logo: {
    width: 300, // Ajustez la largeur selon vos besoins
    height: 300, // Ajustez la hauteur selon vos besoins
    alignSelf: 'center', // Centre le logo dans le conteneur
  },
  button: {
    backgroundColor: '#753742',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

