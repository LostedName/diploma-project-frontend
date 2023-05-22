import { TokenType } from './../../services/jwt';
import { deleteToken } from "../../services/jwt";
import { UserAction, UserActionTypes, UserState } from "../../types/User";
import { NoteAction, NoteActionTypes, NoteState } from '../../types/Note';
 
const initialState: NoteState = {
    notes: [],
};

const noteReducer = (state = initialState, action: NoteAction): NoteState => {
    switch (action.type) {
        case NoteActionTypes.ADD_NEW_NOTE:
            let notes = state.notes;
            notes.push(action.payload);
            return {...state, notes};
        case NoteActionTypes.SET_USER_NOTES:
            state.notes = [...action.payload];
            return {...state};
        default:
            return state;
    }
};

export default noteReducer;