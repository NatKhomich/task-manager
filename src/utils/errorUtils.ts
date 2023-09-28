import {Dispatch} from 'redux'
import {
    changeStatusLoadingAC,
    ChangeStatusLoadingActionType,
    setErrorAC,
    SetErrorACActionType
} from '../state/appReducer';
import {ResponseType} from '../api/todolists-api';

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    const error = data.messages[0]
    if (error) {
        dispatch(setErrorAC(error))
    } else {
        dispatch(setErrorAC('Some error occurred'))
    }
    dispatch(changeStatusLoadingAC('failed'))
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setErrorAC(error))
    dispatch(changeStatusLoadingAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<ChangeStatusLoadingActionType | SetErrorACActionType>
