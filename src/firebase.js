import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
  apiKey: "AIzaSyDcb_06U3BuO3smoWVPWWm94NSNmIdVR58",
  authDomain: "netflix-clone-404aa.firebaseapp.com",
  projectId: "netflix-clone-404aa",
  storageBucket: "netflix-clone-404aa.appspot.com",
  messagingSenderId: "1044117047280",
  appId: "1:1044117047280:web:c17f26500703942d68ff35"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
   try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
    })
   } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}

const login = async (email,password)=>{
   try {
    await signInWithEmailAndPassword(auth,email,password);
   } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
   }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};