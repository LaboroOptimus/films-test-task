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
} from "./types"

export const setHiddenFilms = () => {
  const data = JSON.parse(localStorage.getItem("hiddenFilms"))
  if (data !== null) {
    return {
      type: SET_HIDDEN_FILMS,
      payload: data,
    }
  } else {
    return {
      type: SET_HIDDEN_FILMS,
      payload: [],
    }
  }
}

export const fetchFilmCall = () => {
  return {
    type: FETCH_FILM_CALL,
  }
}

export const fetchFilmSuccess = (data) => {
  return {
    type: FETCH_FILM_SUCCESS,
    payload: data,
  }
}

export const fetchFilmError = (error) => {
  return {
    type: FETCH_FILM_ERROR,
    payload: error,
  }
}

export const hideItem = (id) => {
  const data = JSON.parse(localStorage.getItem("films"))
  const hiddenItem = data.filter((item) => {
    return item.id === id
  })
  data.forEach(function (el, i) {
    if (el.id === id) data.splice(i, 1)
  })
  localStorage.setItem("films", JSON.stringify(data))

  if (localStorage.getItem("hiddenFilms") !== null) {
    const hidden = JSON.parse(localStorage.getItem("hiddenFilms"))
    const hiddenItems = [...hiddenItem, ...hidden]
    localStorage.setItem("hiddenFilms", JSON.stringify(hiddenItems))
    return {
      type: HIDE_ITEM,
      payload: { hidden: hiddenItems, films: data },
    }
  } else {
    localStorage.setItem("hiddenFilms", JSON.stringify(hiddenItem))
    return {
      type: HIDE_ITEM,
      payload: { hidden: hiddenItem, films: data },
    }
  }
}

export const showItem = (id) => {
  const data = JSON.parse(localStorage.getItem("hiddenFilms"))
  const showedItem = data.filter((item) => {
    return item.id === id
  })
  data.forEach(function (el, i) {
    if (el.id === id) data.splice(i, 1)
  })
  localStorage.setItem("hiddenFilms", JSON.stringify(data))

  if (localStorage.getItem("films") !== null) {
    const showed = JSON.parse(localStorage.getItem("films"))
    const showedItems = [...showedItem, ...showed]
    localStorage.setItem("films", JSON.stringify(showedItems))
    return {
      type: SHOW_ITEM,
      payload: { showed: showedItems, hidden: data },
    }
  } else {
    localStorage.setItem("films", JSON.stringify(showedItem))
    return {
      type: SHOW_ITEM,
      payload: { showed: showedItem, hidden: data },
    }
  }
}

export const addComment = (id, hidden, value) => {
  if (hidden) {
    let data = JSON.parse(localStorage.getItem("hiddenFilms"))
    let idx = data.findIndex((x) => x.id == id)
    let comments = data[idx].comments

    if (comments && comments.length > 0) {
      let lastId = data[idx].comments.at(-1).id
      data[idx].comments = [
        ...comments,
        { id: String(Number(lastId) + 1), value: value },
      ]
    } else {
      data[idx].comments = [{ id: 0, value: value }]
    }
    localStorage.setItem("hiddenFilms", JSON.stringify(data))
    return {
      type: ADD_COMMENT_TO_HIDDEN,
      payload: data,
    }
  } else {
    let data = JSON.parse(localStorage.getItem("films"))
    let idx = data.findIndex((x) => x.id == id)
    let comments = data[idx].comments

    if (comments && comments.length > 0) {
      let lastId = data[idx].comments.at(-1).id
      data[idx].comments = [
        ...comments,
        { id: Number(lastId) + 1, value: value },
      ]
    } else {
      data[idx].comments = [{ id: 0, value: value }]
    }
    localStorage.setItem("films", JSON.stringify(data))
    return {
      type: ADD_COMMENT_TO_SHOWED,
      payload: data,
    }
  }
}

export const removeComment = (hidden, elementId, commentId) => {
  if (hidden) {
    let data = JSON.parse(localStorage.getItem("hiddenFilms"))
    let elementIdx = data.findIndex((x) => x.id == elementId)
    let comments = data[elementIdx].comments

    comments.forEach(function (el, i) {
      if (el.id == commentId) comments.splice(i, 1)
    })
    
    data[elementIdx].comments = comments
    localStorage.setItem("hiddenFilms", JSON.stringify(data))
    return {
      type: REMOVE_COMMENT_FROM_HIDDEN,
      payload: data
    }
  } else {
    let data = JSON.parse(localStorage.getItem("films"))
    let elementIdx = data.findIndex((x) => x.id == elementId)
    let comments = data[elementIdx].comments

    comments.forEach(function (el, i) {
      if (el.id == commentId) comments.splice(i, 1)
    })
    
    data[elementIdx].comments = comments
    localStorage.setItem("films", JSON.stringify(data))
    return {
      type: REMOVE_COMMENT_FROM_SHOWED,
      payload: data
    }
  }
}
