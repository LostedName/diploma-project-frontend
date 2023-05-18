import React, { useEffect, useRef, useState } from 'react';
import CircleLoader from '../../../components/circleLoader/CircleLoader';
import EditPostPopup from '../../../components/editPostPopup/EditPostPopup';
import EditProfilePopup from '../../../components/editProfilePopup/EditProfilePopup';
import Portal from '../../../components/portal/Portal';
import Post from '../../../components/post/Post';
import ReportPostPopup from '../../../components/reportPostPopup/ReportPostPopup';
import { useActions } from '../../../hooks/useActions';
import { usePostMenuType } from '../../../hooks/usePostMenuType';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getDateTimeFromString } from '../../../services/time';
import { MenuType } from '../../../types/Post';
import { ButtonClickEvent } from '../../../types/types';
import './profilePage.scss';

const ProfilePage: React.FC = () => {
  const [isPostsOpened, setIsPostsOpened] = useState<boolean>(true);
  const checkMenuType = usePostMenuType();
  const user = useTypedSelector((state) => state.userStore.user);
  const userPosts = useTypedSelector((state) => state.postStore.userPosts);
  const userLikedPosts = useTypedSelector((state) => state.postStore.userLikedPosts);
  const isPostsLoading = useTypedSelector((state) => state.postStore.isPostsLoading);
  const [editPopup, setEditPopup] = useState<boolean>(false);
  const onEditProfileClick = (e: ButtonClickEvent) => {
    setEditProfilePopup(true);
  }
  const [editProfilePopup, setEditProfilePopup] = useState<boolean>(false);
  const [editPopupValues, setEditPopupValues] = useState<{postId: number, text: string, type: "liked" | "posts"}>({postId: -1, text: "", type: "posts"});
  const {loadUserPosts, loadLikedUserPosts, setUserPosts, deletePost, unlikePost, likePost} = useActions();
  const setPosts = () => {
    if (isPostsOpened === false) {
      setIsPostsOpened(true);
      if (user?.id)
        loadUserPosts(user?.id);
    }
  }; 
  const setLiked = () => {
    if (isPostsOpened === true) {
      setIsPostsOpened(false);
      if (user?.id)
        loadLikedUserPosts(user?.id);
    }
  };
  const [reportPopup, setReportPopup] = useState<boolean>(false);
  const reportPostIdRef = useRef<number>(-1);
  const openReportPopup = (postId: number) => {
    reportPostIdRef.current = postId;
    setReportPopup(true);
  }
  const openEditPopup = (postId: number, text: string, type: "posts" | "liked") => {
    setEditPopupValues({postId, text, type});
    setEditPopup(true);
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
            userName={user?.name || ""}
            avatar={user?.avatar ?? "/assets/unknown_user.png"}
            text={post.text}
            likeCount={post.likesCount} 
            isLiked={post.isLiked}
            onReportClick={() => openReportPopup(post.id) }
            onLikeClick={() => {
              post.isLiked ? unlikePost(post.id, "posts") : likePost(post.id, "posts")
            }}
            onEditClick={() => openEditPopup(post.id, post.text, "posts")}
            onDeleteClick={() => {deletePost(post.id, "posts")}}
            createdAt={getDateTimeFromString(post.updatedAt)}
            menuType={MenuType.own}/>
          ))
        }
        <div className="circle-loader">
          <CircleLoader />
        </div>
      </>
    : userPosts.length === 0 ? <div className="posts-empty">You have no posts yet</div>
    : userPosts.map((post) => (
        <Post id={post.id}
          key={post.id}
          userId={post.userId}
          userName={user?.name || ""}
          avatar={user?.avatar ?? "/assets/unknown_user.png"}
          text={post.text}
          likeCount={post.likesCount}
          isLiked={post.isLiked}
          onReportClick={() => openReportPopup(post.id)}
          onEditClick={() => openEditPopup(post.id, post.text, "posts")}
          onLikeClick={() => {
            post.isLiked ? unlikePost(post.id, "posts") : likePost(post.id, "posts")
          }}
          onDeleteClick={() => {deletePost(post.id, "posts")}}
          createdAt={getDateTimeFromString(post.updatedAt)}
          menuType={MenuType.own}/>
      ))
  );
  
  const renderUserLikedPosts = () => (
    isPostsLoading ? 
      userLikedPosts.length === 0 
      ? <div className="circle-loader">
          <CircleLoader />
      </div>
      : <>
        {
          userLikedPosts.map((post) => (
          <Post id={post.postId}
            key={post.postId}
            userId={post.userId}
            userName={post.name || ""}
            avatar={post.avatar ?? "/assets/unknown_user.png"}
            text={post.text}
            likeCount={post.likesCount}
            isLiked={post.isLiked}
            onReportClick={() => openReportPopup(post.postId)}
            onEditClick={() => openEditPopup(post.postId, post.text, "liked")}
            onLikeClick={() => unlikePost(post.postId, "liked")}
            onDeleteClick={() => {deletePost(post.postId, "liked")}}
            createdAt={getDateTimeFromString(post.updatedAt)}
            menuType={checkMenuType(post.userId)}/>
          ))
        }
        <div className="circle-loader">
          <CircleLoader />
        </div>
      </>
    : userPosts.length === 0 ? <div className="posts-empty">You have no liked posts yet</div>
      : userLikedPosts.map((post) => (
        <Post id={post.postId}
          key={post.postId}
          userId={post.userId}
          userName={post.name || ""}
          avatar={post.avatar ?? "/assets/unknown_user.png"}
          text={post.text}
          likeCount={post.likesCount}
          isLiked={post.isLiked}
          onReportClick={() => openReportPopup(post.postId)}
          onEditClick={() => openEditPopup(post.postId, post.text, "liked")}
          onLikeClick={() => unlikePost(post.postId, "liked")}
          onDeleteClick={() => {deletePost(post.postId, "liked")}}
          createdAt={getDateTimeFromString(post.updatedAt)}
          menuType={checkMenuType(post.userId)}/>
      ))
  );


  useEffect(() => {
    if (user?.id)
      loadUserPosts(user?.id);
    return () => {
      setUserPosts([]);
    }
  }, [user]);
  return (
    <main className="profile_page">
      <Portal isOpened={reportPopup} closePopup={() => setReportPopup(false)}>
        <ReportPostPopup postId={reportPostIdRef.current} closePopup={() => setReportPopup(false)} />
      </Portal>
      <Portal isOpened={editPopup} closePopup={() => setEditPopup(false)}>
        <EditPostPopup postId={editPopupValues.postId} postText={editPopupValues.text} type={editPopupValues.type} closePopup={() => setEditPopup(false)} />
      </Portal>
      <Portal isOpened={editProfilePopup} closePopup={() => setEditProfilePopup(false)}>
        <EditProfilePopup closePopup={() => setEditProfilePopup(false)} />
      </Portal>
      <aside className="left-side"></aside>
      <div className="content">
        <div className="content_header">
          <span>Profile</span>
          <div />
          <span>{user?.name}</span>
          {/* <div />
          <span>35 posts</span> */}
        </div>
        <div className="content_cover">
          <img src={user?.profileCover ?? "/assets/unknown_cover.jpg"} alt="cover" />
        </div>
        <div className="content_info">
          <div className="content_avatar">
            <img src={user?.avatar ?? "/assets/unknown_user.png"} alt="avatar" />
            {
              <button onClick={onEditProfileClick}>Edit Profile</button>
            }
          </div>
          <span className="profile_name">
            {user?.name}
          </span>
          <span className="profile_description">
            {user?.description}
          </span>
          <ul>
            {
              user?.link && <li><img src="/assets/link.png" alt="link" />{user?.link}</li>
            }
            {
              user?.birthDate && <li><img src="/assets/birthday.png" alt="birth" />Birth Date: {user?.birthDate}</li>
            }
            {
              user?.country && <li><img src="/assets/country.png" alt="country" />Country: {user?.country}</li>
            }
          </ul>
          <div className="profile_subs">
            <span>{user?.followCount}</span> people you subscribed
          </div>
          <div className="profile_subs">
            <span>{user?.subsCount}</span> people subscribed to you
          </div>
        </div>
        <div className="profile_sections">
          <button onClick={setPosts} className={isPostsOpened ? "active" : ""}>Posts</button>
          <button onClick={setLiked} className={isPostsOpened ? "" : "active"}>Liked</button>
        </div>
        <div className="profile_posts">
          {
            isPostsOpened ? renderUserPosts() : renderUserLikedPosts()
          }
        </div>
      </div>
      <aside className="right-side"></aside>
    </main>
  );
}

export default ProfilePage;