import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Ensure you have firebase initialize
import { clearUser, setUser } from './store/AuthSlice';
import AppRoutes from './routes/AppRoutes';
import './App.css';
import '../src/styles/style.css';
import '../src/styles/BookDetails.css';

function App() {
	const dispatch = useDispatch();
	const { user, loading } = useSelector((state) => state.auth);

	console.log(user, loading);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			console.log(firebaseUser);
			if (firebaseUser) {
				dispatch(
					setUser({
						uid: firebaseUser.uid,
						email: firebaseUser.email,
						displayName: firebaseUser.displayName,
						photoURL: firebaseUser.photoURL,
					})
				);
			} else {
				console.log('User is signed out');
				dispatch(clearUser());
			}
		});

		return () => unsubscribe();
	}, [dispatch]);

	if (loading) return <p>Loading auth...</p>;

	return <AppRoutes />;
}

export default App;
