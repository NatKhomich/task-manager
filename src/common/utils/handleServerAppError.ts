import {appActions} from "app/model/appSlice";
import {BaseResponseType} from "common/types";
import {Dispatch} from "redux";

/**
 * This function handles errors that may occur during interactions with the server.
 * @param data - the server response in the format of BaseResponseType<D>
 * @param dispatch - a function for dispatching messages to the Redux store
 * @param showError - a flag indicating whether to display errors in the user interface
 * @returns void
 */
export const handleServerAppError = <D>(data: BaseResponseType<D>, dispatch: Dispatch, showError:boolean = true) => {
    if (showError) {
        dispatch(appActions.setAppError({error: data.messages.length ? data.messages[0] : 'Some error occurred'}))
    }
    dispatch(appActions.setAppStatus({status: 'failed'}))
}
