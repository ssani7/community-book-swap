// MyBookRequests.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../../../utils/Axios';
import { useSelector } from 'react-redux';
import BookRequestCard from '../../../components/BookForm/BookRequestCard';
import MyRequestCard from '../../../components/BookRequest/MyRequestCard';

const MyBookRequests = () => {
	const { user } = useSelector((state) => state.auth);
	const [bookRequests, setBookRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Simulate fetching book requests from an API or state management
		const fetchBookRequests = async () => {
			try {
				const response = await axiosClient.get(`${import.meta.env.VITE_API_BASE_URL}/api/book-requests?requester_id=${user.id}`); // Replace with your API endpoint
				console.log(response);
				setBookRequests(response.data);
			} catch (error) {
				console.error('Error fetching book requests:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchBookRequests();
	}, [user.id]);

	if (loading)
		return (
			<div className="h-screen flex items-center justify-center">
				<span className="loading loading-ring loading-lg text-primary"></span>
			</div>
		);
	if (!bookRequests?.accepted?.length && !bookRequests?.pending?.length && !bookRequests?.cancelled?.length) {
		return (
			<div className="p-6 max-w-4xl mx-auto">
				<h2 className="text-lg text-center mb-3 font-semibold">No Book Requests Found</h2>
				<p className="text-center">You have no book requests at the moment.</p>
			</div>
		);
	}

	return (
		<div>
			<h1 className="pl-6 pt-6 font-semibold">My Book Requests</h1>
			<div className="px-6 max-w-4xl mx-auto">
				{bookRequests?.accepted?.length > 0 && (
					<>
						<h2 className="text-lg text-center mb-3 font-semibold">Accpeted Requests</h2>
						<div className="space-y-4">
							{bookRequests?.accepted.map((request) => (
								<MyRequestCard key={request.id} request={request} />
							))}
						</div>
					</>
				)}

				{bookRequests?.pending?.length > 0 && (
					<>
						<h2 className="text-lg text-center mb-3 font-semibold">Pending Requests</h2>
						<div className="space-y-4">
							{bookRequests?.pending.map((request) => (
								<MyRequestCard key={request.id} request={request} />
							))}
						</div>
					</>
				)}

				{bookRequests?.cancelled?.length > 0 && (
					<>
						<h2 className="text-lg text-center mb-3 font-semibold">Cancelled Requests</h2>
						<div className="space-y-4">
							{bookRequests?.cancelled.map((request) => (
								<MyRequestCard key={request.id} request={request} />
							))}
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default MyBookRequests;
