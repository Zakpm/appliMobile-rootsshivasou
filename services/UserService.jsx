class UserService {
    // URL de base de l'API
    apiUrl = "http://192.168.1.101:9981";

    // Obtenir tous les utilisateurs
    async getAllUsers() {
        try {
            const response = await fetch(`${this.apiUrl}/users`);
            if (!response.ok) throw new Error('Erreur réseau');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération des utilisateurs:", error);
        }
    }

    // Obtenir un utilisateur par ID
    async getUserById(userId) {
        try {
            const response = await fetch(`${this.apiUrl}/user/${userId}`);
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
            const response = await fetch(`${this.apiUrl}/user/${userId}`, {
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
            const response = await fetch(`${this.apiUrl}/user/${userId}`, {
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

    // Supprimer un utilisateur
    async deleteUser(userId) {
        try {
            const response = await fetch(`${this.apiUrl}/user/${userId}`, {
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
