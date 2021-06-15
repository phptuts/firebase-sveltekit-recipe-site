import firebase from "firebase/app";
import { firestore } from "./firestore";

export type Ingredient = {
  name: string;
  units: string;
  amount: number;
};

export type Recipe = {
  title: string;
  description: string;
  userId: string;
  createdAt: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
  updatedAt: firebase.firestore.Timestamp | firebase.firestore.FieldValue;
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
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  const db = await firestore();
  const recipeRef = await db.collection("recipes").add(recipe);
  const path = await uploadFile(recipeRef.id, userId, recipeForm.mainPicture);
  const url = await getUrl(path);
  recipeRef.update("picture", url);

  return recipeRef;
};

const uploadFile = async (recipeId: string, userId: string, pic: File) => {
  const mainPicturePath = `/${userId}/${recipeId}.${pic.name.split(".").pop()}`;
  const storage = firebase.storage();
  const ref = storage.ref(mainPicturePath);
  await ref.put(pic);
  return mainPicturePath;
};

export const getUrl = async (path: string) => {
  const storage = firebase.storage();
  return await storage.ref(path).getDownloadURL();
};
