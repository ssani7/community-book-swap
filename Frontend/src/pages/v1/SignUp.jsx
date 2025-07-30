import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosClient from '../../utils/Axios';
import useAuth from '../../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import signUpImage from '../../assets/images/book1.jpeg';
import '../../styles/style.css';

const SignUp = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors: formErrors },
	} = useForm();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	const password = watch('password', '');

	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { setUserData } = useAuth();

	async function handleSignUp(data) {
		console.log(data);
		setLoading(true);
		try {
			const resp = await axiosClient.post('/signup', data);
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
				<div className="w-1/2 hidden lg:block">
					<img src={signUpImage} alt="" className="object-cover h-full" />
				</div>

				<div className="right w-1/2">
					<h2 className="text-center lg:text-left">Create Your Account 📘</h2>
					<p className="text-center lg:text-left">Join Boi Nagar to explore and buy your favorite books!</p>

					<form onSubmit={handleSubmit(handleSignUp)} className="flex flex-col gap-4 mt-4">
						<div>
							<label className="label">
								<span className="label-text">Full Name</span>
							</label>
							<input
								type="text"
								placeholder="Full Name"
								{...register('name', {
									required: 'Name is required',
								})}
								className={`input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${formErrors.name ? 'ring ring-red-500' : ''}`}
							/>
							{formErrors.name && <p className="sign-up-error">{formErrors.name.message}</p>}
						</div>

						{/* Phone Number */}
						<div>
							<label className="label">
								<span className="label-text">Phone Number</span>
							</label>
							<input
								type="text"
								placeholder="Enter 11-digit phone number"
								{...register('phone', {
									required: 'Phone number is required',
									pattern: {
										value: /^01\d{9}$/,
										message: 'Phone must be 11 digits and start with "01"',
									},
								})}
								className={`input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500 w-full ${formErrors.phone ? 'ring ring-red-500' : ''}`}
							/>
							{formErrors.phone && <p className="sign-up-error">{formErrors.phone.message}</p>}
						</div>

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
							{formErrors.email && <p className="sign-up-error">{formErrors.email.message}</p>}
						</div>

						{/* Password */}
						<div>
							<label className="label">
								<span className="label-text">Password (Password must be at least 8 characters and include 1 special character.)</span>
							</label>
							<div className="relative">
								<input
									type={showPassword ? 'text' : 'password'}
									placeholder="Enter your password"
									{...register('password', {
										required: 'Password is required',
										minLength: {
											value: 8,
											message: 'Password must be at least 8 characters',
										},
										pattern: {
											value: /^(?=.*[!@#$%^&*])/,
											message: 'Must include at least 1 special character',
										},
									})}
									className={`input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pr-12 ${formErrors.password ? 'ring ring-red-500' : ''}`}
								/>
								<button type="button" className="absolute right-3 top-3 text-gray-500 cursor-pointer z-50" onClick={() => setShowPassword((prev) => !prev)} tabIndex={-1}>
									{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
							{formErrors.password && <p className="sign-up-error">{formErrors.password.message}</p>}
						</div>

						{/* Confirm Password */}
						<div>
							<label className="label">
								<span className="label-text">Confirm Password</span>
							</label>
							<div className="relative">
								<input
									type={showConfirm ? 'text' : 'password'}
									placeholder="Re-enter your password"
									{...register('password_confirmation', {
										required: 'Password must be confirmed',
										validate: (value) => value === password || 'Passwords do not match',
									})}
									className={`input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500 w-full pr-12 ${formErrors.password_confirmation ? 'ring ring-red-500' : ''}`}
								/>
								<button type="button" className="absolute right-3 top-3 text-gray-500 cursor-pointer z-50" onClick={() => setShowConfirm((prev) => !prev)} tabIndex={-1}>
									{showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
								</button>
							</div>
							{formErrors.password_confirmation && <p className="sign-up-error">{formErrors.password_confirmation.message}</p>}
						</div>

						{/* Submit */}
						<div className="text-center mt-5">
							<button className="btn btn-primary w-full" disabled={loading} type="submit">
								{loading && <span className="loading loading-spinner"></span>}
								Sign Up
							</button>
						</div>
						{error && <p className="sign-up-error">{error}</p>}

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
