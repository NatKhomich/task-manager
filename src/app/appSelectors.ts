import {AppRootStateType} from '../state/store';

export const selectAppStatus = (state: AppRootStateType) => state.app.status
export const selectAppIsDarkMode = (state: AppRootStateType) => state.app.isDarkMode
export const selectSetAppInitialized = (state: AppRootStateType) => state.app.isInitialized
export const selectSetAppError = (state: AppRootStateType) => state.app.error

