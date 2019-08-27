import authReducer from '../../reducers/auth'

test('should set uid for login', () => {
  const uid = '123456'
  const state = authReducer({}, { type: 'LOGIN', uid })
  expect(state.uid).toBe( uid )
})
test('should set logout', () => {
  const state = authReducer({uid: 'anything'}, { type: 'LOGOUT'})
  expect(state).toEqual({})
})