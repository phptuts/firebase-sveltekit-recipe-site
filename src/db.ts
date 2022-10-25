import db from '$lib/firebase/store';
import firebaseApp from '$lib/firebase/app';
import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, serverTimestamp, addDoc, updateDoc } from 'firebase/firestore';

import type { Timestamp, FieldValue } from 'firebase/firestore';

export type Ingredient = {
  name: string;
  units: string;
  amount: number;
};

export type Recipe = {
  title: string;
  description: string;
  userId: string;
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
  ingredients: Ingredient[];
};

export type RecipeForm = {
  title: string;
  description: string;
  ingredients: Ingredient[];
  mainPicture: File;
};

export const createRecipe = async (recipeForm: RecipeForm, userId: string) => {
  const recipe: Recipe = {
    title: recipeForm.title,
    description: recipeForm.description,
    ingredients: recipeForm.ingredients,
    userId,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };
  const recipeRef = await addDoc(collection(db, 'recipes'), recipe);
  const path = await uploadFile(recipeRef.id, userId, recipeForm.mainPicture);
  const url = await getUrl(path);
  await updateDoc(recipeRef, { picture: url });

  return recipeRef;
};

const uploadFile = async (recipeId: string, userId: string, pic: File) => {
  const mainPicturePath = `/${userId}/${recipeId}.${pic.name.split('.').pop()}`;
  const storage = getStorage(firebaseApp);
  const picref = ref(storage, mainPicturePath);
  await uploadBytes(picref, pic);
  return mainPicturePath;
};

export const getUrl = async (path: string) => {
  const storage = getStorage(firebaseApp);
  return await getDownloadURL(ref(storage, path));
};
