import { OAuthClientFullItem, OAuthClientListItem } from "./types";

export enum OAuthClientActionTypes {
    ADD_NEW_OAUTH_CLIENT="ADD_NEW_OAUTH_CLIENT",
    SET_USER_OAUTH_CLIENTS="SET_USER_OAUTH_CLIENTS",
    SET_OAUTH_CLIENTS_PAGE="SET_OAUTH_CLIENTS_PAGE",
    SET_USER_OAUTH_CLIENT="SET_USER_OAUTH_CLIENT",
    SET_IS_OAUTH_CONTENT_LOADING="SET_IS_OAUTH_CONTENT_LOADING",
}

export interface AddNewOAuthClientAction {
    type: OAuthClientActionTypes.ADD_NEW_OAUTH_CLIENT;
    payload: OAuthClientListItem;
}

export interface SetUserOAuthClientsAction {
    type: OAuthClientActionTypes.SET_USER_OAUTH_CLIENTS;
    payload: OAuthClientListItem[];
}
export interface SetUserOAuthClientsPageAction {
    type: OAuthClientActionTypes.SET_OAUTH_CLIENTS_PAGE;
    payload: {
        page: number,
        itemsCount: number,
    };
}

export interface SetUserOAuthClientAction {
    type: OAuthClientActionTypes.SET_USER_OAUTH_CLIENT;
    payload: OAuthClientFullItem;
}
export interface SetIsContentLoadingAction {
    type: OAuthClientActionTypes.SET_IS_OAUTH_CONTENT_LOADING;
    payload: boolean;
}

export type OAuthClientAction = AddNewOAuthClientAction | SetUserOAuthClientsAction | SetUserOAuthClientsPageAction | SetUserOAuthClientAction | SetIsContentLoadingAction;

export interface OAuthClientState {
    clients: OAuthClientListItem[];
    currentClient: OAuthClientFullItem;
    clientsPage: number;
    totalClientsCount: number;
    isContentLoading: boolean;
}