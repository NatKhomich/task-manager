import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm: FC <AddItemFormType>  = (props) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemHandler()
        }
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
           {/* <input value={title} onChange={onChangeTitleHandler} onKeyDown={onKeyDownHandler} className={error ? 'error' : ''}/>*/}

            <TextField id="outlined-basic"
                       label={error ? 'Title is required' : 'Type out something' }
                       variant="outlined"
                       size="small"
                       error={!!error}
                       value={title}
                       onChange={onChangeTitleHandler}
                       onKeyDown={onKeyDownHandler}
            />

        {/* <button onClick={addItemHandler}> + </button>*/}
            <Button variant="contained"
                    style={muiStyles}
                   /* color="success"*/
                    onClick={addItemHandler}> + </Button>

           {/* {error && <div className={'error-message'}> {error} </div>}*/}
        </div>
    );
};

export default AddItemForm;