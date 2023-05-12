import React, { ChangeEvent, useCallback, useState, KeyboardEvent } from "react";
import "./EditableSpan.scss";
import EditIcon from "@material-ui/icons/Edit";

type EditableSpanPropsType = {
  id: string;
  value: string;
  onChange: (id: string, newText: string) => void;
};

export const EditableSpan = React.memo((props: EditableSpanPropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState(props.value);

  const activateEditMode = useCallback(() => {
    setEditMode(true);
    setTitle(props.value);
  }, [props]);

  const activateViewMode = useCallback(() => {
    setEditMode(false);
    props.onChange(props.id, title);
  }, [props, title]);

  const onEnterPress = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        activateViewMode();
      }
    },
    [activateViewMode]
  );

  const changeTitle = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <textarea
      value={title}
      onChange={changeTitle}
      onBlur={activateViewMode}
      onKeyPress={onEnterPress}
      className="addInput"
      autoFocus
    />
  ) : (
    <>
      <span onDoubleClick={activateEditMode}>{props.value}</span>
      {/*<EditIcon onClick={activateEditMode} />*/}
    </>
  );
});
