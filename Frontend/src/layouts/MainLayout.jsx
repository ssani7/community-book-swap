import { Outlet } from 'react-router-dom';
import Navbar from '../components/public/Navbar';

export default function MainLayout() {
	return (
		<div className="min-h-screen flex flex-col" data-theme="light">
			{/* Navbar always on top */}
			<Navbar />

			{/* Page content */}
			<div className="flex-1 pt-16">
				<Outlet />
			</div>
		</div>
	);
}
