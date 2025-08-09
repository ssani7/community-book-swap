// BookUploadSuccessModal.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookUploadSuccessModal = ({ isOpen, onClose, onUploadNew }) => {
	const navigate = useNavigate();
	return (
		<>
			<input type="checkbox" className="modal-toggle" checked={isOpen} readOnly />
			<div className="modal ">
				<div className="modal-box text-center p-10">
					<h2 className="font-bold text-xl text-green-600">🎉 Book Uploaded Successfully!</h2>
					<p className="py-4 text-gray-600">What would you like to do next?</p>

					<div className="flex justify-center gap-4 mt-6">
						<button
							className="btn btn-primary"
							onClick={() => {
								onUploadNew();
								onClose();
							}}>
							Upload New Book
						</button>
						<button
							className="btn btn-outline"
							onClick={() => {
								onClose();
								navigate('/my-books');
							}}>
							Go to My Books
						</button>
					</div>
				</div>
				<label className="modal-backdrop"></label>
			</div>
		</>
	);
};

export default BookUploadSuccessModal;
