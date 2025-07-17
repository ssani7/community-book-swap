// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: 'AIzaSyCeThtSzMU4Kmm-4pGlSMFVH_S9UTQtCEw',
	authDomain: 'boi-nagar.firebaseapp.com',
	projectId: 'boi-nagar',
	storageBucket: 'boi-nagar.firebasestorage.app',
	messagingSenderId: '289264855711',
	appId: '1:289264855711:web:22ff2a89d8967d281d50aa',
	measurementId: 'G-NLSXWT184F',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { auth, analytics };
