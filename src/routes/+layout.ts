import { initFirebase } from '../initFirebase';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
  initFirebase();
  return {};
};
