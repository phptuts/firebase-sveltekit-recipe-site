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

export type RecipeFormEdit = {
    title: string;
    description: string;
    ingredients: Ingredient[];
    mainPicture?: File;
  };

export const saveRecipe = async (recipeForm: RecipeForm, userId: string, recipeId?: string) => {
  const recipe: Recipe = {
    title: recipeForm.title,
    description: recipeForm.description,
    ingredients: recipeForm.ingredients,
    userId,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  };

  const db = await firestore();
  if (recipeId) {
    const recipeRef =  await db.collection("recipes").add(recipe);
    recipeId = recipeRef.id;
  } else {
    db.collection("recipes").doc(recipeId).set(recipe);
  }

  if (recipeForm.mainPicture) {
    const path = await uploadFile(recipeId, userId, recipeForm.mainPicture);
    const url = await getUrl(path);
    db.collection("recipes").doc(recipeId).update("picture", url);
  
  }

  return recipeId;
};

export const getRecipe = async (recipeId: string) => {
    const db = await firestore();
    const recipeRef = await db.collection("recipes").doc(recipeId).get();

    return recipeRef.data();
}


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
