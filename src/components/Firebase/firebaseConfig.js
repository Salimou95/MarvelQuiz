import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore,doc} from 'firebase/firestore';


const FirebaseConfig = {
    apiKey: "AIzaSyAbtboh9GtVcsAT2KcQLrWMv3Dp4a3xqbM",
    authDomain: "marvelquiz-c8750.firebaseapp.com",
    projectId: "marvelquiz-c8750",
    storageBucket: "marvelquiz-c8750.firebasestorage.app",
    messagingSenderId: "756923871898",
    appId: "1:756923871898:web:02e084de29520e9b4fa523",
    measurementId: "G-17874E6BL3"
}

const app = initializeApp(FirebaseConfig);
export const auth = getAuth(app);
export const firestoreDb = getFirestore();
export const user = uid => doc(firestoreDb, `users/${uid}`);
