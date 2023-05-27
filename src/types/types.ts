export type InputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;
export type TextareaChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
export type ButtonClickEvent = React.FormEvent<HTMLButtonElement>;

export const NOTES_ON_PAGE = 12;
export const DEFAULT_IMAGE = "/assets/unknown_user.png";
export const DEFAULT_APPLICATION_IMAGE = "/assets/default_application.png";

export type NoteItem = {
    id: number,
    title: string,
    content: string,
    created_at: Date,
    updated_at: Date,
};

export type OAuthClientListItem = {
    id: number,
    name: string,
    description: string,
    icon_url: string,
    created_at: Date,
    updated_at: Date,
};

export type OAuthClientFullItem = OAuthClientListItem & {
    client_public: string,
    client_secret?: string,//accessable only when item creates
    homepage_url: string,
    redirect_uris: string[],
}