import { NoteAction, NoteActionTypes, NoteState } from '../../types/Note';
 
const initialState: NoteState = {
    notes: [],
    notesPage: 1,
    totalNotesCount: 0,
    isContentLoading: true,
};

const noteReducer = (state = initialState, action: NoteAction): NoteState => {
    switch (action.type) {
        case NoteActionTypes.ADD_NEW_NOTE:
            let notes = state.notes;
            notes.push(action.payload);
            return {...state, notes};
        case NoteActionTypes.SET_NOTES_PAGE:
            console.log(action.payload);
            return {...state, notesPage: action.payload.page, totalNotesCount: action.payload.notesCount};
        case NoteActionTypes.SET_USER_NOTES:
            state.notes = [...action.payload];
            return {...state};
        case NoteActionTypes.SET_IS_CONTENT_LOADING:
            return {...state, isContentLoading: action.payload};
        case NoteActionTypes.UPDATE_USER_NOTE:
            const noteIndex = state.notes.findIndex((note) => note.id === action.payload.id);
            if (noteIndex === -1) {
                return state;
            }
            state.notes[noteIndex].title = action.payload.title;
            state.notes[noteIndex].content = action.payload.content;
            state.notes[noteIndex].updated_at = action.payload.updated_at;
            state.notes[noteIndex].created_at = action.payload.created_at;
            return {...state};
        default:
            return state;
    }
};

export default noteReducer;