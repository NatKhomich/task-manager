import {Middleware} from "redux";
import {RootStateReducer} from "app/store";

export const localStorageMiddleware: Middleware<{}, RootStateReducer> = (store) => (next) => (action) => {
    const result = next(action);
    localStorage.setItem('darkLightMode', JSON.stringify(store.getState().app.isDarkLightMode));
    return result;
};