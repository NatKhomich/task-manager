import {appActions, AppInitialStateType, appReducer} from '../appReducer';


let startState: AppInitialStateType;

beforeEach(() => {
    startState = {
        status: "idle",
        error: null,
        isDarkMode: true,
        isInitialized: false
    };
});

test("correct error message should be set", () => {
    const endState = appReducer(startState, appActions.setError({ error: "some error" }));
    expect(endState.error).toBe("some error");
});

test("correct status should be set", () => {
    const endState = appReducer(startState, appActions.changeStatusLoading({ status: "loading" }));
    expect(endState.status).toBe("loading");
});

test("correct status isDarkMode be set", () => {
    const endState = appReducer(startState, appActions.darkLightMode({ mode: false }));
    expect(endState.isDarkMode).toBe(false);
});