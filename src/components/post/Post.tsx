import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MenuType, PostProps } from "../../types/Post";
import "./post.scss";

const Post: React.FC<PostProps> = ({
  id,
  userId,
  userName,
  avatar,
  text,
  likeCount,
  isLiked,
  onDeleteClick,
  onLikeClick,
  onEditClick,
  onReportClick,
  createdAt,
  menuType,
}) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);
  const openMenu = (e: React.FormEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsMenuOpened(true);
  };
  const closeMenu = () => setIsMenuOpened(false);
  const renderButton = useCallback(() => {
    switch (menuType) {
      case MenuType.none:
        return <></>;
      case MenuType.own:
        return (
          <button onClick={openMenu}>
            <div />
            <div />
            <div />
            <div className={`profile_menu ${isMenuOpened ? "active" : ""}`}>
              <button onClick={onEditClick}>Edit</button>
              <button onClick={onDeleteClick}>Delete</button>
            </div>
          </button>
        );
      case MenuType.stranger:
        return (
          <button onClick={openMenu}>
            <div />
            <div />
            <div />
            <div className={`profile_menu ${isMenuOpened ? "active" : ""}`}>
              <button onClick={onReportClick}>Report</button>
            </div>
          </button>
        );
    }
  }, [menuType, isMenuOpened]);
  useEffect(() => {
    document.addEventListener("click", closeMenu);
    return () => {
      document.removeEventListener("click", closeMenu);
    };
  }, []);
  return (
    <div className="post">
      <Link to={`/profile/${userId}`}>
        <img src={avatar} alt="avatar" />
      </Link>
      <div className="post_header">
        <div className="post_header_name">
          <Link to={`/profile/${userId}`}>
            <span>{userName}</span>
          </Link>
          <div />
          <span>{createdAt}</span>
        </div>
        {renderButton()}
      </div>
      <span>{text}</span>
      <div className="like">
        <button onClick={onLikeClick}>
          <img src={isLiked ? "/assets/heartFilled.png" : "/assets/heart.png"} alt="heart" /> {likeCount}
        </button>
      </div>
    </div>
  );
};

export default Post;
