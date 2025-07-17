import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});
