import  AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";

const API_URL = 'http://192.168.1.101:9982/auth/login';

async function login(username, password) {
    try {
      console.log('Tentative de connexion...');
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login: username, password }),
      });
      

      console.log('Statut de la réponse: ', response.status); // Log du statut de la réponse
      const responseText = await response.text();
      console.log('Réponse reçue: ', responseText); // Imprime la réponse brute

      if (response.ok && responseText) {
        const data = JSON.parse(responseText);
        if (data.jwt) {
          await AsyncStorage.setItem('userToken', data.jwt);

          // Décoder le JWT pour extraire les rôles
        const decodedToken = jwtDecode(data.jwt);
        const roles = decodedToken.roles; // Assurez-vous que le token contient un champ 'roles'

        console.log("Roles extraits du token JWT: ", roles);

        // Vous pouvez maintenant retourner les rôles avec la réponse
        return { success: true, roles: roles };
        }
      }
      return { success: false, message: 'Identifiants invalides' };
    } catch (error) {
      console.error("Erreur lors de la connexion: ", error);
      return { success: false, message: 'Erreur de connexion' };
    }
}

  export { login };
  