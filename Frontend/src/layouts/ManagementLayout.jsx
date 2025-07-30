import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../styles/BookDetails.css';
import { FaAngleRight } from 'react-icons/fa';
import Navbar from '../components/public/Navbar';

const ManagementLayout = () => {
	return (
		<div>
			<Navbar />
			<div className="drawer lg:drawer-open">
				<input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content pt-16">
					<div className="fixed bottom-20 left-10">
						<label htmlFor="my-drawer-2" className="btn btn-primary drawer-button h-12 w-12 rounded-full lg:hidden">
							<FaAngleRight />
						</label>
					</div>
					<Outlet />
				</div>
				<div className="drawer-side pt-16">
					<label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
					<ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
						{/* Sidebar content here */}
						<li>
							<Link to="/my-books">My Books</Link>
						</li>
						<li>
							<Link to="/my-book-requests">My Requests</Link>
						</li>
						<li>
							<Link to="/book-requests">Others Requests</Link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default ManagementLayout;
