import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../../utils/Axios';
import toast from 'react-hot-toast';
import FullScreenSpinner from '../../components/public/FullScreenSpinner';
import SuccessModal from '../../components/modals/SuccessModal';

const BookRequestForm = () => {
	const { user, loading: userLoading } = useSelector((state) => state.auth);
	const { id: bookId } = useParams();
	const navigate = useNavigate();

	const [requestedBook, setRequestedBook] = useState([]);
	const [books, setBooks] = useState([]);
	const [confirm, setConfirm] = useState(false);
	const [loading, setLoading] = useState(true);
	const [selectedId, setSelectedId] = useState('');
	const [showSuccessModal, setShowSuccessModal] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const requestedBood = await axiosClient.get(`${import.meta.env.VITE_API_BASE_URL}/api/books/${bookId}`);
				console.log(requestedBood);
				setRequestedBook(requestedBood?.data?.data);

				const response = await axiosClient.get(`${import.meta.env.VITE_API_BASE_URL}/api/books/?owner_id=${user.id}`);
				setBooks((prev) => [...prev, ...response.data]);
			} catch (error) {
				console.error('Error fetching books:', error);
				toast.error('Failed to fetch books. Please try again later.');
			} finally {
				setLoading(false);
			}
		})();
	}, [bookId, user?.id]);

	const toggleSelect = (id) => {
		setSelectedId((prev) => (prev == id ? '' : id));
	};

	const handleSubmit = async () => {
		setLoading(true);
		try {
			const response = await axiosClient.post(`${import.meta.env.VITE_API_BASE_URL}/api/book-requests`, {
				book_owner_id: requestedBook.ownerId,
				requested_book_id: bookId,
				requester_id: user.id,
				swap_book_id: selectedId,
			});

			if (response.status != 200) {
				throw new Error('Failed to submit book request');
			}

			setShowSuccessModal(true);
		} catch (error) {
			console.error('Error submitting book request:', error);
			toast.error('Failed to submit book request. Please try again later.');
		} finally {
			setLoading(false);
		}
	};

	if (userLoading) return <FullScreenSpinner />;

	const disableSubmit = !selectedId || !confirm;

	return (
		<div className="pt-5">
			{loading && <FullScreenSpinner />}
			<h2 className="text-center text-lg font-semibold">Select a book you want to offer</h2>
			<div className="max-w-[80vw] mx-auto shadow-lg mt-6 bg-base-100 rounded-lg overflow-hidden">
				<table className="table">
					<thead>
						<tr>
							<th>Book</th>
							<th>Genre</th>
						</tr>
					</thead>
					<tbody>
						{books.map((book) => (
							<tr onClick={() => toggleSelect(book.id)} key={book.id} className={`cursor-pointer ${selectedId === book.id ? 'bg-primary text-white' : ''}`}>
								<td>
									<div className="flex items-center gap-3">
										<div className="avatar">
											<div className="mask mask-squircle h-12 w-12">
												<img src={book.cover} alt="Avatar Tailwind CSS Component" />
											</div>
										</div>
										<div>
											<div className="font-bold">{book.title}</div>
											<div className="text-sm opacity-50">{book.author}</div>
										</div>
									</div>
								</td>
								<td>{book.genre}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="w-full text-center mt-8">
				{selectedId ? (
					<div className="flex items-center justify-center gap-2">
						<input type="checkbox" checked={confirm} className="checkbox checkbox-primary" onChange={(e) => setConfirm(e.target.checked)} />
						<p>
							I promise to give <i className="text-secondary font-semibold">{requestedBook?.title}</i> to <i className="text-secondary font-semibold">{requestedBook?.owner}</i> if my request is
							accepted.
						</p>
					</div>
				) : (
					<div className="text-error">You must select a book to proceed with the request.</div>
				)}
			</div>

			<div className="mt-6 flex items-center justify-center mb-6">
				<button className="btn btn-primary" disabled={disableSubmit} onClick={handleSubmit}>
					Confirm Request
				</button>
			</div>

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

export default BookRequestForm;
