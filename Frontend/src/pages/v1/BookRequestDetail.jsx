import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { featuredBooks, bookRequests, users } from '../../utils/Books';
import BookCard from '../../components/public/BookCard';
import StarRating from '../../components/public/StarRating';
import { RiVerifiedBadgeFill } from 'react-icons/ri';

export default function BookRequestDetailsPage() {
	const { id } = useParams();
	const request = bookRequests.find((req) => req.id.toString() === id);

	if (!request) return <div className="text-center mt-10 text-xl">Book request not found</div>;

	const user = users.find((u) => u.userId === request.userId);
	const requestedBook = featuredBooks.find((b) => b.bookId === request.reqBook);
	const swapBook = featuredBooks.find((b) => b.bookId === request.swapBookId);

	// Filter other requests excluding the current one
	const otherRequests = bookRequests.filter((r) => r.id !== request.id);

	return (
		<div className="min-h-screen bg-base-200 p-6">
			<div className="mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5">
				{/* User Details - left: col-span 3 */}
				<div className="bg-base-100  h-fit p-6 rounded-lg shadow-lg flex flex-col items-center text-center lg:text-left lg:col-span-3">
					<div className="relative mb-4">
						<img src={user?.photoURL} alt={user?.name} className="w-32 h-32 rounded-full  object-cover mx-auto" />
						{user?.isPremium && (
							<div className="absolute top-0 right-0 text-primary text-3xl shadow-lg">
								<RiVerifiedBadgeFill />
							</div>
						)}
					</div>
					<h2 className="text-2xl font-bold mb-1 truncate max-w-xs">{user?.name}</h2>
					<p className="text-gray-600 mb-2 truncate max-w-xs">{user?.location}</p>
					<StarRating rating={user?.starRating || 0} />
					<p className="text-sm text-gray-500 mb-4 truncate max-w-xs">
						{user?.starRating || 0} stars ({user?.totalReviews || 0} reviews)
					</p>
					<div className="text-left w-full max-w-xs">
						<h3 className="font-semibold mb-2">User Reviews</h3>
						<ul className="list-disc list-inside space-y-2 text-sm text-gray-700 max-h-48 overflow-y-auto break-words">
							{user?.reviews.length ? user.reviews.map((review, idx) => <li key={idx}>&ldquo;{review}&rdquo;</li>) : <li>No reviews yet.</li>}
						</ul>
					</div>

					<div className="mt-6 flex flex-col gap-2 w-full">
						{swapBook?.bookId && !request.lendOnly && <button className="btn btn-primary">Swap with "{swapBook?.title}"</button>}

						{user?.isPremium && <button className="btn btn-secondary">Lend Book</button>}
					</div>
				</div>

				{/* Middle: Swap With + Requested Book (col-span 5) */}
				<div className=" flex flex-col gap-5 lg:col-span-6 order-2 lg:order-none">
					{/* Swap With Book */}
					{swapBook?.bookId && (
						<div className="bg-base-100 shadow-xl rounded-lg">
							<h3 className="text-2xl font-semibold pt-4 pl-6">Swap With</h3>
							<BookCard book={swapBook} requestView={true} />
						</div>
					)}

					{/* Requested Book */}
					<div className="bg-base-100 shadow-xl rounded-lg">
						<h3 className="text-2xl font-semibold pt-4 pl-6">Requested Book</h3>
						<BookCard book={requestedBook} requestView={true} />
					</div>
				</div>

				{/* Right: Other Requests List (col-span 4) */}
				<div className="bg-base-100 p-6 rounded-lg shadow-lg lg:col-span-3  h-fit">
					<h3 className="text-2xl font-semibold mb-4">Other Requests</h3>
					{otherRequests.length ? (
						<ul className="space-y-4 overflow-y-auto">
							{otherRequests.map((req) => {
								const reqUser = users.find((u) => u.userId === req.userId);
								const reqBook = featuredBooks.find((b) => b.bookId === req.swapBookId);
								return (
									<li key={req.id} className="border rounded p-4 hover:shadow-lg transition cursor-pointer">
										<Link to={`/book-request/${req.id}`} className="flex lg:flex-col xl:flex-row items-center gap-4 mb-3">
											<div className="flex flex-col items-center relative">
												<img src={reqUser?.photoURL} alt={reqUser?.name} className="w-12 h-12 rounded-full border-2 border-primary object-cover" />
												{reqUser.isPremium && (
													<span className="absolute top-0 right-1  text-blue-700 text-xl">
														<RiVerifiedBadgeFill />
													</span>
												)}
												<p className="text-sm text-gray-500 truncate">
													<p>{reqUser?.name}</p>
												</p>
											</div>
											<div className="flex-1 min-w-0 text-center">
												<p className="font-semibold truncate">{reqBook?.title}</p>
												<p className="text-sm text-gray-500 truncate">
													<p>{reqBook?.author}</p>
												</p>
											</div>

											<div className="flex gap-2 ">
												{/* Swap button */}
												<Link to={`/book-request/${req.id}`} className="btn btn-sm btn-primary capitalize">
													{reqUser?.isPremium && req.lendOnly && 'Lend'}
													{reqUser?.isPremium && !req.lendOnly && 'Swap/Swap'}
													{!reqUser?.isPremium && 'Swap'}
												</Link>
											</div>
										</Link>
									</li>
								);
							})}
						</ul>
					) : (
						<p>No other requests available.</p>
					)}
				</div>
			</div>
		</div>
	);
}
