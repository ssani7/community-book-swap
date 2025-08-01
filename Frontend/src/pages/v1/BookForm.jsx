import React, { useState } from 'react';
import axiosClient from '../../utils/Axios';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import BookUploadSuccessModal from '../../components/BookForm/BookUploadModal';
import FullScreenSpinner from '../../components/public/FullScreenSpinner';
import { bookGenres } from '../../utils/Books'; // Assuming you have a genres.js file exporting an array of genres

const BookForm = () => {
	const { user } = useSelector((state) => state.auth);
	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
		reset,
	} = useForm();

	const [isModalOpen, setModalOpen] = useState(false);
	const [uploading, setUploading] = useState(false);
	const [imageFile, setImageFile] = useState();
	const [localPreview, setLocalPreview] = useState('');

	const handlePreviewImage = async (e) => {
		const file = e.target.files[0];
		console.log(file);

		if (!file) return;

		setImageFile(file);

		// Local preview
		setLocalPreview(URL.createObjectURL(file));
	};

	const handleImageUpload = async () => {
		const uploadData = new FormData();
		uploadData.append('file', imageFile);
		uploadData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

		try {
			const res = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
				method: 'POST',
				body: uploadData,
			});
			const data = await res.json();
			if (data.error) {
				throw new Error(data.error.message);
			}
			return data;
		} catch (err) {
			throw new Error(err);
		}
	};

	const submitBook = async (data) => {
		setUploading(true);

		try {
			const coverResp = await handleImageUpload();
			const bookData = {
				...data,
				cover: coverResp.secure_url,
				owner_id: user.id,
			};
			console.log(bookData);
			const resp = await axiosClient.post(`${import.meta.env.VITE_API_BASE_URL}/api/books`, bookData);
			console.log(resp);
			if (resp.status !== 200) {
				throw new Error('Failed to upload book');
			}
			setModalOpen(true);
		} catch (error) {
			console.log(error);
			toast.error(error.response?.data?.message || error?.message || 'Failed to upload book');
		} finally {
			setUploading(false);
		}
	};

	const resetForm = () => {
		reset();
		setImageFile(null);
		setLocalPreview('');
	};

	return (
		<div className="max-w-[90%] mx-auto p-6 bg-base-100 shadow-xl rounded-xl mt-10">
			<h2 className="text-3xl font-bold mb-6 text-center">Upload a Book</h2>

			<form onSubmit={handleSubmit(submitBook)} className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{/* Book Cover Upload */}
				<div className="h-full pb-4">
					<label className="label font-medium">
						Book Cover (Max size 10 MB) <span className="text-error">*</span>
					</label>
					<div
						className="w-full h-50 lg:h-full max-h-[30vh] border-2 border-dashed border-base-300 flex items-center justify-center rounded-lg cursor-pointer hover:border-primary transition"
						onClick={() => document.getElementById('coverInput').click()}>
						{localPreview ? (
							<img src={localPreview} alt="Preview" className="h-full object-contain rounded-lg" />
						) : (
							<span className="text-base-content text-opacity-60">Click to select cover image</span>
						)}
					</div>

					<input type="file" accept="image/*" id="coverInput" className="hidden" {...register('cover', { required: 'Book cover is required', onChange: (e) => handlePreviewImage(e) })} />
					{formErrors.cover && <p className="form-error-text">{formErrors.cover.message}</p>}
				</div>

				<div className="space-y-4">
					{/* Title */}
					<div>
						<label className="label font-medium">
							Title <span className="text-error">*</span>
						</label>
						<input type="text" name="title" className="input input-bordered w-full" {...register('title', { required: 'Book title is required' })} />
						{formErrors.title && <p className="form-error-text">{formErrors.title.message}</p>}
					</div>

					{/* Author */}
					<div>
						<label className="label font-medium">
							Author <span className="text-error">*</span>
						</label>
						<input type="text" name="author" className="input input-bordered w-full" {...register('author', { required: 'Book author is required' })} />
						{formErrors.author && <p className="form-error-text">{formErrors.author.message}</p>}
					</div>

					{/* Publication */}
					<div>
						<label className="label font-medium">
							Publication Name <span className="text-error">*</span>
						</label>
						<input type="text" name="publisher" className="input input-bordered w-full" {...register('publisher', { required: 'Publication is required' })} />
						{formErrors.publisher && <p className="form-error-text">{formErrors.publisher.message}</p>}
					</div>
				</div>

				{/* Genre */}
				<div>
					<label className="label font-medium">Genre</label>
					<select name="genre" className="select select-bordered w-full" {...register('genre')}>
						{bookGenres.map((genre) => (
							<option key={genre} value={genre}>
								{genre}
							</option>
						))}
					</select>
				</div>

				{/* Edition */}
				<div>
					<label className="label font-medium">Edition</label>
					<input type="text" name="edition" className="input input-bordered w-full" {...register('edition', { required: false })} />
				</div>

				{/* Publish Year */}
				<div>
					<label className="label font-medium">Publish Year</label>
					<input type="number" name="publishYear" className="input input-bordered w-full" {...register('publish_year', { pattern: { value: /^[0-9]{4}$/, message: 'Invalid year format' } })} />
					{formErrors.publish_year && <p className="form-error-text">{formErrors.publish_year.message}</p>}
				</div>

				{/* Condition */}
				<div>
					<label className="label font-medium">Book Condition</label>
					<select name="condition" className="select select-bordered w-full" {...register('condition')}>
						<option value="fresh">Fresh</option>
						<option value="old">Old</option>
						<option value="very old">Very Old</option>
					</select>
				</div>

				{/* Book Description */}
				<div>
					<label className="label font-medium">Book Description</label>
					<textarea name="description" className="textarea textarea-bordered w-full" {...register('description', { required: false })}></textarea>
					{formErrors.description && <p className="form-error-text">{formErrors.description.message}</p>}
				</div>

				{/* Your Thoughts */}
				<div>
					<label className="label font-medium">Your Thoughts</label>
					<textarea name="ownersThoughts" className="textarea textarea-bordered w-full" {...register('owner_thoughts', { required: false })}></textarea>
					{formErrors.owner_thoughts && <p className="form-error-text">{formErrors.owner_thoughts.message}</p>}
				</div>

				{/* Submit Button */}
				<div className="text-right lg:col-span-2">
					<button type="submit" className="btn btn-primary" disabled={uploading}>
						{uploading ? (
							<>
								<span className="loading loading-dots"></span>Submitting Book
							</>
						) : (
							'Submit Book'
						)}
					</button>
				</div>
			</form>
			{uploading && <FullScreenSpinner />}

			{/* Success Modal */}
			<BookUploadSuccessModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} onUploadNew={resetForm} />
		</div>
	);
};

export default BookForm;
