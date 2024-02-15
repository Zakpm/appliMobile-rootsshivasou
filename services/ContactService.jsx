import AsyncStorage from '@react-native-async-storage/async-storage';
class ContactService {
    // URL de base de l'API
    apiUrl = "http://192.168.1.101:9983";

    async getAuthHeaders() {
        const token = await AsyncStorage.getItem('userToken');
        return {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        };
    }

    // Obtenir tous les contacts
    async getAllContacts() {
        try {
            const headers = await this.getAuthHeaders();
            const response = await fetch(`${this.apiUrl}/contacts`, {headers});
            if (!response.ok) throw new Error('Erreur réseau');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération des contacts:", error);
        }
    }

    // Obtenir un contact par ID
    async getContactById(contactId) {
        try {
            const headers = await this.getAuthHeaders();
            const response = await fetch(`${this.apiUrl}/contact/${contactId}`, {headers});
            if (!response.ok) throw new Error('Erreur réseau');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération du contact:", error);
        }
    }

    // Créer un nouveau contact
    async createContact(contactData) {
        try {
            const headers = await this.getAuthHeaders();
            const response = await fetch(`${this.apiUrl}/contact`, {headers}, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contactData),
            });

            if (!response.ok) throw new Error('Erreur lors de la création du contact');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la création du contact:", error);
        }
    }

    // Supprimer un contact
    async deleteContact(contactId) {
        try {
            const headers = await this.getAuthHeaders();
            const response = await fetch(`${this.apiUrl}/contact/${contactId}`, {headers}, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Erreur lors de la suppression du contact');
            return response.ok;
        } catch (error) {
            console.error("Erreur lors de la suppression du contact:", error);
        }
    }
}

export default new ContactService();
