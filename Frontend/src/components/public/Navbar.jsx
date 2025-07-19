import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const handleLogout = async () => {
		await signOut(auth);
		navigate('/signin'); //Redirect after logout and login
	};

	return (
		<div className="navbar bg-base-100 shadow-lg justify-between">
			<div className="">
				<a className="text-xl font-bold px-5 cursor-pointer font-sans" onClick={() => navigate('/')}>
					Boi Nagar
				</a>
			</div>

			<div className="flex gap-2">
				<div className="dropdown dropdown-end" onClick={() => setOpen(!open)}>
					{user?.uid ? (
						<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img alt="User avatar" src={user.photoURL || 'https://i.pravatar.cc/150?u=user'} />
							</div>
						</div>
					) : (
						<Link to="/signin">
							<div className="btn btn-primary">Log In</div>
						</Link>
					)}

					{user?.uid && (
						<ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-32 p-2 text-2xl shadow">
							<li>
								<a onClick={() => navigate('/profile')}>Profile</a>
							</li>
							<li>
								<a onClick={() => navigate('/books')}>Books</a>
							</li>
							<li>
								<a onClick={handleLogout}>Logout</a>
							</li>
						</ul>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
