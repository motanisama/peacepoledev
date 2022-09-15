import { async } from "@firebase/util";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  getDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
  updateDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { firebase } from "./firebase";

const firestore = getFirestore(firebase);

export async function createUser(uid, data) {
  const userRef = doc(firestore, "users", uid);

  try {
    console.log("try");
    return await setDoc(userRef, { ...data }, { merge: true });
  } catch (error) {
    console.log(error);
  }
}

export async function getUsers() {
  const users = [];
  const querySnapshot = await getDocs(collection(firestore, "users"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    users.push({ ...doc.data() });
  });

  return sites;
}

export async function getPoles() {
  const poles = [];
  const querySnapshot = await getDocs(collection(firestore, "poles"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    poles.push({ id: doc.id, ...doc.data() });
  });

  return { poles };
}

export async function getSinglePole(poleId) {
  const docRef = doc(firestore, "poles", poleId);
  const snapshot = await getDoc(docRef);
  const pole = { id: snapshot.id, ...snapshot.data() };
  return { pole };
}

export async function createComment(data) {
  const commentRef = collection(firestore, "comments");
  try {
    const docRef = await addDoc(commentRef, data);
  } catch (error) {
    console.log(error);
  }
}

export async function getCommments(poleid) {
  const comments = [];
  const q = query(
    collection(firestore, "comments"),
    where("poleId", "==", poleid),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    comments.push({ ...doc.data() });
  });

  return { comments };
}
