import { Link, useNavigate, useLocation } from 'react-router-dom';
import { categories } from '../../utils/Books';
import { ArrowRightCircle, RefreshCw, Heart, Share2 } from 'lucide-react';
import ConfirmModal from '../modals/ConfirmModal';
import { useState } from 'react';
import FullScreenSpinner from './FullScreenSpinner';
import axiosClient from '../../utils/Axios';
import { useSelector } from 'react-redux';
import SuccessModal from '../modals/SuccessModal';
import { toast } from 'react-hot-toast';
import LendModal from '../Books/LendModal';

const BookCard = ({ book, requestView = false }) => {
	const { user } = useSelector((state) => state.auth);
	const location = useLocation();
	const { cover, title, author, publisher, publishYear, edition, condition, owner, ownerId } = book;
	const [confirm, setConfirm] = useState(false);
	const [showSuccessModal, setShowSuccessModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const [returnDate, setReturnDate] = useState('');

	console.log(returnDate);

	const navigate = useNavigate();

	const handleShare = async () => {
		try {
			await navigator.clipboard.writeText(window.location.href);
			toast.success('Book link copied to clipboard');
		} catch (err) {
			alert('Failed to copy link');
		}
	};

	const handleLendRequest = async () => {
		// Logic to handle lend request

		if (!user) {
			navigate('/signin?redirect_url=' + encodeURIComponent(location.pathname + location.search));
		}

		try {
			const reqBody = {
				book_owner_id: book.ownerId,
				requested_book_id: book.id,
				requester_id: user.id,
				is_lend: true,
				return_date: returnDate,
			};

			console.log(reqBody);

			const response = await axiosClient.post(`${import.meta.env.VITE_API_BASE_URL}/api/book-requests`, reqBody);

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

	const swapLink = user?.id ? `/request-book/${book.id}` : `/signin?redirect_url=${encodeURIComponent(location.pathname + location.search)}`;

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
					<p className="flex items-center text-sm mb-1">
						<strong>Owner:</strong>
						<Link to={`/profile/${ownerId}`} className="m-0 p-0 pl-1 btn btn-link">
							{owner}
						</Link>
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
								<div className="relative">
									{!user?.is_verified && (
										<div className="absolute top-0 -left-5  text-primary text-xs rounded-full shadow-md bg-primary -rotate-[20deg] px-3">
											<div className="text-orange-400 font-extrabold">Premium</div>
										</div>
									)}
									<button className="btn btn-primary flex items-center space-x-2" onClick={() => setConfirm(true)} disabled={!user?.is_verified}>
										<ArrowRightCircle className="w-5 h-5" />
										<span>Lend</span>
									</button>
								</div>
							)}

							{!requestView && (
								<Link to={swapLink}>
									<button className="btn btn-secondary flex items-center space-x-2">
										<RefreshCw className="w-5 h-5" />
										<span>Swap</span>
									</button>
								</Link>
							)}
						</>
					)}

					<button className="btn btn-outline flex items-center space-x-2" onClick={handleShare}>
						<Share2 className="w-5 h-5" />
						<span>Share</span>
					</button>
				</div>
			</div>

			{loading && <FullScreenSpinner />}

			<LendModal isOpen={confirm} onSubmit={() => handleLendRequest()} onCancel={() => setConfirm(false)} handleClose={() => setConfirm(false)} setReturnDate={setReturnDate} />

			<SuccessModal
				isOpen={showSuccessModal}
				title={'Request Submitted Successfully'}
				successText={'Your book request has been submitted successfully. Keep an eye on the "My Book Requests" tab to get updated.'}
				disableCancel={true}
				handleClose={() => {
					setShowSuccessModal(false);
					setLoading(false);
				}}
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
