export enum PostActionTypes {
    ADD_NEW_POST="ADD_NEW_POST",
    SET_USER_POSTS="SET_USER_POSTS",
    SET_USER_LIKED_POSTS="SET_USER_LIKED_POSTS",
    SET_POSTS_LOADING="SET_POSTS_LOADING",
    DELETE_USER_POST="DELETE_USER_POST",
    DELETE_MAIN_USER_POST="DELETE_MAIN_USER_POST",
    DELETE_LIKED_POST="DELETE_LIKED_POST",
    LIKE_USER_POST="LIKE_USER_POST",
    LIKE_MAIN_USER_POST="LIKE_MAIN_USER_POST",
    EDIT_USER_POST="EDIT_USER_POST",
    EDIT_LIKED_POST="EDIT_LIKED_POST",
    EDIT_MAIN_POST="EDIT_MAIN_POST",
    SET_MAIN_PAGE_POSTS="SET_MAIN_PAGE_POSTS",
}

export interface AddNewPostAction {
    type: PostActionTypes.ADD_NEW_POST;
    payload: PostResponse;
}

export interface setIsPostLoadingAction {
    type: PostActionTypes.SET_POSTS_LOADING;
    payload: boolean;
}

export interface SetUserPostsAction {
    type: PostActionTypes.SET_USER_POSTS;
    payload: PostResponse[];
}
export interface SetUserLikedPostsAction {
    type: PostActionTypes.SET_USER_LIKED_POSTS;
    payload: LikedPostResponse[];
}
export interface SetMainPagePostsAction {
    type: PostActionTypes.SET_MAIN_PAGE_POSTS;
    payload: LikedPostResponse[];
}
export interface DeleteUserLikedPostsAction {
    type: PostActionTypes.DELETE_LIKED_POST;
    payload: number;
}
export interface DeleteUserPostsAction {
    type: PostActionTypes.DELETE_USER_POST;
    payload: number;
}
export interface DeleteMainUserPostsAction {
    type: PostActionTypes.DELETE_MAIN_USER_POST;
    payload: number;
}
export interface LikeUserPostsAction {
    type: PostActionTypes.LIKE_USER_POST;
    payload: {
      postId: number,
      value: boolean,
    };
}
export interface LikeMainUserPostAction {
    type: PostActionTypes.LIKE_MAIN_USER_POST;
    payload: {
      postId: number,
      value: boolean,
    };
}
export interface EditUserPostAction {
    type: PostActionTypes.EDIT_USER_POST;
    payload: {
      postId: number,
      updatedAt: string,
      text: string,
    };
}
export interface EditLikedPostAction {
    type: PostActionTypes.EDIT_LIKED_POST;
    payload: {
      postId: number,
      updatedAt: string,
      text: string,
    };
}
export interface EditMainPostAction {
    type: PostActionTypes.EDIT_MAIN_POST;
    payload: {
      postId: number,
      updatedAt: string,
      text: string,
    };
}

export type PostAction = AddNewPostAction |
                        SetUserPostsAction |
                        SetUserLikedPostsAction |
                        setIsPostLoadingAction |
                        DeleteUserPostsAction |
                        DeleteMainUserPostsAction |
                        DeleteUserLikedPostsAction |
                        LikeUserPostsAction |
                        LikeMainUserPostAction |
                        EditUserPostAction |
                        EditLikedPostAction |
                        EditMainPostAction |
                        SetMainPagePostsAction;

export enum MenuType {
    none,
    own,
    stranger,
}
export interface PostProps {
    id: number,
    userId: number,
    userName: string,
    avatar: string,
    text: string,
    likeCount: number,
    isLiked: boolean,
    onLikeClick?: () => void, // TODO make required
    onDeleteClick?: () => void, // TODO make required
    onEditClick?: () => void, // TODO make required
    onReportClick?: () => void, // TODO make required
    createdAt: string,
    menuType: MenuType,
    reportsCount?: number,
    deletedAt?: string,
}

export interface PostResponse {
    id: number,
    userId: number,
    text: string,
    deletedAt: null | string, // добавить в запрос получение постов с этим полем null
    isLiked: boolean, // смотреть лайкнул ли ты сам себе пост
    likesCount: number, // считать количество лайков на посте
    updatedAt: string, //2022-05-23T21:12:49.428Z
    avatar?: string | null,
    name?: string,
}
export interface LikedPostResponse {
    postId: number,
    userId: number,
    name: string,
    avatar: string | null,
    text: string,
    likesCount: number, // but it come as string
    isLiked: boolean,
    createdAt: string, //2022-05-23T21:12:49.428Z
    updatedAt: string, //2022-05-23T21:12:49.428Z
}
export interface BadLikedPostResponse {
    postId: number,
    userId: number,
    name: string,
    avatar: string | null,
    text: string,
    likesCount: any, // but it come as string
    isLiked: boolean,
    createdAt: string, //2022-05-23T21:12:49.428Z
    updatedAt: string, //2022-05-23T21:12:49.428Z
}

export interface PostState {
    isPostsLoading: boolean;
    userPosts: PostResponse[];
    userLikedPosts: LikedPostResponse[];
    mainPagePosts: LikedPostResponse[];
}