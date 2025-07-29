import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from '../store/AuthSlice';
import axiosClient from '../utils/Axios';

const useAuth = () => {
	const dispatch = useDispatch();

	const setUserData = useCallback(
		(user) => {
			dispatch(
				setUser({
					id: user.id,
					email: user.email,
					name: user.name,
					photoURL: user?.photoURL,
					phone: user?.phone,
					isPremium: user?.isPremium,
				})
			);
		},
		[dispatch]
	);

	const logoutUser = useCallback(async () => {
		localStorage.removeItem('ACCESS_TOKEN');
		dispatch(clearUser());
	}, [dispatch]);

	return {
		setUserData,
		logoutUser,
	};
};

export default useAuth;
