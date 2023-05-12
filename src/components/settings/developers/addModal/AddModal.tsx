import React from "react";
import "./AddModal.scss";
import { Modal } from "../../../common/Modal/Modal";
import { useInput } from "../../../../utils/useInput";
import { useDispatch } from "react-redux";
import { addAppAC } from "../../../../store/apps-reducer";

type AddAppModalType = {
  toggleModal: () => void;
};

export const AddModal = ({ toggleModal }: AddAppModalType) => {
  const dispatch = useDispatch();

  const appName = useInput("");
  const appHomeUrl = useInput("");
  const appDescription = useInput("");
  const appAuthUrl = useInput("");

  const addApplication = () => {
    if (appName.value.trim() !== "" && appHomeUrl.value.trim() !== "" && appAuthUrl.value.trim() !== "") {
      dispatch(addAppAC(appName.value, appHomeUrl.value, appDescription.value, appAuthUrl.value));
      toggleModal();
    }
  };

  return (
    <Modal closeModal={toggleModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <span className="title">Регистрация нового OAuth приложения</span>
        <div className="formBlock">
          <span className="label">Название приложения *</span>
          <input type="text" value={appName.value} onChange={appName.onChange} />
        </div>
        <div className="formBlock">
          <span className="label">Домашний URL *</span>
          <input type="text" value={appHomeUrl.value} onChange={appHomeUrl.onChange} />
        </div>
        <div className="formBlock">
          <span className="label">Описание приложения</span>
          <input value={appDescription.value} onChange={appDescription.onChange} />
        </div>
        <div className="formBlock">
          <span className="label">Обратный вызов авторизации URL *</span>
          <input type="text" value={appAuthUrl.value} onChange={appAuthUrl.onChange} />
        </div>
        <button onClick={addApplication}>Добавить</button>
      </div>
    </Modal>
  );
};
