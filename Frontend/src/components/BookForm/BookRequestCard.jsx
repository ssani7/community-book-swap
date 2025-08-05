import { RiVerifiedBadgeFill } from 'react-icons/ri';

const BookRequestCard = ({ request }) => {
	const reqBook = request?.requested_book;
	const requester = request?.requester;
	const swapBook = request?.swap_book;

	return (
		<div className="flex flex-col sm:flex-row items-center  gap-4 p-4 bg-gradient-to-r to-yellow-300 from-base-100  rounded-lg shadow-md">
			<div className="relative flex flex-col items-center w-20 shrink-0">
				<div className="avatar">
					<div className="w-16 h-16 rounded-full ">
						<img src={requester?.photoURL} alt={requester?.name} />
					</div>
				</div>
				{requester.isPremium && (
					<span className="absolute top-0 right-0  text-primary text-xl rounded-full shadow-md">
						<RiVerifiedBadgeFill />
					</span>
				)}
				<p className="mt-2 text-sm text-center break-words max-w-[5rem]">{requester?.name}</p>
			</div>

			<div className="flex-1 w-full text-center">
				<h2 className="text-lg font-semibold break-words">{reqBook?.title}</h2>
				<p className="text-sm text-gray-600 break-words">
					Wants to swap with: <span className="font-medium">{swapBook?.title}</span>
				</p>
			</div>

			<div className="flex gap-2 mt-2 sm:mt-0">
				<div className="badge badge-neutral">Pending</div>
			</div>
		</div>
	);
};

export default BookRequestCard;
