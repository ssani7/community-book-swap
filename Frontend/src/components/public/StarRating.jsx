function StarRating({ rating }) {
	const fullStars = Math.floor(rating);
	const halfStar = rating - fullStars >= 0.5;
	const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

	return (
		<div className="flex text-yellow-400">
			{Array(fullStars)
				.fill()
				.map((_, i) => (
					<svg key={`full-${i}`} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.388 2.455a1 1 0 00-.364 1.118l1.286 3.974c.3.922-.755 1.688-1.54 1.117l-3.388-2.454a1 1 0 00-1.176 0l-3.388 2.454c-.784.571-1.838-.195-1.539-1.117l1.285-3.974a1 1 0 00-.364-1.118L2.047 9.402c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.975z" />
					</svg>
				))}
			{halfStar && (
				<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.388 2.455a1 1 0 00-.364 1.118l1.286 3.974c.3.922-.755 1.688-1.54 1.117l-3.388-2.454a1 1 0 00-.588-.196V2.927z" />
				</svg>
			)}
			{Array(emptyStars)
				.fill()
				.map((_, i) => (
					<svg key={`empty-${i}`} className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
						<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.975a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.388 2.455a1 1 0 00-.364 1.118l1.286 3.974c.3.922-.755 1.688-1.54 1.117l-3.388-2.454a1 1 0 00-1.176 0l-3.388 2.454c-.784.571-1.838-.195-1.539-1.117l1.285-3.974a1 1 0 00-.364-1.118L2.047 9.402c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.975z" />
					</svg>
				))}
		</div>
	);
}

export default StarRating;
