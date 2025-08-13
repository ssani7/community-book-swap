// MyBookRequests.jsx
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axiosClient from '../../../utils/Axios';
import { useSelector } from 'react-redux';
import BookRequestCard from '../../../components/BookForm/BookRequestCard';
import MyRequestCard from '../../../components/BookRequest/MyRequestCard';
import SwapCard from '../../../components/BookRequest/SwapCard';

const MySwaps = () => {
	const { user } = useSelector((state) => state.auth);
	const [bookRequests, setBookRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchBookRequests = async () => {
		try {
			const response = await axiosClient.get(`${import.meta.env.VITE_API_BASE_URL}/api/my-swaps?user_id=${user.id}`); // Replace with your API endpoint
			console.log(response);
			setBookRequests(response.data);
		} catch (error) {
			console.error('Error fetching book requests:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		// Simulate fetching book requests from an API or state management
		fetchBookRequests();
	}, [user.id]);

	if (loading)
		return (
			<div className="h-screen flex items-center justify-center">
				<span className="loading loading-ring loading-lg text-primary"></span>
			</div>
		);
	if (!bookRequests?.lended?.length && !bookRequests?.swapped?.length) {
		return (
			<div className="p-6 max-w-4xl mx-auto">
				<h2 className="text-lg text-center mb-3 font-semibold">No Swaps/Lends Found</h2>
				<p className="text-center">You have no swaps or lends at the moment.</p>
			</div>
		);
	}

	return (
		<div>
			<h1 className="pl-6 pt-6 font-semibold">My Book Requests</h1>
			<div className="px-6 mx-auto">
				{bookRequests?.swapped?.length > 0 && (
					<>
						<h2 className="text-lg text-center mb-3 font-semibold">Swaps</h2>
						<div className="space-y-4">
							{bookRequests?.swapped.map((request) => (
								<SwapCard key={request.id} request={request} type="accepted" refetch={fetchBookRequests} />
							))}
						</div>
					</>
				)}

				{bookRequests?.lended?.length > 0 && (
					<div className="my-32">
						<h2 className="text-lg text-center font-semibold divider">Lends </h2>
						<div className="space-y-4 mt-6">
							{bookRequests?.lended.map((request) => (
								<SwapCard key={request.id} request={request} refetch={fetchBookRequests} type="rejected" />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MySwaps;
