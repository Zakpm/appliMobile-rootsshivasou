class ContactService {
    // URL de base de l'API
    apiUrl = "http://192.168.1.101:9983";

    // Obtenir tous les contacts
    async getAllContacts() {
        try {
            const response = await fetch(`${this.apiUrl}/contacts`);
            if (!response.ok) throw new Error('Erreur réseau');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération des contacts:", error);
        }
    }

    // Obtenir un contact par ID
    async getContactById(contactId) {
        try {
            const response = await fetch(`${this.apiUrl}/contact/${contactId}`);
            if (!response.ok) throw new Error('Erreur réseau');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération du contact:", error);
        }
    }

    // Créer un nouveau contact
    async createContact(contactData) {
        try {
            const response = await fetch(`${this.apiUrl}/contact`, {
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
            const response = await fetch(`${this.apiUrl}/contact/${contactId}`, {
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
