import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  roles: [], // Initialisation de la liste des rôles
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isAuthenticated = true;
      state.roles = action.payload.roles; // Mise à jour des rôles
    },
    // Vous pouvez ajouter d'autres reducers si nécessaire
  },
});

export const { loginUser } = userSlice.actions;
export default userSlice.reducer;
