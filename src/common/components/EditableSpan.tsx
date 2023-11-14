import React, {ChangeEvent, useState, KeyboardEvent, FC, memo} from 'react';
import TextField from '@mui/material/TextField';

type EditableSpan = {
    oldTitle: string
    callBack: (newTitle: string) => void
    disabled: boolean
}

export const EditableSpan: FC<EditableSpan> = memo((props) => {

    const [editMode, setEditMode] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)

    const editModeHandler = () => {
        if (props.disabled) {
            return
        }
        setEditMode(!editMode)
        if (editMode) props.callBack(newTitle)
    }

    const onChangeInputEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            props.callBack(newTitle)
        }
    }

    return (
        editMode
            ? <TextField variant="outlined"
                         size="small"
                         value={newTitle}
                         onChange={onChangeInputEditHandler}
                         onKeyDown={onKeyDownHandler}
                         onBlur={editModeHandler}
                         autoFocus
                         type="search"
                         style={{width: '70%'}}/>

            : <span onDoubleClick={editModeHandler} style={{marginRight: '30px',
                textAlign: 'left', paddingRight: '20px', wordBreak: 'break-all'}}>{props.oldTitle} </span>
    );
})
