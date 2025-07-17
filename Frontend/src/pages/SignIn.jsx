import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

export default function SignIn() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSignIn = async (e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold text-center mb-6">Sign In</h1>

				<form className="flex flex-col gap-4" onSubmit={handleSignIn}>
					<input type="email" placeholder="Email" className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />

					<input
						type="password"
						placeholder="Password"
						className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					{error && <p className="text-red-500 text-sm text-center">{error}</p>}

					<button className="bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition">Sign In</button>
				</form>

				<p className="mt-4 text-sm text-center">
					Don’t have an account?{' '}
					<Link to="/signup" className="text-blue-500 hover:underline">
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}
