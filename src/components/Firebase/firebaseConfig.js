import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const FirebaseConfig = {

}

const app = initializeApp(FirebaseConfig);
export const auth = getAuth(app);