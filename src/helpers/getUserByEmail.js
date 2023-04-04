import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/firebase"


export const getUserByEmail = async email => {
    const userRef = doc(db, `users/${email}`)

    try {
        const userDoc = await getDoc(userRef)
        if (userDoc.exists()) {

            return userDoc.data()
        }
    } catch (error) {
        alert(error)
    }

}