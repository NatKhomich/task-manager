import {ResponseType} from 'common/types';
import {Dispatch} from 'redux';
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