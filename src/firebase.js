
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyA6JK5eP5LIuDlUnOgmuQtKOz_9VXnK2Qc",
    authDomain: "netflix-clone-8e83d.firebaseapp.com",
    projectId: "netflix-clone-8e83d",
    storageBucket: "netflix-clone-8e83d.appspot.com",
    messagingSenderId: "575926958081",
    appId: "1:575926958081:web:fdfe4c14bfe5b4fe2b2800"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signUp = async (name, email, password) => {

    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, 'name'), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));
    }

}

const logIn = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '));

    }
}

const logOut = () => {
    signOut(auth)
}

export { auth, db, logIn, signUp, logOut };