import AsyncStorage from '@react-native-async-storage/async-storage';

class UserService {
    // URL de base de l'API
    apiUrl = "http://192.168.1.101:9981";

    async getAuthHeaders() {
        const token = await AsyncStorage.getItem('userToken');
        return {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        };
    }

    // Obtenir tous les utilisateurs
    async getAllUsers() {
        try {
            const headers = await this.getAuthHeaders();
            const response = await fetch(`${this.apiUrl}/users`, { headers });
            if (!response.ok) throw new Error('Erreur réseau');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
        }
    }

    // Obtenir un utilisateur par ID
    async getUserById(userId) {
        try {
            const headers = await this.getAuthHeaders();
            const response = await fetch(`${this.apiUrl}/user/${userId}`, {headers});
            if (!response.ok) throw new Error('Erreur réseau');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération de l'utilisateur:", error);
        }
    }

    // Créer un nouvel utilisateur
    async updateUser(userId, userData) {
        console.log('Mise à jour de l’utilisateur avec les données suivantes:', userData);
    
        try {
            const headers = await this.getAuthHeaders();
            const response = await fetch(`${this.apiUrl}/user/${userId}`, {headers}, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
    
            if (!response.ok) throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        }
    }

    // Mettre à jour un utilisateur
    async updateUser(userId, userData) {
        try {
            const headers = await this.getAuthHeaders();
            const response = await fetch(`${this.apiUrl}/user/${userId}`, {
                method: 'PUT',
                headers: await this.getAuthHeaders(),
                body: JSON.stringify(userData),
            });

            if (!response.ok) throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
        }
    }

    // Supprimer un utilisateur
    async deleteUser(userId) {
        try {
            const headers = await this.getAuthHeaders();
            const response = await fetch(`${this.apiUrl}/user/${userId}`, {headers}, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Erreur lors de la suppression de l\'utilisateur');
            return response.ok;
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur:", error);
        }
    }
}

export default new UserService();
