import React, { ChangeEvent, KeyboardEvent, memo, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import styles from "./AddItemForm.module.css";

type Props = {
    addItem: (title: string) => void
    disabled?: boolean
}

export const AddItemForm = memo(({addItem, disabled}: Props) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const changeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }
    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            return setError(null)
        }
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }

    return (
        <div>
            <TextField label={error ? 'Title is required' : 'Type out something'}
                       variant="outlined"
                       size="small"
                       error={!!error}
                       value={title}
                       onChange={changeTitleHandler}
                       onKeyDown={keyDownHandler}
                       disabled={disabled}
                       type="search"/>

            <Button variant="contained"
                    className={styles.btn}
                    disabled={disabled}
                    onClick={addItemHandler}>
                +
            </Button>
        </div>
    );
})
