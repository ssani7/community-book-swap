import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import FullScreenSpinner from '../components/public/FullScreenSpinner';

export default function ProtectedRoute() {
	const { user, loading } = useSelector((state) => state.auth);

	if (loading) {
		return <FullScreenSpinner />;
	}

	// ✅ If logged in → render nested routes, else redirect
	return user ? <Outlet /> : <Navigate to="/signin" replace />;
}
