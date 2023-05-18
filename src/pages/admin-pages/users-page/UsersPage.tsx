import React, {FC, useEffect, useRef, useState} from 'react';
import BanUserPopup from '../../../components/banUserPopup/BanUserPopup';
import CircleLoader from '../../../components/circleLoader/CircleLoader';
import Portal from '../../../components/portal/Portal';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import UserRow from './UserRow';
import './usersPage.scss';
const UsersPage: FC = () => {
  const users = useTypedSelector((state) => state.adminStore.users);
  const userIdRef = useRef<number>(-1);
  const userNameRef = useRef<string>("");
  const isPageLoading = useTypedSelector((state) => state.adminStore.isPageLoading);
  const [isBanPopupOpened, setIsBanPopupOpened] = useState<boolean>(false);
  const {getAdminUsersAsync, setAdminPageLoading} = useActions();
  useEffect(() => {
    getAdminUsersAsync();
    return () => {
      setAdminPageLoading(true);
    }
  }, []);
  return (
    <main className="admin_users_page">
      <Portal isOpened={isBanPopupOpened} closePopup={() => setIsBanPopupOpened(false)}>
        <BanUserPopup
          userId={userIdRef.current}
          userName={userNameRef.current}
          closePopup={() => setIsBanPopupOpened(false)} />
      </Portal>
      <div className="users_table">
        <div className="table_header">
          <span>Avatar</span>
          <span>Name</span>
          <span>Post count</span>
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
                    onOpen={(userId: number, userName: string) => {
                      userIdRef.current = userId;
                      userNameRef.current = userName;
                      setIsBanPopupOpened(true);
                    }}
                    postsCount={user.postsCount}
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

export default UsersPage;