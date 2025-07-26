import React, { useState } from 'react';
import '../styles/Profile.css';
import BookDetails from './BookDetails';
import { getAuth } from 'firebase/auth';
import defaultProfile from '../assets/images/no-user.png';

const Profile = () => {
	const auth = getAuth();
	const user = auth.currentUser;

	console.log(auth);

	const [name] = useState(user?.displayName || 'Emran Haque');
	const [email] = useState(user?.email || 'emran@example.com');
	const [points] = useState(120);
	const [profilePic] = useState();

	const [editMode, setEditMode] = useState(false);
	const [tab, setTab] = useState('books');

	const [phone, setPhone] = useState(() => {
		return localStorage.getItem('userPhone') || '+8801XXXXXXXXX';
	});

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

	const handleSave = () => {
		localStorage.setItem('userPhone', phone);
		setEditMode(false);
	};

	// 🔁 Show BookDetails component if toggled
	if (showSearch) {
		return <BookDetails onBack={() => setShowSearch(false)} />;
	}

	return (
		<div className="profile-container">
			<div className="profile-card-enhanced">
				<img src={profilePic ?? defaultProfile} alt="Profile" className="profile-avatar" />
				{!editMode ? (
					<div className="profile-info">
						<h2 className="profile-name">{name}</h2>
						<p>Email: {email}</p>
						<p>Phone: {phone}</p>
						<p>Points: {points}</p>
					</div>
				) : (
					<div className="profile-edit">
						<label>Phone</label>
						<input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
						<div className="edit-actions">
							<button className="save-btn" onClick={handleSave}>
								Save
							</button>
							<button className="cancel-btn" onClick={() => setEditMode(false)}>
								Cancel
							</button>
						</div>
					</div>
				)}
			</div>

			<div className="search-section">
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
