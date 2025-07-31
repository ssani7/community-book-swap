import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
	// <StrictMode>
	<BrowserRouter>
		<Provider store={store}>
			<App />
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 3000,
					style: {
						background: '#333',
						color: '#fff',
					},
				}}
			/>
		</Provider>
	</BrowserRouter>
	// </StrictMode>
);
