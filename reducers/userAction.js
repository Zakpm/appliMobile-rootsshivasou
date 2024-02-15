import UserService from '../services/UserService';
// Types d'actions
export const GET_USERS = 'GET_USERS';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';

// Actions creators
export const getUsers = users => ({ type: GET_USERS, payload: users });

// Thunk Action pour récupérer les utilisateurs
export const fetchUsers = () => async dispatch => {
    try {
        const users = await UserService.getAllUsers();
        dispatch(getUsers(users));
    } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs:", error);
        // Gérer l'erreur (par exemple, dispatch une action d'erreur)
    }
};

export const addUser = user => ({ type: ADD_USER, payload: user });
export const updateUser = user => ({ type: UPDATE_USER, payload: user });
export const deleteUser = userId => ({ type: DELETE_USER, payload: userId });
