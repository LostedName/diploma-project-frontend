import React from 'react';
import Post from '../../../components/post/Post';
import { useActions } from '../../../hooks/useActions';
import { PostProps } from '../../../types/Post';
import { ButtonClickEvent } from '../../../types/types';
import './deletedPost.scss';

const DeletedPost: React.FC<PostProps> = ({
    id,
    userName,
    avatar,
    text,
    likeCount,
    createdAt,
    deletedAt,
    menuType,
  }) => {
  const {recoverPostAsync} = useActions();
  const onRecoverClick = (e: ButtonClickEvent) => {
    e.preventDefault();
    recoverPostAsync(id);
  }
  return (
    <div className="deleted-post">
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
          Deleted {deletedAt}
        </span>
        <div className="buttons">
          <button onClick={onRecoverClick}>
            Recover Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletedPost;