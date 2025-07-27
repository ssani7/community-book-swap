import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';
import './App.css';
import axiosClient from './utils/Axios';
import useAuth from './hooks/useAuth';

function App() {
	const { setUserData, logoutUser } = useAuth();

	useEffect(() => {
		axiosClient
			.get('/user')
			.then((response) => {
				if (response?.status === 200) {
					const user = response?.data;
					console.log(user);

					setUserData(user);
				} else {
					logoutUser();
				}
			})
			.catch((error) => {
				console.error('Error fetching user:', error);
				logoutUser();
			});
	}, [setUserData, logoutUser]);

	return <AppRoutes />;
}

export default App;
