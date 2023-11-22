import {AppRootStateType} from 'app/model/store';


export const selectAppStatus = (state: AppRootStateType) => state.app.status
export const selectAppIsDarkMode = (state: AppRootStateType) => state.app.isDarkLightMode
export const selectSetAppInitialized = (state: AppRootStateType) => state.app.isInitialized
export const selectSetAppError = (state: AppRootStateType) => state.app.error

