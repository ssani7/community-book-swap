import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	user: null,
	loading: true, // for checking initial auth state
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
			state.loading = false;
		},
		clearUser: (state) => {
			state.user = null;
			state.loading = false;
		},
	},
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
