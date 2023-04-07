import React, {useState,ChangeEvent} from 'react';

type EditableSpanPropsType = {
    value: string
    callBack: (newTitle: string)=> void
}

const EditableSpan = (props: EditableSpanPropsType) => {

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.value)

    const activateEditMode = () => {
        setEditMode(!editMode)
        setTitle(props.value)
    }

    const activateViewMode = () => {
        setEditMode(!editMode)
        props.callBack(title)
    }

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
       setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={title}
                     autoFocus
                     onBlur={ activateViewMode }
                     onChange={ onChangeTitleHandler }
            />
            : <span onDoubleClick={activateEditMode}> {props.value} </span>
    );
};

export default EditableSpan;