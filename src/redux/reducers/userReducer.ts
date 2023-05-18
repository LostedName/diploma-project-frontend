import { deleteAccessToken, deleteRefreshToken } from "../../services/jwt";
import { UserAction, UserActionTypes, UserState } from "../../types/User";

// foreignUser {
//     id: 2,
//     avatar: "/assets/myPhotoSquare.jpg",
//     profileCover: "/ass ets/profileCover.jpg",
//     login: "Dio_karpo",
//     name: "Dmitry Karpenkin",
//     description: "В рот всё ебал очень хорошо",
//     country: "Belarus",
//     link: "https://vk.com/dikarp118",
//     birthDate: "28.04.2002",
//     createdAt: "22.03.2014",
// }
 
const initialState: UserState = {
    isAppLoading: true,
    isAuth: false,
    user: null,
    userSubs: [],
    isPageLoading: true,
    foreignUser: null,
    userError: "",
};

const userReducer = (state = initialState, action: UserAction): UserState => {
    switch (action.type) {
        case UserActionTypes.SET_USER_DATA:
            return {
                ...state,
                isAuth: true,
                user: { ...action.payload },
            };
        case UserActionTypes.SET_FOREIGN_USER_DATA:
            return {
                ...state,
                foreignUser: { ...action.payload },
            };
        case UserActionTypes.SET_USER_FOLLOWS:
            return {
                ...state,
                userSubs: [...action.payload],
            };
        case UserActionTypes.SET_IS_FOLLOWED:
            const foreignUserFollow = state.foreignUser;
            const user = state.user;
            if (user && user.followCount)
                user.followCount += action.payload ? 1 : -1;
            if (foreignUserFollow) {
                foreignUserFollow.isFollowed = action.payload;
                if (foreignUserFollow.subsCount)
                  foreignUserFollow.subsCount += action.payload ? 1 : -1;
            }
            return {
                ...state,
                foreignUser: foreignUserFollow,
                user,
            };
        case UserActionTypes.SET_IS_FOLLOWED_ON_SUBS: 
            const subIndex = state.userSubs.findIndex((userSub) => userSub.userId === action.payload.userId);
            const userSubs = state.userSubs;
            userSubs[subIndex].isFollowed = action.payload.isFollowed;
            return {
                ...state,
                userSubs,
            };
        case UserActionTypes.LOGOUT_USER:
            deleteAccessToken();
            deleteRefreshToken();
            return { ...state, isAuth: false, user: null };
        case UserActionTypes.SET_APP_LOADING:
            return {...state, isAppLoading: action.payload};
        case UserActionTypes.SET_FOREIGN_USER_LOADING:
            return {...state, isPageLoading: action.payload};
        case UserActionTypes.SET_USER_ERROR:
            return {...state, userError: action.payload};
        default:
            return state;
    }
};

export default userReducer;