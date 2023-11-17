import React, {ChangeEvent, useState, KeyboardEvent, FC, memo} from 'react';
import TextField from '@mui/material/TextField';
import styles from './EditableSpan.module.css'

type PropsType = {
    value: string
    callBack: (newTitle: string) => void
    disabled: boolean
}

export const EditableSpan: FC<PropsType> = memo((props) => {
    const {value, disabled, callBack} = props

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(value)

    const activateEditMode = () => {
        if (disabled) return
        setEditMode(!editMode)
        if (editMode) props.callBack(title)
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setEditMode(false)
            callBack(title)
        }
    }

    return (
        editMode
            ? <TextField size="small" value={title}
                         onChange={onChangeHandler}
                         onKeyDown={onKeyDownHandler}
                         onBlur={activateEditMode}
                         autoFocus
            />

            : <span onDoubleClick={activateEditMode} className={styles.span}>{props.value} </span>
    );
})

