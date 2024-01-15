import ContactService from '../services/ContactService';

// Types d'actions
export const FETCH_CONTACTS_REQUEST = 'FETCH_CONTACTS_REQUEST';
export const FETCH_CONTACTS_SUCCESS = 'FETCH_CONTACTS_SUCCESS';
export const FETCH_CONTACTS_FAILURE = 'FETCH_CONTACTS_FAILURE';
export const GET_CONTACTS = 'GET_CONTACTS';
export const ADD_CONTACT = 'ADD_CONTACT';
export const DELETE_CONTACT = 'DELETE_CONTACT';

// Action Creator pour les contacts récupérés
export const getContacts = contacts => ({ type: GET_CONTACTS, payload: contacts });

// Thunk Action pour récupérer les contacts
export const fetchContacts = () => async dispatch => {
    dispatch(fetchContactsRequest());
    try {
        const contacts = await ContactService.getAllContacts();
        dispatch(fetchContactsSuccess(contacts));
    } catch (error) {
        dispatch(fetchContactsFailure(error.message));
        console.error("Erreur lors de la récupération des contacts:", error);
    }
};

// Actions pour gérer l'état de la requête
export const fetchContactsRequest = () => ({ type: FETCH_CONTACTS_REQUEST });
export const fetchContactsSuccess = contacts => ({ type: FETCH_CONTACTS_SUCCESS, payload: contacts });
export const fetchContactsFailure = error => ({ type: FETCH_CONTACTS_FAILURE, payload: error });

// Actions pour ajouter et supprimer des contacts
export const addContact = contact => ({ type: ADD_CONTACT, payload: contact });
export const deleteContact = contactId => ({ type: DELETE_CONTACT, payload: contactId });
