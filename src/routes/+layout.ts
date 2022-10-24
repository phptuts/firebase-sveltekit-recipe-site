import { initFirebase } from '../initFirebase';

export async function load({ page, fetch, context }) {
  await initFirebase();
  return {};
}
