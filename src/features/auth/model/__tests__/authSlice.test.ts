import { authSlice, AuthStateType, authThunks } from "features/auth/model/authSlice"


let startState: AuthStateType

beforeEach(() => {
  startState = {
    isLoggedIn: false
  }
})

test("correct login should be set", () => {
  const endState = authSlice(startState, authThunks.login.fulfilled(
    {isLoggedIn: true}, 'requestId', {email: '', password: '', rememberMe: false}))

  expect(endState.isLoggedIn).toBe(true)
})

test("correct logout should be set", () => {
  const endState = authSlice(startState, authThunks.logout.fulfilled(
    {isLoggedIn: false}, 'requestId', undefined))

  expect(endState.isLoggedIn).toBe(false)
})
