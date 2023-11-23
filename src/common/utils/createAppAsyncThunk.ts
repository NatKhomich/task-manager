import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatch, AppRootState} from "app/model/store";
import {BaseResponseType} from "common/types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootState
    dispatch: AppDispatch
    rejectValue: null | BaseResponseType
}>()