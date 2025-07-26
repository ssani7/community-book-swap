import { Routes, Route } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';

import Home from '../pages/Home';
import Profile from '../pages/Profile';
import ProtectedRoute from './ProtectedRoute';
import BookDetails from '../pages/BookDetails';
import SignUp from '../pages/v1/SignUp';
import SignIn from '../pages/v1/SignIn';
import ManagementLayout from '../layouts/ManagementLayout';
import HomePage from '../pages/v1/Home';
import BookDetailsPage from '../pages/v1/BookDetails';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MyBookRequests from '../pages/v1/MyBooks/MyBookRequests';
import BookRequestDetail from '../pages/v1/BookRequestDetail';
import OthersBookRequests from '../pages/v1/MyBooks/OthersBookRequests';

export default function AppRoutes() {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);
	return (
		<Routes>
			<Route element={<MainLayout />}>
				{/* Public Routes */}
				<Route path="/" element={<HomePage />} />
				<Route path="/books/:id" element={<BookDetailsPage />} />
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />

				{/* 404 Fallback */}
				{/* Protected Routes */}
				<Route element={<ProtectedRoute />}>
					<Route path="/profile" element={<Profile />} />
					<Route path="/books" element={<BookDetails />} />
					<Route path="/book-request/:id" element={<BookRequestDetail />} />
				</Route>

				<Route path="*" element={<h1 className="text-center mt-10">404 - Page Not Found</h1>} />
			</Route>

			<Route element={<ManagementLayout />}>
				<Route element={<ProtectedRoute />}>
					<Route path="/my-books" element={<BookDetails />} />
					<Route path="/book-requests" element={<OthersBookRequests />} />
					<Route path="/my-book-requests" element={<MyBookRequests />} />
				</Route>
			</Route>
		</Routes>
	);
}
