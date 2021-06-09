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
};

export const createRecipe = async (recipeForm: RecipeForm, userId: string) => {
  const recipe: Recipe = {
    ...recipeForm,
    userId,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  const db = await firestore();
  await db.collection("recipes").add(recipe);
};
