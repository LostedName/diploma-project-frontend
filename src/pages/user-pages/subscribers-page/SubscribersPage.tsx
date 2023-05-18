import {FC, useEffect} from 'react';
import CircleLoader from '../../../components/circleLoader/CircleLoader';
import FollowItem from '../../../components/followItem/FollowItem';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import './subscribersPage.scss';
const SubscribersPage: FC = () => {
  const user = useTypedSelector((state) => state.userStore.user);
  const isPageLoading = useTypedSelector((state) => state.userStore.isPageLoading);
  const subscribers = useTypedSelector((state) => state.userStore.userSubs);
  const {getUserSubscribersAsync, setUserFollows} = useActions();
  useEffect(() => {
    if (user?.id)
    getUserSubscribersAsync(user?.id);
    return () => {
      setUserFollows([]);
  }
  }, []);
  return (
    <main className="subscribers_page">
      <aside className="left-side"></aside>
      <div className="content">
        <div className="content_header">
          <span>Subscribers</span>
          <div />
          <span>{user?.name}</span>
        </div>
        {
          isPageLoading ? <div className="circle-loader">
          <CircleLoader />
        </div>
          : subscribers.length === 0 ? <div className="subs-empty">
              No one subsribed to you yet
            </div> 
            : <>
              {
                subscribers.map((sub) => (
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

export default SubscribersPage;