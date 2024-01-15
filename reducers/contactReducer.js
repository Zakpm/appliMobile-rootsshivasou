import {
    FETCH_CONTACTS_REQUEST,
    FETCH_CONTACTS_SUCCESS,
    FETCH_CONTACTS_FAILURE,
    GET_CONTACTS,
    ADD_CONTACT,
    DELETE_CONTACT
  } from './contactAction';
  
  const initialState = {
      contacts: [],
      loading: false,
      error: null
  };
  
  const contactReducer = (state = initialState, action) => {
      switch (action.type) {
          case FETCH_CONTACTS_REQUEST:
              return { ...state, loading: true };
          case FETCH_CONTACTS_SUCCESS:
              return { ...state, contacts: action.payload, loading: false, error: null };
          case FETCH_CONTACTS_FAILURE:
              return { ...state, loading: false, error: action.payload };
          case GET_CONTACTS:
              return { ...state, contacts: action.payload };
          case ADD_CONTACT:
              return { ...state, contacts: [...state.contacts, action.payload] };
          case DELETE_CONTACT:
              return { ...state, contacts: state.contacts.filter(contact => contact.id !== action.payload) };
          default:
              return state;
      }
  };
  
  export default contactReducer;
  