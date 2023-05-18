import {FC, useEffect} from 'react';
import CircleLoader from '../../../components/circleLoader/CircleLoader';
import FollowItem from '../../../components/followItem/FollowItem';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import './followsPage.scss';
const FollowsPage: FC = () => {
  const user = useTypedSelector((state) => state.userStore.user);
  const isPageLoading = useTypedSelector((state) => state.userStore.isPageLoading);
  const follows = useTypedSelector((state) => state.userStore.userSubs);
  const {getUserFollowsAsync, setUserFollows} = useActions();
  useEffect(() => {
    if (user?.id)
    getUserFollowsAsync(user?.id);
    return () => {
      setUserFollows([]);
  }
  }, []);
  return (
    <main className="follows_page">
      <aside className="left-side"></aside>
      <div className="content">
        <div className="content_header">
          <span>Follows</span>
          <div />
          <span>{user?.name}</span>
        </div>
        {
          isPageLoading ? <div className="circle-loader">
          <CircleLoader />
        </div>
          : follows.length === 0 ? <div className="subs-empty">
              You didn't subsribed to anyone yet
            </div>
            : <>
              {
                follows.map((sub) => (
                  <FollowItem id={sub.userId} userName={sub.name} avatar={sub.avatar} isFollowed={sub.isFollowed} />
                ))
              }
            </> 
        }
      </div>
      <aside className="right-side"></aside>
    </main>
  );
}

export default FollowsPage;