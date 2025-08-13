// MyBookRequests.jsx
import { useEffect, useState } from 'react';
import axiosClient from '../../../utils/Axios';
import { useSelector } from 'react-redux';
import OthersRequestCard from '../../../components/BookRequest/OthersRequestCard';

const OthersBookRequests = () => {
	const { user } = useSelector((state) => state.auth);
	const [bookRequests, setBookRequests] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchBookRequests = async () => {
		try {
			const response = await axiosClient.get(`${import.meta.env.VITE_API_BASE_URL}/api/book-requests?book_owner_id=${user.id}`); // Replace with your API endpoint
			console.log(response);
			setBookRequests(response.data);
		} catch (error) {
			console.error('Error fetching book requests:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchBookRequests();
	}, [user.id]);

	if (loading)
		return (
			<div className="h-screen flex items-center justify-center">
				<span className="loading loading-ring loading-lg text-primary"></span>
			</div>
		);
	if (!bookRequests?.accepted?.length && !bookRequests?.pending?.length && !bookRequests?.cancelled?.length && !bookRequests?.rejected?.length) {
		return (
			<div className="p-6 max-w-4xl mx-auto">
				<h2 className="text-lg text-center mb-3 font-semibold">No Book Requests Found</h2>
				<p className="text-center">You have no book requests at the moment.</p>
			</div>
		);
	}

	return (
		<div>
			<h1 className="pl-6 pt-6 font-semibold">Requests for my books</h1>
			<div className="px-6  mx-auto">
				{bookRequests?.accepted?.length > 0 && (
					<div className="mb-32">
						<h2 className="text-lg text-center mb-3 font-semibold">Accpeted Requests</h2>
						<div className="space-y-4">
							{bookRequests?.accepted.map((request) => (
								<OthersRequestCard key={request.id} request={request} type="accepted" refetch={fetchBookRequests} />
							))}
						</div>
					</div>
				)}

				{bookRequests?.pending?.length > 0 && (
					<div className="mb-32">
						<h2 className="text-lg text-center font-semibold divider">Pending Requests</h2>
						<div className="space-y-4 mt-6">
							{bookRequests?.pending.map((request) => (
								<OthersRequestCard key={request.id} request={request} refetch={fetchBookRequests} />
							))}
						</div>
					</div>
				)}

				{bookRequests?.rejected?.length > 0 && (
					<div className="mb-8">
						<h2 className="text-lg text-center mb-3 font-semibold divider">Rejected Requests</h2>
						<div className="space-y-4 mt-6">
							{bookRequests?.rejected.map((request) => (
								<OthersRequestCard key={request.id} request={request} type="rejected" />
							))}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default OthersBookRequests;
