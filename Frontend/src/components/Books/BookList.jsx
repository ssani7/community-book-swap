import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BookPreviewCard from './BookPreviewCard';

const BookList = ({ perPage = 18, featured }) => {
	const [books, setBooks] = useState([]);
	const [meta, setMeta] = useState(null); // pagination metadata
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				setLoading(true);
				const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-books/?per_page=${perPage}&page=${page}`);
				console.log(res);
				if (res.data.data) {
					setBooks(res.data.data);
					setMeta({
						current_page: res.data.current_page,
						last_page: res.data.last_page,
					});
				} else {
					// Non-paginated
					setBooks(res.data);
					setMeta(null);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		})();
	}, [page]);

	return (
		<div className="py-6">
			<div>
				<h2 className={`text-2xl font-bold mb-4 text-center ${featured && 'hidden'}`}>Available Books</h2>
				<div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
					{loading ? (
						<>
							{Array.from({ length: 12 }).map((_, idx) => (
								<div key={idx} className="card bg-base-100 shadow p-4 h-full">
									{/* Placeholder content */}
									<div className="w-36 h-64 mx-auto bg-gray-200 rounded animate-pulse" />
									<div className="mt-2">
										<div className="h-5 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
										<div className="h-4 bg-gray-200 rounded w-1/2 mb-1 animate-pulse" />
										<div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
									</div>
								</div>
							))}
						</>
					) : (
						<>
							{books.map((book, i) => (
								<BookPreviewCard book={book} key={book.id} />
							))}
						</>
					)}
				</div>
				{/* Pagination */}
				{!featured ? (
					<div className="flex justify-center mt-4 gap-2">
						<button className="btn btn-sm" disabled={meta?.current_page === 1 || loading} onClick={() => setPage((p) => p - 1)}>
							Prev
						</button>

						{/* Page Numbers */}
						{[...Array(meta?.last_page)].map((_, i) => (
							<button key={i + 1} className={`btn btn-sm ${meta?.current_page === i + 1 ? 'btn-active' : ''}`} disable={loading} onClick={() => setPage(i + 1)}>
								{i + 1}
							</button>
						))}

						<button className="btn btn-sm" disabled={meta?.current_page === meta?.last_page || loading} onClick={() => setPage((p) => p + 1)}>
							Next
						</button>
					</div>
				) : (
					<div className="flex justify-center mt-8">
						<Link to="/all-books">
							<button className="btn btn-primary">Show All Book</button>
						</Link>
					</div>
				)}
			</div>
		</div>
	);
};

export default BookList;
