import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider,signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import {getFirestore, doc,  getDoc, setDoc} from 'firebase/firestore'
    
const firebaseConfig = {
  apiKey: "AIzaSyANcmq-A8Z9OhhqsCQ1XxjJ-q8O4N89oH4",
  authDomain: "task-313-task7p.firebaseapp.com",
  projectId: "task-313-task7p",
  storageBucket: "task-313-task7p.appspot.com",
  messagingSenderId: "268641746589",
  appId: "1:268641746589:web:14e3baf718a2bcc764de74",
  measurementId: "G-C3PZ272GF5"
  };
  const firebaseapp = initializeApp(firebaseConfig);
  const provider= new GoogleAuthProvider();
 
  provider.setCustomParameters({
  prompt:"select_account"
});
  
  export const auth=getAuth();
  export const signInWithGooglePopup =()=> signInWithPopup(auth,provider)
  export const db =getFirestore();
  export const createuserdocfromAuth = async(userAuth, additionalInformation ={}) =>

{
  if(!userAuth.email) return;

  const userDocRef=doc (db, 'users', userAuth.uid);
  console.log(userDocRef)


const userSnapShots = await getDoc(userDocRef);
console.log(userSnapShots)
console.log(userSnapShots.exists())

if(!userSnapShots.exists())
{
   const {displayName, email} =userAuth
   const createdAt = new Date();
   try{
    await setDoc(userDocRef,{
   displayName,
   email,
   createdAt,
   ...additionalInformation
    })
  }
    catch(error){
    console.log('error in creating', error.message)
    }

   }
   return userDocRef;
}

export async function createAuthUserWithEmailAndPassword (email,password)
{ 
  if(!email || !password) 
  return
  return await createUserWithEmailAndPassword(auth,email,password)
}

export async function signinAuthUserWithEmailAndPassword (email,password)
{ 
  if(!email || !password) 
  return
  return await signInWithEmailAndPassword(auth,email,password)
}

