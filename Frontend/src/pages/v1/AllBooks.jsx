import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const AllBooks = () => {
	const [searchParams] = useSearchParams();
	const title = searchParams.get('trending') ? 'Trending Books' : 'Available Books';

	const [books, setBooks] = useState([]);
	const [meta, setMeta] = useState(null); // pagination metadata
	const [serachText, setSerachText] = useState(''); // pagination metadata
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(true);
	const perPage = 18;

	async function fetchBooks() {
		try {
			setLoading(true);
			const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/get-books/?per_page=${perPage}&page=${page}&search=${serachText}`);
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
	}

	useEffect(() => {
		fetchBooks();
	}, [page]);

	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			fetchBooks();
		}
	};

	return (
		<div className="py-6">
			<div>
				<h2 className={`text-2xl font-bold mb-4 text-center`}>{title}</h2>

				<div className="p-6 flex items-center gap-4">
					<label className="input w-full">
						<svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
							<g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
								<circle cx="11" cy="11" r="8"></circle>
								<path d="m21 21-4.3-4.3"></path>
							</g>
						</svg>
						<input type="search" required placeholder="Search book by title or author" onChange={(e) => setSerachText(e.target.value)} onKeyDown={handleKeyDown} />
					</label>
					<button className="btn btn-primary" onClick={fetchBooks} disabled={loading}>
						Search
					</button>
				</div>

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
								<Link to={`/books/${book.id}`} key={i} className="group">
									<div className="card bg-base-100 shadow p-4 h-full">
										<img src={book.cover} alt={book.title} className="w-36 h-64 mx-auto object-contain rounded" />
										<div className="mt-2">
											<h3 className="font-bold text-lg">{book.title}</h3>
											<p className="text-sm text-gray-500">Author: {book.author}</p>
											<p className="text-sm text-gray-500">Owner: {book.owner}</p>
										</div>
									</div>
								</Link>
							))}
						</>
					)}
				</div>
				{/* Pagination */}
				{meta && (
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
				)}
			</div>
		</div>
	);
};

export default AllBooks;
