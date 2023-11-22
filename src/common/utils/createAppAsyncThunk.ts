import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppDispatchType, AppRootStateType} from "app/model/store";
import {BaseResponseType} from "common/types";

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppRootStateType
    dispatch: AppDispatchType
    rejectValue: null | BaseResponseType
}>()