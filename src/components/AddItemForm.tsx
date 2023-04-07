import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    callBack: (inputTitle: string)=> void
}

const AddItemForm = (props: AddItemFormPropsType) => {

    const [inputTitle, setInputTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (inputTitle.trim() !== '') {
            props.callBack(inputTitle.trim())
            setInputTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(event.currentTarget.value)
    }

    return (
        <div>
            <input value={inputTitle}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addItemHandler}> +</button>
            { error && <div className = 'error-message'> {error} </div> }
        </div>
    );
};

export default AddItemForm;