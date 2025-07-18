import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate(); //used below

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/signin'); //Redirect after logout and login 
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl cursor-pointer" onClick={() => navigate('/')}>
          Boi Nagar
        </a>
      </div>

      <div className="flex gap-2">
        <div className="dropdown dropdown-end">
          {user && (
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="User avatar"
                  src={user.photoURL || 'https://i.pravatar.cc/150?u=user'}
                />
              </div>
            </div>
          )}

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a onClick={() => navigate('/profile')}>Profile</a>
            </li>
            <li>
              <a onClick={() => navigate('/settings')}>Settings</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;