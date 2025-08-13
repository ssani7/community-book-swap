import React from 'react';
import { Link } from 'react-router-dom';

const BookPreviewCard = ({ book }) => {
	return (
		<Link to={`/books/${book?.id}`} className="group">
			<div className="card bg-base-100 shadow p-4 h-full">
				<img src={book?.cover} alt={book?.title} className="w-36 h-64 mx-auto object-contain rounded" />
				<div className="mt-2">
					<h3 className="font-bold text-lg">{book?.title}</h3>
					<p className="text-sm text-gray-500">Author: {book?.author}</p>
					<p className="text-sm text-gray-500">Owner: {book?.owner}</p>
				</div>
			</div>
		</Link>
	);
};

export default BookPreviewCard;
