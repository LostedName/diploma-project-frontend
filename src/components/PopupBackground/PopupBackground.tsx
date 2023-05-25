import React from 'react';
import './popupBackground.scss';

interface IPopupBackground {
  closePopup: () => void;
}

const PopupBackground: React.FC<IPopupBackground> = ({closePopup, children}) => {
  return (
  <div className="popup-wrapper" onClick={closePopup}>
    <div className="popup-overlay">
      {children}
    </div>
  </div>
  );
};

export default PopupBackground;