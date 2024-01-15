import PostService from '../services/PostService';

// postAction.js
export const FETCH_POSTS_REQUEST = 'FETCH_POSTS_REQUEST';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const GET_POSTS = 'GET_POSTS';

// Action Creator pour les posts récupérés
export const getPosts = posts => ({ type: GET_POSTS, payload: posts });

// Thunk Action pour récupérer les posts
export const fetchPosts = () => async dispatch => {
    try {
        const posts = await PostService.getAllPosts();
        dispatch(getPosts(posts));
    } catch (error) {
        console.error("Erreur lors de la récupération des posts:", error);
        // Gérer l'erreur (par exemple, dispatch une action d'erreur)
    }
};

export const fetchPostsRequest = () => {
    return {
        type: FETCH_POSTS_REQUEST,
    };
};

export const fetchPostsSuccess = (posts) => {
    return {
        type: FETCH_POSTS_SUCCESS,
        payload: posts,
    };
};

export const fetchPostsFailure = (error) => {
    return {
        type: FETCH_POSTS_FAILURE,
        payload: error,
    };
};

// Ajouter d'autres actions pour créer, mettre à jour, et supprimer des posts si nécessaire
