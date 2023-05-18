import React, { useEffect, useRef, useState } from 'react';
import CircleLoader from '../../../components/circleLoader/CircleLoader';
import EditPostPopup from '../../../components/editPostPopup/EditPostPopup';
import Portal from '../../../components/portal/Portal';
import Post from '../../../components/post/Post';
import ReportPostPopup from '../../../components/reportPostPopup/ReportPostPopup';
import { useActions } from '../../../hooks/useActions';
import { usePostMenuType } from '../../../hooks/usePostMenuType';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getDateTimeFromString } from '../../../services/time';
import { Notify } from '../../../services/toast';
import { ButtonClickEvent, TextareaChangeHandler } from '../../../types/types';
import './mainPage.scss';
const MainPage: React.FC = () => {
  const checkMenuType = usePostMenuType();
  const isAuth = useTypedSelector((state) => state.userStore.isAuth);
  const avatar = useTypedSelector((state) => state.userStore.user?.avatar);
  const isUserBanned = useTypedSelector((state) => state.userStore.user?.isBanned);
  const mainPagePosts = useTypedSelector((state) => state.postStore.mainPagePosts);
  const isPostsLoading = useTypedSelector((state) => state.postStore.isPostsLoading);
  const [isFeedOpened, setIsFeedOpened] = useState<boolean>(true);
  const [editPopup, setEditPopup] = useState<boolean>(false);
  const [reportPopup, setReportPopup] = useState<boolean>(false);
  const reportPostIdRef = useRef<number>(-1);
  const [editPopupValues, setEditPopupValues] = useState<{postId: number, text: string}>({postId: -1, text: ""});
  const setFeed = () => {
    setIsFeedOpened(true);
    loadMainPagePostsLogged();
  };
  const setFollowed = () => {
    setIsFeedOpened(false);
    loadMainPagePostsFollowed();
  };
  const {createNewPost, loadMainPagePosts, setMainPagePosts, loadMainPagePostsLogged, loadMainPagePostsFollowed, unlikePost, likePost, deletePost} = useActions();
  const [postText, setPostText] = useState<string>("");
  const onPostTextChange: TextareaChangeHandler = (e) => {
    setPostText(e.target.value);
  }
  const onPublishClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    if (postText.trim()) {
      createNewPost(postText.trim());
      setPostText("");
    } else {
      Notify.warn("Текст поста не может быть пустым.");
    }
  }

  const openEditPopup = (postId: number, text: string) => {
    setEditPopupValues({postId, text});
    setEditPopup(true);
  }
  const openReportPopup = (postId: number) => {
    reportPostIdRef.current = postId;
    setReportPopup(true);
  }

  useEffect(() => {
    if (isAuth) {
      loadMainPagePostsLogged();
    } else {
      loadMainPagePosts();
    }
    return () => {
      setMainPagePosts([]);
    }
  }, [isAuth]);

  return (
    <main className='main_page'>
      <Portal isOpened={reportPopup} closePopup={() => setReportPopup(false)}>
        <ReportPostPopup postId={reportPostIdRef.current} closePopup={() => setReportPopup(false)} />
      </Portal>
      <Portal isOpened={editPopup} closePopup={() => setEditPopup(false)}>
        <EditPostPopup postId={editPopupValues.postId} postText={editPopupValues.text} type="main" closePopup={() => setEditPopup(false)} />
      </Portal>
      <aside className="left-side"></aside>
      <div className="content">
        <div className="content_header">
          <span>Home</span> 
        </div>
        {
          isAuth && <>
          <div className="feed_sections">
            <button onClick={setFeed} className={isFeedOpened ? "active" : ""}>Feed</button>
            <button onClick={setFollowed} className={isFeedOpened ? "" : "active"}>Followed</button>
          </div>
          {
          !isUserBanned && <div className={`add_new_post ${isFeedOpened ? "active" : ""}`}>
              <img src={avatar ?? "/assets/unknown_user.png"} alt="avatar" />
              <textarea value={postText} onChange={onPostTextChange} placeholder='Введите новость...'></textarea>
              <div>
                <button onClick={onPublishClick}>Publish</button>
              </div>
            </div>
          }
          </>
        }
        {
        isPostsLoading ? <div className="circle-loader">
          <CircleLoader />
        </div> :
          !isAuth ? <>
            {
              mainPagePosts.length === 0 ? <div className="circle-loader">No posts found</div>
              : mainPagePosts.map((post) => (
                <Post
                  id={post.postId}
                  key={post.postId}
                  userId={post.userId}
                  userName={post.name}
                  avatar={post.avatar ?? "/assets/unknown_user.png"}
                  text={post.text}
                  likeCount={post.likesCount}
                  isLiked={false}
                  createdAt={getDateTimeFromString(post.updatedAt)}
                  menuType={checkMenuType(1)} // TODO if mine then "own" else "stranger" "1 -- userId"
                  />
              ))
            }
          </> 
          : <>
            {
              mainPagePosts.length === 0 ? <div className="circle-loader">No posts found</div>
              : mainPagePosts.map((post) => (
                <Post
                  id={post.postId}
                  key={post.postId}
                  userId={post.userId}
                  userName={post.name}
                  avatar={post.avatar ?? "/assets/unknown_user.png"}
                  text={post.text}
                  likeCount={post.likesCount}
                  isLiked={post.isLiked}
                  onLikeClick={() => {
                    post.isLiked ? unlikePost(post.postId, "main") : likePost(post.postId, "main")
                  }}
                  onReportClick={() => openReportPopup(post.postId)}
                  onDeleteClick={() => {deletePost(post.postId, "main")}}
                  onEditClick={() => openEditPopup(post.postId, post.text)}
                  createdAt={getDateTimeFromString(post.updatedAt)}
                  menuType={checkMenuType(post.userId)}
                  />
              ))
            }
          </>
        }

      </div>
      <aside className="right-side"></aside>
    </main>
  );
}

export default MainPage;