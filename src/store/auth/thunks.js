import { singInWithGoogle } from "../../firebase/providers"
import { chekingCredentials } from "./authSlice"


export const chekingAuthentication = (email, password) =>{
    return async (dispatch) => {
        dispatch(chekingCredentials())
    }
}

export const startGoogleSingIn = () =>{
    return async(dispatch) => {
        dispatch ( chekingAuthentication() );
        const result = await singInWithGoogle();
        console.log('result >>>', result);
    }
}