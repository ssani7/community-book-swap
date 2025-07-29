import React, { useState } from 'react';

const BookForm = () => {
	const [formData, setFormData] = useState({
		title: '',
		author: '',
		edition: '',
		publishYear: '',
		condition: 'fresh',
		coverUrl: '',
	});

	const [uploading, setUploading] = useState(false);
	const [imageFile, setImageFile] = useState();
	const [localPreview, setLocalPreview] = useState('');

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handlePreviewImage = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setImageFile(file);

		// Local preview
		setLocalPreview(URL.createObjectURL(file));
	};

	const handleImageUpload = async () => {
		setUploading(true);
		const uploadData = new FormData();
		uploadData.append('file', imageFile);
		uploadData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

		try {
			const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
				method: 'POST',
				body: uploadData,
			});
			const data = await res.json();
			setFormData((prev) => ({ ...prev, coverUrl: data.secure_url }));
		} catch (err) {
			console.error('Upload failed', err);
		} finally {
			setUploading(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData); // Submit logic here (API call etc.)
	};

	return (
		<div className="max-w-xl mx-auto p-6 bg-base-100 shadow-xl rounded-xl mt-10">
			<h2 className="text-3xl font-bold mb-6 text-center">Upload a Book</h2>

			<form onSubmit={handleSubmit} className="space-y-4">
				{/* Book Cover Upload */}
				<div>
					<label className="label font-medium">Book Cover</label>

					<div
						className="w-full h-40 border-2 border-dashed border-base-300 flex items-center justify-center rounded-lg cursor-pointer hover:border-primary transition"
						onClick={() => document.getElementById('coverInput').click()}>
						{localPreview ? (
							<img src={localPreview} alt="Preview" className="h-full object-contain rounded-lg" />
						) : (
							<span className="text-base-content text-opacity-60">Click to select cover image</span>
						)}
					</div>

					<input type="file" accept="image/*" id="coverInput" className="hidden" onChange={handlePreviewImage} />

					{uploading && <span className="loading loading-spinner mt-2 block"></span>}

					{localPreview && !formData.coverUrl && (
						<button type="button" onClick={handleImageUpload} className="btn btn-outline btn-sm mt-2">
							Upload to Cloudinary
						</button>
					)}

					{formData.coverUrl && !uploading && <p className="text-success text-sm mt-2">Uploaded to Cloudinary!</p>}
				</div>

				{/* Title */}
				<div>
					<label className="label font-medium">Title</label>
					<input type="text" name="title" className="input input-bordered w-full" value={formData.title} onChange={handleChange} required />
				</div>

				{/* Author */}
				<div>
					<label className="label font-medium">Author</label>
					<input type="text" name="author" className="input input-bordered w-full" value={formData.author} onChange={handleChange} required />
				</div>

				{/* Edition */}
				<div>
					<label className="label font-medium">Edition</label>
					<input type="text" name="edition" className="input input-bordered w-full" value={formData.edition} onChange={handleChange} />
				</div>

				{/* Publish Year */}
				<div>
					<label className="label font-medium">Publish Year</label>
					<input type="number" name="publishYear" className="input input-bordered w-full" value={formData.publishYear} onChange={handleChange} />
				</div>

				{/* Condition */}
				<div>
					<label className="label font-medium">Condition</label>
					<select name="condition" className="select select-bordered w-full" value={formData.condition} onChange={handleChange}>
						<option value="fresh">Fresh</option>
						<option value="old">Old</option>
						<option value="very old">Very Old</option>
					</select>
				</div>

				{/* Submit Button */}
				<div className="text-right">
					<button type="submit" className="btn btn-primary">
						Submit Book
					</button>
				</div>
			</form>
		</div>
	);
};

export default BookForm;
