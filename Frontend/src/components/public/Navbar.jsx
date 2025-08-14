import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import defultUser from '../../assets/images/no-user.png';
import useAuth from '../../hooks/useAuth';
import axiosClient from '../../utils/Axios';

const Navbar = () => {
	const [open, setOpen] = useState(false);
	const { user, loading } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const { logoutUser } = useAuth();

	const handleLogout = async () => {
		const resp = await axiosClient.post('/signout');
		console.log(resp);
		logoutUser();
		navigate('/signin');
	};

	return (
		<div className="navbar bg-base-100 shadow-sm justify-between fixed z-50">
			<div className="">
				<Link className="px-5 cursor-pointer satisfy-regular text-2xl font-bold" to={'/'}>
					Boi Nagar
				</Link>
			</div>

			<div className="flex gap-2">
				<div className="dropdown dropdown-end" onClick={() => setOpen(!open)}>
					{loading ? (
						<div className="skeleton h-10 w-10 shrink-0 rounded-full"></div>
					) : (
						<>
							{user?.id ? (
								<div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border border-primary ">
									<div className="w-10 rounded-full">
										<img alt="User avatar" src={user.photoURL || defultUser} />
									</div>
								</div>
							) : (
								<Link to="/signin">
									<div className="btn btn-primary">Log In</div>
								</Link>
							)}

							{user?.id && (
								<ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-32 p-2 text-2xl shadow">
									<li>
										<a onClick={() => navigate(`/profile/${user.id}`)}>Profile</a>
									</li>
									<li>
										<a onClick={() => navigate('/my-books')}>My Books</a>
									</li>
									<li>
										<a onClick={handleLogout}>Logout</a>
									</li>
								</ul>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
