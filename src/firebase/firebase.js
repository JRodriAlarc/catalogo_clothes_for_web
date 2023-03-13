// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyChyNd-kZtRo6rYugs5fA56xYF4eqngqms",
    authDomain: "catalogo-ropa-app.firebaseapp.com",
    projectId: "catalogo-ropa-app",
    storageBucket: "catalogo-ropa-app.appspot.com",
    messagingSenderId: "751405322678",
    appId: "1:751405322678:web:303200daee0d046206b117"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)


export const db =  getFirestore(app)

export const storage = getStorage(app)




