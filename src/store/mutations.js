export const setLanguage = (state, lang) => {
  state.Language = lang
  document.lang = lang
  return state
}

export const setUser = (state, user) => state.Auth.user = user
export const setUserCredential = (state, credential) => state.Auth.credential = credential
export const setAuthError = (state, error) => state.Auth.error = error
