import React from 'react';
import ReactDOM from 'react-dom';
import './portal.scss';

interface IPopup {
  isOpened: boolean;
  closePopup: () => void;
}

const Portal: React.FC<IPopup> = ({ isOpened, closePopup, children }) => {
  const element =
    document.getElementById("popup-portal") || document.createElement("div");
  if (!isOpened) return null;
  return ReactDOM.createPortal(
    <div className="portal-wrapper" onClick={closePopup}>
      <div className="portal-overlay">
        <form onSubmit={(e) => e.preventDefault()} onClick={(e) => e.stopPropagation()}>{children}</form>
      </div>
    </div>,
    element
  );
};

export default Portal;