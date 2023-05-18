import { BadLikedPostResponse, LikedPostResponse, PostResponse } from './../../types/Post';
import errorCoverage, { refreshTokenCoverage } from "../../error";
import { postService } from "../../services/post";
import { Notify } from "../../services/toast";
import { PostActionTypes } from "../../types/Post";
import { AppThunk } from "../store";
import { internalErrorAction, postCreateBadRequestAction, postsLoadBadRequestAction } from '../../error/actions/post';

export const addNewPost = (post: PostResponse) => ({
  type: PostActionTypes.ADD_NEW_POST,
  payload: post,
});
export const setUserPosts = (posts: PostResponse[]) => ({
  type: PostActionTypes.SET_USER_POSTS,
  payload: posts,
});
export const setUserLikedPosts = (posts: LikedPostResponse[]) => ({
  type: PostActionTypes.SET_USER_LIKED_POSTS,
  payload: posts,
});
export const setMainPagePosts = (posts: LikedPostResponse[]) => ({
  type: PostActionTypes.SET_MAIN_PAGE_POSTS,
  payload: posts,
});
export const setIsPostsLoading = (isPostsLoading: boolean) => ({
  type: PostActionTypes.SET_POSTS_LOADING,
  payload: isPostsLoading,
});
export const deleteUserLikedPost = (postId: number) => ({
  type: PostActionTypes.DELETE_LIKED_POST,
  payload: postId,
});
export const deleteUserPost = (postId: number) => ({
  type: PostActionTypes.DELETE_USER_POST,
  payload: postId,
});
export const deleteMainUserPost = (postId: number) => ({
  type: PostActionTypes.DELETE_MAIN_USER_POST,
  payload: postId,
});
export const likeUserPost = (postId: number, value: boolean) => ({
  type: PostActionTypes.LIKE_USER_POST,
  payload: {postId, value},
});
export const likeMainUserPost = (postId: number, value: boolean) => ({
  type: PostActionTypes.LIKE_MAIN_USER_POST,
  payload: {postId, value},
});
export const editUserPost = (postId: number, text: string, updatedAt: string) => ({
  type: PostActionTypes.EDIT_USER_POST,
  payload: {postId, text, updatedAt},
});
export const editLikedPost = (postId: number, text: string, updatedAt: string) => ({
  type: PostActionTypes.EDIT_LIKED_POST,
  payload: {postId, text, updatedAt},
});
export const editMainPost = (postId: number, text: string, updatedAt: string) => ({
  type: PostActionTypes.EDIT_MAIN_POST,
  payload: {postId, text, updatedAt},
});

export const loadMainPagePosts = (): AppThunk<void> => async (dispatch) => {
  try {
    await dispatch(setIsPostsLoading(true));
    await dispatch(setMainPagePosts([]));
    const { data } = await postService.getAllPostsNotLogged();
    const fixedData = data.map((row: any) => {
      row.likesCount = parseInt(row.likesCount);
      return row;
    });
    await dispatch(setMainPagePosts(fixedData));
    return dispatch(setIsPostsLoading(false));
  } catch (err) {
    errorCoverage(err, [
      postsLoadBadRequestAction,
      internalErrorAction,
    ]);
    return dispatch(setIsPostsLoading(false));
  }
}

export const loadMainPagePostsLogged = (): AppThunk<void> => async (dispatch) => {
  try {
    await dispatch(setIsPostsLoading(true));
    await dispatch(setMainPagePosts([]));
    const { data } = await postService.getAllPostsLogged();
    const fixedData = data.map((row: any) => {
      row.likesCount = parseInt(row.likesCount);
      row.isLiked = row.isLiked === "1" ? true : false;
      return row;
    });
    await dispatch(setMainPagePosts(fixedData));
    return dispatch(setIsPostsLoading(false));
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      postsLoadBadRequestAction,
      internalErrorAction,
    ]);
    return dispatch(setIsPostsLoading(false));
  }
}
export const loadMainPagePostsFollowed = (): AppThunk<void> => async (dispatch) => {
  try {
    await dispatch(setIsPostsLoading(true));
    await dispatch(setMainPagePosts([]));
    const { data } = await postService.getAllPostsFollowed();
    const fixedData = data.map((row: any) => {
      row.likesCount = parseInt(row.likesCount);
      row.isLiked = row.isLiked === "1" ? true : false;
      return row;
    });
    await dispatch(setMainPagePosts(fixedData));
    return dispatch(setIsPostsLoading(false));
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      postsLoadBadRequestAction,
      internalErrorAction,
    ]);
    return dispatch(setIsPostsLoading(false));
  }
}

