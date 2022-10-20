import { collection, doc, setDoc } from "firebase/firestore/lite";
import { firebaseDB } from "../../firebase/config";
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes } from "./journalSlice";
import { loadNotes } from "../../helpers";


export const startNewNote = ()=>{
    return async(dispatch, getState) =>{

        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),

        }
        dispatch(savingNewNote())
        const newDoc = doc(collection(firebaseDB, `${ uid }/journal/notes`));
        const setDocResp = await setDoc( newDoc, newNote );
        newNote.id = newDoc.id
        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = ()=> {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        if(!uid) throw new Error('El UID no esta establecido');
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes))
    }
}