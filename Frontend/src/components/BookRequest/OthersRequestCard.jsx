import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { IoSwapHorizontalOutline } from 'react-icons/io5';
import { GoArrowLeft } from 'react-icons/go';
import axiosClient from '../../utils/Axios';
import ConfirmModal from '../modals/ConfirmModal';
import { useState } from 'react';
import FullScreenSpinner from '../public/FullScreenSpinner';

const OthersRequestCard = ({ request, type }) => {
	const reqBook = request?.requested_book;
	const requester = request?.requester;
	const bookOwner = request?.book_owner;
	const swapBook = request?.swap_book;
	const [loading, setLoading] = useState(false);
	const [confirm, setConfirm] = useState(false);
	const [updatedRequest, setUpdatedRequest] = useState({});
	const [newStatus, setNewStatus] = useState('');

	let cardColor = 'to-yellow-300';

	switch (type) {
		case 'accepted':
			cardColor = 'to-green-300';
			break;

		case 'rejected':
			cardColor = 'to-red-300';
			break;

		default:
			break;
	}

	console.log(request);

	const updateRequest = async () => {
		try {
			setLoading(true);
			setConfirm(false);

			const resp = await axiosClient.patch(`/book-requests/${request.id}`, {
				requestId: updatedRequest.id,
				status: updatedRequest.status,
			});

			console.log(resp);

			if (resp.status === 200) {
				console.log('Request status updated successfully');
			}
		} catch (error) {
			console.error('Error updating request status:', error);
		} finally {
			setLoading(false);
			window.location.reload();
		}
	};

	const handleAccept = () => {
		const updatedRequest = {
			...request,
			status: 'accepted',
		};

		setUpdatedRequest(updatedRequest);
		setNewStatus('accept');
		setConfirm(true);
	};

	const handleReject = () => {
		const updatedRequest = {
			...request,
			status: 'rejected',
		};

		setUpdatedRequest(updatedRequest);
		setNewStatus('reject');
		setConfirm(true);
	};

	console.log(newStatus);
	return (
		<div className={`flex flex-col sm:flex-row items-center justify-around  gap-4 p-4 bg-gradient-to-r ${cardColor} from-base-100  rounded-lg shadow-md`}>
			<div className="flex gap-4">
				<div className="relative flex flex-col items-center  shrink-0">
					<div className="avatar">
						<div className="w-14 h-14 ring ring-primary rounded-full ">
							<img src={requester?.photoURL} alt={requester?.name} />
						</div>
					</div>
					{requester?.isPremium && (
						<span className="absolute top-0 right-0  text-primary text-xl rounded-full shadow-md">
							<RiVerifiedBadgeFill />
						</span>
					)}
					<p className="mt-2 text-xs text-center">{requester?.name}</p>
				</div>
				<div className="relative flex flex-col items-center">
					<div className="flex items-center gap-3">
						<img src={swapBook?.cover} alt={swapBook?.title} className="object-contain h-20 shadow-sm" />
						<div className="text-sm">
							<p className="font-semibold mb-1">{swapBook?.title}</p>
							<p>{swapBook?.author}</p>
						</div>
					</div>
				</div>
			</div>

			{request?.is_lend ? <GoArrowLeft size={50} /> : <IoSwapHorizontalOutline size={50} />}

			<div className="flex gap-4">
				<div className="relative flex flex-col items-center">
					<div className="flex items-center gap-3">
						<div className="text-sm">
							<p className="font-semibold mb-1">{reqBook?.title}</p>
							<p>{reqBook?.author}</p>
						</div>
						<img src={reqBook?.cover} alt={reqBook?.title} className="object-contain h-20 shadow-sm" />
					</div>
				</div>
				<div className="relative flex flex-col items-center  shrink-0">
					<div className="avatar">
						<div className="w-14 h-14 ring ring-primary rounded-full ">
							<img src={bookOwner?.photoURL} alt={bookOwner?.name} />
						</div>
					</div>
					{bookOwner?.isPremium && (
						<span className="absolute top-0 right-0  text-primary text-xl rounded-full shadow-md">
							<RiVerifiedBadgeFill />
						</span>
					)}
					<p className="mt-2 text-xs text-center">{bookOwner?.name}</p>
				</div>
			</div>

			<div className="flex gap-2 mt-2 sm:mt-0">
				{request.status === 'pending' && (
					<div className="flex flex-col gap-2">
						<button className="btn btn-sm btn-primary" onClick={handleAccept}>
							Accept
						</button>
						<button className="btn btn-sm btn-error" onClick={handleReject}>
							Reject
						</button>
					</div>
				)}
			</div>

			<ConfirmModal
				isOpen={confirm}
				title={`Confirm ${newStatus} request?`}
				onSubmit={() => updateRequest()}
				onCancel={() => setConfirm(false)}
				disableCancel={false}
				handleClose={() => setConfirm(false)}
				submitBtnText="Confirm"
			/>

			{loading && <FullScreenSpinner />}
		</div>
	);
};

export default OthersRequestCard;
