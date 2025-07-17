import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
	const { user, loading } = useSelector((state) => state.auth);

	if (loading) {
		return <div className="text-center mt-10">Checking auth...</div>;
	}

	// ✅ If logged in → render nested routes, else redirect
	return user ? <Outlet /> : <Navigate to="/signin" replace />;
}
