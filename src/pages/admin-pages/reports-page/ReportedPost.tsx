import React from 'react';
import { useActions } from '../../../hooks/useActions';
import { PostProps } from '../../../types/Post';
import { ButtonClickEvent } from '../../../types/types';
import './reportedPost.scss';

const ReportedPost: React.FC<PostProps> = ({
    id,
    userName,
    avatar,
    text,
    likeCount,
    reportsCount,
    createdAt,
    menuType,
  }) => {
  const {deletePostAsync, discardReportsAsync} = useActions();
  const onDeleteClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    deletePostAsync(id);
  }
  const onDiscardClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    discardReportsAsync(id);
  }
  return (
    <div className="reported-post">
      <div className="rep-post">
        <img src={avatar} alt="avatar" />
          <div className="post_header">
            <div className="post_header_name">
              <span>{userName}</span>
              <div />
              <span>{createdAt}</span>
            </div>
          </div>
          <span>
            {text}
          </span>
          <div className="like">
            <div className="button">
              <img src="/assets/heart.png" alt="heart" /> {likeCount}
            </div>
          </div>
        </div>
      <div className="info">
        <span>
          Count of Reports: {reportsCount}
        </span>
        <div className="buttons">
          <button onClick={onDeleteClick}>
            Delete Post
          </button>
          <button onClick={onDiscardClick}>
            Discard All Reports
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportedPost;