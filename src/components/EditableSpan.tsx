import React, {ChangeEvent, useState} from 'react';

type EditableSpan = {
    value: string
    callBack: (newTitle: string) => void
}

const EditableSpan = (props: EditableSpan) => {

    const [editMode, setEditMode] = useState(false)

    const [title, setTitle] = useState(props.value)

    const editModeHandler = () => {
        setEditMode(!editMode)
        props.callBack(title)
    }

    const onChangeInputEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={title}
                     autoFocus
                     onBlur={editModeHandler}
                     onChange={onChangeInputEditHandler}
            />
            : <span onDoubleClick={editModeHandler}>{props.value}</span>
    );
};

export default EditableSpan;