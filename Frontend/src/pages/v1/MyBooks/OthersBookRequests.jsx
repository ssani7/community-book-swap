// MyBookRequests.jsx
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { featuredBooks, bookRequests, users } from '../../../utils/Books';

const OthersBookRequests = () => {
	const getBookNameById = (id) => {
		const book = featuredBooks.find((b) => b.bookId === id);
		return book ? book.title : 'Unknown Book';
	};

	return (
		<div className="p-6 max-w-4xl mx-auto">
			<h1 className="text-3xl font-bold mb-6 text-center">Book Requests for my books</h1>

			<div className="space-y-4">
				{bookRequests.map((request) => {
					const reqBook = featuredBooks.find((b) => b.bookId === request.reqBook);
					const requester = users.find((u) => u.userId === request.userId);
					return (
						<div key={request.id} className="flex flex-col sm:flex-row items-center  gap-4 p-4 bg-base-100 rounded-lg shadow-md">
							<div className="relative flex flex-col items-center w-20 shrink-0">
								<div className="avatar">
									<div className="w-16 h-16 rounded-full ">
										<img src={requester.photoURL} alt={requester.name} />
									</div>
								</div>
								{requester.isPremium && (
									<span className="absolute top-0 right-0  text-primary text-xl rounded-full shadow-md">
										<RiVerifiedBadgeFill />
									</span>
								)}
								<p className="mt-2 text-sm text-center break-words max-w-[5rem]">{requester.name}</p>
							</div>

							<div className="flex-1 w-full text-center">
								<h2 className="text-lg font-semibold break-words">{reqBook?.title}</h2>
								<p className="text-sm text-gray-600 break-words">
									Wants to swap with: <span className="font-medium">{getBookNameById(request.swapBookId)}</span>
								</p>
							</div>

							<div className="flex gap-2 mt-2 sm:mt-0">
								{!(request.lendOnly && requester.isPremium) && (
									<Link to={`/book-request/${request.id}`} className="btn btn-sm btn-secondary capitalize">
										Swap
									</Link>
								)}

								{requester.isPremium && (
									<Link to={`/book-request/${request.id}`} className="btn btn-sm btn-primary capitalize">
										Lend
									</Link>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default OthersBookRequests;
