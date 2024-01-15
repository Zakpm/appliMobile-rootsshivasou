import { GET_USERS, ADD_USER, UPDATE_USER, DELETE_USER } from '../reducers/userAction';

// État initial
const initialState = {
    users: [],
    loading: false,
    error: null
};

// Reducer
export function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
                error: null
            };
        case ADD_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
                loading: false,
                error: null
            };
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(user => user.id === action.payload.id ? action.payload : user),
                loading: false,
                error: null
            };
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.payload),
                loading: false,
                error: null
            };
        default:
            return state;
    }
}

export default userReducer;
