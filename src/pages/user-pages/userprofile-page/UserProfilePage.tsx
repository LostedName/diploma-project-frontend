import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CircleLoader from '../../../components/circleLoader/CircleLoader';
import LoadingScreen from '../../../components/loadingScreen/LoadingScreen';
import Portal from '../../../components/portal/Portal';
import Post from '../../../components/post/Post';
import ReportPostPopup from '../../../components/reportPostPopup/ReportPostPopup';
import statusCodes from '../../../error/statusCodes';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getDateTimeFromString } from '../../../services/time';
import { MenuType } from '../../../types/Post';
import NotFoundPage from '../notfound-page/NotFoundPage';
import './userProfilePage.scss';

const UserProfliePage: React.FC = () => {
  const navigate = useNavigate();
  const isAuth = useTypedSelector((state) => state.userStore.isAuth);
  const isPageLoading = useTypedSelector((state) => state.userStore.isPageLoading);
  const userError = useTypedSelector((state) => state.userStore.userError);
  const foreignUser = useTypedSelector((state) => state.userStore.foreignUser);
  const isPostsLoading = useTypedSelector((state) => state.postStore.isPostsLoading);
  const userPosts = useTypedSelector((state) => state.postStore.userPosts);
  const {getForeignUserDataAsync, loadUserPosts, setUserError, setUserPosts, unlikePost, likePost, subscribeToUser, unsubscribeFromUser, setForeignUserLoading} = useActions();
  const setPosts = () => {console.log("POSTS CLICK")}; 
  const { userId } = useParams<{[key: string]:string}>();
  const onFollowHandler = () => {
    if (foreignUser)
      foreignUser?.isFollowed ? unsubscribeFromUser(foreignUser.id) : subscribeToUser(foreignUser.id);
  }
  const [reportPopup, setReportPopup] = useState<boolean>(false);
  const reportPostIdRef = useRef<number>(-1);
  const openReportPopup = (postId: number) => {
    reportPostIdRef.current = postId;
    setReportPopup(true);
  }
  const renderUserPosts = () => (
    isPostsLoading ? 
      userPosts.length === 0
      ? <div className="circle-loader">
          <CircleLoader />
      </div>
      : <>
        {
          userPosts.map((post) => (
          <Post id={post.id}
            key={post.id}
            userId={post.userId}
            userName={foreignUser?.name || ""}
            avatar={foreignUser?.avatar ?? "/assets/unknown_user.png"}
            text={post.text}
            likeCount={post.likesCount}
            isLiked={post.isLiked}
            onReportClick={() => openReportPopup(post.id)}
            onLikeClick={() => {
              post.isLiked ? unlikePost(post.id, "posts") : likePost(post.id, "posts")
            }}
            createdAt={getDateTimeFromString(post.updatedAt)}
            menuType={MenuType.stranger}/>
          ))
        }
        <div className="circle-loader">
          <CircleLoader />
        </div>
      </>
    : userPosts.length === 0 ? <div className="posts-empty">User have no posts</div>
    : userPosts.map((post) => (
        <Post id={post.id}
          key={post.id}
          userId={post.userId}
          userName={foreignUser?.name || ""}
          avatar={foreignUser?.avatar ?? "/assets/unknown_user.png"}
          text={post.text}
          likeCount={post.likesCount}
          isLiked={post.isLiked}
          onReportClick={() => openReportPopup(post.id)}
          onLikeClick={() => {
            post.isLiked ? unlikePost(post.id, "posts") : likePost(post.id, "posts")
          }}
          createdAt={getDateTimeFromString(post.updatedAt)}
          menuType={MenuType.stranger}/>
      ))
  );
  
  useEffect(() => {
    if (isAuth) {
      getForeignUserDataAsync(userId ? parseInt(userId) : -1, navigate);
    }
    return () => {
      setUserError("");
    }
  }, [isAuth]);

  useEffect(() => {
    if (foreignUser?.id)
      loadUserPosts(foreignUser.id, 0);
    return () => {
      setUserPosts([]);
    }
  }, [foreignUser]);

  if (isPageLoading) {
    return (
      <main className="user_profile_page">
        <div className="loading-profile-screen">
          <LoadingScreen />
        </div>
      </main>
    );
  }
  return (
  <>
    {
      userError === statusCodes.USER_NOT_FOUND ? <NotFoundPage />
      :
    <main className="user_profile_page">
      <Portal isOpened={reportPopup} closePopup={() => setReportPopup(false)}>
        <ReportPostPopup postId={reportPostIdRef.current} closePopup={() => setReportPopup(false)} />
      </Portal>
      <aside className="left-side"></aside>
      <div className="content">
        <div className="content_header">
          <span>Profile</span>
          <div />
          <span>{foreignUser?.name}</span>
          {/* <div />
          <span>35 posts</span> */}
        </div>
        <div className="content_cover">
          <img src={foreignUser?.profileCover ?? "/assets/unknown_cover.jpg"} alt="cover" />
        </div>
        <div className="content_info">
          <div className="content_avatar">
            <img src={foreignUser?.avatar ?? "/assets/unknown_user.png"} alt="avatar" />
              <button
                onClick={onFollowHandler}  
                className={`foreign_profile_btn ${foreignUser?.isFollowed ? "followed" : ""}`}
              >
                {foreignUser?.isFollowed ? "Unfollow" : "Follow"}
              </button>
          </div>
          <span className="profile_name">
            {foreignUser?.name}
          </span>
          <span className="profile_description">
            {foreignUser?.description}
          </span>
          <ul>
            {
              foreignUser?.link && <li><img src="/assets/link.png" alt="link" />{foreignUser?.link}</li>
            }
            {
              foreignUser?.birthDate && <li><img src="/assets/birthday.png" alt="birth" />Birth Date: {foreignUser?.birthDate}</li>
            }
            {
              foreignUser?.country && <li><img src="/assets/country.png" alt="country" />Country: {foreignUser?.country}</li>
            }
          </ul>
          <div className="profile_subs">
            <span>{foreignUser?.followCount}</span> people this user subscribed
          </div>
          <div className="profile_subs">
            <span>{foreignUser?.subsCount}</span> people subscribed to this user
          </div>
        </div>
        <div className="profile_sections">
          <button onClick={setPosts} className="active">Posts</button>
        </div>
        <div className="profile_posts">
          {
            renderUserPosts()
          }
        </div>
      </div>
      <aside className="right-side"></aside>
    </main>
    }
</>
  );
}

export default UserProfliePage;