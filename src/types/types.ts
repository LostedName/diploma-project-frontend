export type InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type TextareaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type ButtonClickEvent = React.FormEvent<HTMLButtonElement>;

export type NoteObject = {
    id: number,
    title: string,
    content: string,
    created_at: Date,
    updated_at: Date,
};