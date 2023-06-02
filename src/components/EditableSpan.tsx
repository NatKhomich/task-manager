import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type EditableSpan = {
    oldTitle: string
    callBack: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpan) => {

    const [editMode, setEditMode] = useState(false)

    const [newTitle, setNewTitle] = useState(props.oldTitle)

    const editModeHandler = () => {
        setEditMode(!editMode)
        if(editMode) {
            props.callBack(newTitle)
        }
    }

    const onChangeInputEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            setEditMode(false)
            props.callBack(newTitle)
        }
    }

    return (
        editMode
            ? <input value={newTitle}
                     autoFocus
                     onBlur={editModeHandler}
                     onKeyDown={onKeyDownHandler}
                     onChange={onChangeInputEditHandler}
            />
            : <span onDoubleClick={editModeHandler}>{props.oldTitle}</span>
    );
};

export default EditableSpan;