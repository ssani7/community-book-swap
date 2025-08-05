import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../../utils/Books';
import { ArrowRightCircle, RefreshCw, Heart, Share2 } from 'lucide-react';
import ConfirmModal from '../modals/ConfirmModal';
import { useState } from 'react';
import FullScreenSpinner from './FullScreenSpinner';
import axiosClient from '../../utils/Axios';
import { useSelector } from 'react-redux';
import SuccessModal from '../modals/SuccessModal';

const BookCard = ({ book, requestView = false }) => {
	const { user } = useSelector((state) => state.auth);
	const { cover, title, author, publisher, publishYear, edition, condition, owner } = book;
	const [confirm, setConfirm] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	const handleLendRequest = async () => {
		// Logic to handle lend request
		console.log('Lend request for:', title);

		try {
			const response = await axiosClient.post(`${import.meta.env.VITE_API_BASE_URL}/api/book-requests`, {
				book_owner_id: book.ownerId,
				requested_book_id: book.id,
				requester_id: user.id,
				is_lend: true,
				// swap_book_id: selectedId,
			});

			console.log(response);

			if (response.status != 200) {
				throw new Error('Failed to submit book request');
			}

			setShowSuccessModal(true);
		} catch (error) {
			console.log(error);
		}
		setLoading(true);
		setConfirm(false);
	};

	if (!book?.id) return null;
	return (
		<div className="bg-base-100 rounded-lg  p-6 flex flex-col items-center sm:flex-row md:items-start h-fit lg:min-w-2xl">
			<div className="flex-shrink-0">
				<img src={cover} alt={title} className="w-full max-w-[20vh] xl:max-h-[50vh] object-contain mb-4 md:mb-0" />
			</div>
			<div className="text-left pl-0 sm:pl-8 flex flex-col">
				<div>
					<h1 className="text-3xl font-bold text-primary mb-2">{title}</h1>
					<p className="text-lg mb-1">
						<strong>Author:</strong> {author}
					</p>
					{publisher && (
						<p className="text-sm mb-1">
							<strong>Publisher:</strong> {publisher}
						</p>
					)}
					<p className="text-sm mb-1">
						<strong>Year:</strong> {publishYear}
					</p>
					<p className="text-sm mb-1">
						<strong>Edition:</strong> {edition}
					</p>
					<p className="text-sm mb-1">
						<strong>Condition:</strong> {condition}
					</p>
					<p className="text-sm mb-1">
						<strong>Owner:</strong> {owner}
					</p>
					<div className="w-fit my-4">
						<ul className="flex flex-wrap gap-3">
							{categories.map((cat) => (
								<li key={cat.cid} className="badge badge-outline badge-lg text-sm">
									{cat.name}
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="mt-5 flex flex-wrap  gap-2">
					{user?.id !== book.ownerId && (
						<>
							{requestView && (
								<Link to={`/books/${book.bookId}`}>
									<button className="btn btn-primary flex items-center space-x-2">
										<span>See Details</span>
									</button>
								</Link>
							)}

							{!requestView && (
								<button className="btn btn-primary flex items-center space-x-2" onClick={() => setConfirm(true)}>
									<ArrowRightCircle className="w-5 h-5" />
									<span>Lend</span>
								</button>
							)}

							{!requestView && (
								<Link to={`/request-book/${book.id}`}>
									<button className="btn btn-secondary flex items-center space-x-2">
										<RefreshCw className="w-5 h-5" />
										<span>Swap</span>
									</button>
								</Link>
							)}
						</>
					)}

					<button className="btn btn-outline flex items-center space-x-2">
						<Share2 className="w-5 h-5" />
						<span>Share</span>
					</button>
				</div>
			</div>

			{loading && <FullScreenSpinner />}
			<ConfirmModal
				isOpen={confirm}
				title="Confirm Lend Request?"
				onSubmit={() => handleLendRequest()}
				onCancel={() => setConfirm(false)}
				disableCancel={false}
				handleClose={() => setConfirm(false)}
				submitBtnText="Confirm"
			/>

			<SuccessModal
				isOpen={showSuccessModal}
				title={'Request Submitted Successfully'}
				successText={'Your book request has been submitted successfully. Keep an eye on the "My Book Requests" tab to get updated.'}
				disableCancel={true}
				handleClose={() => setShowSuccessModal(false)}
				onSubmit={() => {
					setShowSuccessModal(false);
					navigate('/my-book-requests');
				}}
				submitBtnText="Go to My Book Requests"
			/>
		</div>
	);
};

export default BookCard;
