import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { IoSwapHorizontalOutline } from 'react-icons/io5';
import { GoArrowRight } from 'react-icons/go';

const MyRequestCard = ({ request }) => {
	const reqBook = request?.requested_book;
	const requester = request?.requester;
	const bookOwner = request?.book_owner;
	const swapBook = request?.swap_book;

	console.log(request);

	return (
		<div className="flex flex-col sm:flex-row items-center justify-around  gap-4 p-4 bg-gradient-to-r to-yellow-300 from-base-100  rounded-lg shadow-md">
			<div className="flex gap-4">
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
				<div className="relative flex flex-col items-center">
					<div className="flex items-center gap-3">
						<img src={reqBook?.cover} alt={reqBook?.title} className="object-contain h-20 shadow-sm" />
						<div className="text-sm">
							<p className="font-semibold mb-1">{reqBook?.title}</p>
							<p>{reqBook?.author}</p>
						</div>
					</div>
				</div>
			</div>

			{request?.is_lend ? <GoArrowRight size={50} /> : <IoSwapHorizontalOutline size={50} />}

			<div className="flex gap-4">
				<div className="relative flex flex-col items-center">
					<div className="flex items-center gap-3">
						<div className="text-sm">
							<p className="font-semibold mb-1">{swapBook?.title}</p>
							<p>{swapBook?.author}</p>
						</div>
						<img src={swapBook?.cover} alt={swapBook?.title} className="object-contain h-20 shadow-sm" />
					</div>
				</div>
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
			</div>

			<div className="flex gap-2 mt-2 sm:mt-0">
				<div className="badge badge-neutral">Pending</div>
			</div>
		</div>
	);
};

export default MyRequestCard;
