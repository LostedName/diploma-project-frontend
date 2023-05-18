import React from 'react';
import { Link } from 'react-router-dom';
import { useActions } from '../../hooks/useActions';
import { FollowItemProps } from '../../types/FollowItem';
import { ButtonClickEvent } from '../../types/types';
import './followItem.scss';

const FollowItem: React.FC<FollowItemProps> = ({
    id,
    userName,
    avatar,
    isFollowed,
  }) => {
  const {unsubscribeFromUserSubs, subscribeToUserSubs} = useActions();
  const onFollowClick = (e: ButtonClickEvent) => {
    isFollowed ? unsubscribeFromUserSubs(id) : subscribeToUserSubs(id);
  }
  return (
    <div className="follower">
      <img src={avatar ?? "/assets/unknown_user.png"} alt="avatar" />
      <span>
        {userName}
      </span>
      <div>
        <Link to={`/profile/${id}`}>
          Profile
        </Link>
        <button onClick={onFollowClick}>
          {isFollowed ? "Unfollow" : "Follow"}
        </button>
      </div>
    </div>
  );
};

export default FollowItem;