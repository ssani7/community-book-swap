const ConfirmModal = ({ isOpen, title, onSubmit, onCancel, disableCancel, handleClose, submitBtnText = 'Confirm' }) => {
	return (
		<>
			<input type="checkbox" className="modal-toggle" checked={isOpen} readOnly />
			<div className="modal ">
				<div className="modal-box text-center p-10">
					<h2 className="font-bold text-xl text-primary">⚠️{title}</h2>
					<p className="py-4 text-gray-600">This action cannot be undone</p>

					<div className="flex justify-center gap-4 mt-6">
						{!disableCancel && (
							<button
								className="btn btn-error btn-outline"
								onClick={() => {
									onCancel();
								}}>
								Cancel
							</button>
						)}

						<button
							className="btn btn-outline btn-primary"
							onClick={() => {
								onSubmit();
							}}>
							{submitBtnText}
						</button>
					</div>
				</div>
				<label className="modal-backdrop" onClick={handleClose}></label>
			</div>
		</>
	);
};

export default ConfirmModal;
