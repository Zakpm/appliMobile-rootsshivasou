import React, { Component } from 'react';
import { KeyboardAvoidingView, Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { fetchUsers } from '../reducers/userAction';
import { fetchPosts } from '../reducers/postAction';
import { fetchContacts } from '../reducers/contactAction';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



class AdminScreen extends Component {
  
  componentDidMount() {
    // Dispatcher les actions pour charger les données
    this.props.fetchUsers();
    this.props.fetchPosts();
    this.props.fetchContacts();

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
  

  render() {
    const { userCount, postCount, contactCount } = this.props;

    return (
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nombre d'utilisateurs</Text>
          <Text style={styles.cardContent}>{userCount}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nombre de posts</Text>
          <Text style={styles.cardContent}>{postCount}</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Nombre de contacts</Text>
          <Text style={styles.cardContent}>{contactCount}</Text>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userCount: state.users.users ? state.users.users.length : 0, 
    postCount: state.posts.posts ? state.posts.posts.length : 0, 
    contactCount: state.contacts.contacts ? state.contacts.contacts.length : 0, 
  };
};

// Ajoutez mapDispatchToProps
const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(fetchUsers()),
  fetchPosts: () => dispatch(fetchPosts()),
  fetchContacts: () => dispatch(fetchContacts())
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#753742',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '80%',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 18,
  },
});



