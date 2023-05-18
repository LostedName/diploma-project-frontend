
import { LikedPostResponse, PostAction, PostActionTypes, PostState } from "../../types/Post";
 
const initialState: PostState = {
  isPostsLoading: true,
  userPosts: [],
  userLikedPosts: [],
  mainPagePosts: [],
};

const userReducer = (state = initialState, action: PostAction): PostState => {
    switch (action.type) {
        case PostActionTypes.ADD_NEW_POST:
            const postCreated = action.payload;
            const newPostCreated: LikedPostResponse = {
                postId: postCreated.id,
                userId: postCreated.userId,
                name: postCreated.name || "", // return from back name + avatart
                avatar: postCreated.avatar || null,
                text: postCreated.text,
                likesCount: 0, // but it come as string
                isLiked: false,
                createdAt: postCreated.updatedAt, //2022-05-23T21:12:49.428Z
                updatedAt: postCreated.updatedAt, //2022-05-23T21:12:49.428Z
            }
            return {
              ...state,
              userPosts: [action.payload, ...state.userPosts],
              mainPagePosts: [newPostCreated, ...state.mainPagePosts],
            };
        case PostActionTypes.SET_USER_POSTS:
            return {
                ...state,
                userPosts: [...action.payload],
            };
        case PostActionTypes.SET_USER_LIKED_POSTS:
            return {
                ...state,
                userLikedPosts: [...action.payload],
            };
        case PostActionTypes.SET_MAIN_PAGE_POSTS:
            return {
                ...state,
                mainPagePosts: [...action.payload],
            };
        case PostActionTypes.SET_POSTS_LOADING:
            return {
                ...state,
                isPostsLoading: action.payload,
            };
        case PostActionTypes.DELETE_USER_POST:
            const userPostsAfterDeletion = state.userPosts.filter((post) => post.id !== action.payload);
            return {
                ...state,
                userPosts: userPostsAfterDeletion,
            }
        case PostActionTypes.DELETE_MAIN_USER_POST:
            const userMainPostsAfterDeletion = state.mainPagePosts.filter((post) => post.postId !== action.payload);
            return {
                ...state,
                mainPagePosts: userMainPostsAfterDeletion,
            }
        case PostActionTypes.DELETE_LIKED_POST:
            const likedPostsAfterDeletion = state.userLikedPosts.filter((post) => post.postId !== action.payload);
            return {
                ...state,
                userLikedPosts: likedPostsAfterDeletion,
            }
        case PostActionTypes.LIKE_USER_POST:
            const userPostLikeIndex = state.userPosts.findIndex((post) => post.id === action.payload.postId);
            const newArrayWithPosts = [...state.userPosts];
            newArrayWithPosts[userPostLikeIndex].isLiked = action.payload.value;
            newArrayWithPosts[userPostLikeIndex].likesCount += action.payload.value ? 1 : -1;
            return { ...state, userPosts: [...newArrayWithPosts] };
        case PostActionTypes.LIKE_MAIN_USER_POST:
            const userMainPostLikeIndex = state.mainPagePosts.findIndex((post) => post.postId === action.payload.postId);
            const newArrayWithMainPosts = [...state.mainPagePosts];
            newArrayWithMainPosts[userMainPostLikeIndex].isLiked = action.payload.value;
            newArrayWithMainPosts[userMainPostLikeIndex].likesCount += action.payload.value ? 1 : -1;
            return { ...state, mainPagePosts: [...newArrayWithMainPosts] };
        case PostActionTypes.EDIT_USER_POST:
            const userPostEdit = state.userPosts.find((post) => post.id === action.payload.postId);
            const newArrayWithEditPosts = state.userPosts.filter((post) => post.id !== action.payload.postId);
            if (userPostEdit) {
                userPostEdit.text = action.payload.text;
                userPostEdit.updatedAt = action.payload.updatedAt;
                newArrayWithEditPosts.unshift(userPostEdit);
            }
            return {...state, userPosts: newArrayWithEditPosts};
        case PostActionTypes.EDIT_LIKED_POST:
            const likedPostEdit = state.userLikedPosts.find((post) => post.postId === action.payload.postId);
            const newArrayWithEditLikedPosts = state.userLikedPosts.filter((post) => post.postId !== action.payload.postId);
            if (likedPostEdit) {
                likedPostEdit.text = action.payload.text;
                likedPostEdit.updatedAt = action.payload.updatedAt;
                newArrayWithEditLikedPosts.unshift(likedPostEdit);
            }
            return {...state, userLikedPosts: newArrayWithEditLikedPosts};
        case PostActionTypes.EDIT_MAIN_POST:
            const mainPostEdit = state.mainPagePosts.find((post) => post.postId === action.payload.postId);
            const newArrayWithEditMainPosts = state.mainPagePosts.filter((post) => post.postId !== action.payload.postId);
            if (mainPostEdit) {
                mainPostEdit.text = action.payload.text;
                mainPostEdit.updatedAt = action.payload.updatedAt;
                newArrayWithEditMainPosts.unshift(mainPostEdit);
            }
            return {...state, mainPagePosts: newArrayWithEditMainPosts};
        default:
            return state;
    }
};

export default userReducer;