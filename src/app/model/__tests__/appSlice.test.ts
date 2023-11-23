import {appActions, AppInitialState, appSlice} from 'app/model/appSlice';


let startState: AppInitialState;

beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isDarkLightMode: true,
        isInitialized: false
    };
});

test("correct error message should be set", () => {
    const endState = appSlice(startState, appActions.setAppError({ error: "some error" }));
    expect(endState.error).toBe("some error");
});

test("correct status should be set", () => {
    const endState = appSlice(startState, appActions.setAppStatus({ status: "loading" }));
    expect(endState.status).toBe("loading");
});

test("correct status isDarkMode be set", () => {
    const endState = appSlice(startState, appActions.darkLightAppMode({ mode: false }));
    expect(endState.isDarkLightMode).toBe(false);
});