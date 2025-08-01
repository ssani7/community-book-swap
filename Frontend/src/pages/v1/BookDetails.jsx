import React, { useEffect, useState } from 'react';
import { featuredBooks } from '../../utils/Books';
import { useParams, Link } from 'react-router-dom';
import BookCard from '../../components/public/BookCard';
import axiosClient from '../../utils/Axios';
import FullScreenSpinner from '../../components/public/FullScreenSpinner';

export default function BookDetailsPage() {
	const { id } = useParams();
	const initBook = featuredBooks.find((b) => b.bookId === id);
	const [book, setBook] = useState(initBook);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			try {
				const resp = await axiosClient.get(`${import.meta.env.VITE_API_BASE_URL}/api/books/${id}`);
				console.log(resp);
				setBook(resp?.data?.data);
			} catch (error) {
				console.log(error);
			}
			setLoading(false);
		})();
	}, [id]);

	if (loading) return <FullScreenSpinner />;
	else if (!book) return <div>Book not found</div>;

	const { description } = book;

	const relatedBooks = featuredBooks.filter((_, idx) => String(idx) !== id);

	return (
		<div className="min-h-screen bg-base-200 pt-5">
			{/* Main layout */}
			<div className="flex flex-col xl:flex-row gap-6 mx-auto w-fit">
				{/* Book card */}
				<div className="flex flex-col px-5 xl:px-0">
					<BookCard book={book} />

					{/* Description */}
					{description && (
						<div className="w-full mx-auto mt-4 bg-base-100 p-6 rounded-lg text-left shadow-md">
							<h2 className="text-2xl font-bold mb-2">About this book</h2>
							<p className="text-gray-700 leading-relaxed">{description}</p>
						</div>
					)}

					{/* Owner's Thoughts */}
					{book?.ownerThoughts && (
						<div className="w-full mx-auto mb-6 bg-base-100 p-6 mt-4 rounded-lg text-left shadow-md">
							<h2 className="text-2xl font-bold mb-2">Owner’s Thoughts</h2>
							<p className="italic text-gray-600 leading-relaxed">{book?.ownerThoughts}</p>
						</div>
					)}
				</div>

				{/* Related books */}
				<aside className="bg-base-100 rounded-lg px-5 pt-3">
					<h2 className="text-xl font-semibold mb-2 text-left">Related Books</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-1 gap-4">
						{relatedBooks.map((rb, idx) => (
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
			</div>
		</div>
	);
}
