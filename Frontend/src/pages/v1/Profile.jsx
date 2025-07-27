import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RiVerifiedBadgeFill } from 'react-icons/ri';
import { FaBookOpen, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaEdit } from 'react-icons/fa';
import defultUser from '../../assets/images/no-user.png';
import axiosClient from '../../utils/Axios';

const CLOUDINARY_UPLOAD_PRESET = 'boi-nagar';
const CLOUDINARY_CLOUD_NAME = 'ssani7';

const Profile = () => {
	const { user } = useSelector((state) => state.auth);
	const [editMode, setEditMode] = useState(false);
	const [editedUser, setEditedUser] = useState(user);
	console.log(editedUser);
	const [photoPreview, setPhotoPreview] = useState(user?.photoURL || defultUser);
	const [uploading, setUploading] = useState(false);

	const booksOwned = [
		{
			id: 1,
			title: 'The Great Gatsby',
			author: 'F. Scott Fitzgerald',
			coverImage: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
		},
		{
			id: 2,
			title: '1984',
			author: 'George Orwell',
			coverImage: 'https://covers.openlibrary.org/b/id/7222241-L.jpg',
		},
		{
			id: 3,
			title: 'To Kill a Mockingbird',
			author: 'Harper Lee',
			coverImage: 'https://covers.openlibrary.org/b/id/8228691-L.jpg',
		},
	];

	const uploadImageToCloudinary = async (file) => {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

		try {
			setUploading(true);
			const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/upload`, {
				method: 'POST',
				body: formData,
			});
			const data = await response.json();
			setUploading(false);

			if (data.secure_url) {
				setPhotoPreview(data.secure_url);
				setEditedUser((prev) => ({ ...prev, photoURL: data.secure_url }));
			} else {
				alert('Upload failed, please try again.');
			}
		} catch (error) {
			setUploading(false);
			alert('Error uploading image.');
			console.error(error);
		}
	};

	const handlePhotoChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			uploadImageToCloudinary(file);
		}
	};

	const handleUpdate = async () => {
		try {
			const resp = await axiosClient.put(`/users/${user.id}`, editedUser);
			console.log(resp);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="max-w-6xl mx-auto p-6 space-y-10">
			{/* Profile Info */}
			<div className="card bg-base-100 shadow-xl p-6 flex flex-col sm:flex-row items-start gap-6">
				<div className={`relative group cursor-pointer ${editMode ? '' : 'pointer-events-none'}`}>
					<label className="avatar">
						<div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 relative overflow-hidden">
							<img src={photoPreview} alt="User" className={`${uploading ? 'opacity-50' : ''}`} />
							{editMode && !uploading && (
								<div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
									Click to change
								</div>
							)}
							{uploading && <div className="absolute inset-0 bg-black bg-opacity-40 flex justify-center items-center text-white text-xs font-semibold">Uploading...</div>}
							<input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" disabled={!editMode || uploading} />
						</div>
					</label>
					{user?.isPremium && (
						<div className="absolute top-0 right-0 text-primary" title="Verified Subscriber">
							<RiVerifiedBadgeFill size={30} />
						</div>
					)}
				</div>

				<div className="text-center sm:text-left space-y-3 flex-1">
					<div className="flex justify-between items-center">
						<h2 className="text-2xl font-bold">{user.name}</h2>
						<button className="btn btn-sm btn-outline btn-primary" onClick={() => setEditMode((prev) => !prev)}>
							<FaEdit /> {editMode ? 'Cancel' : 'Edit'}
						</button>
					</div>

					{editMode ? (
						<div className="space-y-2">
							<input className="input input-bordered w-full" placeholder="Name" value={editedUser.name} onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })} />
							<input className="input input-bordered w-full" placeholder="Email" value={editedUser.email} onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })} />
							<input className="input input-bordered w-full" placeholder="Phone" value={editedUser.phone} onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })} />
							<input className="input input-bordered w-full" placeholder="Location" value={editedUser.location} onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })} />
							<button className="btn btn-primary mt-2" disabled={uploading} onClick={handleUpdate}>
								Save Changes
							</button>
						</div>
					) : (
						<>
							<div className="text-sm text-gray-500 flex items-center gap-2">
								<FaEnvelope className="text-primary" /> {user?.email}
							</div>
							<div className="text-sm text-gray-500 flex items-center gap-2">
								<FaPhoneAlt className="text-primary" /> {user?.phone}
							</div>
							<div className="text-sm text-gray-500 flex items-center gap-2">
								<FaMapMarkerAlt className="text-primary" /> {user?.location}
							</div>

							<div className="flex flex-wrap gap-4 mt-4 justify-center sm:justify-start">
								<div className="stats shadow bg-base-200">
									<div className="stat">
										<div className="stat-figure text-primary">
											<FaBookOpen className="text-2xl" />
										</div>
										<div className="stat-title">Swapped</div>
										<div className="stat-value text-primary">{user?.booksSwapped || 0}</div>
									</div>
								</div>
								<div className="stats shadow bg-base-200">
									<div className="stat">
										<div className="stat-figure text-success">
											<FaBookOpen className="text-2xl" />
										</div>
										<div className="stat-title">Returned</div>
										<div className="stat-value text-success">{user?.booksReturned || 0}</div>
									</div>
								</div>
							</div>
						</>
					)}
				</div>
			</div>

			{/* Owned Books */}
			<div className="space-y-4">
				<h2 className="text-xl font-bold">Books Owned</h2>
				<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
					{booksOwned.map((book) => (
						<div key={book.id} className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
							<figure className="h-48 overflow-hidden">
								<img src={book.coverImage} alt={book.title} className="object-cover w-full h-full" />
							</figure>
							<div className="card-body p-4">
								<h3 className="card-title text-sm truncate" title={book.title}>
									{book.title}
								</h3>
								<p className="text-xs text-gray-500 truncate" title={book.author}>
									{book.author}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Profile;
