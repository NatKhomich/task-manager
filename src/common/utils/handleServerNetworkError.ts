import {Dispatch} from 'redux';
import {appActions} from 'app/appReducer';


export const handleServerNetworkError = (error: string, dispatch: Dispatch) => {
    dispatch(appActions.setAppError({error}))
    dispatch(appActions.setAppStatus({status: 'failed'}))
}
