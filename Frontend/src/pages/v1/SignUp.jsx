import { Link, useNavigate } from 'react-router-dom';
import '../../styles/style.css';
import { useState } from 'react';
import axiosClient from '../../utils/Axios';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPass, setConfirmPass] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { setUserData } = useAuth();

	async function handleSignUp(e) {
		e.preventDefault();

		if (password !== confirmPass) {
			setError("Passwords don't match");
			return;
		}
		setLoading(true);
		try {
			const resp = await axiosClient.post('/signup', {
				name,
				email,
				phone,
				password,
				password_confirmation: confirmPass,
			});

			if (resp?.status === 201) {
				const user = resp?.data?.user;
				localStorage.setItem('ACCESS_TOKEN', resp.data.token);
				setUserData(user);
				navigate('/');
			}
		} catch (err) {
			console.log(err);
			setError(err?.response?.data?.message || err?.message);
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
