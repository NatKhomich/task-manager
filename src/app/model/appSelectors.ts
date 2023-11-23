import {AppRootState} from 'app/model/store';


export const selectAppStatus = (state: AppRootState) => state.app.status
export const selectAppIsDarkMode = (state: AppRootState) => state.app.isDarkLightMode
export const selectSetAppInitialized = (state: AppRootState) => state.app.isInitialized
export const selectSetAppError = (state: AppRootState) => state.app.error

