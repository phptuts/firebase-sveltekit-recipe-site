import { initializeApp } from 'firebase/app';
import firebaseConfig from '$lib/firebase/config';

const fb = initializeApp(firebaseConfig);
export default fb;
