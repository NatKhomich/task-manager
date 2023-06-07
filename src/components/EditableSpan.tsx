import React, {ChangeEvent, useState, KeyboardEvent, FC} from 'react';

type EditableSpan = {
    oldTitle: string
    callBack: (newTitle: string) => void
}

const EditableSpan: FC <EditableSpan> = (props) => {

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
                     onChange={onChangeInputEditHandler}/>

            : <span onDoubleClick={editModeHandler} style={{marginRight: "30px"}}>{props.oldTitle}</span>
    );
};

export default EditableSpan;