import { OAuthClientAction, OAuthClientActionTypes, OAuthClientState } from "../../types/OAuthClient";

const initialState: OAuthClientState = {
    clients: [],
    currentClient: {
        id: -1,
        client_public: "",
        client_secret: undefined,
        name: "",
        description: "",
        icon_url: "",
        homepage_url: "",
        redirect_uris: [],
        created_at: new Date(),
        updated_at: new Date(),
    },
    clientsPage: 1,
    totalClientsCount: 0,
    isContentLoading: true
};

const oauthClientsReducer = (state = initialState, action: OAuthClientAction): OAuthClientState => {
    switch (action.type) {
        case OAuthClientActionTypes.ADD_NEW_OAUTH_CLIENT:
            let clients = state.clients;
            return {...state, clients};
        case OAuthClientActionTypes.SET_OAUTH_CLIENTS_PAGE:
            return {...state, clientsPage: action.payload.page, totalClientsCount: action.payload.itemsCount};
        case OAuthClientActionTypes.SET_USER_OAUTH_CLIENTS:
            state.clients = [...action.payload];
            return {...state};
        case OAuthClientActionTypes.SET_IS_OAUTH_CONTENT_LOADING:
            return {...state, isContentLoading: action.payload};
        case OAuthClientActionTypes.SET_USER_OAUTH_CLIENT:
            state.currentClient = {...action.payload};
            return {...state};
        default:
            return state;
    }
};

export default oauthClientsReducer;