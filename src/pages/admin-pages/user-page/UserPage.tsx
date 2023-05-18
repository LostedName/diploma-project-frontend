import React, {FC, useState} from 'react';
import Post from '../../../components/post/Post';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { MenuType } from '../../../types/Post';
import './userPage.scss';
const UserPage: FC = () => {
  const [isPostsOpened, setIsPostsOpened] = useState<boolean>(true);
  const user = useTypedSelector((state) => state.userStore.user);
  const setPosts = () => setIsPostsOpened(true); 
  const setLiked = () => setIsPostsOpened(false);
  return (
    <main className="admin_user_page">
      <aside className="left-side"></aside>
      <div className="content">
        <div className="content_header">
          <span>Profile</span>
          <div />
          <span>{user?.name}</span>
          <div />
          <span>35 posts</span>
        </div>
        <div className="content_cover">
          <img src="/assets/profileCover.jpg" alt="cover" />
        </div>
        <div className="content_info">
          <div className="content_avatar">
            <img src="/assets/myPhotoSquare.jpg" alt="avatar" />
            {
              <button>Change Profile</button>
            }
          </div>
          <span className="profile_name">
            {user?.name}
          </span>
          <span className="profile_description">
            {user?.description}
          </span>
          <ul>
            <li><img src="/assets/link.png" alt="link" />https://vk.com/dikarp118</li>
            <li><img src="/assets/birthday.png" alt="link" />Birth Date: 28.04.2002</li>
            <li><img src="/assets/calendar.png" alt="link" />Registration Date: 12.05.2012</li>
          </ul>
          <div className="profile_subs">
            <span>751</span> people you subscribed
          </div>
          <div className="profile_subs">
            <span>15k</span> people subscribed to you
          </div>
        </div>
        <div className="profile_sections">
          <button onClick={setPosts} className={isPostsOpened ? "active" : ""}>Posts</button>
          <button onClick={setLiked} className={isPostsOpened ? "" : "active"}>Liked</button>
        </div>
        <div className="profile_posts">
          <Post id={1}
                key={1} // id
                userId={1}
                userName="Dio_karpo"
                avatar="/assets/myPhotoSquare.jpg"
                text="Все сфы гули гули"
                likeCount={600}
                isLiked={true}
                createdAt="11 minutes ago"
                menuType={MenuType.own}/>
        </div>
      </div>
      <aside className="right-side"></aside>
    </main>
  );
}

export default UserPage;