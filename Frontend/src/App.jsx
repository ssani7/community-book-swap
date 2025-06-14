import viteLogo from './assets/banner.jpg';
import './App.css';

function App() {
	return (
		<>
			<div>
				<h1>Welcome to Boi Nagar.</h1>
				<img src={viteLogo} style={{ width: '100%', maxHeight: '60vh', borderRadius: '2rem' }} alt="Vite logo" />
				<h1>Let's read books!</h1>
			</div>
		</>
	);
}

export default App;
