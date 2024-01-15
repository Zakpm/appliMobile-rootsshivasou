class PostService {
    // URL de base de l'API
    apiUrl = "http://192.168.1.101:9981";

    // Obtenir tous les posts
    async getAllPosts() {
        try {
            const response = await fetch(`${this.apiUrl}/posts`);
            if (!response.ok) throw new Error('Erreur réseau');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération des posts:", error);
        }
    }

    // Obtenir un post par ID
    async getPostById(postId) {
        try {
            const response = await fetch(`${this.apiUrl}/post/${postId}`);
            if (!response.ok) throw new Error('Erreur réseau');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la récupération du post:", error);
        }
    }

    // Créer un nouveau post
    async createPost(postData, images) {
        try {
            const formData = new FormData();

            for (const key in postData) {
                formData.append(key, postData[key]);
            }

            images.forEach(image => {
                formData.append('image', image);
            });

            const response = await fetch(`${this.apiUrl}/post`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) throw new Error('Erreur lors de la création du post');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la création du post:", error);
        }
    }

    // Mettre à jour un post
    async updatePost(postId, postData, images) {
        try {
            const formData = new FormData();

            for (const key in postData) {
                formData.append(key, postData[key]);
            }

            images.forEach(image => {
                formData.append('image', image);
            });

            const response = await fetch(`${this.apiUrl}/post/${postId}`, {
                method: 'PUT',
                body: formData,
            });

            if (!response.ok) throw new Error('Erreur lors de la mise à jour du post');
            return await response.json();
        } catch (error) {
            console.error("Erreur lors de la mise à jour du post:", error);
        }
    }

    // Supprimer un post
    async deletePost(postId) {
        try {
            const response = await fetch(`${this.apiUrl}/post/${postId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Erreur lors de la suppression du post');
            return response.ok;
        } catch (error) {
            console.error("Erreur lors de la suppression du post:", error);
        }
    }
}

export default new PostService();
