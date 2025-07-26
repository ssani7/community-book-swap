import React from 'react';
import { ArrowRightCircle, RefreshCw, Heart, Share2 } from 'lucide-react';
import { featuredBooks, categories } from '../../utils/Books';
import { useParams, Link } from 'react-router-dom';

export default function BookDetailsPage() {
	const { id } = useParams();
	const book = featuredBooks.find((b) => b.bookId === id);
	if (!book) return <div>Book not found</div>;

	const { cover, title, author, publisher, publishYear, edition, condition, owner, description } = book;

	const relatedBooks = featuredBooks.filter((_, idx) => String(idx) !== id);

	return (
		<div className="min-h-screen bg-base-200 pt-5">
			{/* Main layout */}
			<div className="flex flex-col xl:flex-row gap-6 mx-auto w-fit">
				{/* Book card */}
				<div className="flex flex-col ">
					<div className="bg-base-100 rounded-lg shadow-lg p-6 flex flex-col md:flex-row h-fit">
						<div className="flex-shrink-0">
							<img src={cover} alt={title} className="w-full max-h-[50vh] object-contain mb-4 md:mb-0" />
						</div>
						<div className="text-left pl-0 md:pl-8 flex flex-col">
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
							<div className="mt-5 flex flex-wrap lg:flex-nowrap gap-2">
								<button className="btn btn-primary flex items-center space-x-2">
									<ArrowRightCircle className="w-5 h-5" />
									<span>Lend</span>
								</button>
								<button className="btn btn-secondary flex items-center space-x-2">
									<RefreshCw className="w-5 h-5" />
									<span>Swap</span>
								</button>
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
					{/* Summary */}
					{book.summary && (
						<div className="w-full mx-auto mt-6 md:max-w-screen-lg bg-base-100 p-6 rounded-lg text-left">
							<h2 className="text-2xl font-bold mb-2">Summary</h2>
							<p className="text-gray-700 leading-relaxed">{book.summary}</p>
						</div>
					)}

					{/* Description */}
					{description && (
						<div className="w-full mx-auto mt-4 md:max-w-screen-lg bg-base-100 p-6 border-t rounded-lg text-left">
							<h2 className="text-2xl font-bold mb-2">About this book</h2>
							<p className="text-gray-700 leading-relaxed">{description}</p>
						</div>
					)}

					{/* Owner's Thoughts */}
					{book.ownersThoughts && (
						<div className="w-full mx-auto mt-4 mb-6 md:max-w-screen-lg bg-base-100 p-6 mt-4 rounded-lg text-left">
							<h2 className="text-2xl font-bold mb-2">Owner’s Thoughts</h2>
							<p className="italic text-gray-600 leading-relaxed">{book.ownersThoughts}</p>
						</div>
					)}
				</div>

				{/* Related books */}
				<aside className="bg-base-100 rounded-lg px-5 pt-3">
					<h2 className="text-xl font-semibold mb-2 text-left">Related Books</h2>
					<div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-1 gap-4">
						{relatedBooks.map((rb, idx) => (
							<Link key={idx} to={`/books/${rb.bookId}`}>
								<div className="card card-compact flex xl:flex-row h-full xl:w-80 shadow hover:shadow-lg">
									<img src={rb.cover} alt={rb.title} className="object-contain max-w-full h-40 mx-auto" />
									<div className="card-body p-2">
										<h3 className="font-semibold text-sm">{rb.title}</h3>
										<p className="text-xs text-gray-500">Owner: {rb.owner}</p>
									</div>
								</div>
							</Link>
						))}
					</div>
				</aside>
			</div>
		</div>
	);
}
