const LendModal = ({ isOpen, onSubmit, onCancel, handleClose, setReturnDate }) => {
	return (
		<>
			<input type="checkbox" className="modal-toggle" checked={isOpen} readOnly />
			<div className="modal ">
				<div className="modal-box text-center p-10">
					<h2 className="font-bold text-xl text-primary">Please confirm your book lending request.</h2>
					<p className="py-4 text-gray-600">Book return Date</p>
					<input type="date" className="input" onChange={(e) => setReturnDate(e.target.value)} />

					<div className="flex justify-center gap-4 mt-6">
						<button
							className="btn btn-error btn-outline"
							onClick={() => {
								onCancel();
							}}>
							Cancel
						</button>

						<button
							className="btn btn-outline btn-primary"
							onClick={() => {
								onSubmit();
							}}>
							Confirm
						</button>
					</div>
				</div>
				<label className="modal-backdrop" onClick={handleClose}></label>
			</div>
		</>
	);
};

export default LendModal;
