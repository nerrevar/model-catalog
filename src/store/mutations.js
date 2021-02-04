export const setLanguage = (state, lang) => {
  state.Language = lang
  document.lang = lang
  return state
}
