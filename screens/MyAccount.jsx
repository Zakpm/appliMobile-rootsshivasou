import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import UserService from '../services/UserService';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default class MyAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
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
            <FontAwesome name="user" size={25} color="black" />
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
          this.setState({ user: userData });
        }
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'utilisateur:", error);
    }
  }

  render() {
    const { user } = this.state;

    if (!user) {
      return <Text>Chargement...</Text>;
    }

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Mon Compte</Text>
        {/* Affichez ici les détails de l'utilisateur */}
        <Text>Prenom : {user.last_name}</Text>
        <Text>Nom : {user.first_name}</Text>
        <Text>Email : {user.email}</Text>
        {/* Autres informations de l'utilisateur */}
        {/* Bouton pour modifier les informations */}
        <TouchableOpacity
        style={styles.button}
        onPress={() => this.props.navigation.navigate('UserScreen')}
        >
        <Text style={styles.buttonText}>Modifier mes informations</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#AA5042',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
