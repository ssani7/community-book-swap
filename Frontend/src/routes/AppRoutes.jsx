import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import BookDetails from '../pages/BookDetails';
import SignUp from '../pages/v1/SignUp';
import SignIn from '../pages/v1/SignIn';
import ManagementLayout from '../layouts/ManagementLayout';

export default function AppRoutes() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				{/* Protected Routes */}
				<Route element={<ProtectedRoute />}>
					<Route path="/profile" element={<Profile />} />
					<Route path="/books" element={<BookDetails />} />
					{/* Add more protected routes here */}
				</Route>

				{/* Public Routes */}
				<Route path="/" element={<Home />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />

				{/* 404 Fallback */}
				<Route path="*" element={<h1 className="text-center mt-10">404 - Page Not Found</h1>} />
			</Route>
			<Route element={<ManagementLayout />}>
				<Route path="/my-books" element={<BookDetails />} />
				<Route path="/book-requests" element={<Home />} />
			</Route>
		</Routes>
	);
}
