import { Link } from 'react-router-dom';
import { categories } from '../../utils/Books';
import { ArrowRightCircle, RefreshCw, Heart, Share2 } from 'lucide-react';

const BookCard = ({ book, requestView = false }) => {
	const { cover, title, author, publisher, publishYear, edition, condition, owner } = book;

	if (!book?.id) return null;
	return (
		<div className="bg-base-100 rounded-lg  p-6 flex flex-col items-center sm:flex-row md:items-start h-fit">
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
					{requestView && (
						<Link to={`/books/${book.bookId}`}>
							<button className="btn btn-primary flex items-center space-x-2">
								<span>See Details</span>
							</button>
						</Link>
					)}

					{!requestView && (
						<button className="btn btn-primary flex items-center space-x-2">
							<ArrowRightCircle className="w-5 h-5" />
							<span>Lend</span>
						</button>
					)}

					{!requestView && (
						<button className="btn btn-secondary flex items-center space-x-2">
							<RefreshCw className="w-5 h-5" />
							<span>Swap</span>
						</button>
					)}

					<button className="btn btn-outline flex items-center space-x-2">
						<Share2 className="w-5 h-5" />
						<span>Share</span>
					</button>

					<button className="btn btn-ghost flex items-center space-x-2">
						<Heart className="w-5 h-5" />
						<span>Favorite</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default BookCard;
