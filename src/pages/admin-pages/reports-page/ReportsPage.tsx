import React, {FC, useEffect} from 'react';
import CircleLoader from '../../../components/circleLoader/CircleLoader';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { getDateTimeFromString } from '../../../services/time';
import { MenuType } from '../../../types/Post';
import ReportedPost from './ReportedPost';
import './reportsPage.scss';
const ReportsPage: FC = () => {
  const posts = useTypedSelector((state) => state.adminStore.posts);
  const isPageLoading = useTypedSelector((state) => state.adminStore.isPageLoading);
  const {getAdminPostsAsync, setAdminPosts, setAdminPageLoading} = useActions();
  useEffect(() => {
    getAdminPostsAsync();
    return () => {
      setAdminPosts([]);
      setAdminPageLoading(true);
    }
  }, []);
  return (
    <main className="admin_reports_page">
      <aside className="left-side"></aside>
      <div className="content">
        <div className="content_header">
          <span>Reported Posts</span>
        </div>
        {
          isPageLoading ? <div className="circle-loader">
              <CircleLoader />
            </div> 
          : <>
              {
                posts.length === 0 ? <div className="circle-loader">No posts found</div>
                : posts.map((post) => (
                  <ReportedPost 
                    id={post.postId}
                    userId={post.userId}
                    userName={post.name}
                    avatar={post.avatar || "/assets/unknown_user.png"}
                    text={post.text}
                    likeCount={post.likesCount}
                    reportsCount={post.reportsCount}
                    isLiked={true}
                    createdAt={getDateTimeFromString(post.updatedAt)}
                    menuType={MenuType.none}
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

export default ReportsPage;