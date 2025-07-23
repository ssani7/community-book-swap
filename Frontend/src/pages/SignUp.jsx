import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			// await createUserWithEmailAndPassword(auth, email, password);
			const resp = await fetch(`${import.meta.env.VITE_SOME_KEY}/api/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
			console.log(resp);
			// navigate('/');
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold text-center mb-6">Sign Up</h1>

				<form className="flex flex-col gap-4" onSubmit={handleSignUp}>
					<input type="email" placeholder="Email" className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" value={email} onChange={(e) => setEmail(e.target.value)} />

					<input
						type="password"
						placeholder="Password (min 6 chars)"
						className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>

					{error && <p className="text-red-500 text-sm text-center">{error}</p>}

					<button className="bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition">Sign Up</button>
				</form>

				<p className="mt-4 text-sm text-center">
					Already have an account?{' '}
					<Link to="/signin" className="text-blue-500 hover:underline">
						Sign In
					</Link>
				</p>
			</div>
		</div>
	);
}
