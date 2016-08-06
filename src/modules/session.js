// ------------------------------------
// Constants
// ------------------------------------
export const SESSION_LOGIN_SUCCESS = 'SESSION_LOGIN_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export const sessionLoginSuccess (value) => {
  return {
    type: SESSION_LOGIN,
    payload: value
  }
}

export const sessionLoginFail (value) => {
  return {
    type: SESSION_FAIL,
    payload: value
  }
}

export const sessionLoginAsync = () => {
  return async (dispatch, getState) => {
    let loginToken = await new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, 200)
    }).then(() => {
      return 'www.mwp.io' // just a mocked token
    })
    console.info('loginToken', loginToken)

    // based on the server response
    // we dispatch fail or success action
    if(loginToken === 'invalid') {
      dispatch(sessionLoginFail(loginToken))
    } else {
      dispatch(sessionLoginSuccess(loginToken))
    }

    return loginToken
  }
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SESSION_LOGIN]: (state, action) => { 
    // login token mock
    state.loginToken = Math.floor(Date.now() / 1000)
    alert('success')
    return Object.assign({}, state)
  },
  [SESSION_LOGIN]: (state, action) => { 
    // login token mock
    alert('failed')
    // state.loginToken = Math.floor(Date.now() / 1000)
    return Object.assign({}, state)
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  loginToken: null
}

export default function dashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
