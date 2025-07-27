import { useState } from 'react';
import '../styles/Profile.css';
import BookDetails from './BookDetails';
import { useSelector } from 'react-redux';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import defultUser from '../assets/images/no-user.png';

const Profile = () => {
	const { user } = useSelector((state) => state.auth);

	const [tab, setTab] = useState('books');

	const [showSearch, setShowSearch] = useState(false); // 👈 Toggle for BookDetails

	const [books] = useState([
		{
			title: 'The Secret Garden',
			author: 'Frances Burnett',
			status: 'Available',
			due: '2024-08-15',
		},
		{
			title: 'Pride and Prejudice',
			author: 'Jane Austen',
			status: 'Checked Out',
			due: '2024-07-20',
		},
		{
			title: 'To Kill a Mockingbird',
			author: 'Harper Lee',
			status: 'Reserved',
			due: '2024-07-25',
		},
	]);

	const bookRequests = books.slice(0, 2);

	// 🔁 Show BookDetails component if toggled
	if (showSearch) {
		return <BookDetails onBack={() => setShowSearch(false)} />;
	}

	return (
		<div className="profile-container">
			<div className="bg-base-100  h-fit p-6 rounded-lg shadow-lg flex flex-col items-center text-center lg:text-left lg:col-span-3">
				<div className="relative mb-4">
					<img src={user?.photoURL || defultUser} alt="" className="w-32 h-32 rounded-full shadow-lg ring ring-primary  object-cover mx-auto" />
					{user?.isPremium && (
						<div className="absolute top-0 right-0 text-primary text-3xl">
							<RiVerifiedBadgeFill />
						</div>
					)}
				</div>
				<h2 className="text-2xl font-bold mb-1 truncate max-w-xs">{user?.name}</h2>
				<p className="text-gray-600 mb-2 truncate max-w-xs">{user?.email}</p>
				<p className="text-gray-600 mb-2 truncate max-w-xs">{user?.phone}</p>
				<p className="text-gray-600 mb-2 truncate max-w-xs">{user?.location}</p>
				<p className="text-sm text-gray-500 mb-4 truncate max-w-xs">
					{user?.starRating || 0} returns ({user?.totalReviews || 0} swaps)
				</p>
			</div>

			<div className="search-section mt-3">
				<button onClick={() => setShowSearch(true)} className="search-book-link">
					🔍 Search New Book
				</button>
			</div>

			<div className="tab-buttons">
				<button className={tab === 'books' ? 'active' : ''} onClick={() => setTab('books')}>
					My Books
				</button>
				<button className={tab === 'requests' ? 'active' : ''} onClick={() => setTab('requests')}>
					Book Requests
				</button>
			</div>

			<div className="table-wrapper">
				<table>
					<thead>
						<tr>
							<th>Title</th>
							<th>Author</th>
							<th>Status</th>
							<th>Due Date</th>
						</tr>
					</thead>
					<tbody>
						{(tab === 'books' ? books : bookRequests).map((book, index) => (
							<tr key={index}>
								<td>{book.title}</td>
								<td>{book.author}</td>
								<td>
									<span className={`status-badge ${book.status.replace(/\s/g, '').toLowerCase()}`}>{book.status}</span>
								</td>
								<td>{book.due}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
export default Profile;
