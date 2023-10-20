import {Dispatch} from 'redux'
import {
    appActions
} from '../state/appReducer';
import {ResponseType} from '../api/todolists-api';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    const error = data.messages[0]
    if (error) {
        dispatch(appActions.setError({error}))
    } else {
        dispatch(appActions.setError({error: 'Some error occurred'}))
    }
    dispatch(appActions.changeStatusLoading({status: 'failed'}))
}

export const handleServerNetworkError = (error: string, dispatch: Dispatch) => {
    dispatch(appActions.setError({error}))
    dispatch(appActions.changeStatusLoading({status: 'failed'}))
}
