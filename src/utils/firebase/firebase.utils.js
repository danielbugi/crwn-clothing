import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
getFirestore,
doc,
getDoc,
setDoc
} from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAQAI8xOHYUkN1XrVcRys7hW2YYCgmFz_s",
    authDomain: "crwn-clothing-db-b25e6.firebaseapp.com",
    projectId: "crwn-clothing-db-b25e6",
    storageBucket: "crwn-clothing-db-b25e6.appspot.com",
    messagingSenderId: "832860812317",
    appId: "1:832860812317:web:5952105a39290c87df82f4"
  };
  
  
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () =>
   signInWithPopup(auth, googleProvider);
  export const signInWithGoogleRedirect = () =>
   signInWithRedirect(auth, googleProvider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if(!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);

    // if user does not exist
    if(!userSnapShot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation
        });
      } catch (err) {
        console.log('error creating the user', err.message);
    }
  }
  // if user exists
    return userDocRef;
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
  };

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) =>
   onAuthStateChanged(auth, callback);