import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormType = {
    addItem: (title: string) => void
}

const AddItemForm = (props: AddItemFormType) => {

    const [title, setTitle] = useState('')

    const [error, setError] = useState<string | null>(null)

    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
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
        setError(null)
        if( e.key === 'Enter' ) {
            addItemHandler()
        }
    }

    return (
            <div>
                <input value={title}
                       onChange={ onChangeTitleHandler }
                       onKeyDown={ onKeyDownHandler }
                       className={ error ? 'error' : '' }
                />
                <button onClick={ addItemHandler }> + </button>
                {error && <div className={'error-message'}> {error} </div>}
            </div>
    );
};

export default AddItemForm;