export const loadUserPosts = (id: number, offset: number = 0): AppThunk<void> => async (dispatch) => {
  try {
    await dispatch(setIsPostsLoading(true));
    await dispatch(setUserPosts([]));
    const { data } = await postService.getAllUserPosts(id, offset);
    const fixedData = data.map((row: any) => {
      row.likesCount = parseInt(row.likesCount);
      row.isLiked = row.isLiked === "1" ? true : false;
      return row;
    });
    await dispatch(setUserPosts(fixedData));
    return dispatch(setIsPostsLoading(false));
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      postsLoadBadRequestAction,
      internalErrorAction,
    ]);
    return dispatch(setIsPostsLoading(false));
  }
};
export const loadLikedUserPosts = (id: number, offset: number = 0): AppThunk<void> => async (dispatch) => {
  try {
    await dispatch(setIsPostsLoading(true));
    await dispatch(setUserLikedPosts([]));
    const { data } = await postService.getAllUserLikedPosts(id, offset);
    const fixedData = data.map((row: BadLikedPostResponse) => {
      row.likesCount = parseInt(row.likesCount);
      row.isLiked = true;
      return row;
    });
    await dispatch(setUserLikedPosts(fixedData));
    return dispatch(setIsPostsLoading(false));
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      postsLoadBadRequestAction,
      internalErrorAction,
    ]);
    return dispatch(setIsPostsLoading(false));
  }
};
export const createNewPost = (text: string): AppThunk<void> => async (dispatch) => {
  try {
    const { data } = await postService.createPost(text);
    Notify.success("Новый пост успешно опубликован!");
    dispatch(addNewPost(data));
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      postCreateBadRequestAction,
      internalErrorAction
    ]);
  }
};

export const deletePost = (postId: number, type: "posts" | "main" | "liked"): AppThunk<void> => async (dispatch) => {
  try {
    const { status } = await postService.deletePost(postId);
    if (status.toString()[0] === "2") {
      switch(type) {
        case "posts":
          await dispatch(deleteUserPost(postId));
          break;
        case "main":
          await dispatch(deleteMainUserPost(postId));
          break;
        case "liked":
          await dispatch(deleteUserLikedPost(postId));
          break;
      }
      Notify.success("Пост успешно удалён!");
    }
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}

export const likePost = (postId: number, type: "posts" | "main"): AppThunk<void> => async (dispatch) => {
  try {
    const { status } = await postService.likePost(postId);
    if (status.toString()[0] === "2") {
      switch(type) {
        case "posts":
          await dispatch(likeUserPost(postId, true));
          break;
        case "main":
          await dispatch(likeMainUserPost(postId, true));
          break;
      }
    }
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}
export const editPost = (postId: number, text: string, type: "posts" | "main" | "liked"): AppThunk<void> => async (dispatch) => {
  try {
    const { data, status } = await postService.editPost(postId, text);
    if (status.toString()[0] === "2") {
      switch (type) {
        case "posts":
          await dispatch(editUserPost(postId, data.text, data.updatedAt));
          break;
        case "main":
          await dispatch(editMainPost(postId, data.text, data.updatedAt));
          break;
        case "liked":
          await dispatch(editLikedPost(postId, data.text, data.updatedAt));
          break;
      }
      Notify.success("Пост успешно изменён!");
    }
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}

export const unlikePost = (postId: number, type: "posts" | "liked" | "main"): AppThunk<void> => async (dispatch) => {
  try {
    const { status } = await postService.unlikePost(postId);
    if (status.toString()[0] === "2") {
      switch(type) {
        case "posts":
          await dispatch(likeUserPost(postId, false));
          break;
        case "main":
          await dispatch(likeMainUserPost(postId, false));
          break;
        case "liked":
          await dispatch(deleteUserLikedPost(postId));
          break;
      }
    }
  } catch (err) {
    await refreshTokenCoverage(err, dispatch);
    errorCoverage(err, [
      internalErrorAction // TODO правильная обработка ошибок
    ]);
  }
}