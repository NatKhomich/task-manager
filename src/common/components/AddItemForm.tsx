import React, {ChangeEvent, FC, KeyboardEvent, memo, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormType = {
    addItem: (title: string) => void
    disabled?: boolean
}

const AddItemForm: FC<AddItemFormType> = memo(({addItem, disabled}) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {setError('Title is required')}
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(error !== null) return setError(null)
        if (e.key === 'Enter') addItemHandler()
    }

    const muiStyles = {
        maxWidth: '39px',
        maxHeight: '39px',
        minWidth: '39px',
        minHeight: '39px',
        marginLeft: '3px'
    }

    return (
        <div>
            <TextField label={error ? 'Title is required' : 'Type out something'}
                       variant="outlined"
                       size="small"
                       error={!!error}
                       value={title}
                       onChange={onChangeTitleHandler}
                       onKeyDown={onKeyDownHandler}
                       disabled={disabled}
                       type="search"/>

            <Button variant="contained"
                    style={muiStyles}
                    disabled={disabled}
                    onClick={addItemHandler}>
                + </Button>
        </div>
    );
})

export default AddItemForm;