import firebaseApp from '$lib/firebase/app';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(firebaseApp);

export default db;
