import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore,doc} from 'firebase/firestore';
const FirebaseConfig = {

}

const app = initializeApp(FirebaseConfig);
export const auth = getAuth(app);
export const firestoreDb = getFirestore();
export const user = uid => doc(firestoreDb, `users/${uid}`);