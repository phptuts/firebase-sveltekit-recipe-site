import { getAuth } from 'firebase/auth';
import firebaseApp from '$lib/firebase/app';

const auth = getAuth(firebaseApp);

export default auth;
