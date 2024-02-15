import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, StyleSheet, TextInput, Button, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import UserService from '../services/UserService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null, // Les informations de l'utilisateur
      // Vous pouvez ajouter d'autres états pour chaque champ du formulaire
      firstName: '',
      lastName: '',
      email: '',
      updateMessage: '',
    };
  }

  componentDidMount() {
    this.fetchUserData();
    this.props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('MyAccount')}
          style={{ marginRight: 10 }} // Ajouter une marge à droite
        >
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#AA5042', // Changer la couleur de l'en-tête
      },
      headerTintColor: '#fff', // Changer la couleur du texte et des icônes de l'en-tête
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }

  fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.id; // Assurez-vous que le token contient un champ 'id'

        const userData = await UserService.getUserById(userId);
        if (userData) {
          this.setState({
            user: userData,
            firstName: userData.first_name,
            lastName: userData.last_name,
            email: userData.email,
          });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
    }
  }

  handleUpdate = async () => {
    const { user, firstName, lastName, email } = this.state;
    if (user) {
      const updatedData = { first_name: firstName, last_name: lastName, email };
      try {
        const response = await UserService.updateUser(user.id, updatedData);
        if (response) {
          this.setState({ updateMessage: 'Mise à jour réussie!' });
        } else {
          this.setState({ updateMessage: 'Échec de la mise à jour.' });
        }
      } catch (error) {
        this.setState({ updateMessage: 'Erreur lors de la mise à jour.' });
      }
    }
  }

  render() {
    const { firstName, lastName, email, updateMessage } = this.state;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <Text>Modifier mes informations</Text>
        <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={(text) => this.setState({ firstName: text })}
          placeholder="Prénom"
        />
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={(text) => this.setState({ lastName: text })}
          placeholder="Nom de famille"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => this.setState({ email: text })}
          placeholder="Email"
          keyboardType="email-address"
        />
        </View>
        <Text style={styles.updateMessage}>{this.state.updateMessage}</Text>
        <TouchableOpacity onPress={this.handleUpdate} style={styles.button}>
          <Text style={styles.buttonText}>Mettre à jour</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  formContainer: {
    backgroundColor: 'rgba(216, 189, 138, 0.2)', // Remplacez ceci par la couleur de votre choix
    padding: 20,
    borderRadius: 10,
    width: '100%', // ou une largeur spécifique si nécessaire
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#753742',
    marginTop:10,
    padding: 10,
    borderRadius: 5,
    width: '100%', // Vous pouvez ajuster la largeur selon vos besoins
    alignItems: 'center', // Centre le texte dans le bouton
  },
  buttonText: {
    color: '#fff', // Couleur du texte du bouton
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateMessage: {
    color: 'green', // Ou rouge pour les erreurs, selon le message
    marginTop: 10,
    marginBottom: 10,
  },
});