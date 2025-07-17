import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ProtectedRoute from './ProtectedRoute';

export default function AppRoutes() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				{/* Protected Routes */}
				<Route element={<ProtectedRoute />}>
					<Route path="/" element={<Home />} />
				</Route>

				{/* Public Routes */}
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />

				{/* 404 Fallback */}
				<Route path="*" element={<h1 className="text-center mt-10">404 - Page Not Found</h1>} />
			</Route>
		</Routes>
	);
}
