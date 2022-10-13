import {
  doc,
  onSnapshot,
  query,
  collection,
  getFirestore,
  where,
  orderBy,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { firebase } from "./firebase";

const firestore = getFirestore(firebase);

export function useLocationData() {
  const [locations, setLocations] = useState(null);

  const q = query(collection(firestore, "poles"));

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const poles = [];

      querySnapShot.forEach((doc) => {
        poles.push(doc.data());
      });
      setLocations(poles);
    });
    return unsubscribe;
  }, []);

  return { locations };
}

export function useComments(poleid) {
  const [allcomments, setComments] = useState(null);

  const q = query(
    collection(firestore, "comments"),
    where("poleId", "==", poleid),
    orderBy("createdAt", "desc")
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      const comments = [];

      querySnapShot.forEach((doc) => {
        comments.push(doc.data());
      });
      setComments(comments);
    });
  }, []);

  return { allcomments };
}
