import React, { useEffect } from 'react';
import axiosClient from '../../utils/Axios';
import { Link } from 'react-router-dom';

const RelatedBooks = ({ bookId }) => {
	const [relatedBooks, setRelatedBooks] = React.useState([]);
	const [loading, setLoading] = React.useState(true);

	useEffect(() => {
		(async () => {
			try {
				const response = await axiosClient.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-related-books/${bookId}/?per_page=4&page=1`);
				if (response.status !== 200) {
					throw new Error('Failed to fetch related books');
				}
				setRelatedBooks(response?.data?.data);
			} catch (error) {
				console.error('Error fetching related books:', error);
			}
			setLoading(false);
		})();
	}, [bookId]);

	return (
		<aside className="bg-base-100 rounded-lg px-5 pt-3">
			<h2 className="text-xl font-semibold mb-2 text-left">Related Books</h2>
			<div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-1 gap-4">
				{loading
					? Array.from({ length: 4 }).map((_, idx) => (
							<div key={idx} className="card card-compact flex xl:flex-row h-full xl:w-80 shadow animate-pulse bg-gray-200">
								<div className="w-28 h-40 skeleton " />
								<div className="card-body p-2">
									<div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
									<div className="h-3 bg-gray-300 rounded w-1/2" />
									<div className="h-3 bg-gray-300 rounded w-1/2" />
								</div>
							</div>
					  ))
					: relatedBooks.map((rb, idx) => (
							<Link key={idx} to={`/books/${rb.bookId}`}>
								<div className="card card-compact flex xl:flex-row h-full xl:w-80 shadow hover:shadow-lg">
									<img src={rb.cover} alt={rb.title} className="object-contain max-w-full h-40 mx-auto" />
									<div className="card-body p-2">
										<h3 className="font-semibold text-sm">{rb.title}</h3>
										<p className="text-xs text-gray-500">Owner: {rb.owner}</p>
									</div>
								</div>
							</Link>
					  ))}
			</div>
		</aside>
	);
};

export default RelatedBooks;
