import {
  FETCH_FILM_CALL,
  FETCH_FILM_SUCCESS,
  FETCH_FILM_ERROR,
  HIDE_ITEM,
  SET_HIDDEN_FILMS,
  SHOW_ITEM,
  ADD_COMMENT_TO_SHOWED,
  ADD_COMMENT_TO_HIDDEN,
  REMOVE_COMMENT_FROM_SHOWED,
  REMOVE_COMMENT_FROM_HIDDEN,
  LoadingStatus,
} from "./types"

const initialState = {
  films: [],
  hiddenFilms: [],
  fetchFilmsStatus: LoadingStatus.None,
}

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_FILM_CALL:
      return {
        ...state,
        fetchFilmsStatus: LoadingStatus.Pending,
      }
    case FETCH_FILM_SUCCESS:
      return {
        ...state,
        fetchFilmsStatus: LoadingStatus.Success,
        films: action.payload,
      }
    case FETCH_FILM_ERROR:
      return {
        ...state,
        fetchFilmsStatus: LoadingStatus.Error,
      }
    case HIDE_ITEM:
      return {
        ...state,
        hiddenFilms: action.payload.hidden,
        films: action.payload.films,
      }
    case SHOW_ITEM:
      return {
        ...state,
        hiddenFilms: action.payload.hidden,
        films: action.payload.showed,
      }
    case ADD_COMMENT_TO_HIDDEN:
      return {
        ...state,
        hiddenFilms: action.payload,
      }
    case ADD_COMMENT_TO_SHOWED:
      return {
        ...state,
        films: action.payload,
      }
    case SET_HIDDEN_FILMS:
      return {
        ...state,
        hiddenFilms: action.payload,
      }
    case REMOVE_COMMENT_FROM_HIDDEN:
      return {
        ...state,
        hiddenFilms: action.payload,
      }
    case REMOVE_COMMENT_FROM_SHOWED:
      return {
        ...state,
        films: action.payload,
      }
    default:
      return state
  }
}

export default rootReducer
