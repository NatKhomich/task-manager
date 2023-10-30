
// generic function
import {Dispatch} from 'redux';
import {ResponseType} from 'common/types';
import {appActions} from 'app/appReducer';

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
