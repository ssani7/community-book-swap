import React, { useEffect, useState } from 'react';
import axiosClient from '../../../utils/Axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function MyBooks() {
	const { user } = useSelector((state) => state.auth);

	const [books, setBooks] = useState([]);
	useEffect(() => {
		(async () => {
			try {
				const response = await axiosClient.get(`${import.meta.env.VITE_API_BASE_URL}/api/books/?owner_id=${user.id}`);
				// if (!response.ok) {
				// 	throw new Error('Network response was not ok');
				// }
				console.log(response);
				setBooks((prev) => [...prev, ...response.data]);
			} catch (error) {
				console.error('Error fetching books:', error);
			}
		})();
	}, [user.id]);

	const [selectedIds, setSelectedIds] = useState([]);

	// Toggle single checkbox
	const toggleSelect = (id) => {
		setSelectedIds((prev) => (prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]));
	};

	// Toggle all checkboxes
	const toggleSelectAll = () => {
		if (selectedIds.length === books.length) {
			setSelectedIds([]);
		} else {
			setSelectedIds(books.map((b) => b.id));
		}
	};

	// Delete selected books
	const deleteSelected = () => {
		setBooks((prev) => prev.filter((b) => !selectedIds.includes(b.id)));
		setSelectedIds([]);
	};

	return (
		<div className="p-6">
			<button className="btn btn-error mb-4" onClick={deleteSelected} disabled={selectedIds.length === 0}>
				Delete Selected
			</button>

			<Link className="float-end" to="/add-book">
				<button className="btn btn-primary">Add a Book</button>
			</Link>

			<div className="overflow-x-auto">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th>
								<label>
									<input type="checkbox" className="checkbox" checked={selectedIds.length === books.length && books.length > 0} onChange={toggleSelectAll} />
								</label>
							</th>
							<th>Book</th>
							<th>Genre</th>
							<th>Status</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{books.map((book) => (
							<tr>
								<th>
									<label>
										<input type="checkbox" className="checkbox" checked={selectedIds.includes(book.id)} onChange={() => toggleSelect(book.id)} />
									</label>
								</th>
								<td>
									<div className="flex items-center gap-3">
										<div className="avatar">
											<div className="mask mask-squircle h-12 w-12">
												<img src={book.cover} alt="Avatar Tailwind CSS Component" />
											</div>
										</div>
										<div>
											<div className="font-bold">{book.title}</div>
											<div className="text-sm opacity-50">{book.author}</div>
										</div>
									</div>
								</td>
								<td>{book.genre}</td>
								<td className="text-center">
									<span className="badge badge-ghost badge-sm">{book.status || 'Unavailable'}</span>
								</td>
								<th>
									<Link to={`/books/${book.id}`}>
										<button className="btn btn-primary btn-outline btn-xs">See Book</button>
									</Link>
								</th>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
