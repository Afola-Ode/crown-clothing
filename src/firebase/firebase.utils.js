import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyC7UZriZYwH-di3izYRWFsOW_DZdl-HLSw",
    authDomain: "shop-now-efd9b.firebaseapp.com",
    projectId: "shop-now-efd9b",
    storageBucket: "shop-now-efd9b.appspot.com",
    messagingSenderId: "635329426621",
    appId: "1:635329426621:web:5ccc865585ef144ac0b3d4",
    measurementId: "G-SPWX8RTE5P"
  };

firebase.initializeApp(config);

const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

const auth = firebase.auth();
const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" }); 
const signInWithGoogle = () => auth.signInWithPopup(provider);

export { firebase, auth, firestore, signInWithGoogle, createUserProfileDocument };