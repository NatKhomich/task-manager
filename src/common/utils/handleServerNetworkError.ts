import axios from "axios";
import {AppDispatch} from "app/model/store";
import {appActions} from "app/model/appSlice";

/**
 * Handles network errors occurring during server interactions.
 * @param err - the error object, possibly of type unknown
 * @param dispatch - function for dispatching Redux actions, used to update the application state
 * @returns void
 */

export const handleServerNetworkError = (err: unknown, dispatch: AppDispatch):void => {
    let errorMessage = "Some error occurred";
    if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message || err?.message || errorMessage;

    } else if (err instanceof Error) {
        errorMessage = `Native error: ${err.message}`;
    } else {
        errorMessage = JSON.stringify(err);
    }
    dispatch(appActions.setAppError({ error: errorMessage }));
    dispatch(appActions.setAppStatus({ status: "failed" }));
};

