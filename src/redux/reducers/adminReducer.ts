import { AdminAction, AdminActionTypes, AdminState } from "../../types/Admin";

const initialState: AdminState = {
    isAppLoading: true,
    isPageLoading: true,
    isAuth: false,
    admin: null,
    users: [],
    posts: [],
}

const adminReducer = (state = initialState, action: AdminAction): AdminState => {
    switch (action.type) {
        case AdminActionTypes.LOGIN_ADMIN:
            return {
                ...state,
                admin: { ...action.payload },
                isAuth: true
            };
        case AdminActionTypes.SET_APP_LOADING:
            return {
                ...state,
                isAppLoading: action.payload,
            };
        case AdminActionTypes.SET_PAGE_LOADING:
            return {
                ...state,
                isPageLoading: action.payload,
            };
        case AdminActionTypes.DELETE_USER_FROM_LIST:
            return {
                ...state,
                users: state.users.filter((user) => user.userId !== action.payload),
            };
        case AdminActionTypes.DELETE_ADMIN_POST:
            return {
                ...state,
                posts: state.posts.filter((post) => post.postId !== action.payload),
            };
        case AdminActionTypes.DISCARD_ALL_REPORTS:
            const newPostIndex = state.posts.findIndex((post) => post.postId === action.payload);
            const posts = state.posts;
            posts[newPostIndex].reportsCount = 0;
            return {
                ...state,
                posts: [...posts],
            };
        case AdminActionTypes.LOGOUT_ADMIN:
            return {...state, isAuth: false, admin: null, users: [], posts: []};
        case AdminActionTypes.SET_ADMIN_USERS:
            return {
                ...state,
                users: [...action.payload],
            };
        case AdminActionTypes.SET_ADMIN_POSTS:
            return {
                ...state,
                posts: [...action.payload],
            };
        default:
        return state;
    }
}

export default adminReducer;