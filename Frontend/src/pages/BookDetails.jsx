import { useState } from 'react';
import '../styles/BookDetails.css';

const BookDetails = ({ onBack }) => {
	const books = [
		{
			title: 'পথের পাঁচালী',
			author: 'বিভূতিভূষণ বন্দ্যোপাধ্যায়',
			status: 'Available',
			genre: 'Novel',
		},
		{
			title: 'দেবদাস',
			author: 'শরৎচন্দ্র চট্টোপাধ্যায়',
			status: 'Reserved',
			genre: 'Romance',
		},
		{
			title: 'সাতকাহন',
			author: 'সমরেশ মজুমদার',
			status: 'Checked Out',
			genre: 'Drama',
		},
		{
			title: 'চাঁদের পাহাড়',
			author: 'বিভূতিভূষণ বন্দ্যোপাধ্যায়',
			status: 'Available',
			genre: 'Adventure',
		},
	];

	const [searchTerm, setSearchTerm] = useState('');

	const filteredBooks = books.filter(
		(book) => book.title.toLowerCase().includes(searchTerm.toLowerCase()) || book.author.toLowerCase().includes(searchTerm.toLowerCase()) || book.genre.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="book-details-container">
			<div className="header-section">
				<h2>📚 Search New Book</h2>
				<button className="back-btn" onClick={onBack}>
					← Go Back
				</button>
			</div>

			{/* 🔍 Search Bar */}
			<div className="search-bar">
				<input type="text" placeholder="Search by title, author, or genre..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
			</div>

			<div className="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>Status</th>
							<th>Genre</th>
							<th>Request</th>
						</tr>
					</thead>
					<tbody>
						{filteredBooks.map((book, i) => (
							<tr key={i}>
								<td>{book.title}</td>
								<td>{book.author}</td>
								<td>
									<span className={`status-badge ${book.status.toLowerCase().replace(/\s/g, '-')}`}>{book.status}</span>
								</td>
								<td>{book.genre}</td>
								<td>
									<button className="request-btn">Request</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* 📦 Live Book Info */}
			<div className="live-info">
				<h3>📖 Live Books Info</h3>
				<p>Total Books: {books.length}</p>
				<p>Available: {books.filter((b) => b.status === 'Available').length}</p>
				<p>Checked Out: {books.filter((b) => b.status === 'Checked Out').length}</p>
				<p>Reserved: {books.filter((b) => b.status === 'Reserved').length}</p>
			</div>
		</div>
	);
};

export default BookDetails;
