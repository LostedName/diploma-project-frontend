import React from 'react';
import ReactDOM from 'react-dom';
import './portal.scss';

interface IPopup {
  isOpened: boolean;
}

const Portal: React.FC<IPopup> = ({ isOpened, children }) => {
  const element =
    document.getElementById("popup-portal") || document.createElement("div");
  if (!isOpened) return null;
  return ReactDOM.createPortal(
    <>
      {children}
    </>,
    element
  );
};

export default Portal;