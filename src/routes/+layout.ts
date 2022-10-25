import firebaseApp from '$lib/firebase/app';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
  return {
    app: firebaseApp
  };
};
