import { Link, useNavigate } from 'react-router-dom';
import '../../styles/style.css';
import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const handleSignIn = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/');
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div>
			<div class="container">
				<div class="left signin-img"></div>
				<div class="right">
					<h2>Welcome to Boi Nagar 📚</h2>
					<p>Login to your account</p>

					<form onSubmit={handleSignIn}>
						<input
							type="email"
							placeholder="Email"
							className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>

						<input
							type="password"
							placeholder="Password"
							className="p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<div class="actions">
							<a href="#">Forgot Password?</a>
						</div>

						{error && <p className="text-error text-sm text-center">{error}</p>}

						<button type="submit" disabled={loading} className="btn btn-wide btn-primary">
							{loading && <span className="loading loading-spinner"></span>}
							Log In
						</button>

						<div class="signup flex items-center justify-center">
							New to Boi Nagar?
							<Link to="/signup">
								<button className="btn btn-link">Create Account</button>
							</Link>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
