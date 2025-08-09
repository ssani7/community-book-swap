import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import axiosClient from '../../utils/Axios';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import signUpImage from '../../assets//images/book2.jpeg';
import '../../styles/style.css';

const SignIn = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const location = useLocation();
	const { setUserData } = useAuth();
	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
	} = useForm();

	const [showPassword, setShowPassword] = useState(false);

	// Get redirect_url from query params and keep in a variable
	const params = new URLSearchParams(location.search);
	const redirectUrl = params.get('redirect_url');

	const handleSignIn = async (data) => {
		setLoading(true);
		try {
			const resp = await axiosClient.post('/signin', data);

			if (resp?.status == 200) {
				const user = resp?.data?.user;

				localStorage.setItem('ACCESS_TOKEN', resp.data.token);
				setUserData(user);
			}

			navigate(redirectUrl ? decodeURIComponent(redirectUrl) : '/');
		} catch (err) {
			console.log(err);
			setError(err?.response?.data?.message || err?.message);
		} finally {
			setLoading(false);
		}
	};
	return (
		<div>
			<div className="container">
				<div className="w-1/2  hidden lg:block">
					<img src={signUpImage} alt="" className="object-cover h-full" />
				</div>
				<div className="right w-full lg:w-1/2">
					<h2>Welcome to Boi Nagar 📚</h2>
					<p>Login to your account</p>

					<form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col gap-4 mt-4">
						<div>
							<label className="label">
								<span className="label-text">Email</span>
							</label>
							<input
								type="email"
								placeholder="Enter your email"
								{...register('email', {
									required: 'Email is required',
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: 'Invalid email format',
									},
								})}
								className={`input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${formErrors.email ? 'ring ring-red-500' : ''}`}
							/>
							{formErrors.email && <p className="form-error-text">{formErrors.email.message}</p>}
						</div>

						{/* Password */}
						<div>
							<label className="label">
								<span className="label-text wrap-break-word">Password</span>
							</label>
							<div className="relative">
								<input
									type={showPassword ? 'text' : 'password'}
									placeholder="Enter your password"
									{...register('password', {
										required: 'Password is required',
									})}
									className={`input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pr-12 ${formErrors.password ? 'ring ring-red-500' : ''}`}
								/>
								<button type="button" className="absolute right-3 top-3 text-gray-500 cursor-pointer z-50" onClick={() => setShowPassword((prev) => !prev)} tabIndex={-1}>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
						</div>

						{/* Submit */}
						<div className="text-center mt-5">
							<button className="btn btn-primary w-full" disabled={loading} type="submit">
								{loading && <span className="loading loading-dots"></span>}
								Sign In
							</button>
						</div>
						{error && <p className="form-error-text">{error}</p>}

						<div className="signup flex items-center justify-center">
							New to Boi Nagar?
							<Link to={`/signup${redirectUrl ? `?redirect_url=${encodeURIComponent(redirectUrl)}` : ''}`}>
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
