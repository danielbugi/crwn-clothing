import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider 
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

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    // if user does not exist
    if(!userSnapShot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (err) {
        console.log('error creating the user', err.message);
    }
  }
  // if user exists
    return userDocRef;
    

    //return userDocRef
  }
