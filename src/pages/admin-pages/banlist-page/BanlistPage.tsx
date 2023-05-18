import React, {FC, useEffect} from 'react';
import CircleLoader from '../../../components/circleLoader/CircleLoader';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import './banlistPage.scss';
import UserRow from './UserRow';
const BanlistPage: FC = () => {
  const users = useTypedSelector((state) => state.adminStore.users);
  const isPageLoading = useTypedSelector((state) => state.adminStore.isPageLoading);
  const {getAdminBannedUsersAsync, setAdminPageLoading} = useActions();
  useEffect(() => {
    getAdminBannedUsersAsync();
    return () => {
      setAdminPageLoading(true);
    }
  }, []);
  return (
    <main className="admin_banlist_page">
      <div className="users_table">        
        <div className="table_header">
          <span>Avatar</span>
          <span>Name</span>
          <span>Post count</span>
          <span>Reason</span>
        </div>
        <div className="table_body">
        {
          isPageLoading ? <div className="circle-loader">
              <CircleLoader />
            </div> 
          : <>
              {
                users.length === 0 ? <div className="circle-loader">Table is empty</div>
                : users.map((user) => (
                  <UserRow
                    userId={user.userId}
                    name={user.name}
                    avatar={user.avatar || "/assets/unknown_user.png"}
                    postsCount={user.postsCount}
                    banReason={user.reason || ""}
                    />
                  ))
              }
          </>
        }
        </div>
      </div>
    </main>
  );
}

export default BanlistPage;