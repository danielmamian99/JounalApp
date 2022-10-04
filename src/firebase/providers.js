import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, updateProfile } from 'firebase/auth';
import { firebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(firebaseAuth, googleProvider);
        //const credentials = GoogleAuthProvider.credentialFromResult(result);
        const {displayName, email, photoURL, uid} = result.user;
        return {
            ok:true,
            //user info
            displayName, email, photoURL, uid
        }
    } catch (error) {
        const errorMessage = error.message;
        return{
            ok: false,
            errorMessage

        }

    }
}

export const registerUserWithEmailPassword= async ({email, password, displayName})=>{
    try{
        const resp = await createUserWithEmailAndPassword(firebaseAuth, email, password)
        const {uid, photoURL} = resp.user;
        await updateProfile( firebaseAuth.currentUser, {displayName} );
        return{
            ok: true,
            uid, photoURL, email, displayName
        }
    }catch(error){
        return {ok: false, errorMessage: error.message}
    }
}

export const loginWithEmailPassword= async ({email,password})=>{
    try{
        const {user:{uid, photoURL, displayName}} = await signInWithEmailAndPassword(firebaseAuth, email, password);
        return {
            ok:true,
            uid, photoURL, displayName
        }
    }catch(error){
        return {
            ok:false,
            errorMessage:error.message
        }
    }
}

export const logoutFirebase = async ()=>{
    return await firebaseAuth.signOut();
}