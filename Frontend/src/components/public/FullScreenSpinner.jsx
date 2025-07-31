const FullScreenSpinner = () => {
	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 backdrop-blur-none">
			<span className="loading loading-ring loading-lg text-primary"></span>
		</div>
	);
};

export default FullScreenSpinner;
