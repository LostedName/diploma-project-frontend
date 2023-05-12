import { v1 } from "uuid";

const initialState: NotesType[] = [
  { id: v1(), title: "Первая", content: "Первая записка Первая записка Первая записка " },
  { id: v1(), title: "Вторая", content: "Вторая записка Вторая записка" },
  { id: v1(), title: "Третья", content: "Третья записка Третья записка Третья записка Третья записка " },
  { id: v1(), title: "Третья", content: "Третья записка Третья записка Третья записка Третья записка " },
  { id: v1(), title: "Вторая", content: "Вторая записка Вторая записка" },
  { id: v1(), title: "Первая", content: "Первая записка Первая записка Первая записка " },
  { id: v1(), title: "Первая", content: "Первая" },
];

export const notesReducer = (state: NotesType[] = initialState, action: AppActionsType): NotesType[] => {
  switch (action.type) {
    case "DELETE-NOTE":
      return state.filter((n) => n.id !== action.id);
    case "ADD-NOTE":
      return [{ id: v1(), title: action.title, content: action.content }, ...state];
    case "CHANGE-NOTE-CONTENT":
      return state.map((n) => (n.id === action.id ? { ...n, content: action.newContent } : n));
    case "CHANGE-NOTE-TITLE":
      return state.map((n) => (n.id === action.id ? { ...n, title: action.newTitle } : n));
    default:
      return state;
  }
};

export const deleteNoteAC = (id: string) => {
  return { type: "DELETE-NOTE", id } as const;
};
export const addNoteAC = (title: string, content: string) => {
  return { type: "ADD-NOTE", title, content } as const;
};
export const changeNoteContentAC = (id: string, newContent: string) => {
  return { type: "CHANGE-NOTE-CONTENT", id, newContent } as const;
};
export const changeNoteTitleAC = (id: string, newTitle: string) => {
  return { type: "CHANGE-NOTE-TITLE", id, newTitle } as const;
};

export type AppActionsType =
  | ReturnType<typeof deleteNoteAC>
  | ReturnType<typeof addNoteAC>
  | ReturnType<typeof changeNoteContentAC>
  | ReturnType<typeof changeNoteTitleAC>;

export type NotesType = {
  id: string;
  title: string;
  content: string;
};
