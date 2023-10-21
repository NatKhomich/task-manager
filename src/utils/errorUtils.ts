import {Dispatch} from 'redux'
import {
    appActions
} from '../state/appReducer';
import {ResponseType} from '../api/todolists-api';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
    const error = data.messages[0]
    if (error) {
        dispatch(appActions.setAppError({error}))
    } else {
        dispatch(appActions.setAppError({error: 'Some error occurred'}))
    }
    dispatch(appActions.setAppStatus({status: 'failed'}))
}

export const handleServerNetworkError = (error: string, dispatch: Dispatch) => {
    dispatch(appActions.setAppError({error}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}
