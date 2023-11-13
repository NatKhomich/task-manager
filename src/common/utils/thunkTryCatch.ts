import {AppRootStateType } from 'app/store';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { BaseResponseType} from 'common/types';
import {Dispatch} from "redux";
import {handleServerNetworkError} from "common/utils/handleServerNetworkError";
import {appActions} from "app/appReducer";

/**
 * A utility function for handling asynchronous logic within Redux thunks, incorporating a try-catch mechanism.
 * @param thunkAPI - the BaseThunkAPI object provided by Redux Toolkit
 * @param logic - the asynchronous logic function to be executed within the try block
 * @returns A Promise that resolves to the result of the asynchronous logic or rejects with a value indicating the error
 */

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<AppRootStateType, unknown, Dispatch, null | BaseResponseType>,
    logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI;
    dispatch(appActions.setAppStatus({ status: "loading" }));
    try {
        return await logic();
    } catch (e) {
        handleServerNetworkError(e, dispatch);
        return rejectWithValue(null);
    } finally {
        dispatch(appActions.setAppStatus({ status: "idle" }));
    }
};