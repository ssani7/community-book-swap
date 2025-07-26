// Shakibul Islam
// Created on: 19/07/2025

import { Link, useNavigate } from 'react-router-dom';
import '../../styles/style.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../firebase';

const SignUp = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleSignUp(e) {
		e.preventDefault();

		if (password !== confirmPass) {
			setError("Passwords don't match");
			return;
		}
		setLoading(true);
		try {
			// await createUserWithEmailAndPassword(auth, email, password);
			// navigate('/');
			const resp = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password, phone, name }),
			});
			console.log(resp);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<div className="container">
				<div className="left signup-img"></div>

				<div className="right">
					<h2>Create Your Account 📘</h2>
					<p>Join Boi Nagar to explore and buy your favorite books!</p>

					<form onSubmit={handleSignUp}>
						<input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
						<input type="email" placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} required />
						<input type="tel" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
						<input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
						<input type="password" onChange={(e) => setConfirmPass(e.target.value)} placeholder="Confirm Password" required />

						{error && <p className="text-error text-sm text-center">{error}</p>}

						<button type="submit" disabled={loading} className="btn btn-wide btn-primary">
							{loading && <span className="loading loading-spinner"></span>}
							Sign Up
						</button>

						<div className="signup flex items-center justify-center">
							Already have an account?
							<Link to="/signin">
								<button className="btn btn-link">Back to Login</button>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
