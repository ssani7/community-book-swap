import axios from 'axios';

const axiosClient = axios.create({
	baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
});

axiosClient.interceptors.request.use((config) => {
	const token = localStorage.getItem('ACCESS_TOKEN');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		console.log(error);
		if (error.response && error.response.status === 401) {
			// Handle unauthorized access, e.g., redirect to login
			localStorage.removeItem('ACCESS_TOKEN');
			// window.location.href = '/signin';
		}
		throw error;
	}
);

export default axiosClient;
