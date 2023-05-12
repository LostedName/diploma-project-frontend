import React from "react";
import "./Modal.scss";

type HeaderPropsType = {
  children: React.ReactNode;
  closeModal: () => void;
};

export const Modal = ({ children, closeModal }: HeaderPropsType) => {
  return (
    <div onClick={() => closeModal()} className="modalWrapper">
      <div className="modalContent">
        {children}
        <div onClick={() => closeModal()} className="closeButton">
          X
        </div>
      </div>
    </div>
  );
};
